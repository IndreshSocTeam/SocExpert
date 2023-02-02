import { Row, Col, UncontrolledTooltip  } from 'reactstrap'
import { Fragment, useState, useEffect, CSSProperties} from 'react'
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import AttandanceScore from './AttandanceScore'
import AttandanceCalander from '../../Attendance/MyCalandarAttandance'
import MaterialUicalander from '../../Attendance/materialUICalander'
import {axiosClient} from '../../../../Client'

import ClipLoader from "react-spinners/ClipLoader"
import Cookies from 'js-cookie'
import {AES, enc} from 'crypto-js'

const override: CSSProperties = {
  display:"block",
  margin:"auto",
  left:"0",
  right:"0%",
  bottom:"0",
  top:"0",
  position: "absolute",
};



const Attandance = () => {
  //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
 // const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
  const loggedInUserDetails = JSON.parse(AES.decrypt(Cookies.get("loggedInUserDetails"), 'secret-key').toString(enc.Utf8));

  const [attandanceReport, setAttandanceReport] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
     axiosClient.get(`Attandance/getStudentAttandanceReport?StudentId=${loggedInUserDetails.StudentId}`).then((res2) => {
        setAttandanceReport(res2.data)          
        setLoading(false)
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
        <Col lg='12' xs='12'  id='cal'>
        <ClipLoader
        color={"#6610f2"}
        loading={loading}
        cssOverride={override}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier="1"
      />
        {/*<AttandanceCalander startingDate={new Date()} eventsArr={attandanceReport} />*/}
        
        <MaterialUicalander/>
        </Col>
          
  <UncontrolledTooltip placement='top' target='cal'>
  Your Attandance Sheet
</UncontrolledTooltip> 
       </Row>
       </Row>
    )
  }
  
  export default Attandance
  