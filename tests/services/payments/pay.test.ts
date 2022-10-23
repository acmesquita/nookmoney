import { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { PayPayments } from "~/services/payments/pay"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('Pay payment', () => {
  const sut = new PayPayments(prisma)
  it('when call without id payment, throws InvalidParams error', () => {
    expect(async () => {
      await sut.execute({ id: '' })
    }).rejects.toThrow(InvalidParams)
  })

  it('when call with invalid id, return undefined', async () => {
    const result = await sut.execute({ id: 'invalid_id' })

    expect(result).toBeFalsy()
  })

  it('when call with invalid id, return undefined', async () => {
    prismaMock.payment.update.mockResolvedValue({
      id: 'valid_id',
      currentMonth: new Date(),
      category: 'test',
      description: 'test',
      dueDate: new Date(),
      amount: new Decimal(100),
      paid: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'valid_user_id',
    })
    const result = await sut.execute({ id: 'valid_id' })

    expect(result?.id).toBe('valid_id')

  })
})