import { useSkin } from '@hooks/useSkin'
import { useState, CSSProperties} from 'react'
import { Link, useHistory} from 'react-router-dom'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button, InputGroup, InputGroupText } from 'reactstrap'
import {User, Lock } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import '@styles/react/pages/page-authentication.scss'
import 'cleave.js/dist/addons/cleave-phone.us'
import defaultAvatar from '@src/assets/images/logo/SOCLogo.png'
import {axiosClient} from '../Client'
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@styles/react/pages/invalid-error.scss'
import HashLoader from "react-spinners/HashLoader"
import Cookies from 'js-cookie'

const override: CSSProperties = {
  display:"block",
  margin: "auto",
  position: "absolute",
  top: "0%",
  left: "0%",
  right:"0%",
  bottom:"0%",
  transform: "rotate(180deg)",
  opacity:"0.4",
  width:"100%",
  height:"100%",
  background:'rgb(235 245 245)',
  zIndex:'100'
};

const LoginCover = () => {
  const { skin } = useSkin()
  const history = useHistory()

const initialValues = {
  EmailAddress: '',
  Password: ''
}

  const [data, setData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    setData({...data, [e.target.id]: e.target.value })
  }

  const validate = () => {
    const temp = {}  
    //temp.EmailAddress = data.EmailAddress === "" ? false : true   OR
    temp.EmailAddress = data.EmailAddress !== ""
    temp.Password = data.Password !== ""
    setErrors(temp)
    return Object.values(temp).every(x => x === true)
  }


  function btnSubmit(e) {
    e.preventDefault()
    if (validate()) {
    const sendData = {
      EmailAddress: data.EmailAddress,
      Password: data.Password
    }
    setLoading(true)
    axiosClient.get('/Login/StudentLogin', { 
      params: sendData
    })
    .then((res) => {
      setLoading(false)
      if (res.data === 'Invalid Credentials') {
        history.push('/Login')
        toast.error('Invalid Credentials!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          })
      } else if (res.data === 'User not yet verified') {
        history.push('/Login')
        toast.error('User not yet verified!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          })
      } else if (res.data === 'User Not Active') {
        history.push('/Login')
        toast.error('User Not Active!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          })
      }else if (res.data === 'Logged Successfully') { 
        // Get StudentId
        setLoading(true)
        axiosClient.get('/Login/GetUserDetails', { 
          params: sendData
        })
        .then((localres) => {
          setLoading(false)
          localStorage.setItem("loggedInUserDetails", JSON.stringify(localres.data))
          localStorage.setItem("loggedIn", true)
          sessionStorage.setItem("loggedInUserDetails", JSON.stringify(localres.data))
          sessionStorage.setItem("loggedIn", true)
          Cookies.set('loggedInUserDetails',JSON.stringify(localres.data))
          toast.success('LoggedIn Sucessfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            })
          history.push('/student/Dashboard/')
        }).catch((error) => {
          console.log(error)
          toast.error("Internal Server Error!")
        })
        
      } else if (res) { 
        history.push('/Login')
      }
    }, []).catch((error) => {
      console.log(error)
      toast.error("Internal Server Error!")
    })
  }
  }

  const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid' : '')

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default


  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img src={defaultAvatar} height='50' style={{height:"50px"}}/>         
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />            
            <HashLoader
            color={"#5856d6"}
            loading={loading}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier="1"
          />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
             <p className='d-inline'> Welcome to &nbsp;<span className='brand-text text-primary d-inline' style={{display: "inline-bloack"}}>Magic</span> </p>
            </CardTitle>
            <CardText className='mb-2'>Please Login-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2'>
              <div className='mb-1'>
                <Label className='form-label' for='EmailAddress'>
                  Email
                </Label>
                <InputGroup className='mb-1'>
          <InputGroupText>
            <User size={14} />
          </InputGroupText> 
                <Input className={applyErrorClass('EmailAddress')} type='email' id='EmailAddress' placeholder='socexpert.com' value={data.EmailAddress} onChange={(e) => handle(e)} />
                </InputGroup>
                { errors.EmailAddress === false ? <span className='text-danger'>Please Enter the EmailAddress</span> : ""}
                </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='Password'>
                    Password
                  </Label>
                  <Link to='./forgotPassword/'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle invalid={errors.Password === false} id='Password' value={data.Password} onChange={(e) => handle(e)}/>                
                { errors.Password === false ? <span className='text-danger'>Please Enter the Password</span> : ""}
                </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button onClick={ (e) => btnSubmit(e)} color='primary' block to='/'>
                Login
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default LoginCover
