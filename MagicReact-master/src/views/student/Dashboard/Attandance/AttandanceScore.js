import { Row, Col, Card, CardBody, Progress, UncontrolledTooltip } from 'reactstrap'
 
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

import {axiosClient} from '../../../../Client'
import { useState, useEffect, CSSProperties} from 'react'
import Chart from 'react-apexcharts'
import ClipLoader from "react-spinners/ClipLoader"

const override: CSSProperties = {
  display:"block",
  margin:"auto",
  left:"0",
  right:"0%",
  bottom:"0",
  top:"0",
  position: "absolute",
};

const AttandanceScore = () => {
  const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
  const [attandanceScores, setAttandanceScores] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
      axiosClient.get(`Dashboard/getStudentDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
          setAttandanceScores([res.data])
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
    return (
            <Card>
              <CardBody id='Attandance'>
              <h5>Attendance</h5>
              <ClipLoader
         color={"#6610f2"}
         loading={loading}
         cssOverride={override}
         size={40}
         aria-label="Loading Spinner"
         data-testid="loader"
         speedMultiplier="1"
       />
              <br/>
              {
                attandanceScores.map((getAttandanceScores, index) => (
                <Row key={index}>
                
                <Col lg='12' xs='6' sm='6' style = {{marginTop : -30}}> 
                <Chart options={options} series={[(getAttandanceScores.PresentAttandance / getAttandanceScores.TotalAttandance) * 100]} type='radialBar' height={135} />         
             <p className='text-center'> Precentage</p>
                </Col> 
                  <Col lg='12' xs='6' sm='6'>
                    <Col>
                    <p className='mb-50'>Present: {getAttandanceScores.PresentAttandance}</p>
                    <Progress className='avg-session-progress progress-bar-success mt-25' value={getAttandanceScores.PresentAttandance} />
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
              
  <UncontrolledTooltip placement='top' target='Attandance'>
  Your Current Attandance
</UncontrolledTooltip> 
            </Card>
    )
  }
  
  export default AttandanceScore
  