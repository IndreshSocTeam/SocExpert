// ** Reactstrap Imports
import { Row, Col, Table, Card, CardBody, CardTitle, CardText, Button, CardHeader, Progress } from 'reactstrap'
// ** Context
import ProgressBar from './ProgressBar'
import GenieRequests from './Requests'
import Assignments from './Assignments/'
import Attandance from './Attandance'
import ReadyForPlacement from './ReadyForPlacement'
///import Calendar from './CalendarInline'
// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'


const SocDashboard = () => {

  return (
    <div id='dashboard-ecommerce'>
      <Row >
        <Col lg='8' xs='12'>
        <ProgressBar />  
        <Row lg='12'>
        <Col lg='6' xs='12'>    
       <Assignments/>
        </Col>        
        <Col lg='6' xs='12'> 
        <GenieRequests/> 
        </Col>
        </Row>  
        </Col>
        <Col lg='4' xs='12'>
       <ReadyForPlacement/>       
       <Attandance/>
       </Col>  
       <Row>
       
       </Row>     
      </Row>      
      <br/>
    </div>
  )
}

export default SocDashboard
