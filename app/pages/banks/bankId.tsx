import type { Bank as BankType, Balance } from "@prisma/client";
import { MainWithHeader } from "~/components/page_header";
import { formateDate } from "~/utils/pages/format_date";
import { formatMoney } from "~/utils/pages/format_money";

type BankWithBalance = BankType & {
  balances: Balance[]
}

type Props = {
  bank: BankWithBalance
}

export function Bank({ bank }: Props) {
  return (
    <MainWithHeader
      title={bank.name}
      actions={[
        {to: '/banks', className: 'btn btn-secundary', title: 'Back'},
        {to: 'delete', className: 'btn btn-secundary btn-danger', title: 'Deletar'},
        {to: 'edit', className: 'btn btn-primary', title: 'Editar'}
      ]}
    >
			<div className="summary">
				<div className="card">
					<h3>Total Amount</h3>
					<p>{formatMoney(Number(bank.amount))}</p>
				</div>
			</div>
			<hr />
      <h2 className="subtitle">Balances</h2><small><i>(last 10 itens)</i></small>
      <table>
				<thead>
					<th>Date</th>
					<th>Amount</th>
				</thead>
				<tbody>
          {bank.balances.map( balance => (
            <tr key={balance.id}>
              <td>{formateDate(balance.createdAt)}</td>
              <td>{formatMoney(Number(balance.amount))}</td>
            </tr>
          ))}
				</tbody>
			</table>
    </MainWithHeader>
  )
}