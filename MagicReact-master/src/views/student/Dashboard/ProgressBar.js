import { Card, CardBody, Progress, UncontrolledTooltip } from 'reactstrap'

import { useEffect, useState, CSSProperties } from 'react'
import { Link } from "react-router-dom";
import {axiosClient} from '../../../Client'
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

const ProgressBarDashboard = () => {

    //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
    //const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
    const loggedInUserDetails = JSON.parse(AES.decrypt(Cookies.get("loggedInUserDetails"), 'secret-key').toString(enc.Utf8));
 
    const [loading, setLoading] = useState(false)
    const [progressBarStudent, setProgressBarStudent] = useState([])
    const [progressBarBatch, setProgressBarBatch] = useState([])
  
    useEffect(() => {
      setLoading(true)
        axiosClient.get(`Dashboard/GetStudnetProgressNumberForDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setProgressBarStudent([res.data])
          axiosClient.get(`Dashboard/GetBatchProgressNumberForDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res1) => {
            setLoading(false)
            setProgressBarBatch([res1.data])
          })
        }).catch((error) => {
          console.log(error)
        })
    }, [])
  
  return (
   <div> 
   <Link to='/student/ProgressDashboard/' target='_blank'>
    <Card id='progress'>
      <CardBody>
        <h5>Your Progress</h5>
        <br/>
        {
          loading ? (
            <ClipLoader
         color={"#6610f2"}
         loading={loading}
         cssOverride={override}
         size={40}
         aria-label="Loading Spinner"
         data-testid="loader"
         speedMultiplier="1"
       />
          ) : (
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

    )
   }
    <br/>
        <div className='d-flex align-items-center me-2 d-inline'>
            <span className='bullet bullet-success me-50'></span>
            <span className='text-black'>You are here</span>
         </div>
         <div className='d-flex align-items-center d-inline'>
             <span className='bullet bullet-danger me-50'></span>
             <span className='text-black'>Your batch</span>
         </div>
    </CardBody>
    </Card>        
    </Link>
    <UncontrolledTooltip placement='top' target='progress'>
    Check Your Progress
  </UncontrolledTooltip>  
    </div>
  )
}
export default ProgressBarDashboard