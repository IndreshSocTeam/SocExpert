// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'
// ** Icons Imports
import { User, Lock, Edit, Upload, Users, BookOpen } from 'react-feather'

import '@src/assets/scss/style.scss'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2 navPillsStyle'>
      <NavItem className='navFullWidthOnMobile col-sm-4'>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')} >
          <User size={18} className='me-50' />
          <span className='fw-bold'>L1 CV POints</span>
        </NavLink>
      </NavItem> 
      <NavItem className='col-sm-4'>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <BookOpen size={18} className='me-50' />
          <span className='fw-bold'>L2 CV POints</span>
        </NavLink>
      </NavItem>  
      <NavItem  className='col-sm-4'>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <Users size={18} className='me-50' />
          <span className='fw-bold'>L3 CV POints</span>
        </NavLink>
      </NavItem> 
    </Nav>
  )
}

export default Tabs
