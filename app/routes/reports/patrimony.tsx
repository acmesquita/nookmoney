import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/config/database/db.server";
import { getUserId } from "~/config/session/session.server";
import { PatrimonyReports } from "~/pages/reports/patrimony";
import { FindBanks } from "~/services/banks";

import reportsStyles from '../../styles/pages/reports.css';

export function links() {
  return [
    {
      rel: "stylesheet",
      href: reportsStyles,
    },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request) || ''
  const banks = await new FindBanks(db).execute({ userId })

  return {
    banks
  }
}

export default function PatrimonyPage() {
  const { banks } = useLoaderData()
  return <PatrimonyReports banks={banks}/>
}