import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row,
    Col,
    Form,
    Input,
    Label,
    Button,
    InputGroup,
    InputGroupText } from 'reactstrap'
  
    //import { useState, useEffect } from 'react'
    import { useState, useEffect, CSSProperties} from 'react'
  // ** Icons Imports
  import { Briefcase, DollarSign, BarChart2, LifeBuoy } from 'react-feather'
  
  import {toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
  import '@styles/react/pages/invalid-error.scss'
  // ** React Imports
  import { axiosClient } from '../../../Client'
  import HashLoader from "react-spinners/HashLoader"
  import Cookies from 'js-cookie'

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

  //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
  const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
  const ExperienceDetailsTabs = () => {

  const [insertValues, setInsertValues] = useState([])
  const [errors, setErrors] = useState({})
  const [radioclicked, setradioClicked] = useState(0)
  const [loading, setLoading] = useState(false)   
  
  const handleInputChange = (e) => {
    const {name, value} = e.target
    setInsertValues({
      ...insertValues,
      [name]:value
    })
  }

  const validate = () => {
    const temp = {}  
    temp.Company = insertValues.Company === ""  ? false : true  
    temp.YearsofExperience = insertValues.YearsofExperience === ""  ? false : true
    temp.ActualDesignation = insertValues.ActualDesignation === ""  ? false : true
    temp.CurrentPackage = insertValues.CurrentPackage === ""  ? false : true
    setErrors(temp)  
    return Object.values(temp).every(x => x === true)
  }

  const experienceRadiohandle = (e) => {
    const radioclickedValue = e.target.value
    setradioClicked(radioclickedValue)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    if (validate()) {
    const ed = {
      StudentDetailId:loggedInUserDetails.StudentId,            // name mentioned in .net : insertValues.name or id
      CompanyName:insertValues.Company,
      YearsOfExperience:insertValues.YearsofExperience,
      NoticePeriodId:insertValues.noticePeriod,
      CurrentRole:insertValues.ActualDesignation,
      CurrentPackage:insertValues.CurrentPackage
    }
  setLoading(true)
    axiosClient.post(`Profile/SaveExperienceDetails?ExperienceType=${radioclicked}`, ed).then((res) => {
     setLoading(false)
      toast.success('Experience Details Updated Sucessfully', {
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

  const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid' : '')

const [GetExperienceDetailsDetails, setGetExperienceDetailsDetails] = useState([])  
const [periodList, setperiodList] = useState([])  

useEffect(() => {
  setLoading(true)
    axiosClient.get('Profile/GetExperienceDetails', { 
      params: {
        StudentId: loggedInUserDetails.StudentId
      } 
    })
  .then((res) => {
    setLoading(false)
    setGetExperienceDetailsDetails([res.data])
    axiosClient.get('Profile/getNoticePeriods').then((periodListRes) => {
      setperiodList(periodListRes.data)      
    })
  })
}, [])

const resetForm = () => {
  setInsertValues('')
  setErrors({})
}

    return (      
      <Form onSubmit={handleFormSubmit}>
      <Row>  
      <HashLoader
      color={"#5856d6"}
      loading={loading}
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
      speedMultiplier="1"
    />
    <Col md='12' sm='12'>
    {
      GetExperienceDetailsDetails.map((curEle, index) => (
      <Card key={index} className='mt-2 pt-50'>
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
              Company<span className='text-danger'>*</span>
            </Label>
            <Col sm='9'>
            <InputGroup className='mb-1'>
            <InputGroupText>
              <Briefcase size={14} />
            </InputGroupText>   
                    <Input className={applyErrorClass('Company')} name='Company' id='Company' placeholder='Company Name' defaultValue={curEle.Company} onChange={handleInputChange}/>
                    </InputGroup>
                    { errors.Company === false ? <span className='text-danger'>Please Enter Your Company Name</span> : ""}
            </Col>
          </Row>
  
          <Row className='mb-1'>
            <Label sm='3' for='YearsofExperience'>
            Years of Experience<span className='text-danger'>*</span>
            </Label>
            <Col sm='9'>
            <InputGroup className='mb-1'>
            <InputGroupText>
              <BarChart2 size={14} />
            </InputGroupText>   
                    <Input className={applyErrorClass('YearsofExperience')} name='YearsofExperience' id='YearsofExperience' placeholder='3 Years' defaultValue={curEle.YearOfExp} onChange={handleInputChange}/>
                    </InputGroup>
                    { errors.YearsofExperience === false ? <span className='text-danger'>Please Enter Your Years of Experience</span> : ""}
            </Col>
          </Row>
  
          
          <Row className='mb-1'>
            <Label sm='3' for='ActualDesignation'>
            Actual Designation<span className='text-danger'>*</span>
            </Label>
            <Col sm='9'>
            <InputGroup className='mb-1'>
            <InputGroupText>
              <LifeBuoy size={14} />
            </InputGroupText>   
                    <Input className={applyErrorClass('ActualDesignation')} name='ActualDesignation' id='ActualDesignation' placeholder='Web Developer' defaultValue={curEle.Designation} onChange={handleInputChange}/>
                   </InputGroup>
                    { errors.ActualDesignation === false ? <span className='text-danger'>Please Enter Your Designation</span> : ""}
            </Col>
          </Row>
  
          <Row className='mb-1'>
            <Label sm='3' for='CurrentPackage'>
            Current Package<span className='text-danger'>*</span>
            </Label>
            <Col sm='9'>
            <InputGroup className='mb-1'>
            <InputGroupText>
              <DollarSign size={14} />
            </InputGroupText>   
                    <Input className={applyErrorClass('CurrentPackage')} name='CurrentPackage' id='CurrentPackage' placeholder='4.5 LPA' defaultValue={curEle.Package} onChange={handleInputChange}/>
                    </InputGroup>
                    { errors.CurrentPackage === false ? <span className='text-danger'>Please Enter Your Current Package</span> : ""}
            </Col>
          </Row>
  
          <Row  className='mb-1'>
            <Label sm='3' for='noticePeriod'>Notice Period<span className='text-danger'>*</span></Label>
            <Col sm='9'>
            <select
            name='noticePeriod'
            id='noticePeriod'
            className='form-control'
            placeholder='Select-noticePeriod'
            onChange={handleInputChange}
          > <option readOnly>{curEle.NoticePeriod!==null?curEle.NoticePeriod:'-- Select Notice Period --'}</option>
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
              <Button outline color='secondary' type='reset' onClick={resetForm}>
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