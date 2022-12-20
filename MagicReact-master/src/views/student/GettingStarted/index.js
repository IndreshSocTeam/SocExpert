// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
// ** Demo Components
import MediaPlayerVideo from './MediaPlayerVideo'

// ** Custom Components

const ReactPlayer = () => {
  return (
    <Fragment>
        <h3>Getting Started</h3>
        <br/>
      <Row>
          <MediaPlayerVideo />
       
      </Row>
    </Fragment>
  )
}

export default ReactPlayer
