import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row,
    Col,
    Form,
    Input,
    Label,
    Button,
    InputGroup,
    InputGroupText } from 'reactstrap'
  
    import { Fragment, useState, useEffect } from 'react'
    //import { useState, useEffect } from 'react'
    import Select from 'react-select'  
  import '@src/assets/scss/style.scss'
  // ** Icons Imports
  import { Users, UserCheck, Home, Calendar, DollarSign } from 'react-feather'
  import {axiosClient} from '../../../Client'
  // ** React Imports 
  
  const EnrollmentDetailsTabs = () => {
   
const localUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
console.log("LoggedIn StudentId", localUserDetails.StudentId)

    const [userDetails, setUserDetails] = useState([])  
    useEffect(() => {
    axiosClient.get('Profile/GetEnrollmentDetails', { 
      params: {
        StudentId: localUserDetails.StudentId
      } 
    })
  .then((res) => {
    setUserDetails([res.data])
   // setUserDetails({...data})
    console.log("Enrollment Details:", res.data)
  })
}, [])


    return (
      <Form>
         {
      userDetails.map(curData => (        
      <Row>  
    <Col md='12' sm='12'>
      <Card>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>Enrollment Details</CardTitle>
      </CardHeader>
      <CardBody>
      <Row className='mb-1 mt-1'>
            <Label for='Course'className='col-4'>
            Course
            </Label>
            <label className='col-8 enrollDetailLabelStyle' htmlFor="text">
                       {curData.Course}
            </label>
          </Row>
          <Row className='mb-1'>
            <Label for='Batch'className='col-4'>
            Batch
            </Label>
            <label className='col-8 enrollDetailLabelStyle' htmlFor="text">
                       {curData.Batch}
            </label>
          </Row>
          <Row className='mb-1'>
            <Label for='SE-ID'className='col-4'>
            SE-ID
            </Label>
            <label className='col-8 enrollDetailLabelStyle' htmlFor="text">
                       {curData.SE_Id}
            </label>
          </Row>
  
          <Row className='mb-1'>
            <Label for='StartDate'className='col-4'>
            Start-Date
            </Label>
            <label className='col-8 enrollDetailLabelStyle' htmlFor="text">
                       {curData.StartDate}
            </label>
          </Row>
          <Row className='mb-1'>
            <Label for='EndDate'className='col-4'>
            End-Date
            </Label>
            <label className='col-8 enrollDetailLabelStyle' htmlFor="text">
                       {curData.EndDate}
            </label>
          </Row>
          <Row className='mb-1'>
            <Label for='Fees'className='col-4'>
            Fees Paid 
            </Label>
            <label className='col-8 enrollDetailLabelStyle' htmlFor="text">
                       {curData.Fees}
            </label>
          </Row>
      </CardBody>
    </Card>  
    </Col>
    </Row>  
  )) 
}
    </Form>
    )
  }
  export default EnrollmentDetailsTabs