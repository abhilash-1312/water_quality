import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import prisma from "@repo/db/client";
import { Role } from "@repo/db/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, {params}: {params: Promise<{requestId: string}>}){
    try {
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        if(!session || !session.user || !session.user.id || session.user.role !== Role.user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const {requestId} = await params;
        if(!requestId){
            return NextResponse.json({error: "Invalid test request id"}, {status: 400});
        }
        await prisma.testRequest.update({
            where: {
                requestId
            },
            data: {
                status: "Deleted"
            }
        });
        return NextResponse.json({message: "Test request deleted successfully"}, {status: 200});
    } catch (err) {
        console.log(err)
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}