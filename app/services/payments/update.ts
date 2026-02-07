import type { Payment, PrismaClient } from "@prisma/client";
import { InvalidParams } from "~/errors/invalid-params.error";

type UpdatePaymentData = {
  id: string
  userId: string
  currentMonth: string
  category: string
  description: string
  dueDate: Date
  amount: number
}

export class UpdatePayment {
  constructor(private readonly db: PrismaClient) { }

  async execute({
    id,
    userId,
    currentMonth,
    category,
    description,
    dueDate,
    amount
  }: UpdatePaymentData): Promise<Payment> {

    if (!id || !userId || !currentMonth || !category || !description || amount == null) {
      throw new InvalidParams()
    }

    return await this.db.payment.update({
      where: {
        id
      },
      data: {
        category,
        description,
        dueDate: new Date(dueDate),
        amount
      }
    })
  }
}
