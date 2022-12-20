// ** React Imports
import { Fragment, useState} from 'react'

// ** Third Party Components
//import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import CVPoints1 from './L1CVPoints'
import CVPoints2 from './L2CVPoints'
import CVPoints3 from './L3CVPoints'
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const CVPoints = () => {
  const [activeTab, setActiveTab] = useState('1')

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='CV Points' breadCrumbParent='CV' breadCrumbActive='CV Points' />
        <Row>
          <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab} >
              <TabPane tabId='1'>
              <CVPoints1/>
              </TabPane>
              <TabPane tabId='2'>
              <CVPoints2/>
              </TabPane>
              <TabPane tabId='3'>
              <CVPoints3/>
              </TabPane> 
            </TabContent>
          </Col>
        </Row>
    </Fragment>
  )
}

export default CVPoints
