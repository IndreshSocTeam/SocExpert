import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row,
    Col,
    Form,
    Input,
    Label,
    Button,
    InputGroup,
    InputGroupText } from 'reactstrap'
    
    import { Fragment, useState, useEffect, CSSProperties } from 'react'
    
  // ** Icons Imports
  import { BookOpen, DivideCircle } from 'react-feather'
  
  import {toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
  
  import '@styles/react/pages/invalid-error.scss'

  import { axiosClient } from '../../../Client'
  // ** React Imports
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


  const EducationDetailsTabs = () => {
    //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
    const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))

  const [insertValues, setInsertValues] = useState([])

  const [EducationDetails, setEducationDetails] = useState([]) 
  const [degree, setDegree] = useState([])  
  const [branch, setBranch] = useState([])
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)   

  useEffect(() => {
    setLoading(true)
      axiosClient.get('Profile/GetEducationalDetails', { 
        params: {
          StudentId: loggedInUserDetails.StudentId
        } 
      })
    .then((res) => {
      setLoading(false)
      setEducationDetails([res.data])
      axiosClient.get('Profile/getDegree').then((degreeRes) => {
        setDegree(degreeRes.data)
        axiosClient.get('Profile/getBranch').then((branchRes) => {
          setBranch(branchRes.data)
        })
      })
  
    })
  }, [])
  


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
  }


  const validate = () => {
    const temp = {}  
    temp.College = insertValues.College === ""  ? false : true
    temp.PassingYear = insertValues.PassingYear === ""  ? false : true
    temp.Degree = insertValues.Degree === ""  ? false : true  
    temp.Branch = insertValues.Branch === ""  ? false : true  
    temp.Percentage = insertValues.Percentage === ""  ? false : true
    setErrors(temp)
    return Object.values(temp).every(x => x === true)
  }

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
  setLoading(true)
  axiosClient.post('Profile/SaveEducationalDetails', ed).then((res) => {
    setLoading(false)
    toast.success('Educational Details Updated Sucessfully', {
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

const resetForm = () => {
  setInsertValues('')
  setErrors({})
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
      {
        EducationDetails.map((curEle, index) => (
       
      <Card key={index}>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>Education Details</CardTitle>
      </CardHeader>
      <CardBody>
      <Form className='mt-2 pt-50' onSubmit={handleFormSubmit}>
      <Row>
       <Col sm='6' className='mb-1'>
            <Label className='form-label' for='College'>
              College<span className='text-danger'>*</span>  
            </Label>
            <InputGroup className='mb-1'>
                <InputGroupText>
                  <BookOpen size={14} />
                </InputGroupText>   
                    <Input className={applyErrorClass('College')} name='College' id='College' placeholder='College' defaultValue={curEle.College} onChange={handleInputChange}/>
                    </InputGroup>
                    { errors.College === false ? <span className='text-danger'>Please Enter Your College Name</span> : ""}
             </Col>
     <Col sm='6' className='mb-1'>
            <Label className='form-label' for='PassingYear'>
            Passing Year<span className='text-danger'>*</span>
            </Label>
            <select name='PassingYear' id='PassingYear' className='form-control' placeholder='Passing Year' onChange={handleInputChange}>
            <option readOnly>{curEle.PassingYear!==null?curEle.PassingYear:'--Select Year --'}</option>
               {yearList}
            </select>
            { errors.PassingYear === false ? <span className='text-danger'>Please Select Your Passing Year</span> : ""}
                    </Col>
                    <Col sm='6' className='mb-1'>
          <Label className='form-label' for='Degree'>
            Degree<span className='text-danger'>*</span>
            </Label>
            <select
                  name='Degree'
                  id='Degree'
                  className='form-control'
                  placeholder='Select-Degree'
                  onChange={handleInputChange}
                > <option readOnly>{curEle.Degree!==null?curEle.Degree:'--Select Degree --'}</option>
                {
                  degree.map((getdegree, index) => (
                    <option key={index} value={getdegree.DegreeId}>{getdegree.name}</option>
                  ))
                }</select>
                { errors.Degree === false ? <span className='text-danger'>Please Select Your Degree</span> : ""}
              </Col>
              <Col sm='6' className='mb-1'>
          <Label className='form-label' for='Branch'>
            Branch/Stream<span className='text-danger'>*</span>
            </Label>
            <select
                  name='Branch'
                  id='Branch'
                  className='form-control'
                  placeholder='Select-Branch'
                  onChange={handleInputChange}
                > <option readOnly>{curEle.Branch!==null?curEle.Branch:'--Select Branch --'}</option>
                {
                  branch.map((getbranch, index) => (
                    <option key={index} value={getbranch.BranchId}>{getbranch.name}</option>
                  ))
                }</select>
                { errors.Branch === false ? <span className='text-danger'>Please Select Your Branch</span> : ""}
              </Col>
              <Col sm='6' className='mb-1'>
          <Label className='form-label' for='Percentage'>
            Percentage/CGPA<span className='text-danger'>*</span>
            </Label>
            <InputGroup className='mb-1'>
                <InputGroupText>
                  <DivideCircle size={14} />
                </InputGroupText>   
              <Input className={applyErrorClass('Percentage')} name='Percentage' id='Percentage' placeholder='85%' defaultValue={curEle.Per} onChange={handleInputChange}/>
             </InputGroup>
              { errors.Percentage === false ? <span className='text-danger'>Please Enter Your Percentage</span> : ""}
              </Col>              
          <Col className='mt-2' sm='12'>
          <Button type='submit' className='me-1' color='primary'>
            Save changes
          </Button>
          <Button type='reset' color='secondary' outline  onClick={resetForm}>
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