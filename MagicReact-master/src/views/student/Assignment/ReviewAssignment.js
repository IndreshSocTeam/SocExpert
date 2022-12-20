// ** Custom Components
import AvatarGroup from '@components/avatar-group'

import { Link } from 'react-router-dom'

import {axiosClient} from '../../../Client'

import { Fragment, useState, useEffect} from 'react'
// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import {  Row, Col, Form, Card, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'


import DataTable from "react-data-table-component"

import Breadcrumbs from '@components/breadcrumbs'

const ReviewAssignmentTable = () => {
  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
  const [assignment, setAssignment] = useState([])  
  const [assignmentId, setAssignmentId] = useState('')
  
  const [PeerAssignmentTable, setPeerAssignmentTable] = useState([])  

  const [search, setSearch] =  useState("")  
  const [filterTable, setfilterTable] =  useState([])

  const handleAssignmentChange = e => {
    const assId = e.target.value
    setAssignmentId(assId)    
  console.log("change assId", assId)  
 // axiosClient.get(`Request/getStudentAssignementOnId?StudentId=771&assignamentId=11`)
  axiosClient.get(`Assignment/getPeerAssignementsOnAssignmentId?StudentId=${loggedInUserDetails.StudentId}&AssignementId=${assId}`).then((AssPeerTableRes) => {
    setPeerAssignmentTable(AssPeerTableRes.data)   
    setfilterTable(AssPeerTableRes.data)     
    console.log("Peer Assignment Table", AssPeerTableRes.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    axiosClient.get(`Assignment/getAllActiveAssignmentOnStudentId?StudentId=${loggedInUserDetails.StudentId}`).then((PeerAssignmentRes) => {
      setAssignment(PeerAssignmentRes.data)      
      console.log('Peer Assignment',  PeerAssignmentRes.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [assignmentId])


  const columns = [
    {
      name: "Submission ID",
      selector: (row) => row.SubmitAssignamentId,
      sortable: true
    },
    {
      name: "Link To Assignment",
      selector: (row) => <Link to={{pathname:row.Path}} target='_blank'>{`${row.Path}`}</Link>,
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
        return row.Score === "Resolved" ? (
          <Badge color='light-success' pill>
          <span>{row.Score}</span>
          </Badge>
        ) : (
          <Badge color='light-warning' pill>
            Paid
          </Badge>
        )
      },
      sortable: true
    }
  ]


  useEffect(() => {
    const result = PeerAssignmentTable.filter(PeerAssignmentTablefunc => {
      return PeerAssignmentTablefunc.name.match(search.toLowerCase())
    })
    setfilterTable(result)
  }, [search])

  return (
    <Fragment>
    <Card className='py-2 my-25 p-2'>
      <Row>
      <Col lg='4' >
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
    }</select></Col></Row>
      <Row>
        <Col sm='12'>
          <Card title='Review Assignment' className='py-2 my-25' >
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
      <b>How To Review Assignments:</b><hr/>
      <p>Reviewing is Good,Reviewing is Good,Reviewing is Good,Reviewing is Good,Reviewing is Good,Reviewing is Good,,Reviewing is Good,Reviewing is Good,Reviewing is Good</p>
      </Card>
      </Fragment>
    
  )
}

export default ReviewAssignmentTable
