// ** React Imports
import { Fragment} from 'react'

// ** Third Party Components
//import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Breadcrumbs from '@components/breadcrumbs'
import MyRequestTab from './MyRequestTable'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'


const MyRequest = () => {

  return (
    <Fragment>
        <Row>
          <Col xs={12}>
                    <MyRequestTab/>
          </Col>
          </Row>
    </Fragment>
  )
}

export default MyRequest
