// ** React Imports
import { Fragment, useState} from 'react'

// ** Third Party Components
//import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import Breadcrumbs from '@components/breadcrumbs'
import PersonalDetailsTabs from './PersonalDetails'
import EducationDetailsTabs from './EducationDetails'
import ExperienceDetailsTabs from './ExperienceDetails'
import UploadeResumeTabs from './UploadResume'
import EnrollmentDetailsTabs from './EnrollmentDetails'
import ChangePasswordTabs from './ChangePassword'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('1')

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Profile Details' breadCrumbParent='Pages' breadCrumbActive='Profile Details' />
        <Row>
          <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                    <PersonalDetailsTabs/>
              </TabPane>
              <TabPane tabId='2'>
                    <EducationDetailsTabs/>
              </TabPane>
              <TabPane tabId='3'>
                    <ExperienceDetailsTabs/>
              </TabPane>  
              <TabPane tabId='4'>
                    <UploadeResumeTabs/>
              </TabPane>
              <TabPane tabId='5'>
                    <EnrollmentDetailsTabs/>
              </TabPane>
              <TabPane tabId='6'>
                    <ChangePasswordTabs/>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
    </Fragment>
  )
}

export default StudentProfile
