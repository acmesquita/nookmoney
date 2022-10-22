import type { PrismaClient } from "@prisma/client";

type BalanceData = {
  banks: Array<{
    id: string,
    amount: number
  }>
}

export class CreateBalance {
  constructor(private readonly db: PrismaClient) { }

  async execute({ banks }: BalanceData): Promise<boolean> {
    const bankDb = this.db.bank
    const balanceDb = this.db.balance
    const transactions: any[] = []

    banks.forEach(({ id, amount }) => {
      transactions.push(bankDb.update({
        where: { id: id },
        data: { amount: amount },
      }))
      transactions.push(balanceDb.create({
        data: {
          amount: amount,
          bankId: id
        }
      }))
    })


    return (await this.db.$transaction(transactions))?.length > 0
  }
}