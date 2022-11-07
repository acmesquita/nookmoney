import { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { getInfoToDashboard } from "~/services/dashboard"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('getInfoToDashboard', () => {
  it('when call without userId, throws InvalidParams error', () => {
    expect(getInfoToDashboard).rejects.toThrow(InvalidParams)
  })

  describe('when call with userId valid', () => {

    it('result contains summary with wallet, payment and objetive resume', async () => {
      prismaMock.goal.findFirst.mockResolvedValue({
        id: 'valid_id',
        amount: new Decimal(1100),
        describe: 'Aposentadoria',
        userId: '1',
      })

      prismaMock.bank.aggregate.mockResolvedValue({
        _sum: {
          amount: new Decimal(300)
        },
        _avg: {
          amount: null
        },
        _count: {
          amount: undefined
        },
        _max: {
          amount: null
        },
        _min: {
          amount: null
        }
      })

      // @ts-ignore
      jest.spyOn(prismaMock.payment, 'groupBy').mockResolvedValue([{
        currentMonth: new Date(),
        _sum: {
          amount: new Decimal(1000)
        }
      }])

      prismaMock.payment.findMany.mockResolvedValue([
        {
          id: 'valid_id',
          currentMonth: new Date('01-11-2022'),
          category: 'test',
          description: 'test',
          dueDate: new Date(),
          amount: new Decimal(100),
          paid: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 'valid_user_id',
        },
        {
          id: 'valid_id',
          currentMonth:  new Date('01-11-2022'),
          category: 'test',
          description: 'test',
          dueDate: new Date(),
          amount: new Decimal(100),
          paid: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 'valid_user_id',
        },
      ])


      const result = await getInfoToDashboard('valid_id', prisma)

      expect(result).toEqual({
        summary: {
          walet: {
            updateAt: "18/09/2022",
            amount: new Decimal(300)
          },
          payments: {
            currentMonth: "11/2022",
            amount: 1000
          },
          objetive: {
            amount: new Decimal(1100),
            percentComplited: 27
          }
        },
        "pendencies": [
          {
            "complited": true,
            "describe": "Create objective"
          },
          {
            "complited": false,
            "describe": "Update bank balances"
          },
          {
            "complited": false,
            "describe": "Outstanding payments"
          }
        ]
      })
    })


    it('result contains summary with wallet, payment and objetive resume', async () => {
      prismaMock.goal.findFirst.mockResolvedValue(null)

      prismaMock.bank.aggregate.mockResolvedValue({
        _sum: {
          amount: new Decimal(0)
        },
        _avg: {
          amount: null
        },
        _count: {
          amount: undefined
        },
        _max: {
          amount: null
        },
        _min: {
          amount: null
        }
      })

      // @ts-ignore
      jest.spyOn(prismaMock.payment, 'groupBy').mockResolvedValue([{
        currentMonth: new Date(),
        _sum: {
          amount: new Decimal(0)
        }
      }])

      prismaMock.payment.findMany.mockResolvedValue([
        {
          id: 'valid_id',
          currentMonth: new Date('01-11-2022'),
          category: 'test',
          description: 'test',
          dueDate: new Date(),
          amount: new Decimal(0),
          paid: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 'valid_user_id',
        },
        {
          id: 'valid_id',
          currentMonth:  new Date('01-11-2022'),
          category: 'test',
          description: 'test',
          dueDate: new Date(),
          amount: new Decimal(0),
          paid: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 'valid_user_id',
        },
      ])


      const result = await getInfoToDashboard('valid_id', prisma)

      expect(result).toEqual({
        summary: {
          walet: {
            updateAt: "18/09/2022",
            amount: new Decimal(0)
          },
          payments: {
            currentMonth: "11/2022",
            amount: 0
          },
          objetive: {
            amount: 0,
            percentComplited: 0
          }
        },
        "pendencies": [
          {
            "complited": true,
            "describe": "Create objective"
          },
          {
            "complited": false,
            "describe": "Update bank balances"
          },
          {
            "complited": false,
            "describe": "Outstanding payments"
          }
        ]
      })
    })
  })
})