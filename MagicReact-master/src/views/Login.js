import { useSkin } from '@hooks/useSkin'
import { useState} from 'react'
import { Link, useHistory} from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button, FormFeedback } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import { useForm, Controller } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'
import defaultAvatar from '@src/assets/images/logo/SOCLogo.png'
import {axiosClient} from '../Client'
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//axiosClient.get('/StudentLogin')
// npm install --legacy-peer-deps
const LoginCover = () => {
  const { skin } = useSkin()
  //const url = "https://localhost:44380/api/Login/GetUserDetails?EmailAddress=INDRESH.S@SOCEXPERTS.COM&Password=1U@76865"
  const history = useHistory()
 // const url = ""
  const [data, setData] = useState({
    EmailAddress: '',
    Password: ''
  })

  const handle = (e) => {
    //const newdata = {...data}
    //newdata[e.target.id] = e.target.value
    setData({...data, [e.target.id]: e.target.value })
  }

  function btnSubmit(e) {
    e.preventDefault()
    const sendData = {
      EmailAddress: data.EmailAddress,
      Password: data.Password
    }
    
    axiosClient.get('/Login/StudentLogin', { 
      params: {
        EmailAddress: data.EmailAddress, Password: data.Password
      } 
    })
    .then((res) => {
      //console.log("Message in .NET:", res.data)
      if (res.data === 'Request Processed') {
        history.push('/Login')
        toast.error('Invalid Credentials', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          })
      } else if (res.data === 'Logged Successfully') { 
        // Get StudentId
        axiosClient.get('/Login/GetUserDetails', { 
          params: {
            EmailAddress: data.EmailAddress, Password: data.Password
          } 
        })
        .then((localres) => {
          localStorage.setItem("loggedInUserDetails", JSON.stringify(localres.data))
          localStorage.setItem("loggedIn", true)
          toast.success('Sucessfully LoggedIn', {
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
        })
        
      } else if (res) { 
        history.push('/Login')
      }
    }, [])
    
  }

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

    const defaultValues = {
      EmailAddress: '',
      Password: ''
    }
  
    const {
      control,
      setError,
      handleSubmit,
      formState: { errors }
    } = useForm({ defaultValues })
  
  
    const onSubmit = data => {
      if (Object.values(data).every(field => field.length > 0)) {
        return null
      } else {
        for (const key in data) {
          if (data[key].length === 0) {
            setError(key, {
              type: 'manual'
            })
          }
        }
      }
    }
 

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
       {/*   <svg viewBox='0 0 139 95' version='1.1' height='0'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
  </svg>*/}
          <img src={defaultAvatar} height='50' style={{height:"50px"}}/>
         
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
             <h2 className='d-inline'> Welcome to &nbsp;<h2 className='brand-text text-primary d-inline' style={{display: "inline-bloack"}}>Magic</h2> </h2>
            </CardTitle>
            <CardText className='mb-2'>Please Login-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)} >
              <div className='mb-1'>
                <Label className='form-label' for='EmailAddress'>
                  Email
                </Label>
                <Controller
                name='EmailAddress'
                control={control}
                render={({ field }) => (
                  //invalid={errors.EmailAddress && true} {...field} 
                  <Input type='email' id='EmailAddress' placeholder='socexpert.com' value={data.EmailAddress} onChange={(e) => handle(e)} />
                  )}
                  />
                  {errors && errors.EmailAddress && <FormFeedback>Please Enter a valid Email</FormFeedback>}
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
                <Controller
                name='Password'
                control={control}
                render={({ field }) => (      
                  //invalid={errors.Password && true} {...field}            
                <InputPasswordToggle className='input-group-merge' id='Password' value={data.Password} onChange={(e) => handle(e)}/>
                  )}
                  />
                  {errors && errors.Password && <FormFeedback>Please Enter Password</FormFeedback>}
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
