// ** React Imports
import { useParams } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'

// ** Email App Component Imports
import Mails from './Mails'
import Sidebar from './Sidebar'

import { Row, Col, Card, CardHeader, CardBody, CardTitle, Button, Input, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

// ** Third Party Components
import classnames from 'classnames'

// ** Store & Actions
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   getMails,
//   selectMail,
//   updateMails,
//   paginateMail,
//   selectAllMail,
//   updateMailLabel,
//   resetSelectedMail,
//   selectCurrentMail
// } from './store'

// ** Styles
import '@styles/react/apps/app-email.scss'
import './scrollable.scss'

const JobsApp = () => {
  // ** States
  // const [query, setQuery] = useState('')
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  // const [composeOpen, setComposeOpen] = useState(false)

  // // ** Toggle Compose Function
  // const toggleCompose = () => setComposeOpen(!composeOpen)

  // // ** Store Variables
  // const dispatch = useDispatch()
  // const store = useSelector(state => state.email)

  // // ** Vars
  // const params = useParams()

  // // ** UseEffect: GET initial data on Mount
  // useEffect(() => {
  //   dispatch(getMails({ q: query || '', folder: params.folder || 'inbox', label: params.label || '' }))
  // }, [query, params.folder, params.label])

  return (
    <Fragment>
      <Row>
      <Col>
      <Card> 
      <CardHeader  className='border-bottom'>
      <CardTitle tahg='h4'>Jobs</CardTitle>
      </CardHeader>
      <CardBody >
      <div className='scrollable_container'>
      <Card>
      <CardHeader  className='border-bottom'>
      <CardTitle tahg='h4'>Job Title</CardTitle>
      </CardHeader>
      <CardBody>
      Job Name
      <br/>
      Company Name:
      </CardBody>
      </Card>
      <br/><br/>
      <Card>
      <CardHeader>
      <CardTitle tahg='h4'>Job Title</CardTitle>
      </CardHeader>
      <CardBody>
      Job Name
      <br/>
      Company Name:
      </CardBody>
      </Card>
      <br/><br/>
      <Card>
      <CardHeader>
      <CardTitle tahg='h4'>Job Title</CardTitle>
      </CardHeader>
      <CardBody>
      Job Name
      <br/>
      Company Name:
      </CardBody>
      </Card>
      <Card>
      <CardHeader>
      <CardTitle tahg='h4'>Job Title</CardTitle>
      </CardHeader>
      <CardBody>
      Job Name
      <br/>
      Company Name:
      </CardBody>
      </Card>
      <Card>
      <CardHeader>
      <CardTitle tahg='h4'>Job Title</CardTitle>
      </CardHeader>
      <CardBody>
      Job Name
      <br/>
      Company Name:
      </CardBody>
      </Card>
      <Card>
      <CardHeader>
      <CardTitle tahg='h4'>Job Title</CardTitle>
      </CardHeader>
      <CardBody>
      Job Name
      <br/>
      Company Name:
      </CardBody>
      </Card>
      <Card>
      <CardHeader>
      <CardTitle tahg='h4'>Job Title</CardTitle>
      </CardHeader>
      <CardBody>
      Job Name
      <br/>
      Company Name:
      </CardBody>
      </Card>
      <Card>
      <CardHeader>
      <CardTitle tahg='h4'>Job Title</CardTitle>
      </CardHeader>
      <CardBody>
      Job Name
      <br/>
      Company Name:
      </CardBody>
      </Card>
      </div>
      </CardBody>
      </Card>
      </Col>
      <Col>
      <Card>
      <CardHeader>
      <CardTitle tahg='h4'>Associate Security Analyst - SOC</CardTitle>
      </CardHeader>
      <CardBody>
      Full Job Description
      <br/>
      Company Profile:
      </CardBody>
      </Card>
      </Col>
      </Row>
    </Fragment>
  )
}

export default JobsApp
