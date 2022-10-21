
import prisma from "~tests/config/client"
import { InvalidParams } from "~/errors/invalid-params.error"
import { CreateUser } from "~/services/user/create"
import { getError, NoErrorThrownError } from "~tests/config/utils"

describe('Create User', () => {
  it('when call without params, returns throw InvalidParams Error', async () => {
    const createUserService = new CreateUser(prisma)
    const params = {
      name: '',
      username: '',
      password: ''
    }

    const error = await getError(async () => {
      await createUserService.execute(params)
    })

    expect(error).not.toBeInstanceOf(NoErrorThrownError)
    expect(error).toBeInstanceOf(InvalidParams)
  })
})

export { }