import type { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { InvalidParams } from "~/errors/invalid-params.error";

type BankData = {
  userId: string
}

export class LoadTotalBanks {
  constructor(private readonly db: PrismaClient) { }

  async execute({ userId }: BankData): Promise<Decimal> {
    if (!userId) {
      throw new InvalidParams()
    }
    const aggregate = await this.db.bank.aggregate({
      where: {
        userId
      },
      _sum: {
        amount: true
      },
    })

    return aggregate?._sum.amount || new Decimal(0)
  }
}