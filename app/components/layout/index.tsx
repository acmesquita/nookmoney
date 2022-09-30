import { Outlet, useMatches } from "@remix-run/react";
import { Header } from "~/components/header";
import headerStyles from '~/components/header/styles.css';
import { Sidebar } from "~/components/sidebar";
import sidebarStyles from '~/components/sidebar/styles.css';
import layoutStyles from './styles.css'

export const layoutLinksStyles = [
	{
		rel: "stylesheet",
		href: headerStyles,
	},
	{
		rel: "stylesheet",
		href: sidebarStyles,
	},
	{
		rel: "stylesheet",
		href: layoutStyles,
	},
];

type Props = {
  name: string
}

export const Layout = ({ name }: Props) => {
	const matches = useMatches();

	const isAuthPath = matches[1].id.includes('auth')

	if(isAuthPath) {
		return <Outlet />
	}
	
	return (
		<>
			<Header name={name} />
			<div className="container">
				<Sidebar />
				<Outlet />
			</div>
		</>
	)
}