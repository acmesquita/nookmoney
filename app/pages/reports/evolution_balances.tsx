import type { Balance } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime";
import { MainWithHeader } from "~/components/page_header";
import { formatMonth } from "~/utils/pages/format_date";
import { formatMoney } from "~/utils/pages/format_money";

type Props = {
  balances: Balance[]
}

type BalancesByMonth = {
  month: string;
  amount: Decimal;
  createdAt: Date;
}[]

function getDiffByBalancesToMonth(month: string, balances: BalancesByMonth): number {
  const balancesCurrentMonth = balances.filter(balance => balance.month === month)
  const firstAmountToMonth = Number(balancesCurrentMonth[balancesCurrentMonth.length - 1]?.amount || 0)
  const lastAmountToMonth = Number(balancesCurrentMonth[0]?.amount)
  return (lastAmountToMonth - firstAmountToMonth) || 0
}

function generateMonths(quant: number) {
  const months = []
  const today = new Date()
  for (let index = 0; index <= quant; index++) {
    const month = formatMonth(today)
    months.push(month)
    today.setDate(today.getDate() - 30)
  }
  return months
}

export function EvolutionBalancesReports({ balances }: Props) {

  const balancesByMonth = balances.map(balance => {
    const created = balance.createdAt.toString().split('/')
    return {
      month: `${created[1]}/${created[2]}`,
      amount: balance.amount,
      createdAt: balance.createdAt
    }
  })

  const [currentMonth, lastOneMonth, lastTwoMonth] = generateMonths(2)

  const diffToLastTwoMonth = getDiffByBalancesToMonth(lastTwoMonth, balancesByMonth)
  const diffToLestOneMonth = getDiffByBalancesToMonth(lastOneMonth, balancesByMonth)
  const diffToCurrentMonth = getDiffByBalancesToMonth(currentMonth, balancesByMonth)
  const avgAmount = (diffToCurrentMonth + diffToLestOneMonth + diffToLastTwoMonth) / 3

  return (
    <MainWithHeader title="Evolution Balances">
      <div className="summary">
        <div className="card">
          <h3>Média <small>last 3 months</small></h3>
          <p>{formatMoney(avgAmount)}</p>
        </div>
        <div className="card">
          <h3>{lastTwoMonth} <small>last 2 month</small></h3>
          <p>{formatMoney(diffToLastTwoMonth)}</p>
        </div>
        <div className="card">
          <h3>{lastOneMonth} <small>last month</small></h3>
          <p>{formatMoney(diffToLestOneMonth)}</p>
        </div>
        <div className="card">
          <h3>{currentMonth} <small>current month</small></h3>
          <p>{formatMoney(diffToCurrentMonth)}</p>
        </div>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Evolutuion</th>
          </tr>
        </thead>
        <tbody>
          {balancesByMonth?.map((balance, index) => (
            <tr key={index}>
              <td>{balance.month}</td>
              <td>{balance.createdAt.toString()}</td>
              <td>{formatMoney(Number(balance.amount))}</td>
              <td>{formatMoney((Number(balance.amount) - Number(balances[index + 1]?.amount)) || 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainWithHeader>
  )
} 