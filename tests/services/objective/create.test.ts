import { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { CreateGoal } from "~/services/objective/create"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('Create Objective', () => {
  it('when call with param invalid, returns InvalidParams error', async () => {
    const createObejectiveService = new CreateGoal(prisma)
    const params = {
      describe: '',
      amount: 0,
      userId: '',
    }

    expect(async () => {
      await createObejectiveService.execute(params)
    }).rejects.toThrow(InvalidParams)
  })

  it('when call with param valid, returns new Goal', async () => {
    const createObejectiveService = new CreateGoal(prisma)
    const params = {
      describe: 'Aposentadoria',
      amount: 1100,
      userId: '1',
    }

    prismaMock.goal.create.mockResolvedValue({
      id: 'valid_id',
      amount: new Decimal(1100),
      describe: 'Aposentadoria',
      userId: '1',
    })

    const result = await createObejectiveService.execute(params)

    expect(result?.id).toBe('valid_id')
  })
})

export { }