import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/config/database/db.server";
import { UpdateAmount } from "~/pages/banks/update_amount";
import { CreateBalance } from "~/services/balances/create";
import { FindBanks } from "~/services/banks";
import banksUpdateStyles from "~/styles/pages/banks.update.css";

type Bank = {
  id: string,
  amount: number
}

export const loader: LoaderFunction = async () => {
  const banks = await new FindBanks(db).execute({})

  return banks
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const banks = createBanks(formData)

  await new CreateBalance(db).execute({ banks })

  return redirect('/banks')
}

function createBanks(formData: FormData): Bank[] {
  const object = Object.fromEntries(formData);
  const objValues = Object.values(object)
  const banks: Array<Bank> = [];

  for (let index = 0; index < objValues.length; index++) {
    const id = String(objValues[index])
    const amount = Number(objValues[++index])
    banks.push({
      id,
      amount
    })
  }

  return banks
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: banksUpdateStyles,
    },
  ]
}

export default function UpdateAmountPage() {
  const banks = useLoaderData()
  return <UpdateAmount banks={banks} />
}