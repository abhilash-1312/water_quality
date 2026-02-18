import { PaymentStatus } from "@repo/db/types"

export interface Payment {
  paymentId: string
  amount: number
  request: {
    sampleLocation: string
    waterType: {
      name: string
    }
  },
  status: PaymentStatus,
  createdAt: Date
}