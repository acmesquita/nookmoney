import { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { LoadTotalBanks } from "~/services/banks/load_total"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('LoadTotalBanks', () => {
  it('when call without params, return InvalidParams error', async () => {
    const loadTotalBanksService = new LoadTotalBanks(prisma)
    const params = {
      userId: ''
    }

    expect(async () => {
      await loadTotalBanksService.execute(params)
    }).rejects.toThrow(InvalidParams)
  })

  it('when call with userId invalid, return zero', async () => {
    const loadTotalBanksService = new LoadTotalBanks(prisma)
    const params = {
      userId: 'invalid_id'
    }
    const result = await loadTotalBanksService.execute(params)

    expect(result).toEqual(new Decimal(0))
  })



  it('when call with userId valid, return number', async () => {
    const loadTotalBanksService = new LoadTotalBanks(prisma)
    const params = {
      userId: 'valid_id'
    }
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
    const result = await loadTotalBanksService.execute(params)

    expect(result).toEqual(new Decimal(300))
  })
})
