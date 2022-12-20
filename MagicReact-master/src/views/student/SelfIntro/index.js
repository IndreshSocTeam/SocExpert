import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
// ** Demo Components
import MediaPlayerVideo from './MediaPlayerSelfIntroVideo'

// ** Custom Components

const ReactPlayer = () => {
  return (
    <Fragment>
        <h3>Self Intro</h3>
        <br/>
      <Row>
          <MediaPlayerVideo />
       
      </Row>
    </Fragment>
  )
}

export default ReactPlayer
