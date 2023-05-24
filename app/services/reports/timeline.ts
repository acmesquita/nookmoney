import type { PrismaClient } from "@prisma/client";
import { InvalidParams } from "~/errors/invalid-params.error";

type TimelineData = {
  userId: string
}

export class Timeline {
  constructor(private readonly db: PrismaClient) { }

  async execute({ userId }: TimelineData): Promise<unknown> {
    if (!userId) {
      throw new InvalidParams()
    }

    const result = await this.db.$queryRaw`
      select
        max("Balance"."createdAt"),
        to_char("Balance"."createdAt", 'MM/YYYY') as month_bank,
        "Balance"."amount",
        "Bank"."name"
      from "Balance" inner join "Bank" on "Bank".id = "Balance"."bankId"
      group by month_bank, "Balance"."amount", "Bank"."name"
    `

    return result
  }
}