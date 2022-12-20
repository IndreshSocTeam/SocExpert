import React from 'react'
import { Row, Col, Progress, Form, Card, CardText, Input, Label, Button, CardBody, CardTitle, CardHeader, ListGroup, ListGroupItem, TabContent, TabPane, Spinner } from 'reactstrap'

const ModuleProgressCard = () => {
  return (
    <div>
    <Card>
    <CardBody>
      <h5>Your Progress</h5>
      <br/>
    <Progress multi>
    <Progress bar striped className='progress-bar-warning' color='success' value='20'>
    </Progress>
    <Progress  bar color='danger' value='10'>
    </Progress>
  </Progress>
  <br/>
      <div className='d-flex align-items-center me-2 d-inline'>
          <span className='bullet bullet-success me-50'></span>
          <span>Completed Task</span>
       </div>
       <div className='d-flex align-items-center d-inline'>
           <span className='bullet bullet-danger me-50'></span>
           <span>Pending Tasks</span>
       </div>
       <div className='d-flex align-items-center d-inline'>
           <span className='bullet bullet-secondary me-50'></span>
           <span>Tasks not yet coverd in class</span>
       </div>
  </CardBody>
  </Card> 
    </div>
  )
}

export default ModuleProgressCard
