import { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { LoadGoal } from "~/services/objective/load"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('Load Goal', () => {
  it('when call without userId, return InvalidParams', () => {
    const loadGoalService = new LoadGoal(prisma)

    expect(async () => {
      await loadGoalService.execute({ userId: '' })
    }).rejects.toThrow(InvalidParams)
  })

  it('when call with userId, return goal to user', async () => {
    const loadGoalService = new LoadGoal(prisma)
    prismaMock.goal.findFirst.mockResolvedValue({
      id: 'valid_id',
      amount: new Decimal(1100),
      describe: 'Aposentadoria',
      userId: '1',
    })

    const result = await loadGoalService.execute({ userId: '1' })

    expect(result?.id).toBe('valid_id')
  })
})

export { }