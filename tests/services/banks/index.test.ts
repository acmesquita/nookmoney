import type { Bank } from "@prisma/client"
import type { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { FindBanks } from "~/services/banks"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('Find Bank', () => {
  it('when without params, return erro Invalid Params', () => {
    const findBanksService = new FindBanks(prisma)
    const params = {
      userId: ''
    }

    expect(async () => {
      await findBanksService.execute(params)
    }).rejects.toThrow(InvalidParams)
  })

  it('when call provider userId, return list with all banks', async () => {
    const findBanksService = new FindBanks(prisma)
    const params = {
      userId: '1'
    }

    prismaMock.bank.findMany.mockResolvedValueOnce([
      {
        id: '1',
        name: 'Banco XPTO',
        category: 'Investimento',
        amount: 0 as unknown as Decimal,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1',
      }
    ])

    const result = await findBanksService.execute(params)

    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(1)
  })

  it('when call provider id, return one banks', async () => {
    const findBanksService = new FindBanks(prisma)
    const params = {
      id: '1',
      userId: '1'
    }

    prismaMock.bank.findFirst.mockResolvedValueOnce({
      id: '1',
      name: 'Banco XPTO',
      category: 'Investimento',
      amount: 0 as unknown as Decimal,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
    })

    const result = await findBanksService.execute(params) as Bank

    expect(result?.id).toBe('1')
  })
})

export { }