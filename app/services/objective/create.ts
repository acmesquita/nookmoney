import type { Goal, PrismaClient } from "@prisma/client";

type GoalData = {
  describe: string;
  amount: number;
  userId: string
}

export class CreateGoal {
  constructor(private readonly db: PrismaClient) { }

  async execute({ describe, amount, userId }: GoalData): Promise<Goal | null> {
    return await this.db.goal.create({
      data: {
        describe,
        amount,
        userId
      }
    })
  }
}