import type { Goal, PrismaClient } from "@prisma/client";
import { InvalidParams } from "~/errors/invalid-params.error";

type GoalData = {
  describe: string;
  amount: number;
  userId: string
}

export class CreateGoal {
  constructor(private readonly db: PrismaClient) { }

  async execute({ describe, amount, userId }: GoalData): Promise<Goal | null> {
    if (!describe || !amount || !userId) {
      throw new InvalidParams()
    }
    return await this.db.goal.create({
      data: {
        describe,
        amount,
        userId
      }
    })
  }
}