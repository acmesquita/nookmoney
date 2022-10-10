import { Form } from 'remix-forms';
import { MainWithHeader } from "~/components/page_header";

type Props = {
  schema: any
  userId: string
}

export function NewObjective({ schema, userId }: Props) {
  return (
    <MainWithHeader
      title="New Objective"
      actions={[
        { to: '/objective', className: 'btn btn-secundary', title: 'Back' }
      ]}
    >
      <div className="card">
        <Form schema={schema} className="newObjectiveForm">
          {({ Field, Errors, Button, register }) => (
            <>
              <div className="fields">
                <input {...register('userId')} hidden value={userId} />
                <Field name="describe">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <input {...register('describe')} className={errors?.length ? 'error' : ''} autoComplete="off" />
                      {errors && errors.map(error => (<span key={error} className="error">{error}</span>))}
                    </div>
                  )}
                </Field>
                <Field name="amount">
                  {({ errors, Label }) => (
                    <div className="field">
                      <Label />
                      <input {...register('amount')} type="number" step="0.01" className={errors?.length ? 'error' : ''} autoComplete="off" />
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