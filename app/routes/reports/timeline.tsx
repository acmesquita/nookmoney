import type { LoaderFunction } from "@remix-run/node";
import { db } from "~/config/database/db.server";
import { getUserId } from "~/config/session/session.server";
import reportsStyles from '../../styles/pages/reports.css';
import { TimelineReports } from "~/pages/reports/timeline";
import { Timeline } from "~/services/reports/timeline";
import { useLoaderData } from "@remix-run/react";

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
  const result = await new Timeline(db).execute({ userId }) as Array<{name: string, month_bank: string, amount: number}>

  const resume = {} as { [item: string]: Array<{ bank: string, amount: number }>}

  result.forEach(item => {
    if (Array.isArray(resume[item.month_bank])) {
      resume[item.month_bank].push({ bank: item.name, amount: item.amount })
    } else {
      resume[item.month_bank] = [{ bank: item.name, amount: item.amount }]
    }
  })

  return {
    resume
  }
}

export default function EvolutionBalancesReportsPage() {
  const { resume } = useLoaderData() as { resume: { [item: string]: Array<{ bank: string, amount: number }>}}

  return <TimelineReports resume={resume}/>
}