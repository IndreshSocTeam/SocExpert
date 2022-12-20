// ** React Imports
import { Fragment, useState} from 'react'

// ** Third Party Components
//import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Breadcrumbs from '@components/breadcrumbs'
import Tabs from './Tabs'
import CSIQsearchTab from './CSIQsearchTab'
import CSIQpostTab from './CSIQpostTab'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const CSIQ = () => {
    const [activeTab, setActiveTab] = useState('1')

    const toggleTab = tab => {
      setActiveTab(tab)
    }
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='CSIQ' breadCrumbParent='Student' breadCrumbActive='CSIQ' />
        <Row>
          <Col xs={12}>
          <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
            <CSIQsearchTab/>
            </TabPane>
            <TabPane tabId='2'>
            <CSIQpostTab/>
            </TabPane>
          </TabContent>
          </Col>
        </Row>
    </Fragment>
  )
}

export default CSIQ
