// ** React Imports
import { Fragment, useEffect, useState } from 'react'


import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ** Reactstrap Imports

import { Row, Col, Form, Card, Button, CardBody, CardHeader, Input, Label, CardTitle, ListGroup, Badge, ListGroupItem} from 'reactstrap'


import { Link } from 'react-router-dom'

import {axiosClient} from '../../../Client'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import DataTable from "react-data-table-component"


const SubmitAssignmentTabs = () => {


  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
  const [assignment, setAssignment] = useState([])  
  const [assignmentId, setAssignmentId] = useState('')
  
  const [assignmentSource, setAssignmentSource] = useState([])  

  const [AssignmentTable, setAssignmentTable] = useState([])  

  
  const [submitAssignment, setSubmitAssignment] = useState([])  

  const [search, setSearch] =  useState("")  
  const [filterTable, setfilterTable] =  useState([])

  const handleAssignmentChange = e => {
    const assId = e.target.value
    setAssignmentId(assId)    
  console.log("change assId", assId)  
 // Assignment/getStudentAssignementOnId?StudentId=${loggedInUserDetails.StudentId}&assignamentId=${assId}axiosClient.get(`Assignment/getStudentAssignementOnId?StudentId=771&assignamentId=11`)
  axiosClient.get(`Assignment/getStudentAssignementOnId?StudentId=${loggedInUserDetails.StudentId}&assignamentId=${assId}`).then((AssTableRes) => {
    setAssignmentTable(AssTableRes.data)   
    setfilterTable(AssTableRes.data)     
    console.log("Submit Assignment Table", AssTableRes.data)
    axiosClient.get(`Assignment/getAssignmentModalDetail?assignamentId=${assId}`).then((AssSourRes) => {
      setAssignmentSource([AssSourRes.data])
      console.log("Assignment Resource ", AssSourRes.data)
    })
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    axiosClient.get(`Assignment/getAllActiveAssignmentOnStudentId?StudentId=${loggedInUserDetails.StudentId}`).then((AssignmentRes) => {
      setAssignment(AssignmentRes.data)      
      console.log('Get All Assignments',  AssignmentRes.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [assignmentId])

const onSubmitAssignmentChange = (e) => {
const {name, value} = e.target
setSubmitAssignment({
  ...submitAssignment,
  [name]: value
})
console.log("Submit Assignment", submitAssignment)
}

const onSubmitAssignments = (e) => {
e.preventDefault()
const asd = JSON.stringify({
  StudentDetailId:loggedInUserDetails.StudentId,              // name mentioned in .net : insertValues.name or id
  AssignmentId:assignmentId,
  Comment:submitAssignment.Comments,
  Path:submitAssignment.driveLink
})

axiosClient.post('Assignment/AddStudentAssignement', asd, {headers: { 
  'Content-Type': 'application/json'
}}).then((res) => {
  toast.success('Assignment Submitted Scuessfully', {
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
}

  const columns = [
    {
      name: "Submission ID",
      selector: (row) => row.SubmitAssignamentId,
      sortable: true
    },
    {
      name: "Link To Assignment",
      selector: (row) => <Link to={{pathname:row.Path}} target='_blank'>{row.Path}</Link>,
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
      cell: row => {
        return row.Score >= "8" ? (
          <Badge color='light-success' pill>
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


  useEffect(() => {
    const result = AssignmentTable.filter(AssignmentTablefunc => {
      return AssignmentTablefunc.name.match(search.toLowerCase())
    })
    setfilterTable(result)
  }, [search])

  return (
    <Fragment>
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
                > <option>Select Assignment</option>
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
          <div key={index}><h6>{getAssignmentResc.Description}</h6>
       
        <p>This  is an Assignment of assignments that will help you in reinforcing what is learnt in the class. This  is an Assignment of assignments that will help you in reinforcing what is learnt in the class..This  is an Assignment of assignments that will help you in reinforcing what is learnt in the class.</p>
        {getAssignmentResc.Resources.map((r) =>  (
          <a href={r.Path} target='_blank' className='btn btn-primary me-1'>{r.Name}</a>
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
      Google Drive Link
        </Label>     
        <Input type='textarea' name='driveLink' id='driveLink' onChange={onSubmitAssignmentChange} placeholder='Google Drive Link'></Input>
        </Col>
        <Col>
        <Label for='Comments' className='form-label' >
        Comments
        </Label>     
        <Input type='textarea' name='Comments' id='Comments' onChange={onSubmitAssignmentChange} placeholder='Comments Optional'></Input>      
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
