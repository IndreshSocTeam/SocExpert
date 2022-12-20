// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader, FormFeedback} from 'reactstrap'

import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

import {axiosClient} from '../../../Client'
// ** Demo Components

const ChangePasswordTabs = () => {
  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
  const [insertValues, setInsertValues] = useState([])

  const handleInputChange = e => {
  const {name, value} = e.target
  setInsertValues({
    ...insertValues,
    [name]: value
  })
  console.log("Change Password", insertValues)
}
 
  const saveChangesClick = (e) => {
    e.preventDefault()
        const sd = {
          StudentDetailId:loggedInUserDetails.StudentId,
          OldPassword:insertValues.currentPassword,
          NewPassword:insertValues.retypeNewPassword
        }
        axiosClient.post('Profile/UpdatePassword', null, {params: {
          StudentDetailId:loggedInUserDetails.StudentId,
          OldPassword:insertValues.currentPassword,
          NewPassword:insertValues.retypeNewPassword
        }}).then((res) => {
          if ((res.data === 'Changed Password Sucessfully') || (res.data === 'Enter Password')) {
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
            toast.success('Entered Wrong Password', {
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
          toast.error('URL Not Found')
        })
  }

useEffect(() => {
    axiosClient.get('Profile/GetPersonalDetails', {
      params:{
        StudentId:loggedInUserDetails.StudentId
      }
    }).then((res) => {
      console.log('My Password',  res.data.Password)
    }).catch((error) => {
      console.log(error)
    })
}, [])

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Change Password</CardTitle>
        </CardHeader>
        <CardBody className='pt-1'>
          <Form>
            <Row>
              <Col sm='6' className='mb-1'>   
                    <InputPasswordToggle
                    id='currentPassword'
                    name='currentPassword'
                      label='Current Password'
                      htmlFor='currentPassword'
                      onChange={handleInputChange}
                    />
              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                    <InputPasswordToggle
                    id='newPassword'
                    name='newPassword'
                      label='New Password'
                      htmlFor='newPassword'
                    />
                    </Col>
              <Col sm='6' className='mb-1'>
                    <InputPasswordToggle
                    id='retypeNewPassword'
                    name='retypeNewPassword'
                      label='Retype New Password'
                      htmlFor='retypeNewPassword'
                      onChange={handleInputChange}
                    />
              </Col>
              <Col xs={12}>
                <p className='fw-bolder'>Password requirements:</p>
                <ul className='ps-1 ms-25'>
                  <li className='mb-50'>Minimum 8 characters long - the more, the better</li>
                  <li className='mb-50'>At least one lowercase character</li>
                  <li>At least one number, symbol, or whitespace character</li>
                </ul>
              </Col>
              <Col className='mt-1' sm='12'>
                <Button type='submit' className='me-1' color='primary' onClick={saveChangesClick}>
                  Save changes
                </Button>
                <Button color='secondary' outline>
                  Cancel
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
