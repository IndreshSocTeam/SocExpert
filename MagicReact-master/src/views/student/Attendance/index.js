// ** React Imports
import { Fragment, useState, useEffect} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { Row, Col, Card, CardBody, Progress  } from 'reactstrap'
import { ThumbsUp } from 'react-feather'
// // ** Calendar App Component Imports
 import CalendarInline from './CalendarInline'
 import SidebarLeft from './SidebarLeft'
 import ProgressMultipleStacked from '@src/views/ui-elements/ProgressMultipleStacked'

 import {toast } from 'react-toastify'
 import 'react-toastify/dist/ReactToastify.css'
// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
//import { fetchEvents, selectEvent, updateEvent, updateFilter, updateAllFilters, addEvent, removeEvent } from './store'
import {axiosClient} from '../../../Client'
import TimerClock from './TimerClock'
import MyCalandarAttandance from './MyCalandarAttandance'
//import { AttandanceEvents } from './MyCalandarAttandance/utils'
// ** Styles
import '@styles/react/apps/app-calendar.scss'

// ** CalendarColors
//src\@core\scss\base\plugins\forms\pickers\form-flat-pickr.scss
import '@styles/react/libs/flatpickr/flatpickr.scss'

const CalendarComponent = () => {
  // ** Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.Calendar)

  // ** states
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)

  // ** Hooks
  //const [isRtl] = useRTL()
  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  // ** LeftSidebar Toggle Function
  const toggleSidebar = val => setLeftSidebarOpen(val)
  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))

  const [attandanceScores, setAttandanceScores] = useState([])
  const [checkAttandance, setCheckAttandance] = useState('')
  const [attandanceReport, setAttandanceReport] = useState([])

  useEffect(() => {
      axiosClient.get(`Dashboard/getStudentDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
          setAttandanceScores([res.data])
        console.log('Attandance',  res.data)
        axiosClient.get(`Attandance/checkAttendancefortoday?StudentId=${loggedInUserDetails.StudentId}`).then((res1) => {
          setCheckAttandance([res1.data])
          console.log('Did Attandance Initiated?',  res1.data)
        axiosClient.get(`Attandance/getStudentAttandanceReport?StudentId=${loggedInUserDetails.StudentId}`).then((res2) => {
          setAttandanceReport(res2.data)          
          console.log('Attandance Report for calandar',  res2.data)
          })
        })
      }).catch((error) => {
        console.log(error)
      })
  }, [])

//console.log("checkAttandance", checkAttandance[0])

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
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <div>    
    {
      attandanceScores.map((getAttandanceScores, index) => (
    <Fragment>
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
              <p className='mb-50' key={index}>Present: {getAttandanceScores.PresentAttandance}</p>
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
      </Col></Row>
        {/*
      <div className='app-calendar overflow-hidden border'>
      <Row className='g-0'>
        <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >
            <SidebarLeft
              store={store}
              dispatch={dispatch}
              //updateFilter={updateFilter}
              toggleSidebar={toggleSidebar}
              //updateAllFilters={updateAllFilters}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <Col className='position-relative'>
            <CalendarInline/>
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
          </Row>       
      </div>
        */}
        <Row>
      <Col><MyCalandarAttandance startingDate={new Date()} eventsArr={attandanceReport}/></Col>
        </Row>
    </Fragment>
    ))
        }
    </div>
  )
}

export default CalendarComponent
