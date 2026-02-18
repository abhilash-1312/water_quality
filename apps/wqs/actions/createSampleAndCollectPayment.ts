import prisma from "@repo/db/client"

interface SampleRequestCreateBaseResponse{
    success: boolean,
}
interface SampleRequestCreationError extends SampleRequestCreateBaseResponse{
    success: false,
    error: string
}

interface SampleRequestCreationSuccess extends SampleRequestCreateBaseResponse{
    success: true,
    paymentId: string
}

type SampleRequestionCreationResponse = SampleRequestCreationError | SampleRequestCreationSuccess


export async function createSampleAndCollectPayment(requestId: string, testIds: string[], userId: string): Promise<SampleRequestionCreationResponse> {
    try {
        const paymentId = await prisma.$transaction(async(tx) => {
            await tx.sampleTest.createMany({
                data: testIds.map(testId => ({
                    requestId,
                    testId
                })),
            });

            const price = await tx.test.aggregate({
                where: {
                    testId: {
                        in: testIds
                    }
                },
                _sum: {
                    price: true
                }
            });
            const totalPrice = price._sum.price

            if(!totalPrice || totalPrice <= 0){
                throw new Error('Selected tests are invalid')
            }

            const payment = await tx.payment.create({
                data: {
                    amount: totalPrice,
                    requestId,
                    userId,
                    status: "Success"
                },
                select: {
                    paymentId: true
                }
            })
            await tx.testRequest.update({
              where: {
                requestId,
              },
              data: {
                status: "PaymentCollected"
              }
            });
            return payment.paymentId
        })
        return {success: true, paymentId}
    } catch (error) {
        console.log(error)
        return {success: false, error: "Something went wrong"}
    }
}

