import type { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { InvalidParams } from "~/errors/invalid-params.error";
import { formateDate } from "~/utils/pages/format_date";

type BankData = {
  userId: string
}

export class EvolutionBalances {
  constructor(private readonly db: PrismaClient) { }

  async execute({ userId }: BankData): Promise<{ createdAt: string, amount: Decimal}[]> {
    if (!userId) {
      throw new InvalidParams()
    }
    
    const date = new Date();
    const last3ToMonth =  new Date(date.getFullYear(), date.getMonth(), 1);
    last3ToMonth.setDate(last3ToMonth.getDate() - 90)
    
    const balances = await this.db.balance.groupBy({
      where: {
        Bank: {
          userId
        },
        createdAt: {
          gte: last3ToMonth
        }
      },
      _sum: {
        amount: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      by: ['createdAt'],
    })

    return balances.map(balance => ({
        amount: new Decimal(balance._sum.amount || 0),
        createdAt: formateDate(new Date(balance.createdAt))
      })
    )
  }
}