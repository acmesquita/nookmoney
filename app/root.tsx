import type { LoaderFunction, MetaFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import globalStyles from './styles/global.css';
import inputStyles from '~/components/input/styles.css';
import buttonStyles from '~/components/button/styles.css';
import goalsStyles from '~/components/goal_range/styles.css';
import { Layout, layoutLinksStyles } from "~/components/layout";
import { getUser } from "./config/session/session.server";
import datepickerStyles from 'react-datepicker/dist/react-datepicker.css';

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Nookmoney",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    {
      rel: "stylesheet",
      href: globalStyles,
    },
    {
      rel: "stylesheet",
      href: buttonStyles,
    },
    {
      rel: "stylesheet",
      href: inputStyles,
    },
    {
      rel: "stylesheet",
      href: goalsStyles,
    },
    {
      rel: "stylesheet",
      href: datepickerStyles,
    },
    ...layoutLinksStyles,
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const signInPath = 'sign_in'

  if (!user && !request.url.includes(signInPath)) {
    return redirect(`/${signInPath}`)
  }  

  return { name: user?.name || '' }
}

export default function App() {
  const data = useLoaderData()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout name={data.name}/>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
