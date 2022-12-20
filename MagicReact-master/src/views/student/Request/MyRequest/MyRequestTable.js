// ** Custom Components
import AvatarGroup from '@components/avatar-group'

// ** Images
import Select from 'react-select'
import DataTable from "react-data-table-component"
//import avatar1 from '@src/assets/images/portrait/small/AnandGuru.jpg'
import "./tableStyles.css"

import { Link } from 'react-router-dom'

import { Fragment, useState, useEffect} from 'react'
// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'

import {axiosClient} from '../../../../Client'
// ** Reactstrap Imports
import {  Row, Col, Form, Card, CardTitle, Table, Badge, CardHeader } from 'reactstrap'


const MyRequestTab = () => {
  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
  const [search, setSearch] =  useState('')
    const [requests, setRequests] =  useState([])    
    const [filterTable, setfilterTable] =  useState([])

  const getRequests = async () => {
    try {
      await axiosClient.get('Request/GetAllRequests', {params: {
        StudentId: loggedInUserDetails.StudentId  //23
      }}).then((res) => {        
      setRequests(res.data)
      setfilterTable(res.data)
        console.log('Request Details Display',  res.data)
      })
    } catch (error) {
        console.log(error)
    }
  }

  const columns = [
    
    {
      name: "Submission ID",
      selector: (row) => <Link to={`/student/RequestDetails/${row.Number}`} target='_blank'>{`${row.Number}`}</Link>,
      sortable: true
    },
    {
      name: "Date",
      selector: (row) => row.Date,
      sortable: true
    },
    {
      name: "Coin",
      selector: (row) => row.Coin,
      sortable: true
    },
    {
      name: "Genie",
      selector: (row) => row.AssignedMentor,
      sortable: true
    },
    {
      name: "Status",
      //selector: (row) => row.Status,
      cell: row => {
        return row.Status === "Resolved" || row.Status === "New" ? (
          <Badge color='light-success' pill>
          <span>{row.Status}</span>
          </Badge>
        ) : (
          <Badge color='light-warning' pill>
            {row.Status}
          </Badge>
        )
      },
      sortable: true
    },
    {
      name: "Last Update",
      selector: (row) => row.LastStatusUpdate.map((ls) => ls.Note), 
      sortable: true 
       }
  ]

  useEffect(() => {
    getRequests()
  }, [])

  useEffect(() => {
    const result = requests.filter(Requestsfunc => {
      return Requestsfunc.toString().match(search.toLowerCase())
    })
    setfilterTable(result)
  }, [search])


  return (
    <Fragment>
    <Card title='Review Assignment'>
          <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Your Request</CardTitle>
        </CardHeader>
  <DataTable //title="Request Table"
  columns={columns} 
  data={filterTable}//{Requests}
  pagination
  fixedHeader  
  responsive={true}
  className='react-dataTable'
  subHeader
  subHeaderComponent={<input type="text" name='search' id='search' placeholder="Search Here" className="w-25 form-control" 
  onChange={(e) => setSearch(e.target.value)}/>}
  subHeaderAlign="right"
  value={search}
  highlightOnHover/>
  
      </Card>
      </Fragment>
    
  )
}

export default MyRequestTab
