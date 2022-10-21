import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { makeDomainFunction } from 'domain-functions'
import { performMutation } from 'remix-forms';
import { z } from 'zod';

import { SignUp } from "~/pages/auth/sign_up";

import authStyles from '~/styles/pages/auth.css';
import inputStyles from '~/components/input/styles.css';
import buttonStyles from '~/components/button/styles.css';
import { LoadUser } from "~/services/user/load";
import { db } from "~/config/database/db.server"
import { createUserSession, register } from "~/config/session/session.server";

const schema = z.object({
  name: z.string().min(3),
  username: z.string().min(6),
  password: z.string().min(6),
})

const mutation = makeDomainFunction(schema)(async (values) => {

  const { name, username, password } = values

  const userExists = await new LoadUser(db).execute({ username })

  if (userExists) {
    throw new Error('User exists.')

  }
  const user = await register({ name, username, password });

  if (!user) {
    throw new Error('Error to register user.')
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
    {
      rel: "stylesheet",
      href: inputStyles,
    },
    {
      rel: "stylesheet",
      href: buttonStyles,
    },
  ]
}


export default () => {
  return <SignUp schema={schema} />
}