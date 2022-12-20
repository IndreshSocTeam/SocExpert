// ** React Imports
import { Fragment, useState} from 'react'

// ** Third Party Components
//import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import Breadcrumbs from '@components/breadcrumbs'
import CreateRequestTab from './CreateRequest'
import MyRequestTab from './MyRequest/'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'


const StudentRequest = () => {
  const [activeTab, setActiveTab] = useState('1')

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Request' breadCrumbParent='Review' breadCrumbActive='Request' />
        <Row>
          <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                    <CreateRequestTab />
              </TabPane>
              <TabPane tabId='2'>
                    <MyRequestTab/>
              </TabPane>
              </TabContent>
          </Col>
        </Row>
    </Fragment>
  )
}

export default StudentRequest
