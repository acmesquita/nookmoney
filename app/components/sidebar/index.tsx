import { Link, useLocation } from "@remix-run/react";
import { BiBarChart } from 'react-icons/bi';
import { BsBank, BsWallet2 } from 'react-icons/bs';
import { TbReportMoney } from 'react-icons/tb';
import { BiTargetLock } from 'react-icons/bi';
import clsx from 'clsx'

export const Sidebar = ({ open }: { open: boolean }) => {

  const { pathname } = useLocation();

  return (
    <aside
      className={clsx({
        "menu-bar": true,
        "show": open
      })}
      data-testid="sidebar"
    >
      <nav className="menu-wrapper">
        <Link
          className={`menu-item ${pathname == '/' ? 'active' : ''}`}
          to="/"
        >
          <BiBarChart size={20} /> Dashboard
        </Link>
        <Link
          className={`menu-item ${pathname.includes('/banks') ? 'active' : ''}`}
          to="/banks"
        >
          <BsBank size={20} /> Banks
        </Link>
        <Link
          className={`menu-item ${pathname.includes('/payments') ? 'active' : ''}`}
          to="/payments"
        >
          <BsWallet2 size={20} /> Payments
        </Link>
        <Link
          className={`menu-item ${pathname.includes('/objective') ? 'active' : ''}`}
          to="/objective"
        >
          <BiTargetLock size={20} /> Objective
        </Link>
        <Link
          className={`menu-item ${pathname.includes('/reports') ? 'active' : ''}`}
          to="/reports"
        >
          <TbReportMoney size={20} /> Reports
        </Link>
      </nav>
      <footer className="footer">
        Catharina Mesquita © 2022
      </footer>
    </aside>
  )
}