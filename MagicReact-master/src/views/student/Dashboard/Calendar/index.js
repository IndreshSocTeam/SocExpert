// ** React Imports
import { Fragment, useState} from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { Row, Col, Card, CardBody, Progress  } from 'reactstrap'
import { ThumbsUp } from 'react-feather'
// // ** Calendar App Component Imports
 import Calendar from './Calendar'
 import ProgressMultipleStacked from '@src/views/ui-elements/ProgressMultipleStacked'
// import AddEventSidebar from './AddEventSidebar'

// ** Custom Hooks
//import { useRTL } from '@hooks/useRTL'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
//import { fetchEvents, selectEvent, updateEvent, updateFilter, updateAllFilters, addEvent, removeEvent } from './store'

// ** Styles
import '@styles/react/apps/app-calendar.scss'

// ** CalendarColors


const CalendarComponent = () => {
  // ** Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.Calendar)

  // ** states
  const [calendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)

  // ** Hooks
  //const [isRtl] = useRTL()

  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  // ** LeftSidebar Toggle Function
  const toggleSidebar = val => setLeftSidebarOpen(val)

  // ** Blank Event Object
 
  // ** refetchEvents
  // const refetchEvents = () => {
  //   if (calendarApi !== null) {
  //     calendarApi.refetchEvents()
  //   }
  // }

  // ** Fetch Events On Mount
  // useEffect(() => {
  //   dispatch(fetchEvents(store.selectedCalendars))
  // }, [])

  return (
    <Fragment>
    
      <div className='app-calendar overflow-hidden border'>
        <Row className='g-0'>
            <Col className='position-relative'>
            <Calendar
              //isRtl={isRtl}
              store={store}
              dispatch={dispatch}
              //blankEvent={blankEvent}
              calendarApi={calendarApi}
              //selectEvent={selectEvent}
              //updateEvent={updateEvent}
              toggleSidebar={toggleSidebar}
              //calendarsColor={calendarsColor}
              //setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      
    </Fragment>
  )
}

export default CalendarComponent
