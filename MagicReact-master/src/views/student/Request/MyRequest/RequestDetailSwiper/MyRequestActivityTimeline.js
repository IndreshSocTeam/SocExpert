
import Rating from 'react-rating'
import { Star } from 'react-feather'

import { Fragment, useState, useEffect} from 'react'
// ** Icons Imports
import { Link, useParams } from 'react-router-dom'
// ** Reactstrap Imports
import {  Row, Col, Label, Form, Card, CardHeader, CardTitle, CardBody, Button, Input } from 'reactstrap'

import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '@styles/react/pages/invalid-error.scss'

import {axiosClient} from '../../../../../Client'
import Cookies from 'js-cookie'
import {AES, enc} from 'crypto-js'

const MyRequestActivityTimeLinePage = () => {

  //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
  //const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
const loggedInUserDetails = JSON.parse(AES.decrypt(Cookies.get("loggedInUserDetails"), 'secret-key').toString(enc.Utf8));

  const {ticketNumberid} = useParams()

  const intialValues = {
    comment : '',
    attachment : ''
  }
  const [comments, setComments] = useState(intialValues)
  const [errors, setErrors] = useState({})
  const [CVfile, setCVFile] = useState('')

  const handleInputChange = e => {
    const {name, value} = e.target
    setComments({
      ...comments,
      [name]: value
    })
  }

  const validate = () => {
    let temp = {}  
    //temp.comment = comments.comment !== ""    OR
    temp.comment = comments.comment === ""  ? false : true
    temp.attachment = comments.attachment === ""  ? false : true
    setErrors(temp)
    return Object.values(temp).every(x => x === true)
  }

  const showPreview = e => {
    if (e.target.files  && e.target.files[0]) {
      const CVFile = e.target.files[0]
      const reader = new FileReader()  
       reader.onload = () => {
        setCVFile({CVFileName:CVFile.name, CVbaseUrl:reader.result})  
      }  
      if (CVFile.size > 800000) {
        toast.error('Image Size Should be less than 800KB', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          }) 
      }
      reader.readAsDataURL(CVFile)
    } 
  }

  const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid' : '')

  const saveChangesClick = (e) => {
    e.preventDefault()
    if (validate()) {        
      axiosClient.post(`Request/AddNote?Comment=${comments.comment}&UserId=${loggedInUserDetails.StudentId}&TypeId=1&TicketNumber=${ticketNumberid}`).then((res) => {
       axiosClient.post(`/Request/AddAttachment?UserId=${loggedInUserDetails.StudentId}&RequestName=${CVfile.CVFileName}&RequestPath=${CVfile.CVbaseUrl}`).then((res2) => {      
      toast.success('Uploaded Sucessfully', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light"
                  })
    })
      }).catch((error) => {
        console.log(error)
      })
      }
  }
  
  // const saveChangesClick = (e) => {
  //   e.preventDefault()
  //   if (validate()) {        
  //         toast.success('Validate Sucessfully', {
  //           position: "top-center",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light"
  //           })
  //     } else {
  //       toast.error('Not Validate Sucessfully', {
  //         position: "top-center",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light"
  //         })
  //     }
  // }

  return (
    <Fragment>
    <Card title='Review Assignment'>
          <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Request Activity TimeLine</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25 p-2'>
        <form>
      <Row>
        <Col sm='12'>
        <Row>
        <Col className='p-2'>  
        <Label for='comment' className='form-label'>
        Comment
        </Label>        
        <Input type='textarea' className={applyErrorClass('comment')} placeholder='Write Your Comment' id='comment' name='comment' onChange={handleInputChange}></Input>
        { comments.comment === '' ? <span className='text-danger'>Please Fill Out the Comment</span> : ""}
        </Col>
        </Row>
        <Row>
        <Col className='p-2'> 
        <Label for='attachment' className='form-label'>
        Attachment
        </Label> 
        <Input type='file' id='attachment' name='attachment' onChange={showPreview}></Input>        
       {/* { comments.attachment === '' ? <span className='text-danger'>Upload the file</span> : ""} */}
        </Col>
        </Row>  
        {/* <Row>
        <Col className='p-2'>
        <Label>Satisifaction Level</Label><br/>
        <Rating
          fractions={2}
          direction={dir}
          initialRating={2.5}
          emptySymbol={<Star size={32} fill='#fcb103' stroke='#fcc603' />}
          fullSymbol={<Star size={32} fill={filledColor} stroke={filledColor} />}
        />
        </Col>
  </Row>       
        <Row>
        <Col className='p-2'> 
        <Input type='textarea' placeholder='FeedBack About Cyber Genie'></Input>             
        </Col>
        </Row>*/}
        </Col>
        <Col className='mt-2' sm='12'>
        <Button type='button' className='me-1' color='primary' onClick={saveChangesClick}>
        Add Note
      </Button>
      </Col>        
        </Row>
        </form>
        </CardBody>
        </Card>
      </Fragment>
    
  )
}

export default MyRequestActivityTimeLinePage
