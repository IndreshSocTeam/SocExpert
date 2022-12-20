// ** React Imports
import { Fragment} from 'react'

// ** Third Party Components

import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardTitle, CardHeader, CardText} from 'reactstrap'

import { Star } from 'react-feather'
// ** Demo Components
import Breadcrumbs from '@components/breadcrumbs'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const StudentProfile = () => {

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Cyber News' breadCrumbParent='Student' breadCrumbActive='Cyber News' />
        <Row>
          <Col xs={12}>
          <Card>
       
        <CardBody className='py-2 my-25'>
        <CardText> 
            </CardText>
            <ul className='list-style-icons'>
              <li>
                <Star size={14} className='rotate-rtl me-50' />
                <a href='https://thehackernews.com/' target='_blank'>https://thehackernews.com/</a>
              </li>
              <li>
                <Star size={14} className='rotate-rtl me-50' />
                <a href='https://www.darkreading.com/' target='_blank'>https://www.darkreading.com/</a>
              </li>
              <li>
                <Star size={14} className='rotate-rtl me-50' />
                <a href='https://threatpost.com/' target='_blank'>https://threatpost.com/</a>
              </li>
              <li>
                <Star size={14} className='rotate-rtl me-50' />
                <a href='https://www.securityweek.com/' target='_blank'>https://www.securityweek.com/</a>
              </li>
              <li>
                <Star size={14} className='rotate-rtl me-50' />
                <a href='https://www.hackread.com/' target='_blank'>https://www.hackread.com/</a>
              </li>
              <li>
                <Star size={14} className='rotate-rtl me-50' />
                <a href='https://www.csoonline.com/in/news/' target='_blank'>https://www.csoonline.com/in/news/</a>
              </li>
              <li>
                <Star size={14} className='rotate-rtl me-50' />
                <a href='https://gbhackers.com/' target='_blank'>https://gbhackers.com/</a>
              </li>
              <li>
                <Star size={14} className='rotate-rtl me-50' />
                <a href='https://www.cyberdefensemagazine.com/' target='_blank'>https://www.cyberdefensemagazine.com/</a>
              </li>
              </ul>
        </CardBody>
        </Card>
          </Col>
        </Row>
    </Fragment>
  )
}

export default StudentProfile
