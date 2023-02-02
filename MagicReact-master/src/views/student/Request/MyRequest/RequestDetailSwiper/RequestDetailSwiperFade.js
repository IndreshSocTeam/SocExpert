import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Link, useParams } from 'react-router-dom'

import { Fragment, useState, useEffect} from 'react'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label, Button } from 'reactstrap'
import {axiosClient} from '../../../../../Client'
import Cookies from 'js-cookie'

// ** Images
import MyRequestActivityTimeLinePage from './MyRequestActivityTimeline'
import MyRequestDetailsPage from './IndividualRequestDetails'
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {AES, enc} from 'crypto-js'


const params = {
  effect: 'fade',
  navigation: true,
  pagination: {
    clickable: true
  }
}

const SwiperFade = () => {
  //const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
const loggedInUserDetails = JSON.parse(AES.decrypt(Cookies.get("loggedInUserDetails"), 'secret-key').toString(enc.Utf8))

    const [GetRequestTicketDetails, setGetRequestTicketDetails] = useState([])   

  const {ticketNumberid} = useParams()
  
useEffect(() => {
    axiosClient.get('/Request/GetTicketDetail', {params:{ticketNumber:ticketNumberid}}).then((res) => {
      setGetRequestTicketDetails([res.data])
    }).catch((error) => {
      console.log(error)
    })
}, [])

const cancelTicket = () => {
  const comment = "Request has been Canceled"
  axiosClient.post(`/Request/CancelTicket?TicketNumber=${ticketNumberid}&UserId=${loggedInUserDetails.StudentId}`).then(
    axiosClient.post(`/Request/AddNote?Comment=${comment}&TicketNumber=${ticketNumberid}&TypeId=2&UserId=${loggedInUserDetails.StudentId}`).then(
    toast.success("Ticket Canceled")
      ).catch((error) => {
        //console.log(error)
        toast.error("Internal Server Error")
      })
  ).catch((error) => {
    //console.log(error)
    toast.error("Internal Server Error")
  })
}

  return (
    <Card>
     
      <CardBody>
        <Swiper {...params}>
          
          <SwiperSlide>
          <Card title='Review Assignment'>
    <CardHeader className='border-bottom'>
    <CardTitle tag='h4'>Request Details</CardTitle>
  </CardHeader>
  {
    GetRequestTicketDetails.map((curEle, index) => (
   
  <CardBody key={index} className='py-2 my-25 p-2'>
     <Row>
        <Col sm='12'>
        <Row>
        <Col sm='12' lg='3'> 
        <Col lg='12'>      
        <Label for='RequestID' className='p-1'>
        Request ID:
        </Label>
        <Label for='RequestID' className=''>
        <b>
        {curEle.Number}</b>
        </Label>
        </Col> 

        <Col lg='12'>
        <Label for='Status' className='p-1'>
        Status
        </Label>
        <Label for='Status' >
        <b>{curEle.State}</b>
        </Label>
        </Col>

        <Col lg='12'>
        <Label for='SECoin' className='p-1'>
        SE-Coin spend
        </Label>
        <Label for='SECoin'>
        <b>{curEle.Coin}</b>        
        </Label>
           <br/>
        
        </Col>
        <Col lg='12' className='p-1'>Short Description: <b>{curEle.ShortDescription}</b></Col>
        <Col lg='12' className='p-1'>Long Description: <b>{curEle.LongDescription}</b>  </Col>
        </Col>
        <Col lg='3' sm='12'>
            <Col lg='12'>
        <Label for='Date' className='p-1'>
        Date:
        </Label>
        <Label for='Date'>
        <b>
        {curEle.CreatedDate}</b>
        </Label> 
        </Col>
        <Col lg='12'>
        <Label for='RequestType' className='p-1'>
        Request Type
        </Label>
        <Label for='RequestType' htmlFor="text">
        <b>{curEle.RequestType}</b>
        </Label>   
        </Col> 
        <Col lg='12'>
        <Label for='RequestSubType' className='p-1'>
        Request Sub-Type
        </Label>
        <Label for='RequestSubType'>
        <b>{curEle.AssignedType}</b>
        </Label> 
        </Col>
        </Col> 
        <Col lg='3' sm='12'>     
        <Label for='Genie' className='m-2'>
        Cyber Genie
        </Label>
        <Label for='Genie'>
        <b>{curEle.AssignedUser}</b>
        </Label>
        </Col>
        <Col lg='3' sm='12'>
            <br/>
            {
              curEle.State === 'New' && (
        <Button type='button' className='me-1' color='primary' onClick={cancelTicket}>
                  Cancel Ticket
                </Button>                
                )
            }
        </Col>
        </Row>
        <Row>
        <Col> 
        
             
        </Col>
        </Row>        
        
        </Col>
          </Row>
              </CardBody>  
              
      ))
    }
        </Card>
          </SwiperSlide>
          <SwiperSlide>
          <MyRequestActivityTimeLinePage/>
          </SwiperSlide>
          
        </Swiper>
      </CardBody>
    </Card>
  )
}

export default SwiperFade
