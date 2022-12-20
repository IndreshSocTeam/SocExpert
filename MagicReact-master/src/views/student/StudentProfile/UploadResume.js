// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import Select from 'react-select'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem, Row, Col, Label, Form, Input } from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'

import { Link } from 'react-router-dom'
// ** Third Party Imports
import { toast } from 'react-toastify'

import {axiosClient} from '../../../Client'

const UploadeResumeTabs = () => {


  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
  const [CVDetails, setCVDetails] = useState([])
  const [updateJobPreferences, setUpdateJobPreferences] = useState([])
  const [preferedLocation, setPreferedLocation] = useState([])

  const [fileSelected, setFileSelected] = useState('')

  const showPreview = e => {
    if (e.target.files  && e.target.files[0]) {
      const imgFile = e.target.files[0]
      const reader = new FileReader()  
       reader.onload = () => {
        setFileSelected({imgFileName:imgFile.name, imgbaseUrl:reader.result})        
      console.log("Upload PDF", reader.result)
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
      console.log("fileSelected", imgFile)
    } 
  }

  const handleInputChange = e => {
    const {name, value} = e.target
    setUpdateJobPreferences({
      ...updateJobPreferences,
      [name]: value
    })
    console.log("Upload CV", updateJobPreferences)
  }

    const saveChangesClick = (e) => {
    e.preventDefault()
        const sd = {
          StudentDetailId:loggedInUserDetails.StudentId,
          //CVPath:updateJobPreferences.uploadResume,
          PreferedLocation:updateJobPreferences.preferedLocation
        }
        const um = JSON.stringify({
          UserId:loggedInUserDetails.StudentId,
          TypeId:2,
          CVPath:fileSelected.imgbaseUrl,
          CVName:fileSelected.imgFileName
        })
        axiosClient.post('Profile/UpdateCVPic', um, {headers: { 
          'Content-Type': 'application/json'
        }}).then((Uploadres) => {
          console.log("Upload Profile Picture Res", Uploadres)
          axiosClient.post('Profile/UpdateJobPreferences', sd).then((res) => {
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
            console.log(res)
          })
        }).catch((error) => {
          console.log(error)
        })
        
        // axiosClient.post('Profile/UpdateJobPreferences', sd).then((res) => {
        //   toast.success('Uploaded Resume Sucessfully', {
        //     position: "top-center",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light"
        //     })
        //   console.log(res)
        // }).catch((error) => {
        //   console.log(error)
        // })
    
  }
 
useEffect(() => {
  axiosClient.get(`Profile/GetCVDetails?StudentId=${loggedInUserDetails.StudentId}`).then((CVDetailsRes) => {
    setCVDetails([CVDetailsRes.data])
    console.log('CVDetails',  CVDetailsRes.data)
  }).catch((error) => {
    console.log(error)
  })
}, [])

  useEffect(() => {
    axiosClient.get('Profile/GetAllActivePreferedLocation').then((jobPreferencesres) => {
      setPreferedLocation(jobPreferencesres.data)
      console.log('Job Prefered Location',  jobPreferencesres.data)
    }).catch((error) => {
      console.log(error)
    })
}, [])


  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Upload Your Resume</CardTitle>
      </CardHeader>
      <CardBody>
      {
        CVDetails.map((display) => (
      <Form className='mt-2 pt-50'>     
        <Row>
        <Col sm='6' className='mb-1'>
                <Label className='form-label' for='uploadResume'>
                  Upload CV/Resume
                </Label>
                <Input type='file' id='uploadResume' name='uploadResume' accept='application/*' onChange={showPreview} />
                <br/><br/>
                {
                  display.CVPath !== null && 
                    <a href={display.CVPath} target='_blank'>Your Resume</a>                  
                }
                
              </Col>
             

        <Col sm='6' className='mb-1'>
                  <Label className='form-label' for='preferedLocation'>
                    Prefered Location
                  </Label>                 
                  <select
                  name='preferedLocation'
                  id='preferedLocation'
                  className='form-control'
                  placeholder='Select-Prefered Location'
                  onChange={handleInputChange}
                >
                <option selected>{display.PreferedLocation}</option>
                {
                  preferedLocation.map((getResult, index) => (
                  <option key={index} value={getResult.Id}>{getResult.Name}</option>
                ))}
                </select>
                </Col>              
                
               </Row>
        <Row>
        <Col className='mt-2' sm='12'>
          <Button type='submit' className='me-1' color='primary' onClick={saveChangesClick}>
            Save changes
          </Button>
          <Button type='reset' color='secondary' outline>
            Reset
          </Button>
        </Col>
        </Row>        
        </Form>
        ))
      }
      </CardBody>      
    </Card>
  )
}

export default UploadeResumeTabs
