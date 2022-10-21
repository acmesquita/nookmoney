import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { formAction } from "remix-forms";
import { z } from "zod";
import { db } from "~/config/database/db.server";
import { getUserId } from "~/config/session/session.server";
import { NewPayment } from "~/pages/payments/new";
import { CreatePayment } from "~/services/payments/create";
import paymentsNewStyles from '~/styles/pages/payments.new.css';

const schema = z.object({
  description: z.string().min(3),
  category: z.string(),
  currentMonth: z.string(),
  userId: z.string(),
  dueDate: z.date(),
  amount: z.number()
})

const mutation = makeDomainFunction(schema)(async (data) => {
  const dateSplit = data.currentMonth.split('-')
  const currentMonth = `${dateSplit[1]}-${dateSplit[0]}-01`
  const payment = new CreatePayment(db).execute({
    amount: Number(data.amount),
    currentMonth,
    category: data.category,
    description: data.description,
    dueDate: data.dueDate,
    userId: data.userId
  })
  return payment
})

export const action: ActionFunction = async ({ request }) => {
  return await formAction({ request, schema, mutation, successPath: '/payments' })
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  return userId
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: paymentsNewStyles,
    },
  ]
}


export default function NewPaymentPage() {
  const userId = useLoaderData()

  return (<NewPayment schema={schema} userId={userId} />)
}