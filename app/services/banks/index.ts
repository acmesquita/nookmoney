import type { Bank, PrismaClient } from "@prisma/client";
import { InvalidParams } from "~/errors/invalid-params.error";

type BankData = {
  id?: string;
  userId: string
}

export class FindBanks {
  constructor(private readonly db: PrismaClient) { }

  async execute({ id, userId }: BankData): Promise<Bank | Bank[] | null> {
    if (!userId) {
      throw new InvalidParams()
    }

    if (id) {
      return await this.findBankById(id)
    }

    return await this.findAllBanks(userId)
  }

  private async findBankById(id: string) {
    return await this.db.bank.findFirst({
      where: {
        id
      },
      include: {
        balances: {
          take: 10,
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })
  }

  private async findAllBanks(userId: string) {
    return await this.db.bank.findMany({
      where: {
        userId
      },
      orderBy: {
        name: 'asc'
      },
    })
  }
}