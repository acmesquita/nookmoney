import type { Balance } from "@prisma/client";
import { MainWithHeader } from "~/components/page_header";
import { formatMoney } from "~/utils/pages/format_money";

type Props = {
  balances: Balance[]
}
export function EvolutionBalancesReports({ balances }: Props) {
  return (
    <MainWithHeader title="Evolution Balances">
      <table>
        <thead>
          <th>Date</th>
          <th>Amount</th>
          <th>Evolutuion</th>
        </thead>
        <tbody>
          {balances?.map((balance, index) => (
            <tr key={balance.createdAt.toString()}>
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