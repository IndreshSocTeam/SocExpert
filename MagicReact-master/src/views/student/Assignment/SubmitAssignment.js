// ** React Imports
import { Fragment, useEffect, useState, CSSProperties } from 'react'


import { Link2, Clipboard, Edit3 } from 'react-feather'

import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '@styles/react/pages/invalid-error.scss'
// ** Reactstrap Imports

import { Row, Col, Form, Card, Button, CardBody, CardHeader, Input, Label, CardTitle, ListGroup, Badge, InputGroup, InputGroupText} from 'reactstrap'


import { Link } from 'react-router-dom'

import {axiosClient} from '../../../Client'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import DataTable from "react-data-table-component"

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

const initialvalues = {
  driveLink:'',
  Comments:''
}


const SubmitAssignmentTabs = () => {


  const [assignment, setAssignment] = useState([])  
  const [assignmentId, setAssignmentId] = useState('')
  
  const [assignmentSource, setAssignmentSource] = useState([])  

  const [AssignmentTable, setAssignmentTable] = useState([])  

  
  const [submitAssignment, setSubmitAssignment] = useState(initialvalues)  

  const [search, setSearch] =  useState("")  
  const [filterTable, setfilterTable] =  useState([])

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)   


  const handleAssignmentChange = e => {
    const assId = e.target.value
    setAssignmentId(assId)    
  setLoading(true)
 // Assignment/getStudentAssignementOnId?StudentId=${loggedInUserDetails.StudentId}&assignamentId=${assId}axiosClient.get(`Assignment/getStudentAssignementOnId?StudentId=771&assignamentId=11`)
  axiosClient.get(`Assignment/getStudentAssignementOnId?StudentId=${loggedInUserDetails.StudentId}&assignamentId=${assId}`).then((AssTableRes) => {
    setLoading(false)
    setAssignmentTable(AssTableRes.data)   
    setfilterTable(AssTableRes.data)     
     setLoading(true)
    axiosClient.get(`Assignment/getAssignmentModalDetail?assignamentId=${assId}`).then((AssSourRes) => {
    setLoading(false)
      setAssignmentSource([AssSourRes.data])
    })
    }).catch((error) => {
      //console.log(error)
      toast.error('Internal server error')
    })
  }

  useEffect(() => {
    setLoading(true)
    axiosClient.get(`Assignment/getAllActiveAssignmentOnStudentId?StudentId=${loggedInUserDetails.StudentId}`).then((AssignmentRes) => {
      setLoading(false)
      setAssignment(AssignmentRes.data)      
    }).catch((error) => {
      //console.log(error)
      toast.error('Internal server error')
    })
  }, [assignmentId])


const onSubmitAssignmentChange = (e) => {
const {name, value} = e.target
setSubmitAssignment({
  ...submitAssignment,
  [name]: value
})
}


const validate = () => {
  const temp = {}  
  temp.driveLink = submitAssignment.driveLink === ""  ? false : true
  temp.Comments = submitAssignment.Comments === ""  ? false : true
  setErrors(temp)
  return Object.values(temp).every(x => x === true)
}

const onSubmitAssignments = (e) => {
e.preventDefault()
if (validate()) {
  
const asd = JSON.stringify({
  StudentDetailId:loggedInUserDetails.StudentId,              // name mentioned in .net : insertValues.name or id
  AssignmentId:assignmentId,
  Comment:submitAssignment.Comments,
  Path:submitAssignment.driveLink
})
setLoading(true)
axiosClient.post('Assignment/AddStudentAssignement', asd, {headers: { 
  'Content-Type': 'application/json'
}}).then((res) => {
  setLoading(false)
  toast.success('Assignment Submitted Sucessfully', {
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

const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid' : '')

const resetForm = () => {
  setErrors({})
}


  
  useEffect(() => {
    const result = AssignmentTable.filter(AssignmentTablefunc => {
      return AssignmentTablefunc.name.match(search.toLowerCase())
    })
    setfilterTable(result)
  }, [search])



  
const columns = [
  {
    name: "Submission ID",
    selector: (row) => row.SubmitAssignamentId,
    sortable: true
  },
  {
    name: "Link To Assignment",
    selector: (row,index) => <Link key={index} to={{pathname:row.Path}} target='_blank' rel="noopener noreferrer">{row.Path}</Link>,
    sortable: true
  },
  {
    name: "Date",
    selector: (row) => row.Date,
    sortable: true
  },
  {
    name: "Good",
    selector: (row) => row.Good,
    sortable: true
  },
  {
    name: "Improvements",
    selector: (row) => row.Improvements,
    sortable: true
  },
  {
    name: "Score",
    //selector: (row) => row.Status,
    cell: (row, index) => {
      return row.Score >= "8" ? (
        <Badge key={index} color='light-success' pill>
        <span>{row.Score}</span>
        </Badge>
      ) : (
        <Badge color='light-warning' pill>
        <span>{row.Score}</span>
        </Badge>
      )
    },
    sortable: true
  }
]


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
      <Row>
        <Col sm='12'>
          <Card title='Submit Assignment' className='py-2 my-25 p-2'>
          <Row>
          <Col lg='4' >
          <br/>
          <select
                  name='selectAssignment'
                  id='selectAssignment'
                  className='form-control'
                  placeholder='Select-Assignment'
                  onChange={handleAssignmentChange}
                > <option> -- Select Assignment -- </option>
                {
                  assignment.map((getAssignment, index) => (
                    <option key={index} value={getAssignment.Id}>{getAssignment.Name}</option>
                  ))
                }</select>
                <br/>
        </Col>
        <Col lg='12'>
        <b>Assignment Description</b>
        {
          assignmentSource.map((getAssignmentResc, index) => (
          <div key={index}>
          <h6>{getAssignmentResc.Description}</h6>
       
        <p>This  is an Assignment of assignments that will help you in reinforcing what is learnt in the class. This  is an Assignment of assignments that will help you in reinforcing what is learnt in the class..This  is an Assignment of assignments that will help you in reinforcing what is learnt in the class.</p>
        {getAssignmentResc.Resources.map((r, index) =>  (
          <div key={index}>
          <Badge color='light-primary' className='p-1' pill href={r.Path} target='_blank' rel="noopener noreferrer">
                  <Link2 size={14} />
                 <span> {r.Name} </span>
                    </Badge> 
          </div>
          ))}
                </div> 
                ))
              }
        
                
        </Col>
        </Row>
          </Card>
        </Col>
      </Row><br/>
      {
        (assignmentId) && (
      <Card title='Submit Assignment'>
      <CardBody>
      <Row>
      <Col>
      <Label for='driveLink' className='form-label' >
      Google Drive Link<span className='text-danger'>*</span>
        </Label>     
        <InputGroup className='mb-1'>
                <InputGroupText>
                  <Clipboard size={14} />
                </InputGroupText>   
        <Input type='textarea' name='driveLink' id='driveLink' onChange={onSubmitAssignmentChange} placeholder='Google Drive Link' invalid={errors.driveLink === false} valid={errors.driveLink !== false && submitAssignment.driveLink !== ""} ></Input>
       </InputGroup>
        { errors.driveLink === false ? <span className='text-danger'>Please Paste Your assignment Link</span> : ""}
        </Col>
        <Col>
        <Label for='Comments' className='form-label' >
        Comments<span className='text-danger'>*</span>
        </Label>     
        <InputGroup className={applyErrorClass('Comments')}>
                <InputGroupText>
                  <Edit3 size={14} />
                </InputGroupText> 
                {/*invalid={errors.Comments === false} valid={errors.Comments !== false && submitAssignment.Comments !== ""}  */} 
        <Input type='textarea' name='Comments' id='Comments' onChange={onSubmitAssignmentChange} placeholder='Comments'></Input>      
        </InputGroup>
        { errors.Comments === false ? <span className='text-danger'>Please Enter Comments</span> : ""}
        </Col>         
      </Row><br/>
      <Row>
      <Col>
      <Button type='button' className='me-1' color='primary' onClick={onSubmitAssignments}>
                  Subimt Assignment
                </Button>
      </Col> 
      </Row>
      </CardBody>
      </Card>
      )
    }
      <Row>
      <Col>
      <Card title='Assignment Table' className='py-2 my-25 p-2'>
         <h2><b>Your Submissions</b></h2>
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
         
          </Card>
          </Col>
      </Row>
      <Row>
      <Col>
     
          </Col>
      </Row>
    </Fragment>
  )
}

export default SubmitAssignmentTabs
