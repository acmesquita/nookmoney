import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { MainWithHeader } from '~/components/page_header';

type Props = {
	data: {
		summary: {
			walet: {
				updateAt: string,
				amount: string
			},
			payments: {
				currentMonth: string,
				amount: string
			},
			objetive: {
				amount: string,
				percentComplited: string
			}
		},
		pendencies: Array<{
			complited: boolean,
			describe: string
		}>
	}
}

export function Dashboard({ data }: Props) {
	return (
		<MainWithHeader title="Dashboard">
			<div className="summary">
				<div className="card">
					<h3>Walet <small><i>(total sice {data.summary.walet.updateAt})</i></small></h3>
					<p>R$ {data.summary.walet.amount}</p>
				</div>
				<div className="card">
					<h3>Payments <small><i>(current month {data.summary.payments.currentMonth})</i></small></h3>
					<p>R$ {data.summary.payments.amount}</p>
				</div>
				<div className="card">
					<h3>Objective</h3>
					<p>R$ {data.summary.objetive.amount} - <small>{data.summary.objetive.percentComplited}% concluído</small></p>
				</div>
			</div>
			<hr />
			<h2 className="subtitle">Pendencies</h2>

			<ul className="pendencies">
				{data.pendencies.map(item => (
					<li className="pendencie-item" key={item.describe}>
						{item.complited ? <BsCheckCircleFill color='green' /> : <BsCircle />}
						{item.describe}
					</li>
				))}
			</ul>
		</MainWithHeader>
	)
} 