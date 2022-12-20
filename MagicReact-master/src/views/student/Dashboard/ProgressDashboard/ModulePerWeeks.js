import React, {useState, useEffect} from 'react'
import { Row, Col, Progress, Form, Card, CardText, Input, Label, Button, CardBody, CardTitle, CardHeader, ListGroup, ListGroupItem, TabContent, TabPane, Spinner } from 'reactstrap'
import classnames from 'classnames'
import {axiosClient} from '../../../../Client'

const ModulePerWeeks = () => {
    
  const [loading, setLoading] = useState(false)
  const [activeList, setActiveLIst] = useState('1')
  const [Weeks, setWeeks] = useState([])
  const [Chapters, setChapters] = useState([])

  const toggleList = list => {
    if (activeList !== list) {
      setActiveLIst(list)
      console.log("clicked week", list)       
      setLoading(true)      
      axiosClient.get(`ProgressDashboard/GetAllControlersOnWeekNumber?WeekNumber=${list}&CourseId=4`).then((res1) => {
      setChapters(res1.data)
        setLoading(false)
        console.log("assignents weeks", res1.data)
     }) 
    }
  }


  useEffect(() => {
    setLoading(true)  
    axiosClient.get(`ProgressDashboard/getWeeksOnStudentId?StudentId=503&CourseId=4`).then((res) => {
      setWeeks(res.data)
      setLoading(false)  
      console.log("Weeks", res.data) 
  }).catch((error) => {
    console.log(error)
  })  

  }, [])

  return (
    <div>
    <form>

    {
      loading ? (
        <Spinner  animation="border" role="status"/>
      ) : ( 
      <Row>
        <Col sm='12' lg='2'>
          
          <ListGroup>
          {
            Weeks.map((w) => (
          <ListGroupItem  className={classnames('cursor-pointer d-flex', {
            active: activeList === `${w.WeekNumber}`
          })}
          onClick={() => toggleList(`${w.WeekNumber}`)}
          action>
          <div className='d-flex align-items-center'>
          <b>Week&nbsp;{w.WeekNumber}</b>
        </div>
          </ListGroupItem>
          
      ))
    }
          </ListGroup>
        </Col>
        <Col lg='10'>
        <Row className='match-height'>
        {
          Chapters.map((ch) => (
            <Col sm='12' md='4' lg='4' xl='4' xs='12'>
          <TabContent activeTab={activeList}>
            <TabPane tabId={activeList}>
            
              <Card className='me-1 col-12 p-2'>
              <CardText>
              {ch.Name}
              </CardText>
              </Card>
            </TabPane>
          </TabContent>
        </Col>      
        ))
      }        
        
      
      </Row>
      </Col>
      </Row>
      
      )
    }
      </form>
    </div>
  )
}

export default ModulePerWeeks
