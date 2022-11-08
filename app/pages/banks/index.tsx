/* eslint-disable react/jsx-key */
import type { Bank } from "@prisma/client";
import { Link } from "@remix-run/react";
import { MainWithHeader } from "~/components/page_header";
import type { Kind } from "~/utils/pages/banks/parse_category";
import { parseCategory } from "~/utils/pages/banks/parse_category";
import { formatMoney } from "~/utils/pages/format_money";

type BankShow = Bank & {
	category: Kind
}

export type DataProps = {
	total_amount: number,
	total_diff_amount: number,
	banks: BankShow[]
}

type Props = {
	data: DataProps
}

export function Banks({ data }: Props) {
	return (
		<MainWithHeader title="Bank" actions={[
			{ to: 'new', className: "btn btn-secundary", title: 'New Bank' },
			{ to: 'update_amount', className: "btn btn-primary", title: 'Update Amounts' }
		]}>
			<div className="summary">
				<div className="card">
					<h3>Total</h3>
					<p>{formatMoney(Number(data.total_amount))}</p>
				</div>
				<div className="card">
					<h3>Evolution</h3>
					<p>{formatMoney(Number(data.total_diff_amount))}</p>
				</div>
			</div>
			<hr />
			<table>
				<thead>
					<th>Bank Name</th>
					<th>Category</th>
					<th>Amount</th>
				</thead>
				<tbody>
					{data?.banks.map(bank => (
						<tr key={bank.id}>
							<td><Link to={`${bank.id}`}>{bank.name}</Link></td>
							<td>{parseCategory(bank.category)}</td>
							<td>{formatMoney(Number(bank.amount))}</td>
						</tr>
					))}
				</tbody>
			</table>
		</MainWithHeader>
	)
}