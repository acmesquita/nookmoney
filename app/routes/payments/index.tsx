import type { Payment } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/config/database/db.server";
import { Payments } from "~/pages/payments";
import { LoadPayments } from "~/services/payments/load";
import paymentsStyles from '../../styles/pages/payments.css';

type InfoProps = {
  avg: {
    period: string
    amount: number
  },
  summary: {
    month: string
    total: number
    paid: number
    owing: number
  }
}

type LoaderDataProps = {
	payments: Payment[] | null
	infos: InfoProps
}


export function links() {
  return [
    {
      rel: "stylesheet",
      href: paymentsStyles,
    },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {

  const monthValue = new Date().getMonth() + 1
  const currentMonth = `${new Date().getFullYear()}-${monthValue.toString().padStart(2, '0')}`
  const month = request.url.split('?')[1]?.split('=')[1].replace('%2F', '-') || currentMonth
  
  const payments = await new LoadPayments(db).execute({ month: `${month}-01` }) as Payment[]
  const total = payments?.map(pay => pay.amount).reduce((p1, p2) => Number(p1) + Number(p2), 0) || 0
  const paid =  payments?.filter(pay => pay.paid).map(pay => pay.amount).reduce((p1, p2) => Number(p1) + Number(p2), 0) || 0
  const owing =  payments?.filter(pay => !pay.paid).map(pay => pay.amount).reduce((p1, p2) => Number(p1) + Number(p2), 0) || 0
  const avg = 0

  const infos = {
    avg: {
      period: '',
      amount: avg
    },
    summary: {
      month,
      total,
      paid,
      owing
    }
  }

  return {payments, infos}
}

export default function PaymentsPage() {
  const {payments, infos} = useLoaderData<LoaderDataProps>()

  return (
    <Payments
      payments={payments as unknown as Payment[]}
      infos={infos as unknown as InfoProps}
    />
  )
}