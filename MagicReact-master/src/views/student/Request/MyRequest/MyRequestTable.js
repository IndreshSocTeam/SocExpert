// ** Custom Components
import AvatarGroup from '@components/avatar-group'

// ** Images
import Select from 'react-select'
import DataTable from "react-data-table-component"
//import avatar1 from '@src/assets/images/portrait/small/AnandGuru.jpg'
import "./tableStyles.css"

import { Link } from 'react-router-dom'

import { Fragment, useState, useEffect, CSSProperties} from 'react'

import {axiosClient} from '../../../../Client'
// ** Reactstrap Imports
import {  Row, Col, Form, Card, CardTitle, Table, Badge, CardHeader } from 'reactstrap'

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

const MyRequestTab = () => {
  const [search, setSearch] =  useState('')
    const [requests, setRequests] =  useState([])    
    const [filterTable, setfilterTable] =  useState([])
    const [loading, setLoading] =  useState([])

  const getRequests = async () => {
    try {           
    setLoading(true)
      await axiosClient.get('Request/GetAllRequests', {params: {
        StudentId: loggedInUserDetails.StudentId 
      }}).then((res) => { 
        setLoading(false)       
      setRequests(res.data)
      setfilterTable(res.data)
      })
    } catch (error) {
        //console.log(error)
        toast.error('Internal server error')
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
    <HashLoader
    color={"#5856d6"}
    loading={loading}
    cssOverride={override}
    size={100}
    aria-label="Loading Spinner"
    data-testid="loader"
    speedMultiplier="1"
  />
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
