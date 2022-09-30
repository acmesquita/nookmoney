import type { Bank, PrismaClient } from "@prisma/client";

type BankData = {
  name: string;
  category: string;
  userId: string
}

export class CreateBank {
  constructor(private readonly db: PrismaClient) { }

  async execute({ name, category, userId }: BankData): Promise<Bank | null> {
    return await this.db.bank.create({
      data: {
        name,
        category,
        userId
      }
    })
  }
}