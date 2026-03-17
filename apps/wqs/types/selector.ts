import { Role, TestRequestStatus } from "@repo/db/types"

export const selectionPipeline = {
    requestId: true,
    status: true,
    location: true,
    sampleLocation: true,
    mobileNumber: true,
    waterType: {
        select:{
            name: true,
            waterTypeId: true
        }
    },
    createdAt: true
}