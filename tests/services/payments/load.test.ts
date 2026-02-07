import { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { LoadPayments } from "~/services/payments/load"
import { formatMonth } from "~/utils/pages/format_date"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('Load Payments', () => {
  const sut = new LoadPayments(prisma)

  it('when call without params, returns InvalidParams', async () => {
    expect(async () => {
      await sut.execute({ userId: '' })
    }).rejects.toThrow(InvalidParams)
  })

  it('when call with userId params, returns last payments', async () => {
    // @ts-ignore
    jest.spyOn(prismaMock.payment, 'groupBy').mockResolvedValue([{
      currentMonth: new Date(),
      _sum: {
        amount: new Decimal(1000)
      }
    }])

    const result = await sut.execute({ userId: 'valid_id' })

    expect(result).toEqual({
      currentMonth: formatMonth(new Date()),
      amount: 1000
    })
  })

  it('when call with userId params and not found registers', async () => {
    // @ts-ignore
    jest.spyOn(prismaMock.payment, 'groupBy').mockResolvedValue([])

    const result = await sut.execute({ userId: 'valid_id' })

    expect(result).toEqual({
      currentMonth: '',
      amount: 0
    })
  })

  it('when call with month params, returns payments for this month', async () => {
    prismaMock.payment.findMany.mockResolvedValue([
      {
        id:'valid_id',
        currentMonth: new Date(),
        category:'test',
        description:'test',
        dueDate:new Date(),
        amount: new Decimal(100),
        paid: true,
        createdAt:new Date(),
        updatedAt:new Date(),
        userId:'valid_user_id',
      },
      {
        id:'valid_id',
        currentMonth: new Date(),
        category:'test',
        description:'test',
        dueDate:new Date(),
        amount: new Decimal(100),
        paid: true,
        createdAt:new Date(),
        updatedAt:new Date(),
        userId:'valid_user_id',
      },
    ])

    const result = await sut.execute({ month: '2002-09-01', userId: 'valid_id'})

    expect(result).toHaveLength(2)
  })

  it('when call with id and userId, finds payment and returns the record', async () => {
    const payment = {
      id: 'payment_id',
      currentMonth: new Date('2024-01-01'),
      category: 'casa',
      description: 'Aluguel',
      dueDate: new Date('2024-01-10'),
      amount: new Decimal(1500),
      paid: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'valid_user_id',
    }
    prismaMock.payment.findFirst.mockResolvedValue(payment)

    const result = await sut.execute({ id: 'payment_id', userId: 'valid_user_id' })

    expect(result).toEqual(payment)
    expect(prismaMock.payment.findFirst).toHaveBeenCalledWith({
      where: { id: 'payment_id', userId: 'valid_user_id' },
    })
  })

  it('when call with id that does not exist, returns null', async () => {
    prismaMock.payment.findFirst.mockResolvedValue(null)

    const result = await sut.execute({ id: 'non_existent_id', userId: 'valid_user_id' })

    expect(result).toBeNull()
  })

  it('when call with userId that is not owner, returns null', async () => {
    prismaMock.payment.findFirst.mockResolvedValue(null)

    const result = await sut.execute({ id: 'payment_id', userId: 'other_user_id' })

    expect(result).toBeNull()
  })
})