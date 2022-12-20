// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'
// ** Icons Imports
import { Book, BookOpen } from 'react-feather'

import '@src/assets/scss/style.scss'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2 navPillsStyle'>
      <NavItem className='navFullWidthOnMobile row-sm-12'>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')} >
          <Book size={18} className='me-50' />
          <span className='fw-bold'>Create Request</span>
        </NavLink>
      </NavItem> 
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <BookOpen size={18} className='me-50' />
          <span className='fw-bold'>My Request</span>
        </NavLink>
      </NavItem>  
    </Nav>
  )
}

export default Tabs
