import { LoadUser } from "~/services/user/load"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('Load User', () => {
  it('when call without params, returns null', async () => {
    const loadUserService = new LoadUser(prisma)

    const result = await loadUserService.execute({})

    expect(result).toBeNull()
  })

  it('when call with userId invalid, returns null', async () => {
    const loadUserService = new LoadUser(prisma)

    const result = await loadUserService.execute({ userId: '1'})

    expect(result).toBeFalsy()
  })

  it('when call with username invalid, returns null', async () => {
    const loadUserService = new LoadUser(prisma)

    const result = await loadUserService.execute({ username: 'fulano'})

    expect(result).toBeFalsy()
  })

  it('when call with userId valid, returns User', async () => {

    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      goalId: '',
      passwordHash: '123456',
      name: 'Fulano',
      username: 'fulano',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const loadUserService = new LoadUser(prisma)

    const result = await loadUserService.execute({ userId: '1'})

    expect(result?.id).toBe('1')
  })
  it('when call with username valid, returns User', async () => {

    prismaMock.user.findFirst.mockResolvedValue({
      id: '1',
      goalId: '',
      passwordHash: '123456',
      name: 'Fulano',
      username: 'fulano',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const loadUserService = new LoadUser(prisma)

    const result = await loadUserService.execute({ username: 'fulano'})

    expect(result?.id).toBe('1')
  })
})

export {}