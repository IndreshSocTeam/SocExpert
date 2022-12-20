import { Row, Col, Table, Card, CardBody, CardTitle, CardText, Button, CardHeader, Progress } from 'reactstrap'
import { Fragment, useState, useEffect} from 'react'
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import AttandanceScore from './AttandanceScore'
import AttandanceCalander from '../../Attendance/MyCalandarAttandance'
import {axiosClient} from '../../../../Client'

const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))


const Attandance = () => {
  const [attandanceReport, setAttandanceReport] = useState([])
  useEffect(() => {
     axiosClient.get(`Attandance/getStudentAttandanceReport?StudentId=${loggedInUserDetails.StudentId}`).then((res2) => {
        setAttandanceReport(res2.data)          
        console.log('Dashboard Attandance Report for calandar',  res2.data)
    }).catch((error) => {
      console.log(error)
    })
}, [])

    return (
      <Row>
        <Row>
        <Col lg='12' xs='12'>
        <AttandanceScore/>
        </Col>
        </Row>
        <Row>
        <Col lg='12' xs='12'>
        <AttandanceCalander startingDate={new Date()} eventsArr={attandanceReport}/>
        </Col>
       </Row>
       </Row>
    )
  }
  
  export default Attandance
  