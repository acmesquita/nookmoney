import type {
  ActionFunction,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { db } from "~/config/database/db.server";
import { PayPayments } from "~/services/payments/pay";


export const action: ActionFunction = async ({ params }) => {
  if (params.paymentId) {
    await new PayPayments(db).execute({ id: params.paymentId })
  }
  return redirect("/payments");
};

export const loader: LoaderFunction = async () => {
  return redirect("/payments");
};