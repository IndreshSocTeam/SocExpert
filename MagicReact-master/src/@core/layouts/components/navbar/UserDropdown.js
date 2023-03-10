// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect, CSSProperties } from 'react'
import { useHistory} from "react-router-dom"

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
// import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, UncontrolledTooltip} from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import ClipLoader from "react-spinners/ClipLoader"
import {axiosClient} from '../../../../Client'
import Cookies from 'js-cookie'
import {AES, enc} from 'crypto-js'

const override: CSSProperties = {
  display:"block",
  margin:"auto",
  right:"5%",
  bottom:"0",
  top:"0",
  position: "absolute",
};


// import Cookies from 'js-cookie';
// // Set a cookie
// Cookies.set('name', 'value', { expires: 7 });
// // Get a cookie
// const value = Cookies.get('name');
// // Remove a cookie
// Cookies.remove('name');

// import CryptoJS from 'crypto-js';
// // Encrypt the cookie
// const encryptedValue = CryptoJS.AES.encrypt(value, 'secret key').toString();
// // Store the encrypted cookie
// Cookies.set('name', encryptedValue, { expires: 7 });
// // Get and decrypt the cookie
// const decryptedValue = CryptoJS.AES.decrypt(Cookies.get('name'), 'secret key').toString(CryptoJS.enc.Utf8);

const UserDropdown = () => {
  // ** State
  const history = useHistory()
  const [userData] = useState(null)
  const [loading, setLoading] = useState(false)
  const userAvatar = (userData && userData.avatar) || defaultAvatar

 // const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))  
  //const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
 
  const loggedInUserDetails = JSON.parse(AES.decrypt(Cookies.get("loggedInUserDetails"), 'secret-key').toString(enc.Utf8));
 
 

  const [userNavDetails, setUserNavDetails] = useState([])  
  
  useEffect(() => {
      setLoading(true)
      axiosClient.get('Profile/GetPersonalDetailsInNavBar', { 
        params: {
          StudentId: loggedInUserDetails.StudentId
        } 
      })
    .then((res) => {
      setLoading(false)
      setUserNavDetails([res.data])
    }).catch((error) => {
      console.log(error)
    })
  }, [])

//{(userData && userData['username']) || 'Anand Guru'} in line 53

const handleLogOut = () => {
  // localStorage.clear()
  // sessionStorage.clear()
  Cookies.remove('loggedInUserDetails')  
  Cookies.remove('loggedIn')
  history.push('/login')
  toast.error('Logged Out successfully')
}

  return (
    <div>
    <ClipLoader
    color={"#6610f2"}
    loading={loading}
    cssOverride={override}
    size={40}
    aria-label="Loading Spinner"
    data-testid="loader"
    speedMultiplier="1"
  />
    {
      userNavDetails.map((curData, index) => (   
    <UncontrolledDropdown key={index} tag='li' className='dropdown-user nav-item'>
    <DropdownToggle id="pic" href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
       <div className='user-nav d-sm-flex d-none'>        
          <span className='user-name fw-bold'>{curData.Fname}&nbsp;{curData.Lname}</span>
          <span className='user-status'>{(userData && userData.role) || 'Student'}</span>
        </div>
       <Avatar img={(curData.ProfilePic === null || curData.ProfilePic === '' ) ? defaultAvatar : curData.ProfilePic} imgHeight='40' imgWidth='40' status='online' alt='Your Avatar' />
     {/*   <Avatar img={defaultAvatar} imgHeight='40' imgWidth='40' status='online' alt='Your Avatar' /> */}
      </DropdownToggle>
      <UncontrolledTooltip placement='top' target='pic'>
        Your Avatar
      </UncontrolledTooltip>
      <DropdownMenu end>
        <DropdownItem tag='a' href='/pages/profile' onClick={e => e.preventDefault()}>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag='a' href='/apps/email' onClick={e => e.preventDefault()}>
          <Mail size={14} className='me-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag='a' href='/apps/todo' onClick={e => e.preventDefault()}>
          <CheckSquare size={14} className='me-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem tag='a' href='/apps/chat' onClick={e => e.preventDefault()}>
          <MessageSquare size={14} className='me-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag='a' href='/pages/account-settings' onClick={e => e.preventDefault()}>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag='a' href='/pages/pricing' onClick={e => e.preventDefault()}>
          <CreditCard size={14} className='me-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem>
        <DropdownItem tag='a' href='/pages/faq' onClick={e => e.preventDefault()}>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/login' onClick={handleLogOut}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
    
 )) 
}
</div>
  )
}

export default UserDropdown
