// ** React Imports
import { Fragment, useState, useEffect} from 'react'

// ** Third Party Components
import Select from 'react-select'
// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Input, Label, Button, Form} from 'reactstrap'


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
import '@styles/react/pages/invalid-error.scss'

const CreateRequestTab  = () => {
  
  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
  const [insertValues, setInsertValues] = useState([])
  const [errors, setErrors] = useState({})

  const [requestType, setRequestType] = useState([])
  const [requestTypeId, setRequestTypeId] = useState('')

  const [subRequestCoins, setSubRequestCoins] = useState([])

  const [subRequestType, setSubRequestType] = useState([])

  const [CVfile, setCVFile] = useState('')

  const handleRequestTypeChange = e => {
    const RequestTypeIdOnSelect = e.target.value
    setRequestTypeId(RequestTypeIdOnSelect) 
    
    // getAllSubRequestsOnMainRequest        
      axiosClient.get(`Request/getAllSubRequestsOnMainRequest?MainRequestId=${RequestTypeIdOnSelect}`).then((res1) => {
        setSubRequestType(res1.data)
        console.log('SubRequest Type',  res1.data)
        //GetCoins For Request On Select 
      axiosClient.get(`/Request/GetCoinsForRequest?RequestType=${RequestTypeIdOnSelect}`).then((res2) => {
      setSubRequestCoins([res2.data])
      console.log('Request Type coins',  res2.data)
    })
      }).catch((error) => {
        console.log(error)
      })
  }
  
  const validate = () => {
    const temp = {}  
    temp.ShortDescription = insertValues.ShortDescription === ""  ? false : true
    temp.LongDescription = insertValues.LongDescription === ""  ? false : true
    return Object.values(temp).every(x => x === true)
  }


useEffect(() => {
  axiosClient.get('Request/GetRequestType').then((res) => {
    setRequestType(res.data)
    console.log('Request Type',  res.data)
    //  coins
    
  }).catch((error) => {
    console.log(error)
  })
}, [requestTypeId])


  const handleInputChange = e => {
    const {name, value} = e.target
    setInsertValues({
      ...insertValues,
      [name]: value
    })
    console.log("Create request Details", insertValues)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
  }

  const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid' : '')

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
      axiosClient.post('Request/CreateTicket', td, {headers: { 
        'Content-Type': 'application/json'
      }}).then((res) => {
        toast.success('Ticket Created Scuessfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
          })
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
      setErrors(insertValues)
  }  
}
  return (
    <Fragment>
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
                  className='form-control'
                  //classNamePrefix='select'
                  onChange={handleRequestTypeChange}
                > <option value="select">Select-Request Type</option>
                {
                  requestType.map((getRequestType, index) => (
                    <option key={index} value={getRequestType.Id}>{getRequestType.Name}</option>
                  ))
                }
                </select>
        </Col>
        <Row>
        <Col sm='6' className='mb-1'>   
        {
          (requestTypeId === '1' || requestTypeId === '8') && (
            <select
                  name='subRequestType'
                  id='subRequestType'
                  className='form-control'
                > <option value="select">Sub-Request Type</option>
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
        <Col sm='6' className='mb-1'>   
        <Label for='RequestType' className='form-label'>
        SE Coins Consumed
        </Label>  
        <Input type='text' readOnly key={index} value={getsubRequestCoins.Coins} placeholder='Coins'></Input>
        </Col>
        ))
                } 
        </Row>
        <Row>
        <Col sm='6' className='mb-1'>   
        <Label for='ShortDescription' className='form-label' >
        Short Description
        </Label>     
        <Input type='textarea' className={applyErrorClass('ShortDescription')} name='ShortDescription' id='ShortDescription' placeholder='Write Your Short Description' onChange={handleInputChange}></Input>
        { (insertValues.ShortDescription === "") || (insertValues.ShortDescription === null) || (insertValues.ShortDescription === undefined) ? <span className='text-danger'>Please Fill the Short Description</span> : ""}
        </Col>
        </Row>
        <Row>
        <Col sm='6' className='mb-1'>   
        <Label for='LongDescription' className='form-label'>
        Long Description
        </Label>     
        <Input type='textarea' className={applyErrorClass('LongDescription')} name='LongDescription' id='LongDescription' placeholder='Write Your Long Description' onChange={handleInputChange}></Input>
        { (insertValues.LongDescription === "") || (insertValues.LongDescription === null) || (insertValues.LongDescription === undefined) ? <span className='text-danger'>Please Fill the Long Description</span> : ""}
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
