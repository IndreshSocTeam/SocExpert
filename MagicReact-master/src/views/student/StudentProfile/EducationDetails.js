import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row,
    Col,
    Form,
    Input,
    Label,
    Button,
    FormFeedback,
    InputGroup,
    InputGroupText } from 'reactstrap'
  
    import Select from 'react-select'  
    import { Fragment, useState, useEffect } from 'react'
    
  // ** Icons Imports
  import { User, Mail, Smartphone, Lock, DollarSign, Book } from 'react-feather'
  
  import {toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
  import '@styles/react/pages/invalid-error.scss'

  import { axiosClient } from '../../../Client'
  // ** React Imports
  
  const EducationDetailsTabs = () => {

  const [insertValues, setInsertValues] = useState([])
  const [errors, setErrors] = useState({})
  
  const [degree, setDegree] = useState([])  
  const [branch, setBranch] = useState([])


  let minOffset = 0, maxOffset = 50
    let thisYear = (new Date()).getFullYear()
    let allYears = []
    for (let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }

    const yearList = allYears.map((x) => { return (<option key={x}>{x}</option>) })

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setInsertValues({
      ...insertValues,
      [name]:value
    })
    console.log("Educational Details", insertValues)
  }


  const validate = () => {
    const temp = {}  
    temp.College = insertValues.College === ""  ? false : true
    temp.lastName = insertValues.lastName === ""  ? false : true
    temp.mobileNo = insertValues.mobileNo === ""  ? false : true  
    temp.whatsappNo = insertValues.whatsappNo === ""  ? false : true  
    temp.ParmanentAddress1 = insertValues.ParmanentAddress1 === ""  ? false : true
    temp.LinkedInProfile = insertValues.LinkedInProfile === ""  ? false : true
    return Object.values(temp).every(x => x === true)
  }

const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
//console.log("LoggedIn StudentId", loggedInUserDetails.StudentId)
const handleFormSubmit = e => {
  e.preventDefault()
  if (validate()) {
  const ed = {
    StudentDetailId:loggedInUserDetails.StudentId,            // name mentioned in .net : insertValues.name or id
    Colleges:insertValues.College,
    PassingYear:insertValues.PassingYear,
    DegreeId:insertValues.Degree,
    BranchId:insertValues.Branch,
    Percentage:insertValues.Percentage
  }

  axiosClient.post('Profile/SaveEducationalDetails', ed).then((res) => {
    toast.success('Educational Details Updated Scuessfully', {
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

const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid' : '')

const [EducationDetails, setEducationDetails] = useState([])  

useEffect(() => {
    axiosClient.get('Profile/GetEducationalDetails', { 
      params: {
        StudentId: loggedInUserDetails.StudentId
      } 
    })
  .then((res) => {
    setEducationDetails([res.data])
    console.log("Educational Displayed Data:", res.data)
    axiosClient.get('Profile/getDegree').then((degreeRes) => {
      setDegree(degreeRes.data)
      console.log("get Degree Data:", degreeRes.data)
      axiosClient.get('Profile/getBranch').then((branchRes) => {
        setBranch(branchRes.data)
        console.log("get branch Data:", branchRes.data)
      })
    })

  })
}, [])


    return (      
      <Fragment>
      {
        EducationDetails.map(curEle => (
       
      <Card>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>Education Details</CardTitle>
      </CardHeader>
      <CardBody>
      <Form className='mt-2 pt-50' onSubmit={handleFormSubmit}>
      <Row>
       <Col sm='6' className='mb-1'>
            <Label className='form-label' for='College'>
              College  
            </Label>
                    <Input className={applyErrorClass('College')} name='College' id='College' placeholder='VTU' defaultValue={curEle.College} onChange={handleInputChange}/>
                    { insertValues.College === "" ? <span className='text-danger'>Please Fill Your College Name</span> : ""}
             </Col>
     <Col sm='6' className='mb-1'>
            <Label className='form-label' for='PassingYear'>
            Passing Year
            </Label>
            <select name='PassingYear' id='PassingYear' className='form-control' placeholder='Year' onChange={handleInputChange}>
            <option selected >{curEle.PassingYear}</option>
               {yearList}
            </select>
            { insertValues.PassingYear === "" ? <span className='text-danger'>Please Select Your Passing Year</span> : ""}
                    </Col>
                    <Col sm='6' className='mb-1'>
          <Label className='form-label' for='Degree'>
            Degree
            </Label>
            <select
                  name='Degree'
                  id='Degree'
                  className={applyErrorClass('Percentage') + 'form-control'}
                  placeholder='Select-Degree'
                  onChange={handleInputChange}
                > <option selected >{curEle.Degree}</option>
                {
                  degree.map((getdegree, index) => (
                    <option key={index} value={getdegree.DegreeId}>{getdegree.name}</option>
                  ))
                }</select>
                { insertValues.Degree === "" ? <span className='text-danger'>Please Select Your Degree</span> : ""}
              </Col>
              <Col sm='6' className='mb-1'>
          <Label className='form-label' for='Branch'>
            Branch/Stream
            </Label>
            <select
                  name='Branch'
                  id='Branch'
                  className='form-control'
                  placeholder='Select-Branch'
                  onChange={handleInputChange}
                > <option selected >{curEle.Branch}</option>
                {
                  branch.map((getbranch, index) => (
                    <option key={index} value={getbranch.BranchId}>{getbranch.name}</option>
                  ))
                }</select>
                { insertValues.Branch === "" ? <span className='text-danger'>Please Select Your Branch</span> : ""}
              </Col>
              <Col sm='6' className='mb-1'>
          <Label className='form-label' for='Percentage'>
            Percentage/CGPA
            </Label>
              <Input className={applyErrorClass('Percentage')} name='Percentage' id='Percentage' placeholder='85%' defaultValue={curEle.Per} onChange={handleInputChange}/>
               { insertValues.Percentage === "" ? <span className='text-danger'>Please Fill Your Degree Percentage</span> : ""}
              </Col>              
          <Col className='mt-2' sm='12'>
          <Button type='submit' className='me-1' color='primary'>
            Save changes
          </Button>
          <Button type='reset' color='secondary' outline>
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
  export default EducationDetailsTabs