import type { PrismaClient } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'
import { InvalidParams } from '~/errors/invalid-params.error'
import { formateDate } from '~/utils/pages/format_date'
import { LoadTotalBanks } from '../banks/load_total'
import { LoadGoal } from '../objective/load'
import { LoadPayments } from '../payments/load'

export const getInfoToDashboard = async (userId: string, db: PrismaClient) => {
  if (!userId) {
    throw new InvalidParams()
  }

  const goal = await new LoadGoal(db).execute({ userId })
  const totalValueBank = await new LoadTotalBanks(db).execute({ userId })
  const payments = await new LoadPayments(db).execute({ userId }) as { currentMonth: string, amount: number }

  const percent = Math.floor((Number(totalValueBank) / Number(goal?.amount)) * 100) || 0
  const updateAtWalet = await getLastUpdateWalet(db)

  return {
    summary: {
      walet: {
        updateAt: updateAtWalet,
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

async function getLastUpdateWalet(db: PrismaClient) {
  const result = await db.balance.aggregate({
    _max: {
      createdAt: true
    }
  })

  return result._max.createdAt ? formateDate(result._max.createdAt) : ''
}
