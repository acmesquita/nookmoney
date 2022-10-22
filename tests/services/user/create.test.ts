
import prisma from "~tests/config/client"
import { InvalidParams } from "~/errors/invalid-params.error"
import { CreateUser } from "~/services/user/create"
import { prismaMock } from "~tests/config/singleton"

describe('Create User', () => {
  it('when call without params, returns throw InvalidParams Error', async () => {
    const createUserService = new CreateUser(prisma)
    const params = {
      name: '',
      username: '',
      password: ''
    }

    expect(async () => {
      await createUserService.execute(params)
    }).rejects.toThrow(InvalidParams)
  })

  it('when call with correctly params, returns a new User', async () => {
    const createUserService = new CreateUser(prisma)
    const params = {
      name: 'Fulano',
      username: 'fulano',
      password: '123456'
    }

    prismaMock.user.create.mockResolvedValue({
      id: '1',
      goalId: '',
      passwordHash: '123456',
      name: 'Fulano',
      username: 'fulano',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const result = await createUserService.execute(params)

    expect(result?.id).toBe('1')
  })
})

