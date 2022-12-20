import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

import { useEffect, useState } from 'react'
import {axiosClient} from '../../../../Client'

import Chart from 'react-apexcharts'

const AssignmentsAverageScore = () => {
    // ** State
    const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
    const [dashboardScores, setDashboardScores] = useState([])
  
    useEffect(() => {
        axiosClient.get(`Dashboard/getStudentDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setDashboardScores([res.data])
          console.log('Average Assignments score',  res.data)
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
         
      //series = [83]
      
    return (
        <Card>
        <CardHeader>
        <CardTitle tag='h4'>Assignments Scores</CardTitle>
        </CardHeader>
        <CardBody>           
      {
        dashboardScores.map((getAssgnScores, index) => (
        <Row>       
                    <Col>
                    <h2>{getAssgnScores.AssignementsCompletedByStudent}</h2>
                    <p>Submitted</p>
                    </Col>
                    <Col style = {{marginTop : -30}}>                        
          <Chart key={index} options={options} series={[getAssgnScores.AverageAssignmentScore]} type='radialBar' height={135} />         
        <p className='text-center'>Average Score</p>
        </Col>
    </Row>
    ))
} 
        </CardBody>
        </Card>
    ) 
  }


  export default AssignmentsAverageScore