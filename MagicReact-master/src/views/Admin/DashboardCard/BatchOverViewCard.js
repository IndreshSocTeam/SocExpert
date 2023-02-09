// ** Icons Imports
import { Award, HelpCircle, Users, DollarSign } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardHeader, CardFooter, CardText, CardTitle, Row, Col, Label } from 'reactstrap'
import Tooltip from '@mui/material/Tooltip'

const CardCongratulations = () => {
  return (
    <Card className='card-congratulations'>
    <CardHeader>
    <CardTitle>Active Batches</CardTitle>
    </CardHeader>
      <CardBody>
      <Row>
      <Col lg='6'>
        <CardText className='m-auto w-75'>
            <strong>Batch: </strong> CSC-50
        </CardText><br/>
        <CardText className='m-auto w-75'>
            <strong>Trainer: </strong> abcd adcd adcd cafdc
        </CardText>
      </Col>
      <Col lg='6' className='text-center'>
      <Row className='mb-1'>
        <Col> 
        <Tooltip title="Total Number of Students" arrow>         
            <Avatar id="student" name="student" icon={<Users size={20} />} className='shadow' color='primary' size='lg'/>   
        </Tooltip>       
            <Label style={{marginTop:'-20px'}} className='d-block text-white' size='md' for='student'>
                <strong>Students</strong>
            </Label>
            <span>88</span>
        </Col> 
        <Col>    
        <Tooltip title="Total Number of Students Got Placed" arrow> 
            <Avatar icon={<Award size={20} />} className='shadow' color='primary' size='lg' id='placed' name='placed'/>   
        </Tooltip>
            <Label style={{marginTop:'-20px'}} className='d-block text-white' size='md' for='placed'>
            <strong>Placed</strong> 
            </Label>
            <span>20</span>   
        </Col>
      </Row>
      <Row>
        <Col>   
        <Tooltip title="Total Number of Requests" arrow>  
            <Avatar icon={<HelpCircle size={20} />} className='shadow' color='primary' size='lg' id='requests' name='requests'/> 
        </Tooltip>
            <Label style={{marginTop:'-20px'}} className='d-block text-white' size='md' for='requests'>
            <strong>Requests</strong>
            </Label>
            <span>28</span>       
        </Col>
        <Col>    
        <Tooltip title="Total Number of Coins Buyed" arrow> 
            <Avatar icon={<DollarSign size={20} />} className='shadow' color='primary' size='lg' id='coins' name='coins'/>  
        </Tooltip>
            <Label style={{marginTop:'-20px'}} className='d-block text-white' size='md' for='coins'>
            <strong>Coins</strong>
            </Label>
            <span>800</span>      
        </Col>
      </Row>
      </Col>
      </Row>  
      {/*<Row>
        <div className='text-center'>
            <h1 className='mb-1 text-white'>Congratulations John,</h1>
            <CardText className='m-auto w-75'>
            You have done <strong>57.6%</strong> more sales today. Check your new badge in your profile.
            </CardText>
        </div>        
        </Row>  */}
      <Row className='mt-2'>
        <Col lg='6'>
            <Label className='text-right text-white' size='sm' for='placed'>
                <strong>Start Date: </strong> 20-01-2023
            </Label> 
        </Col>
        <Col lg='6'>
            <Label className='text-right text-white' size='sm' for='placed'>
                <strong>End Date: </strong> 20-01-2023
            </Label> 
        </Col>
      </Row>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
