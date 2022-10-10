import { Form } from 'remix-forms';
import { MainWithHeader } from "~/components/page_header";

type Props = {
  schema: any
  userId: string
}

export const NewPayment = ({ schema, userId }: Props) => {

  const monthValue = new Date().getMonth() + 1
  const currentMonth = `${monthValue.toString().padStart(2, '0')}/${new Date().getFullYear()}`

  return (
    <MainWithHeader
      title="New Payment"
      actions={[
        { to: '/payments', className: 'btn btn-secundary', title: 'Back' }
      ]}
    >
      <div className="card">
        <Form schema={schema} className="newPaymentForm">
          {({ Field, Errors, Button, register }) => (
            <>
              <div className="fields">
                <input {...register('userId')} hidden value={userId} />
                <input {...register('currentMonth')} hidden value={currentMonth} />
                <Field name="category">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <select {...register('category')} className={errors?.length ? 'error' : ''} >
                        <option value="casa">Casa</option>
                        <option value="cartao_de_credito">Cartão de crédito</option>
                        <option value="doacao">Doação</option>
                        <option value="assinaturas_servicos">Assinaturas e serviços</option>
                      </select>
                      {errors && errors.map(error => (<span key={error} className="error">{error}</span>))}
                    </div>
                  )}
                </Field>
                <Field name="description">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <input {...register('description')} className={errors?.length ? 'error' : ''} autoComplete="off" />
                      {errors && errors.map(error => (<span key={error} className="error">{error}</span>))}
                    </div>
                  )}
                </Field>
                <Field name="dueDate">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <input {...register('dueDate')} type='date' className={errors?.length ? 'error' : ''} autoComplete="off" />
                      {errors && errors.map(error => (<span key={error} className="error">{error}</span>))}
                    </div>
                  )}
                </Field>
                <Field name="amount">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <input {...register('amount')} type='number' step="0.01" className={errors?.length ? 'error' : ''} autoComplete="off" />
                      {errors && errors.map(error => (<span key={error} className="error">{error}</span>))}
                    </div>
                  )}
                </Field>
              </div>
              <Errors />
              <Button className='btn btn-primary'>Save</Button>
            </>
          )}
        </Form>
      </div>
    </MainWithHeader>
  )
}