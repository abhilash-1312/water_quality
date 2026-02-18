import { SampleTestStatus, TestRequestStatus } from "@repo/db/types"

export interface BaseRequest{
    requestId: string,
    location: string,
    sampleLocation: string,
    mobileNumber: string,
    waterType: {
        name: string,
        waterTypeId: string
    },
    createdAt: Date,
    status: TestRequestStatus
}

export interface PendingTestRequest extends BaseRequest{
    sampleTests: {
        id: string,
        test: {
            name: string
        },
        status: SampleTestStatus,
        value: number | null
    }[],
    payment:{
        amount: number
    }[]
}

export type TestRequest = PendingTestRequest | BaseRequest;
export interface Pagination{
    currentPage: number,
    totalPages: number
}
