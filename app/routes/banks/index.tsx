import type { LoaderFunction } from "@remix-run/node";
import type { DataProps } from "~/pages/banks";
import { Banks } from "~/pages/banks";
import banksStyles from '~/styles/pages/banks.css';
import { FindBanks } from "~/services/banks";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/config/database/db.server";
import type { Bank } from "@prisma/client";
import { getUserId } from "~/config/session/session.server";
import { LoadTotalBanks } from "~/services/banks/load_total";
import { LoadTotalDiffBanksAmount } from "~/services/banks/load_total_diff";

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
  const total_amount = await new LoadTotalBanks(db).execute({ userId })
  const total_diff_amount = await new LoadTotalDiffBanksAmount(db).execute({ userId })
  
  const data = {
    total_amount,
    banks,
    total_diff_amount
  }

  return data
}

export default function BanksPage() {
  const data = useLoaderData<LoaderData>()

  return <Banks data={data as unknown as DataProps}/>
}