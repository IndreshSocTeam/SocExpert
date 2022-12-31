// ** React Imports
import { Fragment, useState, useEffect, CSSProperties} from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText, Label} from 'reactstrap'

import { Lock ,Unlock} from 'react-feather'

import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '@styles/react/pages/invalid-error.scss'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

import {axiosClient} from '../../../Client'
// ** Demo Components
  // ** React Imports
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
  opacity:"0.8",
  // width:"100%",
  // height:"100%",
  // background:'rgb(235 245 245)',
  zIndex:'100'
}

//const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))

const pass = '/^[A-Za-z]\w{7,14}$/'
const initialValues = {
  currentPassword: '',
  newPassword: '',
  retypeNewPassword: ''
}

const ChangePasswordTabs = () => {
  const [insertValues, setInsertValues] = useState(initialValues)
  const [oldPassword, setOldPassword] = useState('')

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)   

  const handleInputChange = e => {
  const {name, value} = e.target
  setInsertValues({
    ...insertValues,
    [name]: value
  })
}
 

const validationPassword = (values) => {
  if( values.length !== 0 && values.length >= 8 && values.length <=16 && values.length != 0 && (/^[A-Za-z0-9]*$/.test(values.trim()))){
    return true
  }else {
    return false
  }
}


const validate = () => {
  const temp = {}  
  temp.currentPassword = insertValues.currentPassword === ""  ? false : true
  temp.newPassword = insertValues.newPassword === ""  ? false : true
  temp.retypeNewPassword = insertValues.retypeNewPassword === ""  ? false : true  
  setErrors(temp)
  return Object.values(temp).every(x => x === true)
}



  const saveChangesClick = (e) => {
    e.preventDefault()
    if (validate() && insertValues.currentPassword === oldPassword && (insertValues.newPassword === validationPassword(insertValues.retypeNewPassword))){
        const sd = {
          StudentDetailId:loggedInUserDetails.StudentId,
          OldPassword:insertValues.currentPassword,         // name mentioned in .net : insertValues.name or id
          NewPassword:insertValues.retypeNewPassword
        }
        setLoading(true)
        axiosClient.post('Profile/UpdatePassword', null, {params: sd}).then((res) => {
          setLoading(false)
          if ((res.data === 'Changed Password Sucessfully')) {
          toast.success('Password Updated Scuessfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            })
          } else if ((res.data === 'Wrong Password')) {
            toast.error('Entered Wrong Password', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
              })
          } else if (res.data === 'Enter Password'){
            toast.error('Please Enter Password', {
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
        }).catch((error) => {
          //console.log(error)
        toast.error('Internal server error')
        })      
      }
  }

useEffect(() => {
  setLoading(true)
    axiosClient.get('Profile/GetPersonalDetails', {
      params:{
        StudentId:loggedInUserDetails.StudentId
      }
    }).then((res) => {
      setLoading(false)
      setOldPassword(res.data.Password)
    }).catch((error) => {
      //console.log(error)
    toast.error('Internal server error')
    })
}, [])

const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid' : '')



const resetForm = () => {
  setErrors({})
}


  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Change Password</CardTitle>
        </CardHeader>
        <HashLoader
            color={"#5856d6"}
            loading={loading}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier="1"
          />
        <CardBody className='pt-1'>
          <Form autoComplete="off">
            <Row>
              <Col sm='6' className='mb-1'> 
              <Label className='form-label' for='currentPassword'>
              Old Password<span className='text-danger'>*</span>  
            </Label>      
                    <InputPasswordToggle
                    id='currentPassword'
                    name='currentPassword'                    
                      invalid={(errors.currentPassword === false) || (insertValues.currentPassword !== oldPassword && (insertValues.currentPassword.length > 0))}
                      valid={insertValues.currentPassword === oldPassword}
                      onChange={handleInputChange}
                    />
                    { errors.currentPassword === false ? <span className='text-danger'>Please Enter Your Old Password</span> : ""}
                    {((errors.currentPassword !== false) && (insertValues.currentPassword !== oldPassword) && (insertValues.currentPassword.length > 0)) ? <span className='text-danger'>Wrong Password</span> : ""}
           </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
              <Label className='form-label' for='newPassword'>
                    New Password<span className='text-danger'>*</span>  
                  </Label>           
                    <InputPasswordToggle 
                    invalid={(errors.newPassword === false) || (!validationPassword(insertValues.newPassword) && insertValues.newPassword.length !==0)}
                    valid={validationPassword(insertValues.newPassword)}
                    id='newPassword'
                    name='newPassword'
                    onChange={handleInputChange}
                    />
                    { errors.newPassword === false ? <span className='text-danger'>Please Enter New Password</span> : ""}
                    { ((errors.newPassword !== false) && !validationPassword(insertValues.newPassword) && insertValues.newPassword.length !==0) ? <span className='text-danger'>Password doesn't match the requirements</span> : ""}
                   
                    </Col>
              <Col sm='6' className='mb-1'>
              <Label className='form-label' for='retypeNewPassword'>
              Confirm Password<span className='text-danger'>*</span>  
            </Label>  
                    <InputPasswordToggle
                    id='retypeNewPassword'
                    name='retypeNewPassword'                    
                      invalid={(errors.retypeNewPassword === false) ||  (insertValues.newPassword !== insertValues.retypeNewPassword) || (!validationPassword(insertValues.retypeNewPassword) && insertValues.retypeNewPassword.length !== 0)}
                      valid={insertValues.newPassword === insertValues.retypeNewPassword && insertValues.retypeNewPassword.length !==0}
                      onChange={handleInputChange}
                    />
                    { errors.retypeNewPassword === false ? <span className='text-danger'>Please Enter Confirm Password</span> : ""}
                    { ((errors.retypeNewPassword !== false) && insertValues.newPassword !== insertValues.retypeNewPassword) ? <span className='text-danger'>Confirm Password don't Match</span> : ""}
                    { ((errors.retypeNewPassword !== false) && !validationPassword(insertValues.retypeNewPassword) && insertValues.retypeNewPassword.length !==0) ? <span className='text-danger'>Password doesn't match the requirements</span> : ""}
     
              </Col>
              <Col xs={12}>
                <p className='fw-bolder'>Password requirements:</p>
                <ul className='ps-1 ms-25'>
                  <li className='mb-50'>Minimum 8 characters long - and less than 16 characters, for better</li>
                  <li className='mb-50'>At least one lowercase character</li>
                  <li>At least one number, symbol, or alphabet character</li>
                </ul>
              </Col>
              <Col className='mt-1' sm='12'>
                <Button type='submit' className='me-1' color='primary' onClick={saveChangesClick}>
                  Save changes
                </Button>
                <Button color='secondary' outline onClick={resetForm}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default ChangePasswordTabs
