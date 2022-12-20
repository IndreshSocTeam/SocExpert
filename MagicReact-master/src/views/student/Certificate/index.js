// ** React Imports
import { Fragment, useState} from 'react'

// ** Third Party Components
//import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'
// ** Demo Components
import Breadcrumbs from '@components/breadcrumbs'
import Certificate from './certificate'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const CertificatePage = () => {
   
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Certificate' breadCrumbParent='Student' breadCrumbActive='Certificate' />
        <Row>
          <Col xs={12}>
          <Certificate/>
          </Col>
        </Row>
    </Fragment>
  )
}

export default CertificatePage
