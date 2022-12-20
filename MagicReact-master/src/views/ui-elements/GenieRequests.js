import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

import RequestByType from '@src/views/ui-elements/RequestByType'
import GoalOverview from '@src/views/ui-elements/GoalOverview'
import Earnings from '@src/views/ui-elements/Earnings'

// ** Styles
import '@src/@core/scss/react/libs/charts/apex-charts.scss'

      
const GenieRequests = () => {
    return (
     <Row>
     <Col lg='12'>
     <Card>
            <CardBody>
                <h5>Genie Requests</h5>
                <br/>
                <Row>
                    <Col>
                    <h2>10</h2>
                    <p>Rquests</p>
                    </Col>
                    <Col style = {{marginTop : -30}}>
                    <GoalOverview/>
                    <p className='text-center'>Average Score</p>
                    </Col>
                </Row>
            </CardBody>
        </Card>
        </Col>
        <Col lg='12'>
        <Card>
            <CardBody>
                <h5>Requests by Type</h5>                
                <Earnings/>
                <div className='d-flex align-items-center me-2 d-inline'>
            <span className='bullet bullet-primary me-50'></span>
            <span>Mock - 58.6%</span>
         </div>
         <div className='d-flex align-items-center d-inline'>
            
             <span className='bullet bullet-danger me-50'></span>
             <span>Borrow Experience - 34.9%</span>
         </div>
         <div className='d-flex align-items-center d-inline'>
             <span className='bullet bullet-warning me-50'></span>
             <span>CV Review - 6.5%</span>
         </div>
                <RequestByType/>
            </CardBody>
        </Card>
        </Col>
        </Row>
    )
  }


  export default GenieRequests