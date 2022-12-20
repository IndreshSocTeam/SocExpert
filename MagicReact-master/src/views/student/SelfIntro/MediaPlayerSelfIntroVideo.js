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
          url='https://www.youtube.com/watch?v=DQiYrhxf2Fs'
        />
      </CardBody>
      <CardHeader>
        <CardTitle style={{ fontSize:'13px', marginTop: '-20px' }}>How to Introduce Yourself in Cybersecurity Job Interviews - for Working Professionals</CardTitle>
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
          url='https://www.youtube.com/watch?v=BeA13U_blO8'
        />
      </CardBody>
      <CardHeader>
        <CardTitle style={{ fontSize:'13px', marginTop: '-20px' }}>How to Introduce Yourself in Cybersecurity Job Interviews - Fresh Graduates</CardTitle>
      </CardHeader>
    </Card>
    </Col>
    
    </Row>
  )
}

export default MediaPlayerVideo
