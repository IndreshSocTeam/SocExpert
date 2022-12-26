// ** React Imports
import { Fragment, useState, useEffect, CSSProperties } from 'react'
import {User, Users, PhoneForwarded, Smartphone, MapPin, Home, Linkedin, Mail, Globe } from 'react-feather'
// ** Third Party Components
import Select from 'react-select'
import Cleave from 'cleave.js/react'
//import { useForm, Controller } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
// ** Reactstrap Imports
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText} from 'reactstrap'

import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {axiosClient} from '../../../Client'
// ** Utils
//import { selectThemeColors } from '@utils'

import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
// ** Demo Components
//import DeleteAccount from './DeleteAccount'
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

const PersonalDetailsTabs = () => { 
  

const [GetPersonalDetails, setGetPersonalDetails] = useState([])  

const [country, setCountry] = useState([])
const [loading, setLoading] = useState(false)


// const intitalInsertValues = {
//   firstName : GetPersonalDetails.map((a) => a.Fname),
//   lastName : GetPersonalDetails.map((a) => a.Lname),  
//   mobileNo: GetPersonalDetails.map((a) => a.Phno),
//   whatsappNo: GetPersonalDetails.map((a) => a.WhatsAppNumber),
//   ParmanentAddress1: GetPersonalDetails.map((a) => a.Address),
//   country: GetPersonalDetails.map((a) => a.CountryName),
//   state: GetPersonalDetails.map((a) => a.StateName),
//   city: GetPersonalDetails.map((a) => a.CityName),
//   LinkedInProfile: GetPersonalDetails.map((a) => a.LinkedInProfilePath),
//   zipCode:''
// }

  const intitalInsertValues = {
    firstName : '',
    lastName : '',  
    mobileNo: '',
    whatsappNo: '',
    ParmanentAddress1: '',
    country: '',
    state: '',
    city: '',
    LinkedInProfile: '',
    zipCode:''
  }


const [insertValues, setInsertValues] = useState([])

const [errors, setErrors] = useState({})

const [countryId, setCountryId] = useState('')
const [state, setState] = useState([])

const [Stateid, setStateId] = useState('')
const [city, setCity] = useState([])

const [cityId, setCityId] = useState('')

const [fileSelected, setFileSelected] = useState('')

const [crop, setCrop] = useState({
  unit: '%', // Can be 'px' or '%'
  x: 25,
  y: 25,
  width: 50,
  height: 50
})


const handleCountryChange = e => {
  const getCouId = e.target.value
  setCountryId(getCouId)  
  setLoading(true)
  axiosClient.get(`Profile/GetStatesOnCountryId?countryId=${getCouId}`).then((res2) => {
    setLoading(false)
    setState(res2.data)     
  }).catch((error) => {    
    //console.log(error)
    toast.error("Internal server error")
  })
}


const handleStateChange = e => {
  const getstateId = e.target.value
  setStateId(getstateId)  
  setLoading(true)
  axiosClient.get(`Profile/GetCitiesOnStateId?Stateid=${getstateId}`).then((res3) => {
    setLoading(false)
    setCity(res3.data)     
  }).catch((error) => {
    //console.log(error)
    toast.error("Internal server error")
  })
}

const handleCityChange = e => {
  const getcity = e.target.value
  setCityId(getcity)  
}


const handleInputChange = e => {
  const {name, value} = e.target
  setInsertValues({
    ...insertValues,
    [name]: value
  })
}

const showPreview = e => {
  if (e.target.files  && e.target.files[0]) {
    const imgFile = e.target.files[0]
    const reader = new FileReader()  
     reader.onload = () => {
      setFileSelected({imgFileName:imgFile.name, imgbaseUrl:reader.result})    
    }  
    if (imgFile.size > 800000) {
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
        setFileSelected({imgFileName:null, imgbaseUrl:defaultAvatar})  
    }
    reader.readAsDataURL(imgFile)
  } else {
    setFileSelected({imgFileName:null, imgbaseUrl:defaultAvatar}) 
  }
}

const validate = () => {
  const temp = {}  
  temp.firstName = insertValues.firstName === ""  ? false : true
  temp.lastName = insertValues.lastName === ""  ? false : true
  temp.mobileNo = insertValues.mobileNo === ""  ? false : true  
  temp.whatsappNo = insertValues.whatsappNo === ""  ? false : true  
  temp.ParmanentAddress1 = insertValues.ParmanentAddress1 === ""  ? false : true
  temp.country = insertValues.country === ""  ? false : true 
  temp.state = insertValues.state === ""  ? false : true 
  temp.city = insertValues.city === ""  ? false : true 
  temp.LinkedInProfile = insertValues.LinkedInProfile === ""  ? false : true
  temp.zipCode = insertValues.zipCode  === ""  ? false : true
  setErrors(temp)
  return Object.values(temp).every(x => x === true)
}

const resetForm = () => {
  setInsertValues(intitalInsertValues)
  setErrors({})
}

const handleFormSubmit = e => {
  e.preventDefault()
}

const saveChangesClick = (e) => {
  e.preventDefault()
  if (validate()) {
      const sd = {
        StudentDetailId:loggedInUserDetails.StudentId,
        FirstName:insertValues.firstName,
        LastName:insertValues.lastName,
        MobileNumber:insertValues.mobileNo,
        Gender:insertValues.gender,
        WhatsAppNumber:insertValues.whatsappNo,
        ParmanentAddress:insertValues.ParmanentAddress1,                     // name mentioned in .net : insertValues.name or id
        CountryId:countryId,
        StateId:Stateid,
        CityId:cityId,
        LinkedInProfilePath:insertValues.LinkedInProfile
      }
      setLoading(true)
      axiosClient.post('Profile/SavePersonalDetails', sd).then((res) => {
        setLoading(false)
        toast.success('Personal  Details Updated Sucessfully', {
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


const UploadPic = (e) => {
e.preventDefault()
const um = JSON.stringify({
  UserId:loggedInUserDetails.StudentId,
  TypeId:1,
  CVPath:fileSelected.imgbaseUrl,
  CVName:fileSelected.imgFileName
})
setLoading(true)
axiosClient.post('Profile/UpdateCVPic', um, {headers: { 
  'Content-Type': 'application/json'
}}).then((res) => {
  setLoading(false)
  toast.success('Uploaded Photo Sucessfully', {
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
 // console.log(error)
  toast.error('Internal server error')
})
}

useEffect(() => {
  setLoading(true)
  axiosClient.get('Profile/GetPersonalDetails', {
    params:{
      StudentId:loggedInUserDetails.StudentId
    }
  }).then((res) => {
    setLoading(false)
    setGetPersonalDetails([res.data])
    axiosClient.get('Profile/GetAllActiveCountry').then((res1) => {   
      setCountry(res1.data)        
    })
  }).catch((error) => {
    //console.log(error)
    toast.error("Internal server error")
  })
}, [])

const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid' : '')


  return (
    <Fragment>  
      <Card>
        <CardHeader className='border-bottom' >
          <CardTitle tag='h4'>Profile Details</CardTitle>
        </CardHeader>        
      <HashLoader
      color={"#5856d6"}
      loading={loading}
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
      speedMultiplier="1"
    />
        <CardBody>
         
    {
      GetPersonalDetails.map((curEle, index) => (
     
        <Form className='mt-2 pt-50' autoComplete='off' onSubmit={handleFormSubmit} key={index}>
          <div className='d-flex'>
            <div className='me-25' >
            { fileSelected.imgbaseUrl &&
              <div>
              <ReactCrop src={fileSelected.imgbaseUrl} crop={crop} onChange={c => setCrop(c)} >
              <img className='rounded me-50' src={fileSelected.imgbaseUrl}  alt='Profile Photo' height='100' width='100' />
              </ReactCrop>
              </div>
              }
              <img className='rounded me-50' src={curEle.ProfilePic}  alt='Profile Photo' height='100' width='100' />
            </div>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
              <Input type='file' className='form-control-file' id='ProfilePicture' name='ProfilePicture'  accept='image/*' onChange={showPreview}/>
              <div className='mt-1 pt-50'>
              <Button className='mb-75 me-75' size='sm' color='primary' onClick={UploadPic}>
                  Upload
                  </Button>
                <Button className='mb-75' color='secondary' size='sm' outline>
                  Reset
                </Button>
                <p className='mb-0'>Allowed JPG, JPEG or PNG. Max size of 800kB</p>
                </div>
              </div>
            </div>
          </div>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='firstName'>
                  First Name<span className='text-danger'>*</span>
                </Label>
                <InputGroup className={'input-group-merge'+applyErrorClass('firstName')}>
                <InputGroupText>
                  <User size={14} />
                </InputGroupText>   
                    <Input id='firstName' name='firstName' placeholder='First Name' defaultValue={curEle.Fname} onChange={handleInputChange}/>
                    </InputGroup>
                    { errors.firstName === false ? <span className='text-danger'>Please Enter Your First Name</span> : ""}
              </Col>
             <Col sm='6' className='mb-1'>
                <Label className='form-label' for='lastName'>
                  Last Name<span className='text-danger'>*</span>
                </Label>
                <InputGroup className='mb-1'>
                <InputGroupText>
                  <Users size={14} />
                </InputGroupText> 
                    <Input className={applyErrorClass('lastName')} id='lastName' name='lastName' placeholder='Last Name' defaultValue={curEle.Lname} onChange={handleInputChange}/>
                    </InputGroup>
                    { errors.lastName === false ? <span className='text-danger'>Please Enter Your Last Name</span> : ""}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='emailInput'>
                  E-mail
                </Label>
                <InputGroup className='mb-1'>
                <InputGroupText>
                  <Mail size={14} />
                </InputGroupText> 
                <Input id='emailInput' type='email' name='email' defaultValue={curEle.Email} onChange={handleInputChange} readOnly />
                </InputGroup>
              </Col>

              <Col sm='6' className='mb-1'>
              <div className='demo-inline-spacing'>
              <Label className='form-label' for='gender'>
                Gender<span className='text-danger'>*</span>
                </Label>
                <Row>
                <Col>
              <div className='form-check'>
                <Input type='radio' id='gender-active' value={1} name='gender' checked={curEle.Gender=='1'} onChange={handleInputChange} />
                <Label className='form-check-label' for='gender-active'>
                  Male
                </Label>
              </div>
              </Col>
              <Col>
              <div className='form-check'>
                <Input type='radio' name='gender' value={0} id='gender-inactive' checked={curEle.Gender=='0'} onChange={handleInputChange}/>
                <Label className='form-check-label' for='gender-inactive'>
                  Female
                </Label>
              </div>
              </Col>
              </Row>
            </div>
            </Col>

            <Col sm='6' className='mb-1'>
            <Label className='form-label' for='mobileNo'>
              Mobile Number<span className='text-danger'>*</span>
            </Label>    
            <InputGroup className='mb-1'>
            <InputGroupText>
              <PhoneForwarded size={14} />
            </InputGroupText> 
                <Input type='number' className={applyErrorClass('mobileNo')} id='mobileNo' name='mobileNo' maxLength='10' placeholder='+91 000 0000 000' defaultValue={curEle.Phno} onChange={handleInputChange}/>
                </InputGroup>
                { errors.mobileNo === false ? <span className='text-danger'>Please Enter Your Mobile Number</span> : ""}
                 {  
                  (insertValues.mobileNo !== undefined) ?  
                    
                      ((Object.keys(insertValues.mobileNo).length !== 10) && (insertValues.mobileNo !== "")) ? <span className='text-danger'>Please Enter Valid Mobile Number</span> : "" : ""
                    }
          </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='whatsappNo'>
                  Whatsapp Number<span className='text-danger'>*</span>
                </Label>
                <InputGroup className='mb-1'>
                <InputGroupText>
                  <Smartphone size={14} />
                </InputGroupText> 
                    <Input type='number' className={applyErrorClass('whatsappNo')} id='whatsappNo' name='whatsappNo' maxLength='10' placeholder='+91 000 0000 000' defaultValue={curEle.WhatsAppNumber} onChange={handleInputChange}/>
                    </InputGroup>
                    { errors.whatsappNo === false ? <span className='text-danger'>Please Enter Your WhatsApp Number</span> : ""}
                 {  
                      (insertValues.whatsappNo !== undefined) ?                          
                          ((Object.keys(insertValues.whatsappNo).length !== 10) && (insertValues.whatsappNo !== "")) ? <span className='text-danger'>Please Enter Valid Whatsapp Number</span> : "" : ""
                        }
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='ParmanentAddress1'>
                  Permanent Address<span className='text-danger'>*</span>
                </Label>  
                <InputGroup className='mb-1'>
                <InputGroupText>
                  <Home size={14} />
                </InputGroupText> 
                    <Input type='textarea' className={applyErrorClass('ParmanentAddress1')}  id='ParmanentAddress1' name='ParmanentAddress1' placeholder='21, Tech Park' defaultValue={curEle.Address} onChange={handleInputChange}/>
                   </InputGroup>
                    { errors.ParmanentAddress1 === false ? <span className='text-danger'>Please Enter Your Permanent Address</span> : ""}
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='address2'>
                  Current Address (optional)
                </Label>
                <InputGroup className='mb-1'>
                <InputGroupText>
                  <Globe size={14} />
                </InputGroupText> 
                    <Input type='textarea' className={applyErrorClass('address2')} id='address2' name='address2' placeholder='21, Tech Park'/>
             </InputGroup>
                    </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='country'>
                  Country<span className='text-danger'>*</span>
                </Label> 
                <select
                  name='country'
                  id='country'
                  className={'form-control'+ applyErrorClass('country')}
                  placeholder='Select-Country'
                  onChange={handleCountryChange}
                > <option readOnly>{curEle.CountryName!==null?curEle.CountryName:'--Select Country --'}</option>
                {
                  country.map((getcountry, index) => (
                    <option key={index} value={getcountry.Id}>{getcountry.Name}</option>
                  ))
                }</select>
                { errors.country === false ? <span className='text-danger'>Please Select Your Country</span> : ""}               
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='state'>
                  State<span className='text-danger'>*</span>
                </Label>
                <select
                  name='state'
                  id='state' 
                  className={'form-control'+ applyErrorClass('state')}
                  onChange={handleStateChange}
                > <option readOnly>{curEle.StateName!==null?curEle.StateName:'--Select State --'}</option>
                {
                  state.map((getstate, index) => (
                    <option key={index} value={getstate.Id}>{getstate.Name}</option>
                  ))
                }</select>
                { errors.state === false ? <span className='text-danger'>Please Select Your State</span> : ""}    
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='city'>
                  City<span className='text-danger'>*</span>
                </Label>
                <select
                  name='city'
                  id='city' 
                  className={'form-control'+ applyErrorClass('city')}
                  onChange={handleCityChange}
                > <option readOnly>{curEle.CityName!==null?curEle.CityName:'--Select City --'}</option>
                {
                  city.map((getcity, index) => (
                    <option key={index} value={getcity.Id}>{getcity.Name}</option>
                  ))
                }</select>
                { errors.city === false ? <span className='text-danger'>Please Select Your City</span> : ""} 
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='zipCode'>
                  Pin Code<span className='text-danger'>*</span>
                </Label> 
                <InputGroup className='mb-1'>
          <InputGroupText>
            <MapPin size={14} />
          </InputGroupText>                
                  <Input type='number' id='zipCode' className={applyErrorClass('zipCode')} name='zipCode' placeholder='123456' maxLength='6' onChange={handleInputChange}/>                  
              </InputGroup>
              { errors.zipCode === false ? <span className='text-danger'>Please Enter Your PinCode</span> : ""}
                  </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='LinkedInProfile'>
                LinkedIn Profile<span className='text-danger'>*</span>
                </Label>
                <InputGroup className='mb-1'>
          <InputGroupText>
            <Linkedin size={14} />
          </InputGroupText> 
          <Input className={applyErrorClass('LinkedInProfile')}  id='LinkedInProfile' name='LinkedInProfile' placeholder='https//:www.linkedin.com/' defaultValue={curEle.LinkedInProfilePath} onChange={handleInputChange}/>
                </InputGroup>
                { errors.LinkedInProfile === false ? <span className='text-danger'>Please Enter Your LinkedIn Profile</span> : ""}     
                  </Col>
              <Col className='mt-2' sm='12'>
                <Button type='submit' className='me-1' color='primary' onClick={saveChangesClick}>
                  Save changes
                </Button>
                <Button type='reset' color='secondary' outline onClick={resetForm}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
          
      ))
    }
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default PersonalDetailsTabs
