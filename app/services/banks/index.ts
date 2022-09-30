import type { Bank, PrismaClient } from "@prisma/client";

type BankData = {
  id?: string;
}

export class FindBanks {
  constructor(private readonly db: PrismaClient) { }

  async execute({ id }: BankData): Promise<Bank | Bank[] | null> {
    if (id) {
      return await this.findBankById(id)
    }

    return await this.findAllBanks()
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

  private async findAllBanks() {
    return await this.db.bank.findMany({
      orderBy: {
        name: 'asc'
      },
    })
  }
}