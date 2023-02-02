// ** React Imports
import { Fragment, useState, useEffect, CSSProperties} from 'react'


import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {axiosClient} from '../../../Client'
// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Button, Input, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'


import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from "react-data-table-component"
 
import HashLoader from "react-spinners/HashLoader"
import Cookies from 'js-cookie'
import {AES, enc} from 'crypto-js'

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


const CSIQsearch = () => {
  
  //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
  const loggedInUserDetails = JSON.parse(AES.decrypt(Cookies.get("loggedInUserDetails"), 'secret-key').toString(enc.Utf8));

  const [btnCompany, setbtnCompany] = useState([])

  const [CSIQSearch, setCSIQsearch] = useState([])

  const [CSIQTable, setCSIQtable] = useState([])

  const [btnCompanyId, setbtnCompanyId] = useState('')

  const [search, setSearch] =  useState("")  
  const [filterTable, setfilterTable] =  useState([])
  const [loading, setLoading] = useState(false)

  const onChangeSearch = (e) => {
    const {name, value} = e.target
    setCSIQsearch({...CSIQSearch, [name]:value}) 
  }

  useEffect(() => {
    setLoading(true)
    axiosClient.get('CSIQ/getTopCompanies').then((res) => {
      setLoading(false)
      setbtnCompany(res.data)      
    }).catch((error) => {
      //console.log(error)
      toast.error('Internal server error')
    })
  }, [])


  const onClickSearch = (e) => {
    e.preventDefault() // fetch  CSIQ table on filter
    const company = CSIQSearch.company
    const role = CSIQSearch.role    
    setLoading(true)
    { 
      (company !== undefined && role !== "0") ? axiosClient.get(`CSIQ/GetDataonCompanyAndRoleSearch?CompanyName=${company}&Role=${role}`).then((res1) => {
      setCSIQtable(res1.data)          
          setfilterTable(res1.data)  
        }).catch((error) => {
         // console.log(error)
        }) : company !== undefined ? axiosClient.get(`CSIQ/GetDataonCompanySearch?CompanyName=${company}`).then((res2) => {
      setCSIQtable(res2.data)          
      setfilterTable(res2.data)  
    }).catch((error) => {
     // console.log(error)
    }) : role !== undefined ? axiosClient.get(`CSIQ/GetDataonRoleSearch?Role=${role}`).then((res3) => {
      setCSIQtable(res3.data)          
      setfilterTable(res3.data)  
    }).catch((error) => {
      console.log(error)
    }) : //console.log("Not Found") 
    toast.error('Not Found')  
  } 
  setLoading(false)    
     
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
  const btnId = btnCompanyId['btn']
  setLoading(true)
  axiosClient.get(`CSIQ/GetDataonCompanyId?CompanyId=${btnId}`).then((res4) => {
    setLoading(false)
    setCSIQtable(res4.data)          
      setfilterTable(res4.data)
  }).catch((error) => {
    //console.log(error)
    toast.error('Internal server error')
  }) 
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
              <Button key={index} className='mb-75' color='secondary' value={getAssignment.Id}  size='sm' name='btn' id='btn' outline onClick={getCompanyName}>{getAssignment.ComapanyName} &nbsp;&nbsp;{getAssignment.Count}</Button>
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
