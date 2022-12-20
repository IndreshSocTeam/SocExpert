import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Link, useParams } from 'react-router-dom'

import { Fragment, useState, useEffect} from 'react'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label, Button } from 'reactstrap'
import {axiosClient} from '../../../../../Client'

// ** Images
import MyRequestActivityTimeLinePage from './../MyRequestActivityTimeline'
import MyRequestDetailsPage from './../RequestDetails/IndividualRequestDetails'

const params = {
  effect: 'fade',
  navigation: true,
  pagination: {
    clickable: true
  }
}

const SwiperFade = () => {
    const [GetRequestTicketDetails, setGetRequestTicketDetails] = useState([])   

  const {ticketNumberid} = useParams()
  
useEffect(() => {
    axiosClient.get('/Request/GetTicketDetail', {params:{ticketNumber:ticketNumberid}}).then((res) => {
      setGetRequestTicketDetails([res.data])
      console.log('Request Ticket Detail',  res.data)
    }).catch((error) => {
      console.log(error)
    })
}, [])

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
    GetRequestTicketDetails.map(curEle => (
   
  <CardBody className='py-2 my-25 p-2'>
      <Row>
        <Col sm='12'>
        <Row>
        <Col sm='12' lg='3'> 
        <Col lg='12'>      
        <Label for='RequestID' className=''>
        Request ID:
        </Label>
        <Label for='RequestID' className=''>
        <b>
        {curEle.Number}</b>
        </Label>
        </Col> 

        <Col lg='12'>
        <Label for='Status'>
        Status
        </Label>
        <Label for='Status' >
        <b>{curEle.State}</b>
        </Label>
        </Col>

        <Col lg='12'>
        <Label for='SECoin'>
        SE-Coin spend
        </Label>
        <Label for='SECoin'>
        <b>{curEle.Coin}</b>        
        </Label>
           <br/>
        
        </Col>
        <Col lg='12'>Short Description: <b>{curEle.ShortDescription}</b></Col>
        <Col lg='12'>Long Description: <b>{curEle.LongDescription}</b>  </Col>
        </Col>
        <Col lg='3' sm='12'>
            <Col lg='12'>
        <Label for='Date'>
        Date
        </Label>
        <Label for='Date'>
        <b>
        {curEle.CreatedDate}</b>
        </Label> 
        </Col>
        <Col lg='12'>
        <Label for='RequestType'>
        Request Type
        </Label>
        <Label for='RequestType'>
        <b>{curEle.RequestType}</b>
        </Label>   
        </Col> 
        <Col lg='12'>
        <Label for='RequestSubType'>
        Request Sub-Type
        </Label>
        <Label for='RequestSubType'>
        <b>{curEle.AssignedType}</b>
        </Label> 
        </Col>
        </Col> 
        <Col lg='3' sm='12'>     
        <Label for='Genie'>
        Cyber Genie
        </Label>
        <Label for='Genie'>
        <b>{curEle.AssignedUser}</b>
        </Label>
        </Col>
        <Col lg='3' sm='12'>
            <br/>
        <Button type='button' className='me-1' color='primary'>
                  Cancel Ticket
                </Button>
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
