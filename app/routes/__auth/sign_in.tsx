import type { ActionFunction} from "@remix-run/node";
import { json } from "@remix-run/node";
import { performMutation } from 'remix-forms'
import { makeDomainFunction } from 'remix-domains'
import { z } from 'zod';

import { SignIn } from "~/pages/auth/sign_in";

import authStyles from '~/styles/pages/auth.css';
import { createUserSession, login } from "~/config/session/session.server";

const schema = z.object({
  username: z.string().min(6),
  password: z.string().min(6),
})

const mutation = makeDomainFunction(schema)(async ({ username, password }) => {

  const user = await login({ username, password });

  if (!user) {
    throw new Error('Username/Password combination is incorrect')
  }

  return user
})

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({ request, schema, mutation })

  if (!result.success) return json(result, 400)

  return await createUserSession(result.data.id, '/')
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: authStyles,
    },
  ]
}

export default () => {
  return <SignIn schema={schema} />
}