import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row,
    Col,
    Form,
    Input,
    Label,
    Button,
    FormFeedback,
    InputGroup,
    InputGroupText } from 'reactstrap'
  
    //import { useState, useEffect } from 'react'
    import Select from 'react-select'  

    import { useState, useEffect } from 'react'

  
  // ** Icons Imports
  import { User, Mail, Smartphone, Lock, DollarSign } from 'react-feather'
  
  import {toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
  import '@styles/react/pages/invalid-error.scss'
  // ** React Imports
  import { axiosClient } from '../../../Client'
  
  const ExperienceDetailsTabs = () => {

const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
//console.log("LoggedIn StudentId", loggedInUserDetails.StudentId)
  const [insertValues, setInsertValues] = useState([])
  const [errors, setErrors] = useState({})
  const [radioclicked, setradioClicked] = useState(0)
  
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setInsertValues({
      ...insertValues,
      [name]:value
    })
    console.log("Experience Details", insertValues)
  }

  const validate = () => {
    const temp = {}  
    temp.Company = insertValues.Company === ""  ? false : true  
    temp.YearsofExperience = insertValues.YearsofExperience === ""  ? false : true
    temp.ActualDesignation = insertValues.ActualDesignation === ""  ? false : true
    temp.CurrentPackage = insertValues.CurrentPackage === ""  ? false : true  
    return Object.values(temp).every(x => x === true)
  }

  const experienceRadiohandle = (e) => {
    const radioclickedValue = e.target.value
    setradioClicked(radioclickedValue)
    console.log("click radio", radioclickedValue)  
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    if (validate()) {
    const ed = {
      StudentDetailId:loggedInUserDetails.StudentId,            // name mentioned in .net : insertValues.name or id
      YearsOfExperience:insertValues.YearsofExperience,
      CompanyName:insertValues.Company,
      NoticePeriodId:insertValues.noticePeriod,
      CurrentRole:insertValues.ActualDesignation,
      CurrentPackage:insertValues.CurrentPackage
    }
  
    axiosClient.post(`Profile/SaveExperienceDetails?ExperienceType=${radioclicked}`, ed).then((res) => {
      toast.success('Experience Details Updated Sucuessfully', {
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

const [GetExperienceDetailsDetails, setGetExperienceDetailsDetails] = useState([])  
const [periodList, setperiodList] = useState([])  

useEffect(() => {
    axiosClient.get('Profile/GetExperienceDetails', { 
      params: {
        StudentId: loggedInUserDetails.StudentId
      } 
    })
  .then((res) => {
    setGetExperienceDetailsDetails([res.data])
    console.log("Experience Details Displayed Data:", res.data)
    axiosClient.get('Profile/getNoticePeriods').then((periodListRes) => {
      setperiodList(periodListRes.data)      
    console.log("period List:", periodListRes.data)
    })
  })
}, [])


    return (      
      <Form onSubmit={handleFormSubmit}>
      <Row>  
    <Col md='12' sm='12'>
    {
      GetExperienceDetailsDetails.map(curEle => (
      <Card className='mt-2 pt-50'>
      <CardHeader>
        <CardTitle tag='h4'>Experience Details</CardTitle>
      </CardHeader>
      <CardBody>        
        <Row className='mb-1'>
        <Label sm='3' for='Experience'>
          Experience
        </Label>
        <Col sm='9'>
        <div className='demo-inline-spacing'>
          <div className='form-check'>
            <Input type='radio' value={1} id='Experience-active' name='Experience' onClick={experienceRadiohandle} />
            <Label className='form-check-label' for='Experience-active'>
            Experience
            </Label>
          </div>
          <div className='form-check'>
            <Input type='radio' value={0} name='Experience' id='Experience-inactive' defaultChecked onClick={experienceRadiohandle}/>
            <Label className='form-check-label' for='Experience-inactive'>
            No-Experience
            </Label>
          </div>
        </div>
        </Col>
      </Row>

      { (radioclicked === '1') ?   (<div>
  
          <Row className='mb-1'>
            <Label sm='3' for='Company'>
              Company
            </Label>
            <Col sm='9'>
                    <Input className={applyErrorClass('Company')} name='Company' id='Company' placeholder='Soc Expert' defaultValue={curEle.Company} onChange={handleInputChange}/>
                    { insertValues.Company === "" ? <span className='text-danger'>Please Fill Your Company Name</span> : ""}
            </Col>
          </Row>
  
          <Row className='mb-1'>
            <Label sm='3' for='YearsofExperience'>
            Years of Experience
            </Label>
            <Col sm='9'>
                    <Input className={applyErrorClass('YearsofExperience')} name='YearsofExperience' id='YearsofExperience' placeholder='3 Months' defaultValue={curEle.YearOfExp} onChange={handleInputChange}/>
                    { insertValues.YearsofExperience === "" ? <span className='text-danger'>Please Fill Your Years of Experience</span> : ""}
            </Col>
          </Row>
  
          
          <Row className='mb-1'>
            <Label sm='3' for='ActualDesignation'>
            Actual Designation
            </Label>
            <Col sm='9'>
                    <Input className={applyErrorClass('ActualDesignation')} name='ActualDesignation' id='ActualDesignation' placeholder='Web Developer' defaultValue={curEle.Designation} onChange={handleInputChange}/>
                    { insertValues.ActualDesignation === "" ? <span className='text-danger'>Please Fill Your Actual Designation</span> : ""}
            </Col>
          </Row>
  
          <Row className='mb-1'>
            <Label sm='3' for='CurrentPackage'>
            Current Package
            </Label>
            <Col sm='9'>
                    <Input className={applyErrorClass('CurrentPackage')} name='CurrentPackage' id='CurrentPackage' placeholder='4.5 LPA' defaultValue={curEle.Package} onChange={handleInputChange}/>
                    { insertValues.CurrentPackage === "" ? <span className='text-danger'>Please Fill Your Current Package</span> : ""}
            </Col>
          </Row>
  
          <Row  className='mb-1'>
            <Label sm='3' for='noticePeriod'>Notice Period</Label>
            <Col sm='9'>
            <select
            name='noticePeriod'
            id='noticePeriod'
            className='form-control'
            placeholder='Select-noticePeriod'
            onChange={handleInputChange}
          > <option selected >{curEle.NoticePeriod}</option>
          {
            periodList.map((getperiodList, index) => (
              <option key={index} value={getperiodList.id}>{getperiodList.name}</option>
            ))
          }</select>              
            </Col>
            </Row>
            </div>
        ) : "" } 
            <Row>        
            <Col className='d-flex  mt-2' md={{ size: 9, offset: 3 }}>
              <Button className='me-1' color='primary' type='submit'>
              Save changes
              </Button>
              <Button outline color='secondary' type='reset'>
                Reset
              </Button>
            </Col>
          </Row>
          
      </CardBody>
    </Card>  
     
    ))
  } 
    </Col>   
    </Row>  
    </Form>
  
      
    )
  }
  export default ExperienceDetailsTabs