// ** React Imports
import { Fragment, useState, useEffect, CSSProperties} from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Input, Label, Button, Form, InputGroup, InputGroupText} from 'reactstrap'

import {Edit2, Edit3, DollarSign} from 'react-feather'

import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ** Demo Components
const RequestTypeOptions = [
  { value: '', label: 'Select Request' },
  { value: '1', label: 'Mock' },
  { value: '2', label: 'CV Review' },
  { value: '3', label: 'Tech' },
  { value: '4', label: 'Borrow Experience' },
  { value: '5', label: 'S3 Connect' }
]


import {axiosClient} from '../../../Client'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
//invalid style class    
import '@styles/react/pages/invalid-error.scss'

import HashLoader from "react-spinners/HashLoader"

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

const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
const intitalInsertValues = {
  RequestType: '',
  ShortDescription : '',
  LongDescription : '', 
}


const CreateRequestTab  = () => {
  
  const [insertValues, setInsertValues] = useState(intitalInsertValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)  

  const [requestType, setRequestType] = useState([])
  const [requestTypeId, setRequestTypeId] = useState('')

  const [subRequestCoins, setSubRequestCoins] = useState([])

  const [subRequestType, setSubRequestType] = useState([])

  const [CVfile, setCVFile] = useState('')

  const handleRequestTypeChange = e => {
    const RequestTypeIdOnSelect = e.target.value
    setRequestTypeId(RequestTypeIdOnSelect)     
    // getAllSubRequestsOnMainRequest        
    setLoading(true)
      axiosClient.get(`Request/getAllSubRequestsOnMainRequest?MainRequestId=${RequestTypeIdOnSelect}`).then((res1) => {
        setLoading(false)
        setSubRequestType(res1.data)
        //GetCoins For Request On Select 
        setLoading(true)
      axiosClient.get(`/Request/GetCoinsForRequest?RequestType=${RequestTypeIdOnSelect}`).then((res2) => {
        setLoading(false)
      setSubRequestCoins([res2.data])
    })
      }).catch((error) => {
        //console.log(error)
        toast.error('Internal server error')
      })
  }
  
  const validate = () => {
    const temp = {}  
    temp.RequestType = requestTypeId === ""  ? false : true
    temp.ShortDescription = insertValues.ShortDescription === ""  ? false : true
    temp.LongDescription = insertValues.LongDescription === ""  ? false : true  
    setErrors(temp)
    return Object.values(temp).every(x => x === true)
  }


useEffect(() => {
  axiosClient.get('Request/GetRequestType').then((res) => {
    setRequestType(res.data)    
  }).catch((error) => {
    //console.log(error)
    toast.error('Internal server error')
  })
}, [requestTypeId])


  const handleInputChange = e => {
    const {name, value} = e.target
    setInsertValues({
      ...insertValues,
      [name]: value
    })
  }

  const handleFormSubmit = e => {
    e.preventDefault()
  }

  const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid' : '')

  //uiuiuyi
  const showPreview = e => {
    if (e.target.files  && e.target.files[0]) {
      const CVFile = e.target.files[0]
      const reader = new FileReader()  
       reader.onload = () => {
        setCVFile({CVFileName:CVFile.name, CVbaseUrl:reader.result})        
      console.log("Image result", reader.result)
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
      console.log("fileSelected", CVFile)
    } 
  }

//bsdfbfwefbhfbfwefbdshcv;
const saveChangesClick = (e) => {
  e.preventDefault()
  if (validate()) {
      const td = JSON.stringify({
        StudentDetailId:loggedInUserDetails.StudentId,              // name mentioned in .net : insertValues.name or id
        TicketRequestTypeId:requestTypeId,
        ShortDescription:insertValues.ShortDescription,
        LongDescription:insertValues.LongDescription,
        RequestName:CVfile.CVFileName,
        RequestPath:CVfile.CVbaseUrl
      })
      setLoading(true)
      axiosClient.post('Request/CreateTicket', td, {headers: { 
        'Content-Type': 'application/json'
      }}).then((res) => {
        setLoading(false)
        toast.success('Ticket Created Sucessfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          })
      }).catch((error) => {
        //console.log(error)
        toast.error('Internal server error')
      })
  }  
}

  return (
    <Fragment>
    <HashLoader
    color={"#5856d6"}
    loading={loading}
    cssOverride={override}
    size={100}
    aria-label="Loading Spinner"
    data-testid="loader"
    speedMultiplier="1"
  />
    <Form  onSubmit={handleFormSubmit}>
    <Row>
          <Col xs={12}>
          <Card>
          <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Create Request</CardTitle>
        </CardHeader>
          <CardBody className='py-2 my-25'>
          <Row>
        <Col sm='12'>
        <Row>
        <Col sm='6' className='mb-1'>   
        <Label for='RequestType' className='form-label'>
        Request Type
        </Label>     
        <select
                  name='RequestType'
                  id='RequestType'
                  className={'form-control'+ applyErrorClass('RequestType')}
                  onChange={handleRequestTypeChange}
                > <option> -- Select-Request Type -- </option>
                {
                  requestType.map((getRequestType, index) => (
                    <option key={index} value={getRequestType.Id}>{getRequestType.Name}</option>
                  ))
                }
                </select>
                { errors.RequestType === false ? <span className='text-danger'>Please Select RequestType</span> : ""}
        </Col>
        <Row>
        <Col sm='6' className='mb-1'>   
        {
          (requestTypeId === '1' || requestTypeId === '8') && (
            <select
                  name='subRequestType'
                  id='subRequestType'
                  className='form-control'
                > <option readOnly> -- Sub-Request Type -- </option>
                {
                  subRequestType.map((getsubRequestType, index) => (
                    <option key={index} value={getsubRequestType.RequestId}>{getsubRequestType.SubRequestType}</option>
                  ))
                }
                </select>
          )
        }
        </Col>
        </Row>
     
        {
          subRequestCoins.map((getsubRequestCoins, index) => (
        <Col sm='6' className='mb-1' key={index}>   
        <Label for='Coins' className='form-label'>
        SE Coins Consumed
        </Label>  
        <InputGroup className='mb-1 input-group-merge'>
                <InputGroupText>
                  <DollarSign size={14} />
                </InputGroupText> 
        <Input name='coins' id='Coins' type='text' readOnly  value={getsubRequestCoins.Coins} placeholder='Coins'></Input>
        </InputGroup>
        </Col>
        ))
                } 
        </Row>
        <Row>
        <Col sm='6' className='mb-1'>   
        <Label for='ShortDescription' className='form-label' >
        Short Description
        </Label>  
        <InputGroup className='mb-1'>
        <InputGroupText>
          <Edit2 size={14} />
        </InputGroupText>    
        <Input type='textarea' className={applyErrorClass('ShortDescription')} name='ShortDescription' id='ShortDescription' placeholder='Write Your Short Description' onChange={handleInputChange}></Input>
        </InputGroup>
        { (errors.ShortDescription === false)  ? <span className='text-danger'>Please Enter the Short Description</span> : ""}
        </Col>
        </Row>
        <Row>
        <Col sm='6' className='mb-1'>   
        <Label for='LongDescription' className='form-label'>
        Long Description
        </Label>
        <InputGroup className='mb-1 input-group-merge'>
        <InputGroupText>
          <Edit3 size={14} />
        </InputGroupText>      
        <Input type='textarea' className={applyErrorClass('LongDescription')} name='LongDescription' id='LongDescription' placeholder='Write Your Long Description' onChange={handleInputChange}></Input>
        </InputGroup>
        { (errors.LongDescription === false)  ? <span className='text-danger'>Please Enter the Long Description</span> : ""}
        </Col>
        </Row>
        <Row>
        <Col sm='6' className='mb-1'>   
        <Label for='anyAttachment' className='form-label'>
        Any Attachment (Optional)
        </Label>     
        <Input type='file' name='anyAttachment' id='anyAttachment' onChange={showPreview}></Input>
        </Col>
        </Row>
        </Col>
        {
          requestTypeId === '2' && (
            <Row>
            <Col sm='6' className='p-2'> 
            <Label for='cvUpload' className='form-label'>CV UPLOAD</Label>
            <Input type='file' name='cvUpload' id='cvUpload'></Input>        
            </Col>
            </Row>  
          )
        }
        <Col className='mt-2' sm='12'>
        <Button type='Submit' className='me-1' color='primary' onClick={saveChangesClick}>
          Create Ticket
        </Button>
      </Col>
        </Row>
          </CardBody>
          </Card>           
          </Col>
        </Row>
        </Form>
    </Fragment>
  )
}

export default CreateRequestTab
