import type { LoaderFunction } from "@remix-run/node";
import type { DataProps } from "~/pages/banks";
import { Banks } from "~/pages/banks";
import banksStyles from '~/styles/pages/banks.css';
import { FindBanks } from "~/services/banks";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/config/database/db.server";
import type { Bank } from "@prisma/client";
import { getUserId } from "~/config/session/session.server";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: banksStyles,
    },
  ]
}

type LoaderData = {
  total_amount: number,
  banks: Bank[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request) || ''
  const banks = await new FindBanks(db).execute({ userId })
  const sumAmounts = (b1: any, b2: any) => Number(b1) + Number(b2)
  const total_amount = banks instanceof Array ? banks.map(b => b.amount).reduce(sumAmounts, 0) : 0
  
  const data = {
    total_amount,
    banks
  }

  return data
}

export default function BanksPage() {
  const data = useLoaderData<LoaderData>()

  return <Banks data={data as unknown as DataProps}/>
}