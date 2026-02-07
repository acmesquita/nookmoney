import { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { UpdatePayment } from "~/services/payments/update"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('UpdatePayment', () => {
  const sut = new UpdatePayment(prisma)

  it('when call with invalid params, throws InvalidParams', async () => {
    await expect(
      sut.execute({
        id: '',
        userId: 'user_id',
        currentMonth: '2024-01-01',
        category: 'casa',
        description: 'Desc',
        dueDate: new Date(),
        amount: 100,
      })
    ).rejects.toThrow(InvalidParams)

    await expect(
      sut.execute({
        id: 'payment_id',
        userId: '',
        currentMonth: '2024-01-01',
        category: 'casa',
        description: 'Desc',
        dueDate: new Date(),
        amount: 100,
      })
    ).rejects.toThrow(InvalidParams)
  })

  it('when call with valid params, updates payment and returns correct data', async () => {
    const updatedPayment = {
      id: 'payment_id',
      currentMonth: new Date('2024-02-01'),
      category: 'cartao_de_credito',
      description: 'Updated description',
      dueDate: new Date('2024-02-15'),
      amount: new Decimal(250),
      paid: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'valid_user_id',
    }
    prismaMock.payment.update.mockResolvedValue(updatedPayment)

    const result = await sut.execute({
      id: 'payment_id',
      userId: 'valid_user_id',
      currentMonth: '2024-02-01',
      category: 'cartao_de_credito',
      description: 'Updated description',
      dueDate: new Date('2024-02-15'),
      amount: 250,
    })

    expect(result).toEqual(updatedPayment)
    expect(prismaMock.payment.update).toHaveBeenCalledWith({
      where: { id: 'payment_id', userId: 'valid_user_id' },
      data: {
        currentMonth: new Date('2024-02-01'),
        category: 'cartao_de_credito',
        description: 'Updated description',
        dueDate: new Date('2024-02-15'),
        amount: 250,
      },
    })
  })

  it('when userId is not owner, update fails', async () => {
    prismaMock.payment.update.mockRejectedValue(new Error('Record to update not found'))

    await expect(
      sut.execute({
        id: 'payment_id',
        userId: 'other_user_id',
        currentMonth: '2024-01-01',
        category: 'casa',
        description: 'Desc',
        dueDate: new Date(),
        amount: 100,
      })
    ).rejects.toThrow('Record to update not found')
  })
})
