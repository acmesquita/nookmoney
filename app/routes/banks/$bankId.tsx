import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/config/database/db.server";
import { getUserId } from "~/config/session/session.server";
import { Bank } from "~/pages/banks/bankId";
import { FindBanks } from "~/services/banks";

import banksShowStyles from '~/styles/pages/banks.show.css';

export const loader: LoaderFunction = async ({ params, request }) => {
  const userId = await getUserId(request) || ''
  const bank = await new FindBanks(db).execute({ id: params.bankId, userId})

  return bank
}


export function links() {
  return [
    {
      rel: "stylesheet",
      href: banksShowStyles,
    },
  ]
}

export default function BankPage() {
  const bank = useLoaderData()

  return <Bank bank={bank}/>
}