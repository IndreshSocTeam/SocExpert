import { Row, Col, Table, Card, CardBody, CardTitle, CardText, Button, CardHeader, Progress } from 'reactstrap'
 
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import AssignmentsAvgScore from './AssignmentsAvgScore'
import AssignmentsOverview from './AssignmentsOverview'

const Assignments = () => {
    return (
      
      <Row>
      <Col>
        <Row>
        <Col lg='12' xs='12'>
          <AssignmentsAvgScore/>
        </Col>        
       </Row>       
       <Row>
        <Col lg='12' xs='12'>
        <AssignmentsOverview/>
        </Col>
       </Row>
       </Col>
      </Row>
    )
  }
  
  export default Assignments
  