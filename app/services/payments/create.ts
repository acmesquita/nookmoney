import type { Payment, PrismaClient } from "@prisma/client";
import { InvalidParams } from "~/errors/invalid-params.error";

type PaymentData = {
  currentMonth: string
  category: string
  description: string
  dueDate: Date
  amount: number
  userId: string
}

export class CreatePayment {
  constructor(private readonly db: PrismaClient) { }

  async execute({
    currentMonth,
    category,
    description,
    dueDate,
    amount,
    userId
  }: PaymentData): Promise<Payment | null> {

    if (!currentMonth || !category || !description || !amount || !userId) {
      throw new InvalidParams()
    }

    return await this.db.payment.create({
      data: {
        currentMonth: new Date(currentMonth),
        category,
        description,
        dueDate: new Date(dueDate),
        amount,
        userId
      }
    })
  }
}