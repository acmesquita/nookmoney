import * as crypto from 'crypto'
import { Link } from "@remix-run/react"
import { DateMonth } from '../button'

type ActionType = {
  to: string,
  className: string,
  title: string
  handle?: (date: Date) => void
}

type MainWithHeaderProps = {
  title: string
  children?: any
  actions?: Array<ActionType>
}

type ActionsProps = {
  actions?: Array<ActionType>
}

const Actions = ({ actions }: ActionsProps) => {
  if (!actions) {
    return <></>
  }

  return (
    <div className="actions">
      {actions.map((action, index) => {
        if (action.to) {
          return (<Link key={index} to={action.to} className={action.className}>{action.title}</Link>)
        }
        return (
          <DateMonth key={index} date={action.title} handleSubmit={action.handle ? action.handle : () => {}} />
        )
      })}
    </div>
  )
}

export function MainWithHeader({ title, children, actions }: MainWithHeaderProps) {
  return (
    <main className="main-container">
      <header className="header-page">
        <h1 className="title">{title}</h1>
        <Actions actions={actions} />
      </header>
      <hr />
      {children}
    </main>
  )
}