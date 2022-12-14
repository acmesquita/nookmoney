import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { formAction } from "remix-forms";
import { z } from "zod";
import { db } from "~/config/database/db.server";
import { getUserId } from "~/config/session/session.server";
import { NewObjective } from "~/pages/objective/new";
import { CreateGoal } from "~/services/objective/create";
import objeciveNewStyles from '~/styles/pages/objective.new.css';

const schema = z.object({
  describe: z.string().min(3),
  amount: z.number().min(0),
  userId: z.string()
})

const mutation = makeDomainFunction(schema)(async (data) => {
  const goal = await new CreateGoal(db).execute(data)

  return goal
})

export const action: ActionFunction = async ({ request }) => {
  return await formAction({ request, schema, mutation, successPath: '/objective' })
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  return userId
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: objeciveNewStyles,
    },
  ]
}

export default function NewObjectPage() {
  const userId = useLoaderData()
  return <NewObjective schema={schema} userId={userId} />
}