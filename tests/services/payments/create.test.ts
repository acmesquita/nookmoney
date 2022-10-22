import { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { CreatePayment } from "~/services/payments/create"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('Create Payments', () => {
  it('when call with invalid params, returns InvalidParams error', async () => {
    const createPaymentsService = new CreatePayment(prisma)
    const params = {
      currentMonth: '',
      category: '',
      description: '',
      dueDate: new Date(),
      amount: 0,
      userId: '',
    }

    expect(async () => {
      await createPaymentsService.execute(params)
    }).rejects.toThrow(InvalidParams)
  })

  it('when call with valid params, returns new Payment', async () => {
    const createPaymentsService = new CreatePayment(prisma)
    const params = {
      currentMonth: '2020-09',
      category: 'test',
      description: 'test',
      dueDate: new Date(),
      amount: 110,
      userId: 'valid_user_id',
    }

    prismaMock.payment.create.mockResolvedValue({
      id: '1',
      currentMonth: new Date(),
      category: 'test',
      description: 'test',
      dueDate: new Date(),
      amount: new Decimal(110),
      userId: 'valid_user_id',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const result = await createPaymentsService.execute(params)

    expect(result?.id).toBe('1')
  })
})