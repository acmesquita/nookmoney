import type { Payment } from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import { MainWithHeader } from "~/components/page_header";
import { formateDate, formatMonth } from "~/utils/pages/format_date";
import { formatMoney } from "~/utils/pages/format_money";
import type { Kind } from "~/utils/pages/payments/parseCategory";
import { parseCategory } from "~/utils/pages/payments/parseCategory";

type Props = {
	payments: Payment[] | null
	infos: {
		avg: {
			period: string
			amount: number
		},
		summary: {
			month: string
			total: number
			paid: number
			owing: number
		}
	}
}

export function Payments({ payments, infos }: Props) {
	const navigate = useNavigate()
	const monthValue = new Date().getMonth() + 1
	const currentMonth = `${new Date().getFullYear()}-${monthValue.toString().padStart(2, '0')}`
	function handle(date: Date) {
		const monthValue = date.getMonth() + 1
		const month = `${date.getFullYear()}-${monthValue.toString().padStart(2, '0')}`
		navigate(`/payments?month=${month}`, { state: { month } })
	}

	return (
		<MainWithHeader
			title="Payments"
			actions={[
				{ to: '', className: '', title: currentMonth, handle },
				{ to: 'new', className: "btn btn-primary", title: 'New Payment' },
			]}
		>
			<div className="summary">
				<div className="card">
					<div>
						<h3>Média</h3>
						<small>{infos.avg.period}</small>
					</div>
					<p>{formatMoney(infos.avg.amount)}</p>
				</div>
				<div className="card">
					<div>
						<h3>Summary</h3>
						<small>{formatMonth(new Date(`${infos.summary.month}-01T03:00:00`))}</small>
					</div>
					<div className="values">
						<p className="default">{formatMoney(infos.summary.total)} <small>(total)</small></p>
						<p className="green">{formatMoney(infos.summary.paid)} <small>(paid)</small></p>
						<p className="red">{formatMoney(infos.summary.owing)} <small>(owing)</small></p>
					</div>
				</div>
			</div>
			<hr />
			<table>
				<thead>
					<th>Category</th>
					<th>Description</th>
					<th>Due date</th>
					<th>Amount</th>
					<th>Actions</th>
				</thead>
				<tbody>
					{payments?.map(payment => (
						<tr key={payment.id}>
							<td>{parseCategory(payment.category as Kind)}</td>
							<td>{payment.description}</td>
							<td>{formateDate(payment.dueDate)}</td>
							<td>{formatMoney(Number(payment.amount))}</td>
							<td className="actions">
								<form action={`${payment.id}/edit`} method="post">
									<button type="submit" className="btn btn-secundary">
									Edit
									</button>
								</form>
								{payment.paid ? (
									<form>
										<button disabled className="btn btn-disbled" type="submit">Paid</button>
									</form>
								) : (
									<form action={`/payments/${payment.id}/pay`} method="post">
										<button type="submit" className="btn btn-secundary">
											Pay
										</button>
									</form>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</MainWithHeader >
	)
} 