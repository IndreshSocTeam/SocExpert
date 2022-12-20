// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import Select from 'react-select'
import Cleave from 'cleave.js/react'
//import { useForm, Controller } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
// ** Reactstrap Imports
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback, Nav, NavItem, NavLink  } from 'reactstrap'

import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {axiosClient} from '../../../Client'
// ** Utils
//import { selectThemeColors } from '@utils'

import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
// ** Demo Components
//import DeleteAccount from './DeleteAccount'
import '@styles/react/pages/invalid-error.scss'

const intitalInsertValues = {
  StudentDetailId : '',
  ParmanentAddress1 : '',  
  imageSrc: defaultAvatar,
  imageFile: null
}

const PersonalDetailsTabs = () => { 
  
const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
const [insertValues, setInsertValues] = useState([])
const [errors, setErrors] = useState({})


const [country, setCountry] = useState([])

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
  console.log("change country", getCouId)
  axiosClient.get(`Profile/GetStatesOnCountryId?countryId=${getCouId}`).then((res2) => {
    setState(res2.data)     
    console.log('State Display',  res2.data)
  }).catch((error) => {
    console.log("state", error)
  })
}


const handleStateChange = e => {
  const getstateId = e.target.value
  setStateId(getstateId)  
  console.log("change state", getstateId)
  axiosClient.get(`Profile/GetCitiesOnStateId?Stateid=${getstateId}`).then((res3) => {
    setCity(res3.data)     
    console.log('cityDisplay',  res3.data)
  }).catch((error) => {
    console.log("city", error)
  })
}

const handleCityChange = e => {
  const getcity = e.target.value
  setCityId(getcity)  
  console.log("change city", getcity)
}


const handleInputChange = e => {
  const {name, value} = e.target
  setInsertValues({
    ...insertValues,
    [name]: value
  })
  console.log("Personal Details", insertValues)
}

const showPreview = e => {
  if (e.target.files  && e.target.files[0]) {
    const imgFile = e.target.files[0]
    const reader = new FileReader()  
     reader.onload = () => {
      setFileSelected({imgFileName:imgFile.name, imgbaseUrl:reader.result})        
    console.log("Image result", reader.result)
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
    console.log("fileSelected", imgFile)
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
  temp.LinkedInProfile = insertValues.LinkedInProfile === ""  ? false : true
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
      axiosClient.post('Profile/SavePersonalDetails', sd).then((res) => {
        toast.success('Personal  Details Updated Scuessfully', {
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


const UploadPic = (e) => {
e.preventDefault()
const um = JSON.stringify({
  UserId:loggedInUserDetails.StudentId,
  TypeId:1,
  CVPath:fileSelected.imgbaseUrl,
  CVName:fileSelected.imgFileName
})
// const formData = new FormData()
// formData.append("CVPath", fileSelected)
// formData.append("CVName", fileSelected.name)
// formData.append("UserId", loggedInUserDetails.StudentId)
// formData.append("TypeId", 1)
// formData.append("Extension", '.jpg')
axiosClient.post('Profile/UpdateCVPic', um, {headers: { 
  'Content-Type': 'application/json'
}}).then((res) => {
  toast.success('Updated Photo Scuessfully', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
    })
  console.log("Upload Profile Picture Res", res)
}).catch((error) => {
  console.log(error)
})
}

const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid' : '')


const [GetPersonalDetails, setGetPersonalDetails] = useState([])   

useEffect(() => {
    axiosClient.get('Profile/GetPersonalDetails', {
      params:{
        StudentId:loggedInUserDetails.StudentId
      }
    }).then((res) => {
      setGetPersonalDetails([res.data])
      console.log('PersonDetails Display',  res.data)
      //api for Country
      axiosClient.get('Profile/GetAllActiveCountry').then((res1) => {        
      console.log('Country Display',  res1.data)
        setCountry(res1.data)        
      })
    }).catch((error) => {
      console.log(error)
    })
}, [])

// if (insertValues.mobileNo !== undefined) {
//   const phnolen = Object.keys(insertValues.mobileNo).length
//   console.log("lenphone", phnolen)
// }

  return (
    <Fragment>   
    {
      GetPersonalDetails.map(curEle => (
     
      <Card>
        <CardHeader className='border-bottom' >
          <CardTitle tag='h4'>Profile Details</CardTitle>
        </CardHeader>
        <CardBody>
        <Form className='mt-2 pt-50' autoComplete='off' onSubmit={handleFormSubmit}>
          <div className='d-flex'>
            <div className='me-25' >
            { fileSelected.imgbaseUrl &&
              <div>
              <ReactCrop src={fileSelected.imgbaseUrl} crop={crop} onChange={c => setCrop(c)} >
              <img className='rounded me-50' src={fileSelected.imgbaseUrl}  alt='Profile Photo' height='100' width='100' />
              </ReactCrop>
              </div>
              }
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
                  First Name
                </Label>  
                    <Input className={applyErrorClass('firstName')} id='firstName' name='firstName' placeholder='Anand'  defaultValue={curEle.Fname} onChange={handleInputChange}/>
                    { insertValues.firstName === "" ? <span className='text-danger'>Please Fill Out the First Name</span> : ""}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='lastName'>
                  Last Name
                </Label>
                    <Input className={applyErrorClass('lastName')} id='lastName' name='lastName'placeholder='Guru' defaultValue={curEle.Lname} onChange={handleInputChange}/>
                    { insertValues.lastName === "" ? <span className='text-danger'>Please Fill Out the Last Name</span> : ""}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='emailInput'>
                  E-mail
                </Label>
                <Input id='emailInput' type='email' name='email' defaultValue={curEle.Email} onChange={handleInputChange} readOnly />
              </Col>

              <Col sm='6' className='mb-1'>
              <div className='demo-inline-spacing'>
              <Label className='form-label' for='gender'>
                Gender
                </Label>
              <div className='form-check'>
                <Input type='radio' id='gender-active' value={1} name='gender' checked={curEle.Gender === 1} onChange={handleInputChange} />
                <Label className='form-check-label' for='gender-active'>
                  Male
                </Label>
              </div>
              <div className='form-check'>
                <Input type='radio' name='gender' value={0} id='gender-inactive' checked={curEle.Gender === 0} onChange={handleInputChange}/>
                <Label className='form-check-label' for='gender-inactive'>
                  Female
                </Label>
              </div>
            </div>
            </Col>

            <Col sm='6' className='mb-1'>
            <Label className='form-label' for='mobileNo'>
              Mobile Number
            </Label>    
                <Input type='number' className={applyErrorClass('mobileNo')} id='mobileNo' name='mobileNo' maxLength='10' placeholder='+91 000 0000 000' defaultValue={curEle.Phno} onChange={handleInputChange}/>
                { insertValues.mobileNo === "" ? <span className='text-danger'>Please Fill the Mobile Number</span> : ""}
                {  
                  (insertValues.mobileNo !== undefined) ?  
                    
                      ((Object.keys(insertValues.mobileNo).length !== 10) && (insertValues.mobileNo !== "")) ? <span className='text-danger'>Please Enter Valid Mobile Number</span> : "" : ""
                    }
          </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='whatsappNo'>
                  Whatsapp Number
                </Label>
                    <Input type='number' className={applyErrorClass('whatsappNo')} id='whatsappNo' name='whatsappNo' maxLength='10' placeholder='+91 000 0000 000' defaultValue={curEle.WhatsAppNumber} onChange={handleInputChange}/>
                    { insertValues.whatsappNo === "" ? <span className='text-danger'>Please Fill Out the WhatsApp Number</span> : ""}
                    {  
                      (insertValues.whatsappNo !== undefined) ?                          
                          ((Object.keys(insertValues.whatsappNo).length !== 10) && (insertValues.whatsappNo !== "")) ? <span className='text-danger'>Please Enter Valid Whatsapp Number</span> : "" : ""
                        }
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='ParmanentAddress1'>
                  Address1
                </Label>  
                    <Input type='textarea' className={applyErrorClass('ParmanentAddress1')}  id='ParmanentAddress1' name='ParmanentAddress1' placeholder='21, Tech Park' defaultValue={curEle.Address} onChange={handleInputChange}/>
                    { insertValues.ParmanentAddress1 === "" ? <span className='text-danger'>Please Fill the Parmanent Address</span> : ""}
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='address2'>
                  Address2
                </Label>
                    <Input type='textarea' className={applyErrorClass('address2')} id='address2' name='address2' placeholder='21, Tech Park'/>
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='country'>
                  Country
                </Label> 
                <select
                  name='country'
                  id='country'
                  className='form-control'
                  //classNamePrefix='select'
                  placeholder='Select-Country'
                  //value={curEle.Country}
                  //defaultValue={curEle.Country}
                  onChange={handleCountryChange}
                > <option selected >{curEle.CountryName}</option>
                {
                  country.map((getcountry, index) => (
                    <option key={index} value={getcountry.Id}>{getcountry.Name}</option>
                  ))
                }</select>

               
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='state'>
                  State
                </Label>
                <select
                  name='state'
                  id='state' 
                  className='form-control'
                  onChange={handleStateChange}
                > <option selected >{curEle.StateName}</option>
                {
                  state.map((getstate, index) => (
                    <option key={index} value={getstate.Id}>{getstate.Name}</option>
                  ))
                }</select>
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='city'>
                  City
                </Label>
                <select
                  name='city'
                  id='city' 
                  className='form-control'
                  onChange={handleCityChange}
                > <option selected >{curEle.CityName}</option>
                {
                  city.map((getcity, index) => (
                    <option key={index} value={getcity.Id}>{getcity.Name}</option>
                  ))
                }</select>
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='zipCode'>
                  Pin Code
                </Label>                
                  <Input type='number' id='zipCode' name='zipCode' placeholder='123456' maxLength='6'/>                  
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='LinkedInProfile'>
                LinkedIn Profile
                </Label>
                  <Input className={applyErrorClass('LinkedInProfile')}  id='LinkedInProfile' name='LinkedInProfile' placeholder='www.linkedin.com/' defaultValue={curEle.LinkedInProfilePath} onChange={handleInputChange}/>
                  { insertValues.LinkedInProfile === "" ? <span className='text-danger'>Please Fill the LinkedIn Profile</span> : ""}
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
        </CardBody>
      </Card>

      ))
    }
    </Fragment>
  )
}

export default PersonalDetailsTabs
