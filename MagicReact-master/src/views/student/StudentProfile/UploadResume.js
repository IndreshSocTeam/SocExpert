// ** React Imports
import { useState, useEffect, Fragment, CSSProperties } from 'react'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Row, Col, Label, Form, Input } from 'reactstrap'


import { Badge } from 'reactstrap'
import { Link } from 'react-feather'
// ** Third Party Imports
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// invalid class 
import '@styles/react/pages/invalid-error.scss'

import {axiosClient} from '../../../Client'
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


const UploadeResumeTabs = () => {

//const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
//const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
const loggedInUserDetails = JSON.parse(AES.decrypt(Cookies.get("loggedInUserDetails"), 'secret-key').toString(enc.Utf8));

  const [CVDetails, setCVDetails] = useState([])

  const [updateJobPreferences, setUpdateJobPreferences] = useState([])
  const [preferedLocation, setPreferedLocation] = useState([])

  const [fileSelected, setFileSelected] = useState('')

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)   

  const showPreview = e => {
    if (e.target.files  && e.target.files[0]) {
      const imgFile = e.target.files[0]
      const reader = new FileReader()  
       reader.onload = () => {
        setFileSelected({imgFileName:imgFile.name, imgbaseUrl:reader.result})   
      }  
      if (imgFile.size > 900000) {
        toast.error('PDF File Size Should be less than 1MB', {
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
      reader.readAsDataURL(imgFile)
    } 
  }

  const handleInputChange = e => {
    const {name, value} = e.target
    setUpdateJobPreferences({
      ...updateJobPreferences,
      [name]: value
    })
  }

    

  const validate = () => {
    const temp = {}  
    temp.uploadResume = fileSelected === ""  ? false : true
    temp.preferedLocation = (updateJobPreferences === undefined || updateJobPreferences === "")  ? false : true
    setErrors(temp)
    return Object.values(temp).every(x => x === true)
  }



    const saveChangesClick = (e) => {
    e.preventDefault()
    if (validate()) {
        const sd = {
          StudentDetailId:loggedInUserDetails.StudentId,
          PreferedLocation:updateJobPreferences.preferedLocation
        }
        const um = JSON.stringify({
          UserId:loggedInUserDetails.StudentId,
          TypeId:2,
          CVPath:fileSelected.imgbaseUrl,
          CVName:fileSelected.imgFileName
        })
        setLoading(true)
        axiosClient.post('Profile/UpdateCVPic', um, {headers: { 
          'Content-Type': 'application/json'
        }}).then((Uploadres) => {
          axiosClient.post('Profile/UpdateJobPreferences', sd).then((res) => {            
          setLoading(false)
            toast.success('Uploaded Resume Sucessfully', {
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
          //console.log(error)
      toast.error('Internal server error')
        })
      }
  }


 
useEffect(() => {
  setLoading(true)
  axiosClient.get(`Profile/GetCVDetails?StudentId=${loggedInUserDetails.StudentId}`).then((CVDetailsRes) => {
    setCVDetails([CVDetailsRes.data])
    axiosClient.get('Profile/GetAllActivePreferedLocation').then((jobPreferencesres) => {
      setPreferedLocation(jobPreferencesres.data)
    })
    setLoading(false)
  }).catch((error) => {
    //console.log(error)
      toast.error('Internal server error')
  })
}, [])

const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid' : '')

const resetForm = () => {
  setErrors({})
}


  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Upload Your Resume</CardTitle>
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
      <Form className='mt-2 pt-50'>   
      
      {
        CVDetails.map((display,index) => (  
        <Row key={index}>
        <Col sm='6' className='mb-1'>
                <Label className='form-label' for='uploadResume'>
                  Upload CV/Resume<span className='text-danger'>*</span>  
                </Label> 
                <Input type='file' className={applyErrorClass('uploadResume')} id='uploadResume' name='uploadResume' accept='application/*' onChange={showPreview} />
                    { errors.uploadResume === false ? <span className='text-danger'>Please Upload Your Resume/CV</span> : ""}
                <br/><br/>
                {
                  display.CVPath !== null && 
                  <Badge color='light-primary' pill href={display.CVPath} target='_blank'>
                  <Link size={14} />
                 <span> Your Resume/CV </span>
                    </Badge>                 
                }
                
              </Col>
             

        <Col sm='6' className='mb-1'>
                  <Label className='form-label' for='preferedLocation'>
                    Prefered Location<span className='text-danger'>*</span>  
                  </Label>                 
                  <select
                  name='preferedLocation'
                  id='preferedLocation'
                  className={'form-control'+ applyErrorClass('preferedLocation')}
                  placeholder='Select-Prefered Location'
                  onChange={handleInputChange}
                >
                <option readOnly>{display.PreferedLocationName !== null ? display.PreferedLocationName : ' -- select PreferedLocation -- '}</option>
                {
                  preferedLocation.map((getResult, index) => (
                  <option key={index} value={getResult.Id}>{getResult.Name}</option>
                ))}
                </select>
                { errors.preferedLocation === false ? <span className='text-danger'>Please Select Prefered Location</span> : ""}
                </Col>  
               </Row>           
        
        ))
      }
        <Row>
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
  )
}

export default UploadeResumeTabs
