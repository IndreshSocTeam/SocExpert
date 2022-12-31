import { Card, CardHeader, CardTitle, CardBody, Row, Col, UncontrolledTooltip } from 'reactstrap'

import { useEffect, useState, CSSProperties } from 'react'
import {axiosClient} from '../../../../Client'

import ClipLoader from "react-spinners/ClipLoader"
import Chart from 'react-apexcharts'
import Cookies from 'js-cookie'

const override: CSSProperties = {
  display:"block",
  margin:"auto",
  left:"0",
  right:"0%",
  bottom:"0",
  top:"0",
  position: "absolute",
};

const AssignmentsAverageScore = () => {
    // ** State
    //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
    const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
    const [dashboardScores, setDashboardScores] = useState([])
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
        axiosClient.get(`Dashboard/getStudentDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setDashboardScores([res.data])
         setLoading(false)
        }).catch((error) => {
          console.log(error)
        })
    }, [])
  
    const options = {
        chart: {
          sparkline: {
            enabled: true
          },
          dropShadow: {
            enabled: true,
            blur: 3,
            left: 1,
            top: 1,
            opacity: 0.1
          }
        },
        colors: ['#51e5a8'],
        plotOptions: {
          radialBar: {
            offsetY: 10,
            startAngle: -150,
            endAngle: 150,
            hollow: {
              size: '65%'
            },
            track: {
              background: '#ebe9f1',
              strokeWidth: '30%'
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                color: '#5e5873',
                fontFamily: 'Montserrat',
                fontSize: '1.56rem',
                fontWeight: '600'
              
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: '#5e5873',
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        grid: {
          padding: {
            bottom: 10
          }
        }
      }
         
      //series = [83]getAssgnScores.AverageAssignmentScore
    return (
        <Card id='Avg'>
        <CardHeader>
        <CardTitle tag='h4'>Assignments Scores</CardTitle>
        </CardHeader>
        <ClipLoader
         color={"#6610f2"}
         loading={loading}
         cssOverride={override}
         size={40}
         aria-label="Loading Spinner"
         data-testid="loader"
         speedMultiplier="1"
       />
        <CardBody>           
      {
        dashboardScores.map((getAssgnScores, index) => (
        <Row key={index}>       
                    <Col>
                    <h2>{getAssgnScores.AssignementsCompletedByStudent}</h2>
                    <p>Submitted</p>
                    </Col>
                    <Col style = {{marginTop : -30}}>                        
          <Chart options={options} series={[getAssgnScores.AverageAssignmentScore]} type="radialBar" height={135} />         
        <p className='text-center'>Average Score</p>
        </Col>
    </Row>
    ))
} 
        </CardBody>
        
  <UncontrolledTooltip placement='top' target='Avg'>
  Your Assignments Average Scores
</UncontrolledTooltip> 
        </Card>
    ) 
  }


  export default AssignmentsAverageScore