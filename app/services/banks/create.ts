import type { Bank, PrismaClient } from "@prisma/client";
import { InvalidParams } from "~/errors/invalid-params.error";

type BankData = {
  name: string;
  category: string;
  userId: string
}

export class CreateBank {
  constructor(private readonly db: PrismaClient) { }

  async execute({ name, category, userId }: BankData): Promise<Bank | null> {
    if (!name || !category || !userId) {
      throw new InvalidParams()
    }

    return await this.db.bank.create({
      data: {
        name,
        category,
        userId
      }
    })
  }
}