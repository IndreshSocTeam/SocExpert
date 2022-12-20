import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import GoalOverview from '@src/views/ui-elements/GoalOverview'
import Earnings from '@src/views/ui-elements/Earnings'
import AssignmentsOverView from '@src/views/ui-elements/AssignmentsOverView'

const Assignments = () => {
    return (
     <Row>
     <Col lg='12'>
     <Card>
            <CardBody>
                <h5>Assignments</h5>
                <br/>
                <Row>
                    <Col>
                    <h2>12</h2>
                    <p>Submitted</p>
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
          <AssignmentsOverView/>
            </CardBody>
        </Card>
        </Col>
        </Row>
    )
  }


  export default Assignments