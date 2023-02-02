import { Card, CardHeader, CardBody, CardTitle, Row,
    Col,
    Form,
    Label } from 'reactstrap'
  
    import { Fragment, useState, useEffect, CSSProperties } from 'react'
  import '@src/assets/scss/style.scss'

// ** Third Party Imports
import { toast } from 'react-toastify'
import '@styles/react/pages/invalid-error.scss'
  import {axiosClient} from '../../../Client'
  // ** React Imports   
  import HashLoader from "react-spinners/HashLoader"
  import Cookies from 'js-cookie'
  import {AES, enc} from 'crypto-js'

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


  const EnrollmentDetailsTabs = () => {
    
    //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
    //const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
    const loggedInUserDetails = JSON.parse(AES.decrypt(Cookies.get("loggedInUserDetails"), 'secret-key').toString(enc.Utf8));

    const [userDetails, setUserDetails] = useState([])  
    const [loading, setLoading] = useState(false)  
    
    useEffect(() => {
      setLoading(true)
    axiosClient.get('Profile/GetEnrollmentDetails', { 
      params: {
        StudentId: loggedInUserDetails.StudentId
      } 
    })
  .then((res) => {
    setLoading(false)
    setUserDetails([res.data])
  }).catch((error) => {
    //console.log(error)
      toast.error('Internal server error')
  })
}, [])


    return (
      <Form>
      <HashLoader
            color={"#5856d6"}
            loading={loading}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier="1"
          />
         {
      userDetails.map((curData, index) => (        
      <Row key={index}>  
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