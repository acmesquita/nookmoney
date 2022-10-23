import { db } from '~/config/database/db.server'
import { InvalidParams } from '~/errors/invalid-params.error'
import { LoadTotalBanks } from '../banks/load_total'
import { LoadGoal } from '../objective/load'
import { LoadPayments } from '../payments/load'

export const getInfoToDashboard = async (userId: string) => {
  if (!userId) {
    throw new InvalidParams()
  }

  const goal = await new LoadGoal(db).execute({ userId })
  const totalValueBank = await new LoadTotalBanks(db).execute({ userId })
  const payments = await new LoadPayments(db).execute({ userId }) as { currentMonth: string, amount: number }

  const percent = Math.floor((Number(totalValueBank) / Number(goal?.amount)) * 100) || 0

  return {
    summary: {
      walet: {
        updateAt: "18/09/2022",
        amount: totalValueBank
      },
      payments: {
        currentMonth: payments?.currentMonth,
        amount: payments?.amount
      },
      objetive: {
        amount: goal?.amount || 0,
        percentComplited: percent
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
  }
}
