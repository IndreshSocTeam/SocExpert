import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

//import RequestByType from '@src/views/ui-elements/RequestByType'
//import GoalOverview from '@src/views/ui-elements/GoalOverview'
//import Earnings from '@src/views/ui-elements/Earnings'

import {axiosClient} from '../../../../Client'
import Chart from 'react-apexcharts'
// ** Styles
import '@src/@core/scss/react/libs/charts/apex-charts.scss'

import { useEffect, useState } from 'react'

import { HelpCircle } from 'react-feather'
const GenieRequestsAverageScore = () => {
    // ** State
    const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
    const [requestScores, setRequestScores] = useState([])
  
    useEffect(() => {
        axiosClient.get(`Dashboard/getStudentDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setRequestScores([res.data])
          console.log('Request Scores',  res.data)
        }).catch((error) => {
          console.log(error)
        })
    }, [])
  
    const GenieRequestsOptions = {
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
     // series = [83]
  
    return (
      <div>{
        requestScores.map((getRequestScores, index) => (
       <Card>
         <CardHeader>
           <CardTitle tag='h4'>Requests Overview</CardTitle>
           <HelpCircle size={8} className='text-muted cursor-pointer' />
         </CardHeader>
         <CardBody className='p-0'>
          <Chart key={index} options={GenieRequestsOptions} series={[getRequestScores.ResolvedRequest]} type='radialBar' height={135} />
          <p className='text-center'>Request Resolved</p>
         </CardBody>
         <Row className='border-top text-center mx-0'>
         <Col xs='6' className='py-1'>
           <CardText className='text-muted mb-0'>In Progress</CardText>
           <h3 className='fw-bolder mb-0'>{getRequestScores.ProgressRequest}</h3>
          </Col>
           <Col xs='6' className='border-end py-1'>
             <CardText className='text-muted mb-0'>Resolved</CardText>
             <h3 className='fw-bolder mb-0'>{getRequestScores.ResolvedRequest}</h3>
           </Col>
        </Row>
      </Card>        
      ))
    }
    </div>
    ) 
  }

  export default  GenieRequestsAverageScore