// ** React Imports
import { Fragment, useState, useEffect} from 'react'

// ** Third Party Components
//import axios from 'axios'
import Select from 'react-select'

import { Link } from 'react-router-dom'

import { MoreVertical, Edit, Trash } from 'react-feather'


import {axiosClient} from '../../../Client'
// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Button, Input, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'


import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from "react-data-table-component"
 
const CSIQsearch = () => {
  const [btnCompany, setbtnCompany] = useState([])

  const [CSIQSearch, setCSIQsearch] = useState([])

  const [CSIQTable, setCSIQtable] = useState([])

  const [btnCompanyId, setbtnCompanyId] = useState('')

  const [search, setSearch] =  useState("")  
  const [filterTable, setfilterTable] =  useState([])

  const onChangeSearch = (e) => {
    const {name, value} = e.target
    setCSIQsearch({...CSIQSearch, [name]:value})    
    console.log("CSIQ search", CSIQSearch)   
  }

  useEffect(() => {
    axiosClient.get('CSIQ/getTopCompanies').then((res) => {
      setbtnCompany(res.data)      
      console.log('Get All Top Companies', res.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])


  const onClickSearch = (e) => {
    e.preventDefault() // fetch  CSIQ table on filter
    const company = CSIQSearch.company
    const role = CSIQSearch.role
    { (company !== undefined && role !== "0") ? axiosClient.get(`CSIQ/GetDataonCompanyAndRoleSearch?CompanyName=${company}&Role=${role}`).then((res1) => {
          setCSIQtable(res1.data)          
          setfilterTable(res1.data)  
          console.log('filter CSIQ search condtion 1', res1.data)
        }).catch((error) => {
          console.log(error)
        }) : company !== undefined ? axiosClient.get(`CSIQ/GetDataonCompanySearch?CompanyName=${company}`).then((res2) => {
      setCSIQtable(res2.data)          
      setfilterTable(res2.data)  
      console.log('filter CSIQ search condtion 2', res2.data)
    }).catch((error) => {
      console.log(error)
    }) : role !== undefined ? axiosClient.get(`CSIQ/GetDataonRoleSearch?Role=${role}`).then((res3) => {
      setCSIQtable(res3.data)          
      setfilterTable(res3.data)  
      console.log('filter CSIQ search condtion 3', res3.data)
    }).catch((error) => {
      console.log(error)
    }) : console.log("Not Found") }
  }

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
      name: "Good",
      selector: (row) => row.Good,
      sortable: true
    },
    {
      name: "Questions",
    selector: (row) => row.Questions,
    sortable: true
    }
  ]


useEffect(() => {
  const result = CSIQTable.filter(CSIQTablefunc => {
    return CSIQTablefunc.name.match(search.toLowerCase())
  })
  setfilterTable(result)
}, [search])

const getCompanyName = (e) => {
  e.preventDefault()
  const {name, value} = e.target
  setbtnCompanyId({...btnCompanyId, [name]:value})    
  console.log("Button Company Id", btnCompanyId['btn']) 
  const btnId = btnCompanyId['btn']
  axiosClient.get(`CSIQ/GetDataonCompanyId?CompanyId=${btnId}`).then((res4) => {
    setCSIQtable(res4.data)          
      setfilterTable(res4.data)
    console.log('Get click btn Companies', res4.data)
  }).catch((error) => {
    console.log(error)
  }) 
}

  return (
    <Fragment>
        <Row>
          <Col xs={12}>
          <Card>
          <CardHeader className='border-bottom'>
            <CardTitle tag='h4'>Top Companies</CardTitle>
          </CardHeader>
          <CardBody className='py-2 my-25'>
          <Row>
          <Col>
          {
            btnCompany.map((getAssignment, index) => (
              <Button className='mb-75' color='secondary' value={getAssignment.Id} key={index} size='sm' name='btn' id='btn' outline onClick={getCompanyName}>{getAssignment.ComapanyName} &nbsp;&nbsp;{getAssignment.Count}</Button>
            ))
          }
          </Col>          
          </Row>
          </CardBody>
          </Card>
          </Col>
        </Row>        
        <Row>
        <Col>
        <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Company Specific Interview Questions</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
        <Row>
        <Col>
        <Input placeholder='Company' name='company' id='company' onChange={onChangeSearch} className='form-control' />
        </Col>
        <Col>
        <select
                name='role'
                id='role'
                className='form-control'
                onChange={onChangeSearch}>
                <option value='0'>Others</option>
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
              </select>
        </Col>
        <Col>
        <Button className='mb-75' color='primary' onClick={onClickSearch} size='lg'>Search</Button>
        </Col>        
        </Row>
        <Row>
        <Col>
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
        </Col>
        </Row>
        </CardBody>
        </Card>
        </Col>
        </Row>
    </Fragment>
    
  )
}

export default CSIQsearch
