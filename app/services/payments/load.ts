import type { PrismaClient, Payment } from "@prisma/client";

type LoadProps = {
  month: string
  id?: string
}

export class LoadPayments {
  constructor(private readonly db: PrismaClient) { }

  async execute({ id, month }: LoadProps): Promise<Payment[] | null> {
    return this.findAll(month)
  }
  
  private async findAll(month: string): Promise<Payment[] | null> {
    return await this.db.payment.findMany({
      where: {
        currentMonth: new Date(month)
      },
      orderBy: [
        { paid: 'asc' },
        { dueDate: 'asc'}
      ]
    })
  }
}