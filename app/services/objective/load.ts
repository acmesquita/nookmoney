import type { PrismaClient, Goal } from "@prisma/client";

type LoadGoalProps = {
  userId: string
}

export class LoadGoal {
  constructor(private readonly db: PrismaClient) { }

  async execute({ userId }: LoadGoalProps): Promise<Goal | null> {
    return await this.db.goal.findFirst({
      where: {
        userId
      }
    })
  }

}