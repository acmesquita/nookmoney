import type { LoaderFunction} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Dashboard } from '~/pages/dashboard';
import { getInfoToDashboard } from '~/services/dashboard';
import dashboardStyles from '~/styles/pages/dashboard.css';
import { getUser } from '~/config/session/session.server';

export function links() {
  return [
    {
      rel: "stylesheet",
      href: dashboardStyles,
    },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect('/sign_in')
  }  

  return getInfoToDashboard()
}

export default function DashboardPage() {
  const data = useLoaderData()
  return <Dashboard data={data} />
}
