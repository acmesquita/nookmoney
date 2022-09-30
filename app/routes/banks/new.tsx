import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "remix-domains";
import { formAction } from "remix-forms";
import { z } from "zod";
import { db } from "~/config/database/db.server";
import { getUserId } from "~/config/session/session.server";
import { NewBank } from "~/pages/banks/new";
import { CreateBank } from "~/services/banks/create";
import banksNewStyles from '~/styles/pages/banks.new.css';

const schema = z.object({
  name: z.string().min(3),
  category: z.string(),
  userId: z.string()
})

const mutation = makeDomainFunction(schema)(async (data) => {
  const bank = await new CreateBank(db).execute(data)

  return bank
})

export const action: ActionFunction = async ({ request }) => {
  return await formAction({ request, schema, mutation, successPath: '/banks' })
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  return userId  
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: banksNewStyles,
    },
  ]
}

export default function NewBankPage() {

  const userId = useLoaderData()

  return <NewBank schema={schema} userId={userId}/>
}