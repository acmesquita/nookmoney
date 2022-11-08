import { Link } from "@remix-run/react";
import { BsCaretDownFill} from 'react-icons/bs'
import { BiMenu} from 'react-icons/bi'

type Props = {
  name: string
  openSidebar: () => void
}

export const Header = ({ name, openSidebar }: Props) => (
  <header className='header' data-testid='header'>
    <BiMenu className="show-mobile" size={24} onClick={() => openSidebar()}/>
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