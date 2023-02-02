import React, {useState, useEffect} from 'react'
import { Row, Col, Progress, Form, Card, CardText, Input, Label, Button, CardBody, CardTitle, CardHeader, ListGroup, ListGroupItem, TabContent, TabPane, Spinner } from 'reactstrap'
import classnames from 'classnames'
import {axiosClient} from '../../../../Client'
import Cookies from 'js-cookie'
import {AES, enc} from 'crypto-js'

const ModulePerWeeks = () => {
    
    //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
    //const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
    const loggedInUserDetails = JSON.parse(AES.decrypt(Cookies.get("loggedInUserDetails"), 'secret-key').toString(enc.Utf8));

  const [loading, setLoading] = useState(false)
  const [activeList, setActiveLIst] = useState('1')
  const [Weeks, setWeeks] = useState([])
  const [Chapters, setChapters] = useState([])

  const toggleList = list => {
    if (activeList !== list) {
      setActiveLIst(list)       
      setLoading(true)      
      axiosClient.get(`ProgressDashboard/GetAllControlersOnWeekNumber?WeekNumber=${list}&CourseId=4`).then((res1) => {
      setChapters(res1.data)
        setLoading(false)
     }) 
    }
  }


  useEffect(() => {
    setLoading(true)  
    axiosClient.get(`ProgressDashboard/getWeeksOnStudentId?StudentId=${loggedInUserDetails.StudentId}&CourseId=4`).then((res) => {
      setWeeks(res.data)
      setLoading(false)  
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
          
          <ListGroup className='mb-2'>
          {
            Weeks.map((w, index) => (
          <ListGroupItem key={index}  className={classnames('cursor-pointer d-flex', {
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
