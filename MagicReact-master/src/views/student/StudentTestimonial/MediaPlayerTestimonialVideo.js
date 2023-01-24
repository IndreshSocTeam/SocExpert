import {Col, Card, CardHeader, CardTitle, CardBody, Row } from 'reactstrap'
import { useState, useEffect } from 'react'
// ** Third Party Components
import ReactPlayer from 'react-player'
import {axiosClient} from '../../../Client'
const MediaPlayerTestimonailVideo = () => { 

  const [mediaVideo, setmediaVideo] = useState([])  

  useEffect(() => {
      axiosClient.get('/Testimonial/GetRecentTestimonial')
    .then((res) => {
      setmediaVideo(res.data)
    })
  }, [])
  
  return ( 

    <Row className='match-height'>
      {
      mediaVideo.map(res => (  
    <Col sm='12' md='4' lg='4' xl='4' xs='12' style={{paddingRight:'0px'}}>
             
    <Card>
      <CardBody style={{padding: "1rem"}}>
        <ReactPlayer
          width='100%'
          height={170}
          controls={true}
          className='react-player-video'
          url={res.VideoLink}
        />
      </CardBody>
      <CardHeader>
        <CardTitle style={{ fontSize:'13px', marginTop: '-20px' }}>{res.Title}</CardTitle>
      </CardHeader>
    </Card>     
   
    </Col>
     ))
    }
    </Row>
  )
}

export default MediaPlayerTestimonailVideo
