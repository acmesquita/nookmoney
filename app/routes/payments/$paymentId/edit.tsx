import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { formAction } from "remix-forms";
import { z } from "zod";
import { db } from "~/config/database/db.server";
import { getUserId } from "~/config/session/session.server";
import { EditPayment } from "~/pages/payments/edit";
import { LoadPayments } from "~/services/payments/load";
import { UpdatePayment } from "~/services/payments/update";
import paymentsNewStyles from "~/styles/pages/payments.new.css";

const schema = z.object({
  id: z.string(),
  description: z.string().min(3),
  category: z.string(),
  currentMonth: z.string(),
  userId: z.string(),
  dueDate: z.date(),
  amount: z.number(),
});

const mutation = makeDomainFunction(schema)(async (data) => {
  const dateSplit = data.currentMonth.split("/");
  const currentMonth = `${dateSplit[1]}-${dateSplit[0]}-01`;
  return new UpdatePayment(db).execute({
    id: data.id,
    userId: data.userId,
    amount: Number(data.amount),
    currentMonth,
    category: data.category,
    description: data.description,
    dueDate: data.dueDate,
  });
});

export const action: ActionFunction = async ({ request }) => {
  return await formAction({ request, schema, mutation, successPath: "/payments" });
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return new Response(null, { status: 404 });
  }
  const paymentId = params.paymentId;
  if (!paymentId) {
    return new Response(null, { status: 404 });
  }
  const payment = await new LoadPayments(db).execute({ id: paymentId, userId });
  if (!payment || Array.isArray(payment) || !("description" in payment)) {
    return new Response(null, { status: 404 });
  }
  return { payment, userId };
};

export function links() {
  return [
    {
      rel: "stylesheet",
      href: paymentsNewStyles,
    },
  ];
}

export default function EditPaymentPage() {
  const { payment, userId } = useLoaderData<{
    payment: {
      id: string;
      currentMonth: Date;
      category: string;
      description: string;
      dueDate: Date;
      amount: unknown;
    };
    userId: string;
  }>();

  return <EditPayment schema={schema} payment={payment} userId={userId} />;
}
