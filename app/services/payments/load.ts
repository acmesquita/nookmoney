import type { PrismaClient, Payment } from "@prisma/client";
import { formatMonth } from "~/utils/pages/format_date";

type LoadProps = {
  month?: string
  id?: string
  userId?: string
}

type LoadReturnProps = {
  currentMonth: string
  amount: number
}

export class LoadPayments {
  constructor(private readonly db: PrismaClient) { }

  async execute({ id, month, userId }: LoadProps): Promise<Payment[] | LoadReturnProps | null> {
    if (month) {
      return this.findAll(month)
    } else if (userId) {
      return this.findLastsPayments(userId)
    }
    return null
  }

  private async findAll(month: string): Promise<Payment[] | null> {
    console.log(month)
    return await this.db.payment.findMany({
      where: {
        currentMonth: new Date(month)
      },
      orderBy: [
        { paid: 'asc' },
        { dueDate: 'asc' }
      ]
    })
  }

  private async findLastsPayments(userId: string): Promise<LoadReturnProps> {
    const result = await this.db.payment.groupBy({
      by: ['currentMonth'],
      _sum: {
        amount: true
      },
      orderBy: {
        currentMonth: 'desc'
      },
      where: {
        userId
      },
      take: 1
    })

    return {
      currentMonth: result[0] ? formatMonth(result[0]?.currentMonth) : '',
      amount: Number(result[0]?._sum.amount) || 0
    }
  }
}