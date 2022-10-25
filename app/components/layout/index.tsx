import { Outlet } from "@remix-run/react";
import { Header } from "~/components/header";
import { Sidebar } from "~/components/sidebar";

type Props = {
  name: string
	isAuthPath: boolean
}

export const Layout = ({ name, isAuthPath }: Props) => {
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