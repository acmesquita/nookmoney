import { Outlet } from "@remix-run/react";
import { useState } from "react";
import { Header } from "~/components/header";
import { Sidebar } from "~/components/sidebar";

type Props = {
  name: string
	isAuthPath: boolean
}

export const Layout = ({ name, isAuthPath }: Props) => {
	const [open, setOpen] = useState(false)
	
	if(isAuthPath) {
		return <Outlet />
	}
	
	return (
		<>
			<Header name={name} openSidebar={() => setOpen(old => !old)} />
			<div className="container">
				<Sidebar open={open} />
				<Outlet />
			</div>
		</>
	)
}