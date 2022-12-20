import { Card, CardBody, Col, Progress, Row } from 'reactstrap'

import { useEffect, useState } from 'react'
import {axiosClient} from '../../../Client'

const ProgressBarDashboard = () => {

    const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
    const [progressBarStudent, setProgressBarStudent] = useState([])
    const [progressBarBatch, setProgressBarBatch] = useState([])
  
    useEffect(() => {
        axiosClient.get(`Dashboard/GetStudnetProgressNumberForDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setProgressBarStudent([res.data])
          console.log('Progress Bar for Student',  res.data)
          axiosClient.get(`Dashboard/GetBatchProgressNumberForDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res1) => {
            setProgressBarBatch([res1.data])
            console.log('Progress Bar for Batch',  res1.data)
          })
        }).catch((error) => {
          console.log(error)
        })
    }, [])
  
  return (
    <Card>
      <CardBody>
        <h5>Your Progress</h5>
        <br/>
      <Progress multi>
      {
        progressBarStudent.map((getprogressBarStudent, index) => (
      <Progress key={index} bar color='success' value={getprogressBarStudent}>
        {getprogressBarStudent}
      </Progress>
        ))
    }
    {
        progressBarBatch.map((getprogressBarBatch, index) => (
      <Progress key={index} bar color='danger' value={getprogressBarBatch}>
       {getprogressBarBatch}
      </Progress>
      
      ))
    }
    </Progress>
    <br/>
        <div className='d-flex align-items-center me-2 d-inline'>
            <span className='bullet bullet-success me-50'></span>
            <span>You are here</span>
         </div>
         <div className='d-flex align-items-center d-inline'>
             <span className='bullet bullet-danger me-50'></span>
             <span>Your batch</span>
         </div>
    </CardBody>
    </Card>
  )
}
export default ProgressBarDashboard