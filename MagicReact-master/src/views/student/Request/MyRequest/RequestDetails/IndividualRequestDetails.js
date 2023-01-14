
import { Link, useParams } from 'react-router-dom'

import { Fragment, useState, useEffect} from 'react'
import Slider from './../RequestDetailSwiper/index'
// ** Icons Imports

import {axiosClient} from '../../../../../Client'
// ** Reactstrap Imports


const MyRequestDetailsPage = () => {

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
    <Fragment>
      <Slider/>
    {/* <Card title='Review Assignment'>
    <CardHeader className='border-bottom'>
    <CardTitle tag='h4'>Request Details</CardTitle>
  </CardHeader>
  {
    GetRequestTicketDetails.map(curEle => (
   
  <CardBody className='py-2 my-25 p-2'>
      <Row>
        <Col sm='12'>
        <Row>
        <Col>        
        <Label for='RequestID' className='col-2'>
        Request ID:
        </Label>
        <Label for='RequestID' className='col-2'>
        <b>
        {curEle.Number}</b>
        </Label>
        <Label for='Date'className='col-2'>
        Date
        </Label>
        <Label for='Date' className='col-2'>
        <b>
        {curEle.CreatedDate}</b>
        </Label>        
        <Label for='Genie'className='col-2'>
        Cyber Genie
        </Label>
        <Label for='Genie' className='col-2'>
        <b>{curEle.AssignedUser}</b>
        </Label>
        </Col>
        </Row>
        <Row>
        <Col> 
        <Label for='Status'className='col-2'>
        Status
        </Label>
        <Label for='Status' className='col-2'>
        <b>{curEle.State}</b>
        </Label>
        <Label for='RequestType'className='col-2'>
        Request Type
        </Label>
        <Label for='RequestType' className='col-2'>
        <b>{curEle.RequestType}</b>
        </Label>        
        </Col>
        </Row>        
        <Row>
        <Col> 
        <Label for='SECoin'className='col-2'>
        SE-Coin spend
        </Label>
        <Label for='SECoin' className='col-2'>
        <b>{curEle.Coin}</b>        
        </Label>
        <Label for='RequestSubType'className='col-2'>
        Request Sub-Type
        </Label>
        <Label for='RequestSubType' className='col-2'>
        <b>{curEle.AssignedType}</b>
        </Label>               
        </Col>
        </Row> <br/>
        Short Description: <b>{curEle.ShortDescription}</b>   <br/>
        Long Description: <b>{curEle.LongDescription}</b>   
        </Col>
        </Row>
        <Col className='mt-2' sm='12'>
                <Button type='button' className='me-1' color='primary'>
                  Cancel Ticket
                </Button>
              </Col>
              </CardBody>  
              
      ))
    }
        </Card> */}
      </Fragment>
    
  )
}

export default MyRequestDetailsPage
