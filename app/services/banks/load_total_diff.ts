import type { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { InvalidParams } from "~/errors/invalid-params.error";

type BankData = {
  userId: string
}

export class LoadTotalDiffBanksAmount {
  constructor(private readonly db: PrismaClient) { }

  async execute({ userId }: BankData): Promise<Decimal> {
    if (!userId) {
      throw new InvalidParams()
    }
    const aggregate = await this.db.balance.groupBy({
      where: {
        Bank: {
          userId
        }
      },
      _sum: {
        amount: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      by: ['createdAt'],
      take: 2
    })

    const diff = (Number(aggregate[0]?._sum.amount) - Number(aggregate[1]?._sum.amount)) || 0

    return new Decimal(diff)
  }
}