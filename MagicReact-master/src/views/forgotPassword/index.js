import {React, useState, useEffect} from 'react'

import {axiosClient} from '../../Client'
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ** React Imports
import { Link } from 'react-router-dom'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import defaultAvatar from '@src/assets/images/logo/SOCLogo.png'

const ForgotPassword = () => {
const [email, setEmail] = useState([])

const Emailchange = (e) => {
    const Writtenemail = e.target.value
    setEmail(Writtenemail.toUpperCase())
    console.log("Written Email", Writtenemail.toUpperCase())
}

const OnClickRestPassword = () => {
    axiosClient.post(`ForgotPassword/ResetPassword?Type=1&email=${email}`).then((res) => {
        console.log("dsfdsfds", res.data)
        if (res.data === true) {
            toast.success('Password Reset link send Sucessfully', {
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
            toast.error('In valid Email Address', {
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
          <CardTitle tag='h4' className='mb-1'>
            Forgot Password? 🔒
          </CardTitle>
          <CardText className='mb-2'>
            Enter your email and we'll send you instructions to reset your password
          </CardText>
          <Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>
            <div className='mb-1'>
              <Label className='form-label' for='login-email'>
                Email
              </Label>
              <Input type='email' id='login-email' placeholder='SocExpert@mail.com' required autoFocus onChange={Emailchange} />
            </div>
            <Button color='primary' onClick={OnClickRestPassword} block>
              Send reset link
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

export default ForgotPassword
