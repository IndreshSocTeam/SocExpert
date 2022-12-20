import { Card, CardBody, Col, Progress, Row } from 'reactstrap'

const ProgressMultipleStacked = () => {
  return (
    <Card>
      <CardBody>
        <h5>Your Progress</h5>
        <br/>
      <Progress multi>
      <Progress bar color='success' value='45'>
        45%
      </Progress>
      <Progress bar color='danger' value='20'>
        20%
      </Progress>
    </Progress>
    <br/>
        <div className='d-flex align-items-center me-2 d-inline'>
            <span className='bullet bullet-success me-50'></span>
            <span>You are here</span>
         </div>
         <div className='d-flex align-items-center d-inline'>
             <span className='bullet bullet-danger me-50'></span>
             <span>Your batch</span>
         </div>
    </CardBody>
    </Card>
  )
}
export default ProgressMultipleStacked