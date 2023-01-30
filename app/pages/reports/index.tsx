import { MainWithHeader } from "~/components/page_header";

export function Reports() {
	return (
		<MainWithHeader title="Reports">
			<ul>
				<li><a href="/reports/evolution_balances">Evolution Balances</a></li>
				<li><a href="/reports/patrimony">Patrimony</a></li>
			</ul>
		</MainWithHeader>
	)
} 