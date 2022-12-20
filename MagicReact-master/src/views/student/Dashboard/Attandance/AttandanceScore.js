import { Row, Col, Table, Card, CardBody, CardTitle, CardText, Button, CardHeader, Progress } from 'reactstrap'
 
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

import {axiosClient} from '../../../../Client'
import Chart from 'react-apexcharts'
import { useState, useEffect} from 'react'

const AttandanceScore = () => {
  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
  const [attandanceScores, setAttandanceScores] = useState([])

  useEffect(() => {
      axiosClient.get(`Dashboard/getStudentDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
          setAttandanceScores([res.data])
        console.log('Attandance',  res.data)
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
    return (
            <Card>
              <CardBody>
              <h5>Attendance</h5>
              <br/>
              {
                attandanceScores.map((getAttandanceScores, index) => (
                <Row>
                
                <Col lg='12' xs='6' sm='6' style = {{marginTop : -30}}> 
                <Chart options={options} series={[(getAttandanceScores.PresentAttandance / getAttandanceScores.TotalAttandance) * 100]} type='radialBar' height={135} />         
             <p className='text-center'> Precentage</p>
                </Col> 
                  <Col lg='12' xs='6' sm='6'>
                    <Col>
                    <p className='mb-50'>Present: {getAttandanceScores.PresentAttandance}</p>
                    <Progress key={index} className='avg-session-progress progress-bar-success mt-25' value={getAttandanceScores.PresentAttandance} />
                   </Col>
                   <br/>
                   <Col>
                      <p className='mb-50'>Total Classes: {getAttandanceScores.TotalAttandance}</p>
                      <Progress className='avg-session-progress progress-bar-warning mt-25' value={getAttandanceScores.TotalAttandance} />
                    </Col> 
                  </Col>  
                </Row>
                ))
              } 
              </CardBody>
            </Card>
    )
  }
  
  export default AttandanceScore
  