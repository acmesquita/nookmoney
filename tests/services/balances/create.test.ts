import { CreateBalance } from '~/services/balances/create'
import prisma from '~tests/config/client'
import { prismaMock } from '~tests/config/singleton'

describe('Create Balances', () => {
  it('when call with invalid params, returns false', async () => {
    const createBalancesService = new CreateBalance(prisma)

    const result = await createBalancesService.execute({ banks: [] })
    prismaMock.$transaction.mockResolvedValue([])

    expect(result).toBeFalsy()
  })

  it('when call with valid params, returns true', async () => {
    const createBalancesService = new CreateBalance(prisma)
    const params = {
      banks: [
        {
          id: '1',
          amount: 100
        }
      ]
    }
    prismaMock.$transaction.mockResolvedValue([...params.banks])

    const result = await createBalancesService.execute(params)

    expect(result).toBeTruthy()
  })
})

export { }
