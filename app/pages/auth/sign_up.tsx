import { Form } from 'remix-forms';
import { Button as MyButton } from "~/components/button";

type Props = {
  schema: any
}

export const SignUp = ({ schema }: Props) => (
  <main className="container">
    <div className="card">
      <img src='/assets/logo.png' alt="nookmoney" className='logo' />

      <Form schema={schema} className="authForm">
        {({ Field, Errors, Button, register }) => (
          <>
          <Field name="name">
              {({ errors, Label }) => (
                <>
                  <div className="field">
                    <Label />
                    <input {...register('name')} className={errors?.length ? 'error' : ''} autoComplete="off"/>
                    {errors && errors.map(error => (<span key={error} className="error">{error}</span>))}
                  </div>
                </>
              )}
            </Field>
            <Field name="username">
              {({ errors, Label }) => (
                <>
                  <div className="field">
                    <Label />
                    <input {...register('username')} className={errors?.length ? 'error' : ''} autoComplete="off" />
                    {errors && errors.map(error => (<span key={error} className="error">{error}</span>))}
                  </div>
                </>
              )}
            </Field>
            <Field name="password">
              {({ errors, Label }) => (
                <div className="field">
                  <Label />
                  <input {...register('password')} type='password' className={errors?.length ? 'error' : ''} />
                  {errors && errors.map(error => (<span key={error} className="error">{error}</span>))}
                </div>
              )}
            </Field>
            <Errors />
            <Button className='btn btn-primary'>Sign Up</Button>
            <MyButton variant="secundary" href="/sign_in">Sign In</MyButton>
          </>
        )}
      </Form>
    </div>
  </main>
)
