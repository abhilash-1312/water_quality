import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { updateTestSchema } from "@/zod/test";
import prisma from "@repo/db/client";
import { Role } from "@repo/db/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, {params}: {params: Promise<{requestId: string}>}) {
    try {
      const session = await getServerSession(NEXT_AUTH_CONFIG);
      if(!session || !session.user || !session.user.id || session.user.role !== Role.technician) {
          return NextResponse.json({error: "Unauthorized"}, {status: 401});
      }
      const {requestId} = await params;
      if (!requestId) {
        return NextResponse.json({error: "Invalid test request ID"}, {status: 400});
      }
      const data = await req.json()

      const parsed = updateTestSchema.safeParse(data);
      if (!parsed.success) {
        return NextResponse.json({error: "Invalid test data"}, {status: 400});
      }

      const tests = parsed.data.tests;

      const existingTestRequest = await prisma.testRequest.findUnique({
        where: { requestId },
        select: {
          requestId: true,
          testerId: true,
          sampleTests: {
            select: {
              id: true,
              status: true,
              test: {
                select: {
                  minValue: true,
                  maxValue: true,
                  name: true
                }
              }
            },
          },
        },
      });

      if (!existingTestRequest) {
        return NextResponse.json({error: "Test request not found"}, {status: 404});
      }

      if(!existingTestRequest.testerId || existingTestRequest.testerId !== session.user.id){
          return NextResponse.json({error: "Unauthorized"}, {status: 401});
      }

      const totalTests = existingTestRequest.sampleTests.length;

      const completedCount = existingTestRequest.sampleTests.filter(
        (st) => st.status === "Completed"
      ).length;

      if (completedCount === totalTests) {
        return NextResponse.json({error: "All tests already completed"}, {status: 400});
      }

      const updatableIds = existingTestRequest.sampleTests
        .filter((st) => st.status === "Pending" || st.status === "Testing")
        .map((st) => st.id);

      const updateIds = tests.map((t) => t.id);

      const invalidIds = updateIds.filter(
        (id) => !updatableIds.includes(id)
      );

      if (invalidIds.length > 0) {
        return NextResponse.json({error: "Invalid test ids"}, {status: 400});
      }

      const uniqueIds = [...new Set(updateIds)];
      const sampleTests = existingTestRequest.sampleTests;

      // let allValuesAreInRange = true;
      let invalidRangeMessage = ""
      for(const test of tests){
        const sampleTest = sampleTests.find((st) => st.id === test.id);
        if(!sampleTest){
          continue;
        }
        const {minValue, maxValue} = sampleTest.test;
        if(test.value < minValue || test.value > maxValue){
          invalidRangeMessage = `${sampleTest.test.name} value must be between ${minValue} and ${maxValue}`
          break;
        }
      }

      if(invalidRangeMessage){
        return NextResponse.json({error: invalidRangeMessage}, {status: 400});
      }

      const remainingPendingCount = updatableIds.filter(
        (id) => !uniqueIds.includes(id)
      ).length;

      await prisma.$transaction(async (tx) => {
        // Update sample tests
        await Promise.all(
          tests.map((item) =>
            tx.sampleTest.update({
              where: { id: item.id },
              data: {
                value: item.value,
                status: "Completed",
              },
            })
          )
        );

        // If no remaining pending tests → complete request
        if (remainingPendingCount === 0) {
          await tx.testRequest.update({
            where: { requestId },
            data: {
              status: "Completed",
            },
          });
        }
      });

      return NextResponse.json({message: "Tests updated successfully"}, {status: 200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
  }
