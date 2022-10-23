import type { PrismaClient, Payment } from "@prisma/client";
import { InvalidParams } from "~/errors/invalid-params.error";

type LoadProps = {
  id: string
}

export class PayPayments {
  constructor(private readonly db: PrismaClient) { }

  async execute({ id }: LoadProps): Promise<Payment | null> {
    if (!id) {
      throw new InvalidParams()
    }
    return await this.db.payment.update({
      data: { paid: true },
      where: { id }
    })
  }

}