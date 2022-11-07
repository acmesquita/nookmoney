import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/config/database/db.server";
import { getUserId } from "~/config/session/session.server";
import { Objective } from "~/pages/objective";
import { LoadTotalBanks } from "~/services/banks/loadTotal";
import { LoadGoal } from "~/services/objective/load";
import objeciveStyles from '~/styles/pages/objective.css';

export function links() {
  return [
    {
      rel: "stylesheet",
      href: objeciveStyles,
    },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request) || ""
  const goal = await new LoadGoal(db).execute({ userId })

  if (!goal) {
    return null
  }

  const totalValueBank = await new LoadTotalBanks(db).execute({ userId })
  const percent = Math.floor((Number(totalValueBank) / Number(goal.amount)) * 100)

  return {
    ...goal,
    percent
  }
}

export default function ObjectivePage() {
  const goal = useLoaderData()

  return <Objective goal={goal}/>
}