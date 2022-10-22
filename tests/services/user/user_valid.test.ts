import bcrypt from "bcryptjs";
import { InvalidParams } from "~/errors/invalid-params.error"
import { UserValidToLogin } from "~/services/user/user_valid"
import prisma from "~tests/config/client"
import { prismaMock } from "~tests/config/singleton"

describe('User Valid To Login', () => {
  it('when call without params, return InvalidParams error', async () => {
    const userValidToLoginService = new UserValidToLogin(prisma)
    const params = {
      username: '',
      password: ''
    }

    expect(async () => {
      await userValidToLoginService.execute(params)
    }).rejects.toThrow(InvalidParams)
  })

  it('when call invalid username, return null', async () => {
    const userValidToLoginService = new UserValidToLogin(prisma)
    const params = {
      username: 'fulano',
      password: '12345'
    }

    const result = await userValidToLoginService.execute(params)
    expect(result).toBeNull()
  })

  it('when call invalid password, return null', async () => {
    const userValidToLoginService = new UserValidToLogin(prisma)
    const params = {
      username: 'fulano',
      password: '12345'
    }
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      goalId: '',
      passwordHash: '123456',
      name: 'Fulano',
      username: 'fulano',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const result = await userValidToLoginService.execute(params)
    expect(result).toBeNull()
  })

  it('when call with valid params, return User valid', async () => {
    const userValidToLoginService = new UserValidToLogin(prisma)
    const params = {
      username: 'fulano',
      password: '123456'
    }
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      goalId: '',
      passwordHash: await bcrypt.hash('123456', 10),
      name: 'Fulano',
      username: 'fulano',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const result = await userValidToLoginService.execute(params)
    expect(result?.id).toBe('1')
  })
})
