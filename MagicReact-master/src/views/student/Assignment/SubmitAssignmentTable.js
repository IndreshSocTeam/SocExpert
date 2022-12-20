// ** Custom Components
import AvatarGroup from '@components/avatar-group'

// ** Images
import Select from 'react-select'

import  UploadResume from './UploadResume'

import { Link } from 'react-router-dom'

import { Fragment} from 'react'
// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import {  Row, Col, Form, Card, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'


import Breadcrumbs from '@components/breadcrumbs'

const SubmitAssignmentTable = () => {

  // Empty array in useState!
  

  const tableHeaders = [
    { key: "id", label: "SUBMISSION ID" },
    { key: "date", label: "DATE" },
    { key: "whatIsGood", label: "WHAT Is GOOD?" },
    { key: "WhatNeedToBeImproved", label: "What Need to be Improved?" },
    { key: "Score", label: "SCORE" },
    { key: "Actions", label: "Actions" }
  ]
  return (
    <Fragment>
    <Card className='py-2 my-25 p-2'>      
      <Row>
        <Col sm='12'>
          <Card title='Review Assignment' className='py-2 my-25' >
          
    <Table hover responsive>    
      <thead>
      <tr>
          {tableHeaders.map((row) => {
            return (
              <th key={row.key}>
                {row.label}{" "}                
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span className='align-middle fw-bold'><UploadResume/></span>
          </td>
          <td>2022-09-03</td>
          <td>⭐⭐⭐⭐⭐</td>
          <td>Yes </td>
          <td>
            <Badge pill color='light-primary' className='me-1'>
              Active
            </Badge>
          </td>
          <td>
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
          </td>
        </tr>
        <tr>
        <td>
        <span className='align-middle fw-bold'><Link to='https://magic.socexperts.com/' target='blank'>ID:202213267</Link></span></td>
      <td>2022-09-03</td>
      <td>⭐⭐⭐⭐</td>
      <td>Yes </td>
          <td>
            <Badge pill color='light-success' className='me-1'>
              Completed
            </Badge>
          </td>
          <td>
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
          </td>
        </tr>
        <tr>
        <td><span className='align-middle fw-bold'><Link to='https://magic.socexperts.com/' target='blank'>ID:202283298</Link></span></td>
        <td>2022-09-03</td>
        <td>⭐⭐⭐⭐</td>
        <td>Yes </td>
          <td>
            <Badge pill color='light-info' className='me-1'>
              Scheduled
            </Badge>
          </td>
          <td>
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
          </td>
        </tr>
        <tr>
        <td><span className='align-middle fw-bold'><Link to='https://magic.socexperts.com/' target='blank'>ID:202253234</Link></span></td>
        <td>2022-09-03</td>
        <td>⭐⭐⭐⭐</td>
        <td>No </td>
          <td>
            <Badge pill color='light-warning' className='me-1'>
              Pending
            </Badge>
          </td>
          <td>
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
          </td>
        </tr>
      </tbody>
    </Table>
    </Card>
        </Col>
      </Row>
      <b>How To Review Assignments:</b><hr/>
      <p>Reviewing is Good,Reviewing is Good,Reviewing is Good,Reviewing is Good,Reviewing is Good,Reviewing is Good,,Reviewing is Good,Reviewing is Good,Reviewing is Good</p>
      </Card>
      </Fragment>
    
  )
}

export default SubmitAssignmentTable
