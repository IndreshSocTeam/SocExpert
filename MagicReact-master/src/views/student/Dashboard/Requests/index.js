import { Row, Col, Table, Card, CardBody, CardTitle, CardText, Button, CardHeader, Progress } from 'reactstrap'
 
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import AvgRequestsScore from './AvgRequests'
import RequestsOverview from './RequestsOverview'

const Requests = () => {
    return (
      
      <Row>
      <Col>
        <Row>
        <Col lg='12' xs='12'>
          <AvgRequestsScore/>
        </Col>
        </Row>
        <Row>
        <Col lg='12' xs='12'>
        <RequestsOverview/>
        </Col>
       </Row>
       </Col>
      </Row>
    )
  }
  
  export default Requests
  