import {Col, Card, CardHeader, CardTitle, CardBody, Row } from 'reactstrap'

// ** Third Party Components
import ReactPlayer from 'react-player'

const MediaPlayerVideo = () => {
  return (
    <Row className='match-height'>
    <Col sm='12' md='4' lg='4' xl='4' xs='12'>
    <Card>
      <CardBody>
        <ReactPlayer
          width='100%'
          height={180}
          controls={true}
          className='react-player-video'
          url='https://www.youtube.com/watch?v=HXSA-9G0RFk&t=2s'
        />
      </CardBody>
      <CardHeader>
        <CardTitle style={{ fontSize:'13px', marginTop: '-20px' }}>SOC Experts - Resources - To help you start your Cybersecurity Career</CardTitle>
      </CardHeader>
    </Card>
    </Col>
    <Col sm='12' md='4' lg='4' xl='4' xs='12'>
    <Card>
      <CardBody>
        <ReactPlayer
          width='100%'
          height={180}
          controls={true}
          className='react-player-video'
          url='https://www.youtube.com/watch?v=S-NY7JyX0k0'
        />
      </CardBody>
      <CardHeader>
        <CardTitle style={{ fontSize:'13px', marginTop: '-20px' }}>SOC Experts - Methodology - Triple E</CardTitle>
      </CardHeader>
    </Card>
    </Col>
    <Col sm='12' md='4' lg='4' xl='4' xs='12'>
    <Card>
      <CardBody>
        <ReactPlayer
          width='100%'
          height={180}
          controls={true}
          className='react-player-video'
          url='https://www.youtube.com/watch?v=ZAah0ItCEgc'
        />
      </CardBody>
      <CardHeader>
        <CardTitle style={{ fontSize:'13px', marginTop: '-20px' }}>SOC Experts - Importance of Mock Interviews</CardTitle>
      </CardHeader>
    </Card>
    </Col>
    </Row>
  )
}

export default MediaPlayerVideo
