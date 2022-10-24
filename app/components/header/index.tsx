import { Link } from "@remix-run/react";
import { BsCaretDownFill } from 'react-icons/bs'

type Props = {
  name: string
}

export const Header = ({ name }: Props) => (
  <header className='header' data-testid='header'>
    <Link to='/' className='logo'>
      <img src='/assets/logo.png' alt="nookmoney" />
    </Link>
    <div className="dropdown">
      <h4 className="content"><span>Olá, {name}</span> <BsCaretDownFill /></h4>
      <div className="dropdown-content">
        <form action="/logout" method="post">
          <button type="submit" className="">
            Logout
          </button>
        </form>
      </div>
    </div>
  </header>
)