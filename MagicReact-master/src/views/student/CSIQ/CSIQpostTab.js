// ** React Imports
import { Fragment, useState, useEffect} from 'react'

// ** Third Party Components
import Select from 'react-select'

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Label, Input, Button} from 'reactstrap'

import { Editor } from 'react-draft-wysiwyg'

import '@styles/react/libs/editor/editor.scss'

import {axiosClient} from '../../../Client'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from "react-data-table-component"
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@styles/react/pages/invalid-error.scss'

const CSIQpost = () => {
  
const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
  const [CSIQquestions, setCSIQquestions] = useState([])

  const [CSIQquestionsTable, setCSIQquestionsTable] = useState([])

  const [search, setSearch] =  useState("")  
  const [filterTable, setfilterTable] =  useState([])
  const [errors, setErrors] = useState({})

  // const [editorState, setEditorState] = useState('')
  // const handleEditorChange = (state) => {
  //   setEditorState(state);
  //   convertContentToHTML();
  // }
  // const convertContentToHTML = () => {
  //   let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
  //   setConvertedContent(currentContentAsHTML);
  // }
  const validate = () => {
    const temp = {}  
    temp.Company = CSIQquestions.Company === ""  ? false : true
    temp.HREmail = CSIQquestions.HREmail === ""  ? false : true
    temp.HRName = CSIQquestions.HRName === ""  ? false : true
    temp.InterviewerName = CSIQquestions.InterviewerName === ""  ? false : true
    return Object.values(temp).every(x => x === true)
  }
  
  useEffect(() => {
    axiosClient.get(`CSIQ/GetExisitingCSIQ?StudentId=${loggedInUserDetails.StudentId}`).then((tableResult) => {
      setCSIQquestionsTable(tableResult.data)
      setfilterTable(tableResult.data)
      console.log("Question Posted Table", tableResult.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])


  const onhandleChange = (e) => {
      const {name, value} = e.target
     setCSIQquestions({...CSIQquestions, [name]:value})    
     console.log("CSIQ Questions", CSIQquestions)

  }

const onPostQuestions = (e)  => {
  e.preventDefault()
  if (validate()) {
  const csiq = JSON.stringify({
    StudentDetailId:loggedInUserDetails.StudentId,              // name mentioned in .net : insertValues.name or id
    ConsultantEmail:CSIQquestions.HREmail,
    ConsultantName:CSIQquestions.HRName,
    InterviewerName:CSIQquestions.InterviewerName,
    Questions:'CSIQquestions.Questions',
    Role:CSIQquestions.role,
    CompanyName:CSIQquestions.Company
  })
  
  axiosClient.post('CSIQ/AddCSIQ', csiq, {headers: { 
    'Content-Type': 'application/json'
  }}).then((res) => {
    toast.success('Question Posted Sucessfully', {
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
  setErrors(CSIQquestions)
}
}


const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid' : '')

const columns = [
  {
    name: "Date",
    selector: (row) => row.Date,
    sortable: true
  },
  {
    name: "Company Name",
    selector: (row) => row.CompanyName,
    sortable: true
  },
  {
    name: "Role",
    selector: (row) => row.Role,
    sortable: true
  },
  {
    name: "Questions",
    selector: (row) => row.Questions,
    sortable: true
  }
]


useEffect(() => {
  const result = CSIQquestionsTable.filter(QuestionTablefunc => {
    return QuestionTablefunc.name.match(search.toLowerCase())
  })
  setfilterTable(result)
}, [search])

  return (
    <Fragment>
        <Row>
          <Col xs={12}>
          <Card>
          <CardHeader className='border-bottom'>
            <CardTitle tag='h4'>Post Questions</CardTitle>
          </CardHeader>
          <CardBody className='py-2 my-25'>
            <Row>
              <Col lg='5'>
          <Row>
          <Col className='mb-1'>
                <Label className='form-label' for='Company'>
                  Company
                </Label>                  
                    <Input className={applyErrorClass('Company')} type='text' id='Company' name='Company' placeholder='Company' onChange={onhandleChange}/>
                    { (CSIQquestions.Company === "") || (CSIQquestions.Company === null) || (CSIQquestions.Company === undefined) ? <span className='text-danger'>Please Enter Company Name</span> : ""}
            </Col>
            </Row>
            <Row>
              <Col className='mb-1'>
                <Label className='form-label' for='role'>
                  Role
                </Label>                  
                <select
                name='role'
                id='role'
                className='form-control'
                onChange={onhandleChange}>
                <option value='SOC Analyst (L1 Security Analyst)'>SOC Analyst (L1 Security Analyst)</option>
                <option value='Senior SOC Analyst (L2 Security Analyst)'>Senior SOC Analyst (L2 Security Analyst)</option>
                <option value='SOC Lead'>SOC Lead</option>
                <option value='SOC Manager'>SOC Manager</option>
                <option value='GRC Analyst'>GRC Analyst</option>
                <option value='VAPT'>VAPT</option>
                <option value='Network Security Engineer'>Network Security Engineer</option>
                <option value='Endpoint Security Engineer'>Endpoint Security Engineer</option>
                <option value='SIEM Engineer/Consultant'>SIEM Engineer/Consultant</option>
                <option value='SOAR Engineer/Consultant'>SOAR Engineer/Consultant</option>
                <option value='XDR Admin/Consultant'>XDR Admin/Consultant</option>
                <option value='Others'>Others</option>
              </select>
              </Col>
          </Row>
          </Col>
          <Col lg='7'>
          <Card style={{backgroundColor:'rgb(142 133 243 / 54%)'}}>
          <CardHeader className='border-bottom'>
            <CardTitle tag='h4'>These details are not shared with students and will be used by SOC Experts management only.</CardTitle>
          </CardHeader>
          <CardBody className='py-2 my-25'>
          <Row>
          <Col className='mb-1'>
                <Label className='form-label' for='InterviewerName'>
                  Interviewer Name
                </Label>                  
                    <Input className={applyErrorClass('InterviewerName')} type='text' id='InterviewerName' name='InterviewerName' placeholder='InterviewerName' onChange={onhandleChange}/>
                    { (CSIQquestions.InterviewerName === "") || (CSIQquestions.InterviewerName === null) || (CSIQquestions.InterviewerName === undefined) ? <span className='text-danger'>Please Enter Interviewer Name</span> : ""}
              </Col>
            </Row>
            <Row>
          <Col className='mb-1'>
                <Label className='form-label' for='HRName'>
                Consultant/HR Name
                </Label>                  
                    <Input className={applyErrorClass('HRName')} type='text' id='HRName' name='HRName' placeholder='Consultant/HR Name' onChange={onhandleChange}/>
                    { (CSIQquestions.HRName === "") || (CSIQquestions.HRName === null) || (CSIQquestions.HRName === undefined) ? <span className='text-danger'>Please Enter HR Name</span> : ""}
              </Col>
            </Row>
            <Row>
          <Col className='mb-1'>
                <Label className='form-label' for='HREmail'>
                Consultant/HR Email
                </Label>                  
                    <Input className={applyErrorClass('HREmail')} type='email' id='HREmail' name='HREmail' placeholder='HREmail' onChange={onhandleChange}/>
                    { (CSIQquestions.HREmail === "") || (CSIQquestions.HREmail === null) || (CSIQquestions.HREmail === undefined) ? <span className='text-danger'>Please Enter HR Email</span> : ""}
                  </Col>
            </Row>
          </CardBody>
          </Card>
          </Col>
          </Row>
          <Col className='mb-1'>
          <Label className='form-label' for='Questions'>
                Questions
                </Label>
                {/*<Editor name='Questions' id='Questions' placeholder='Enter the Questions'  editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
  toolbarClassName="toolbar-class"/>*/}
  <Input className={applyErrorClass('Questions')} type='textarea' id='Questions' name='Questions' placeholder='Enter the Question' onChange={onhandleChange}/>
                   
          </Col>
          <Button type='button' className='me-1' color='primary' onClick={onPostQuestions}>
                  Save changes
                </Button>
          </CardBody>
          </Card>                  
          </Col>
        </Row>
        <Row>
        <Col>
        <Card>
        <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>Questions Posted</CardTitle>
        </CardHeader>
        <CardBody>
        <DataTable //title="Submit Assigment Table"
        columns={columns} 
        data={filterTable}
        pagination
        fixedHeader  
        responsive={true}
        className='react-dataTable'
        subHeader
        subHeaderComponent={<input type="text" placeholder="Search Here" className="w-25 form-control" 
        onChange={(e) => setSearch(e.target.value)}/>}
        subHeaderAlign="right"
        value={search}
        highlightOnHover/>
        </CardBody>
        </Card>
        </Col>
        </Row>
    </Fragment>
  )
}

export default CSIQpost
