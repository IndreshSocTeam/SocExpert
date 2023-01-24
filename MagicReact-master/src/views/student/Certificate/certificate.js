import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback, Nav, NavItem, NavLink  } from 'reactstrap'
import { Link} from 'react-router-dom'
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {axiosClient} from '../../../Client'
import CertificateImg from '@src/assets/images/student/certificateImg.jpg'
import CourseCompletion from '@src/assets/images/student/CourseCompletion.png'
import Cookies from 'js-cookie'

// /Certificate/GetDownloadableCertificates
// [Route("api/Certificate/isCourseCompletionCertificateAvilable")]


const certificate = () => {  
  //const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
  const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))

    const [certified, setCertified] = useState([])
    
    useEffect(() => {
        axiosClient.get(`Certificate/GetDownloadableCertificates?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setCertified(res.data)
        }).catch((error) => {
          //console.log(error)
          toast.error('Internal Server Error')
        })
    }, [])
    
    
  return (
    <div>
    <Fragment>   
      <Card>
        <CardHeader className='border-bottom' >
          <CardTitle tag='h4'>Download Certificate</CardTitle>
        </CardHeader>
        <CardBody>
        <Form className='mt-2' autoComplete='off'>
        {(certified.length === 0) ? ( 
        <div>
        <div >
        <h2>Certificate</h2>
        <p>Sorry, you don't have any certificates to download. You joined us for a reason; Do not rest, till you achieve that goal.</p>
    </div>
    <div>              
    <img src={CertificateImg}  alt='Certificate' height='360' width='100%' className="img-responsive" />         
    </div>
        </div>
        ) :  (
            <div> 
            {
                certified.map((ct, index) => (                
            <Col key={index} className='mt-2' sm='12'>
            <Link  to={`/student/downloadCertificate/${ct.Id}`} target='_blank'>
            
            <img style={{filter:'blur(5px)'}} className="img-responsive" src={CourseCompletion} alt='Certificate' height='360px' width='300px' />
          <br/>
            <Button key={index} className='me-1' style={{width:'300px'}} color='primary' type='button'>Download</Button>
            
            </Link>
            </Col>
            ))
            }
            </div>           
        )
        }
        </Form>
        </CardBody>
    </Card>
    </Fragment>
    </div>
  )
}

export default certificate
