import type { PrismaClient, Goal } from "@prisma/client";
import { InvalidParams } from "~/errors/invalid-params.error";

type LoadGoalProps = {
  userId: string
}

export class LoadGoal {
  constructor(private readonly db: PrismaClient) { }

  async execute({ userId }: LoadGoalProps): Promise<Goal | null> {
    if (!userId) {
      throw new InvalidParams()
    }

    return await this.db.goal.findFirst({
      where: {
        userId
      }
    })
  }

}