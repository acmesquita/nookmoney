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
        "Bank"."name",
        to_char("Balance"."createdAt", 'MM/YYYY') as month_bank,
        "Balance"."amount"
        from "Balance"
        inner join "Bank" on "Bank".id = "Balance"."bankId"
        where
          "Balance"."createdAt" in (
          select
            max("Balance"."createdAt") as max_created_at
          from "Balance"
          group by to_char("Balance"."createdAt", 'MM/YYYY')
        )
        order by month_bank desc
    `

    return result
  }
}