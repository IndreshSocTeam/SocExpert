// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap'
// ** Icons Imports
import { User, Lock, Edit, Upload, Users, BookOpen } from 'react-feather'

import '@src/assets/scss/style.scss'

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav pills className='mb-2 navPillsStyle'>
      <NavItem className='navFullWidthOnMobile row-sm-12'>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')} >
          <User size={18} className='me-50' />
          <span className='fw-bold'>Personal Details</span>
        </NavLink>
      </NavItem> 
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <BookOpen size={18} className='me-50' />
          <span className='fw-bold'>Education Details</span>
        </NavLink>
      </NavItem>  
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <Users size={18} className='me-50' />
          <span className='fw-bold'>Experience Details</span>
        </NavLink>
      </NavItem>  
      <NavItem>
      <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
        <Upload size={18} className='me-50' />
        <span className='fw-bold'>CV and Job Preferences</span>
      </NavLink>
    </NavItem> 
    <NavItem>
        <NavLink active={activeTab === '5'} onClick={() => toggleTab('5')}>
        <Edit size={18} className='me-50' />
        <span className='fw-bold'>Enrolment Details</span>
        </NavLink>
    </NavItem> 
      <NavItem>
        <NavLink active={activeTab === '6'} onClick={() => toggleTab('6')}>
          <Lock size={18} className='me-50' />
          <span className='fw-bold'>Change Password</span>
        </NavLink>
      </NavItem>      
    </Nav>
  )
}

export default Tabs
