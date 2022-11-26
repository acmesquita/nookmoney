import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/config/database/db.server";
import { getUserId } from "~/config/session/session.server";
import { EvolutionBalancesReports } from "~/pages/reports/evolution_balances";
import { EvolutionBalances } from "~/services/reports/evolution_balances";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request) || ''
  const balances = await new EvolutionBalances(db).execute({ userId })

  return {
    balances
  }
}

export default function EvolutionBalancesReportsPage() {
  const { balances } = useLoaderData()

  return <EvolutionBalancesReports balances={balances}/>
}