import { Form } from 'remix-forms';
import { MainWithHeader } from "~/components/page_header";

type Props = {
  schema: any
  userId: string
}

export function NewBank({ schema, userId }: Props) {
  return (
    <MainWithHeader title="New Bank" actions={[
      { to: "/banks", className: "btn btn-secundary", title: 'Voltar' }
    ]}>
      <div className="card">
        <Form schema={schema} className="newBankForm">
          {({ Field, Errors, Button, register }) => (
            <>
              <div className="fields">
              <input {...register('userId')} hidden value={userId} />
                <Field name="name">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <input {...register('name')} className={errors?.length ? 'error' : ''} autoComplete="off" />
                      {errors && errors.map(error => (<span key={error} className="error">{error}</span>))}
                    </div>
                  )}
                </Field>
                <Field name="category">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <select {...register('category')} className={errors?.length ? 'error' : ''} >
                        <option value="conta_corrente">Conta Corrente</option>
                        <option value="conta_poupanca">Conta Poupança</option>
                        <option value="investimento">Investimento</option>
                        <option value="corretora">Corretora</option>
                      </select>
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