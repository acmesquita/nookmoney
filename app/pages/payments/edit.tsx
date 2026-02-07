import type { Payment } from "@prisma/client";
import { Form } from "remix-forms";
import { MainWithHeader } from "~/components/page_header";
import { formatMonth } from "~/utils/pages/format_date";
import type { z } from "zod";

type Props = {
  schema: z.SomeZodObject;
  payment: Payment;
  userId: string;
};

function dueDateToInputValue(date: Date): string {
  return new Date(date).toISOString().slice(0, 10);
}

export const EditPayment = ({ schema, payment, userId }: Props) => {
  const currentMonth = formatMonth(new Date(payment.currentMonth));
  const dueDateValue = dueDateToInputValue(payment.dueDate);
  const amountValue = Number(payment.amount);

  const values = {
    id: payment.id,
    userId,
    currentMonth,
    category: payment.category,
    description: payment.description,
    dueDate: dueDateValue,
    amount: amountValue,
  };

  return (
    <MainWithHeader
      title="Edit Payment"
      actions={[{ to: "/payments", className: "btn btn-secundary", title: "Back" }]}
    >
      <div className="card">
        <Form schema={schema} className="newPaymentForm" values={values}>
          {({ Field, Errors, Button, register }) => (
            <>
              <div className="fields">
                <input {...register("id")} type="hidden" value={payment.id} />
                <input {...register("userId")} type="hidden" value={userId} />
                <input {...register("currentMonth")} type="hidden" value={currentMonth} />
                <Field name="category">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <select {...register("category")} className={errors?.length ? "error" : ""}>
                        <option value="casa">Casa</option>
                        <option value="cartao_de_credito">Cartão de crédito</option>
                        <option value="doacao">Doação</option>
                        <option value="assinaturas_servicos">Assinaturas e serviços</option>
                      </select>
                      {errors?.length
                        ? errors.map((error) => (
                            <span key={error} className="error">
                              {error}
                            </span>
                          ))
                        : null}
                    </div>
                  )}
                </Field>
                <Field name="description">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <input
                        {...register("description")}
                        className={errors?.length ? "error" : ""}
                        autoComplete="off"
                      />
                      {errors?.length
                        ? errors.map((error) => (
                            <span key={error} className="error">
                              {error}
                            </span>
                          ))
                        : null}
                    </div>
                  )}
                </Field>
                <Field name="dueDate">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <input
                        {...register("dueDate")}
                        type="date"
                        className={errors?.length ? "error" : ""}
                        autoComplete="off"
                      />
                      {errors?.length
                        ? errors.map((error) => (
                            <span key={error} className="error">
                              {error}
                            </span>
                          ))
                        : null}
                    </div>
                  )}
                </Field>
                <Field name="amount">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <input
                        {...register("amount")}
                        type="number"
                        step="0.01"
                        className={errors?.length ? "error" : ""}
                        autoComplete="off"
                      />
                      {errors?.length
                        ? errors.map((error) => (
                            <span key={error} className="error">
                              {error}
                            </span>
                          ))
                        : null}
                    </div>
                  )}
                </Field>
              </div>
              <Errors />
              <Button className="btn btn-primary">Save</Button>
            </>
          )}
        </Form>
      </div>
    </MainWithHeader>
  );
};
