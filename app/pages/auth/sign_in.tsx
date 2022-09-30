import { Form } from 'remix-forms';
import { Button as MyButton } from "~/components/button";

type Props = {
  schema: any
}

export const SignIn = ({ schema }: Props) => (
  <main className="container">
    <div className="card">
      <img src='/assets/logo.png' alt="nookmoney" className='logo' />

      <Form schema={schema} className="authForm">
        {({ Field, Errors, Button, register }) => (
          <>
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
            <Button className='btn btn-primary'>Sign In</Button>
            <MyButton variant="secundary" href="/sign_up">Sign Up</MyButton>
          </>
        )}
      </Form>
    </div>
  </main>
)
