import type { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class LoadTotalBanks {
  constructor(private readonly db: PrismaClient) { }

  async execute(): Promise<Decimal> {
    const aggregate = await this.db.bank.aggregate({
      _sum: {
        amount: true
      },
    })

    return aggregate._sum.amount || new Decimal(0)
  } 
}