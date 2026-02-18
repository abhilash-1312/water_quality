import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { createTestRequestSchema } from "@/zod/testRequest";
import prisma from "@repo/db/client";
import { Role } from "@repo/db/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        if(!session || !session.user || !session.user.id || session.user.role !== Role.user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const data = await req.json()
        const createTestRequestValidationResponse = createTestRequestSchema.safeParse(data);
        if(!createTestRequestValidationResponse.success){
            return NextResponse.json({error: "Invalid test request data"}, {status: 400});
        }
        const { waterTypeId, location, sampleLocation, mobileNumber } = createTestRequestValidationResponse.data;
        const testRequest = await prisma.testRequest.create({
            data: {
                waterTypeId,
                userId: session.user.id,
                location,
                sampleLocation,
                mobileNumber
            }
        });
        return NextResponse.json({testRequest, message: "Test request created successfully"}, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}