// ** React Imports
import { Fragment, useState, useEffect} from 'react'

import { Row, Col, Card, CardBody, Progress  } from 'reactstrap'
import { ThumbsUp } from 'react-feather'
// // ** Calendar App Component Imports
//  import CalendarInline from './CalendarInline'
//  import ProgressMultipleStacked from '@src/views/ui-elements/ProgressMultipleStacked'
//  import MyCalandarAttandance from './MyCalandarAttandance'

 import {toast } from 'react-toastify'
 import 'react-toastify/dist/ReactToastify.css'

//import { fetchEvents, selectEvent, updateEvent, updateFilter, updateAllFilters, addEvent, removeEvent } from './store'
import {axiosClient} from '../../../Client'
import TimerClock from './TimerClock'
import MaterialUicalander from './materialUICalander'
//import { AttandanceEvents } from './MyCalandarAttandance/utils'
// ** Styles
import '@styles/react/apps/app-calendar.scss'

import '@styles/react/libs/flatpickr/flatpickr.scss'


const CalendarComponent = () => {
  // ** Variables
  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))

  const [attandanceScores, setAttandanceScores] = useState([])
  const [checkAttandance, setCheckAttandance] = useState('')

  
  useEffect(() => {
      axiosClient.get(`Dashboard/getStudentDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
          setAttandanceScores([res.data])
        axiosClient.get(`Attandance/checkAttendancefortoday?StudentId=${loggedInUserDetails.StudentId}`).then((res1) => {
          setCheckAttandance([res1.data])
        })
      }).catch((error) => {
        //console.log(error)
        toast.error('Internal Server Error')
      })
  }, [])


  const clickPresentAttandance = () => {
    axiosClient.post(`Attandance/MarkAttendance?AttendanceId=${checkAttandance}`).then((res) => {
      toast.success('Present', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        })
    }).catch((error) => {
      //console.log(error)
      toast.error('Internal Server Error')
    })
  }
  return (
    <div>    
    {
      attandanceScores.map((getAttandanceScores, index) => (
    <Fragment key={index}>
    <Row>
    <Col><br/><br/><br/><br/>
    <div>
    {
      (checkAttandance[0] !== 0) ? (
      <h2>
    <ThumbsUp onClick={clickPresentAttandance} />&nbsp;&nbsp;&nbsp;<b>Mark your attandance by Clicking On Icon{checkAttandance}</b>
    <TimerClock/>  
    </h2>
    ) : (
      <p>Attandance is not yet Initiated</p>
    )
  }
    
    </div>
    
    </Col>
    <Col lg='4'>
        <Card>
        <CardBody>
        <h5><b>Attendance</b></h5>
        <br/>
          <Row >
            <Col>
              <Col>
              <p className='mb-50'>Present: {getAttandanceScores.PresentAttandance}</p>
              <Progress className='avg-session-progress progress-bar-success mt-25' value={getAttandanceScores.PresentAttandance} />
             </Col>
             <br/>
             <Col>
                <p className='mb-50'>Total Classes: {getAttandanceScores.TotalAttandance}</p>
                <Progress className='avg-session-progress progress-bar-warning mt-25' value={getAttandanceScores.TotalAttandance} />
              </Col> 
            </Col>     
          </Row>
        </CardBody>
        </Card>
        </Col>
      </Row>     
      <Row>
      {/* <Col><MyCalandarAttandance startingDate={new Date()} eventsArr={attandanceReport}/></Col>*/}
      <Col>  
          <MaterialUicalander/>
      </Col>
        </Row>

    </Fragment>
    ))
        }
    </div>
  )
}

export default CalendarComponent
