
  // ** Reactstrap Imports
import { Fragment, useState, useEffect } from 'react'

import mock from './mock'

import './jobs'

// ** Third Party Imports
import axios from 'axios'

// ** Demo Components
import JobsDescriptions from './JobsDescriptions'
import JobFilter from './JobsFilter'

// ** Custom Component
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/base/pages/page-faq.scss'

import { Card, CardBody, CardTitle, CardHeader, CardText } from 'reactstrap'
  // ** React Imports
  
  const Jobs = () => {
    // ** States
    const [data, setData] = useState(null),
      [searchTerm, setSearchTerm] = useState('')
  
    const getFAQData = query => {
      return axios.get('/faq/data', { params: { q: query } }).then(response => {
        setData(response.data)
      })
    }
  
    useEffect(() => {
      getFAQData(searchTerm)
    }, [])
  
    return (
      <Fragment>
        <Breadcrumbs breadCrumbTitle='Jobs' breadCrumbParent='Pages' breadCrumbActive='Jobs Opening' />
        <JobFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} getFAQData={getFAQData}  />
        {data !== null ? <JobsDescriptions data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> : null}
       </Fragment>
      
    )
  }
  mock.onAny().passThrough()
  export default Jobs