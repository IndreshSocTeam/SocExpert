
import axios from "axios"

import {useState, useEffect} from "react"

import DataTable from "react-data-table-component"

import { MoreVertical, Edit, Trash, Search } from 'react-feather'

import {  Row, Col, Form, Card, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const CountryTables = () => {

  
  const [search, setSearch] =  useState("")
    const [country, setCountry] =  useState([])    
    const [filterTable, setfilterTable] =  useState([])

  const getCountry = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v2/all')
      setCountry(response.data)
      setfilterTable(response.data)
    } catch (error) {
        console.log(error)
    }
  }

  const columns = [
    {
      name: "Submission ID",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Date",
      selector: (row) => row.nativeName,
      sortable: true
    },
    {
      name: "What Is Good",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "What Need To Be Improved",
      selector: (row) => row.capital,
      sortable: true
    },
    {
      name: "Score",
      selector: (row) => <img width={50} height={50} src={row.flag}/>,
      sortable: true
    },
    {
      name: "Action",
      cell:  () => (
        <UncontrolledDropdown>
      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
        <MoreVertical size={15} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href='/' onClick={e => e.preventDefault()}>
          <Edit className='me-50' size={15} /> <span className='align-middle'>Edit</span>
        </DropdownItem>
        <DropdownItem href='/' onClick={e => e.preventDefault()}>
          <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
   ) }
  ]
  
  useEffect(() => {
    getCountry()
  }, [])

  useEffect(() => {
    const result = country.filter(country => {
      return country.name.toLowercase().match(search.toLowerCase())
    })
    setfilterTable(result)
  }, [search])


  return (
  <DataTable title="Sorting Assignment Table"
  columns={columns} 
  data={filterTable}//{country}
  pagination
  fixedHeader  
  responsive={true}
  className='react-dataTable'
  subHeader
  subHeaderComponent={<input type="text" placeholder="Search Here" className="w-25 form-control"/>}
  subHeaderAlign="right"
  value={search}
  onChange={(e) => setSearch(e.target.value)}/>
  )
}

export default CountryTables
