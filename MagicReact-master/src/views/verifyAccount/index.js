import {React, useState, useEffect} from 'react'

import {axiosClient} from '../../Client'
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ** React Imports
import {Route, Link, Routes, useLocation} from 'react-router-dom'
// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import defaultAvatar from '@src/assets/images/logo/SOCLogo.png'

const VerifyAccount = () => {
    
   // 👇️ WITHOUT React router
   console.log('current URL 👉️', window.location.href.split('/')[5])
   console.log('current Pathname 👉️', window.location.pathname.split('/')[3])


 const UrlToken = window.location.pathname.split('/')[3]
   // 👇️ with React router
   const location = useLocation()
   console.log('hash', location.hash)
   console.log('pathname', location.pathname)
   console.log('search', location.search)

const [password, setPassword] = useState([])
const [confirmPassword, setConfirmPassword] = useState([])

const PasswordChange = (e) => {
    const WrittenPassword = e.target.value
    setPassword(WrittenPassword)
    console.log("Password", WrittenPassword)
}


const ConfirmPasswordChange = (e) => {
    const WrittenConfirmPassword = e.target.value
    setConfirmPassword(WrittenConfirmPassword)
    console.log("Confirm Password", WrittenConfirmPassword)
}

const OnClickCreateAccount = () => {
    axiosClient.post(`ForgotPassword/UpdatePassword?Type=student&Token=${UrlToken}&Password=${confirmPassword}`).then((res) => {
        if (res.data === 1) {
            toast.success('Password Changed Sucessfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                })
        } else {
            toast.error('Invalid URL', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
                })
        }
        
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
}
  return (
    <div className='auth-wrapper auth-basic px-2'>
    <div className='auth-inner my-2'>
      <Card className='mb-0'>
        <CardBody>
        <img src={defaultAvatar} height='50'/>
          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
            <h2 className='brand-text text-primary ms-1'>SocExpert</h2>
          </Link>
          <CardTitle tag='h4' className='mb-1 bg-success'>
          Your account has been successfully verified.
          </CardTitle>
          <CardText className='mb-2'>
          Please create a new password for your account.
          </CardText>
          <Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>
          <div className='mb-1'>
              <Label className='form-label' for='password'>
                Password
              </Label>
              <Input type='password' name='password' id='password' placeholder='Password' required autoFocus onChange={PasswordChange} />
            </div>
            <div className='mb-1'>
              <Label className='form-label' for='ConfirmPassword'>
                Confirm Password
              </Label>
              <Input type='password' name='ConfirmPassword' id='ConfirmPassword' placeholder='Confirm Password' required autoFocus onChange={ConfirmPasswordChange} />
            </div>
            <Button color='primary' onClick={OnClickCreateAccount} block>
              Create Password
            </Button>
          </Form>
          <p className='text-center mt-2'>
            <Link to='../Login'>
              <ChevronLeft className='rotate-rtl me-25' size={14} />
              <span className='align-middle'>Back to login</span>
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  </div>
  )
}

export default VerifyAccount
