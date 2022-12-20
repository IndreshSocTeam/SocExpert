// ** React Imports
import { Fragment } from 'react'

// ** Dropdowns Imports
import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon, CheckCircle, Book, Plus, CreditCard  } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink, UncontrolledTooltip } from 'reactstrap'


import TooltipPosition from '../../../../views/tooltips/TooltipPositions'


const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} style={{marginRight:10}}/>
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} style={{marginRight:10}}/>
    }

  }
  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            
            <ThemeToggler />
    
             <CheckCircle className='ficon' id='CheckCircle' style={{marginRight:10}}/>

             <UncontrolledTooltip placement='top' target='CheckCircle'>
             Attendance
      </UncontrolledTooltip>

            <Book className='ficon' id='Book' style={{marginRight:10}}></Book>

            <UncontrolledTooltip placement='top' target='Book'>
       Assignment
      </UncontrolledTooltip>

       <Plus className='ficon' id='Plus'style={{marginRight:10}} ></Plus>

            <UncontrolledTooltip placement='top' target='Plus'>
            Create Request
      </UncontrolledTooltip>


      <CreditCard className='ficon' id='Credit' style={{marginRight:10}}></CreditCard>

<UncontrolledTooltip placement='top' target='Credit'>
SE Wallet
</UncontrolledTooltip>


          </NavLink>
        </NavItem>
      </div>
      <ul className='nav navbar-nav align-items-center ms-auto'>
        <UserDropdown />
      </ul>
    </Fragment>
  )
}
export default NavbarUser
