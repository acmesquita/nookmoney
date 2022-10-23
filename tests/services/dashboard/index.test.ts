import { Decimal } from "@prisma/client/runtime"
import { InvalidParams } from "~/errors/invalid-params.error"
import { getInfoToDashboard } from "~/services/dashboard"

describe('getInfoToDashboard', () => {
  it('when call without userId, throws InvalidParams error', () => {
    expect(getInfoToDashboard).rejects.toThrow(InvalidParams)
  })

  describe('when call with userId valid', () => {

    it('result contains summary with wallet, payment and objetive resume', async () => {
      const result = await getInfoToDashboard('valid_id')

      expect(result).toEqual({
        summary: {
          walet: {
            updateAt: "18/09/2022",
            amount: new Decimal(0)
          },
          payments: {
            currentMonth: '',
            amount: 0
          },
          objetive: {
            amount: 0,
            percentComplited: 0
          }
        },
        "pendencies": [
          {
            "complited": true,
            "describe": "Create objective"
          },
          {
            "complited": false,
            "describe": "Update bank balances"
          },
          {
            "complited": false,
            "describe": "Outstanding payments"
          }
        ]
      })
    })
  })
})