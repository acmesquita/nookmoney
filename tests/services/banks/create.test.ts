import type { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { CreateBank } from "~/services/banks/create"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('Create Bank', () => {
  it('when call without params, return InvalidParams', () => {
    const createBankService = new CreateBank(prisma)
    const params = {
      name: '',
      category: '',
      userId: ''
    }

    expect(async () => {
      await createBankService.execute(params)
    }).rejects.toThrow(InvalidParams)
  })


  it('when call with valid params, return new Bank', async () => {
    const createBankService = new CreateBank(prisma)
    const params = {
      name: 'Banco XPTO',
      category: 'Investimento',
      userId: '1'
    }

    prismaMock.bank.create.mockResolvedValueOnce({
      id: '1',
      name: 'Banco XPTO',
      category: 'Investimento',
      amount: 0 as unknown as Decimal,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
    })

    const result = await createBankService.execute(params)

    expect(result?.id).toBe('1')
  })
})

export { }