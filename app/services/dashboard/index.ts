import { db } from '~/config/database/db.server'
import { LoadTotalBanks } from '../banks/loadTotal'
import { LoadGoal } from '../objective/load'
import { LoadPayments } from '../payments/load'

export const getInfoToDashboard = async (userId: string) => {
  const goal = await new LoadGoal(db).execute({ userId })
  const totalValueBank = await new LoadTotalBanks(db).execute()
  const percent = (Number(totalValueBank) / Number(goal?.amount)) * 100
  const payments = await new LoadPayments(db).execute({ userId }) as { currentMonth: string, amount: number }

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
        amount: goal?.amount,
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
