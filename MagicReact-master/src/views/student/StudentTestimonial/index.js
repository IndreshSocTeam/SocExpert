// ** React Imports
import { Fragment } from 'react'


// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
// ** Demo Components
import MediaPlayerTestimonailVideo from './MediaPlayerTestimonialVideo'

// ** Custom Components

const ReactPlayer = () => {
  return (
    <Fragment>
        <h3>Student Testimonials</h3>
        <br/>
      <Row>
          <MediaPlayerTestimonailVideo />
       
      </Row>
    </Fragment>
  )
 
}

export default ReactPlayer
