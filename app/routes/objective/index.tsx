import { Objective } from "~/pages/objective";
import objeciveStyles from '~/styles/pages/objective.css';

export function links() {
  return [
    {
      rel: "stylesheet",
      href: objeciveStyles,
    },
  ]
}

export default function ObjectivePage() {
  return <Objective />
}