import { GoalRange } from "~/components/goal_range";
import { MainWithHeader } from "~/components/page_header";

type Props = {
	goal?: {
		describe: string
		percent: number
		amount: number
	}
}

export function Objective({ goal }: Props) {
	return (
		<MainWithHeader
			title="Objective"
			actions={[
				{ to: 'new', className: 'btn btn-primary', title: 'New Objective' }
			]}
		>
			<div className="container">
				<div className="card">
					<img src="/assets/goals.jpg" alt="goals" />
					{goal ? (
						<>
							<h2 className="title">{goal.describe}</h2>
							<GoalRange value={goal.percent} endValue={goal.amount} />
						</>
					) : (
						<h2 className="title">Create a new objective</h2>
					)}

				</div>
			</div>
		</MainWithHeader>
	)
} 