import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, UncontrolledTooltip } from 'reactstrap'

import {axiosClient} from '../../../../Client'
import '@src/@core/scss/react/libs/charts/apex-charts.scss'

import { useEffect, useState } from 'react'

import { HelpCircle } from 'react-feather'

import ClipLoader from "react-spinners/ClipLoader"
import Chart from 'react-apexcharts'

const override: CSSProperties = {
  display:"block",
  margin:"auto",
  left:"0",
  right:"0%",
  bottom:"0",
  top:"0",
  position: "absolute",
};


const GenieRequestsAverageScore = () => {
    // ** State
    const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
    const [requestScores, setRequestScores] = useState([])
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        setLoading(true)
        axiosClient.get(`Dashboard/getStudentDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setRequestScores([res.data])
        setLoading(false)
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
      <div>
       <Card id='RequestsOverview'>
         <CardHeader>
           <CardTitle tag='h4'>Requests Overview</CardTitle>
           <HelpCircle size={8} className='text-muted cursor-pointer' />
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
       {
        requestScores.map((getRequestScores, index) => (
          <div key={index}>
         <CardBody className='p-0'>
          <Chart options={GenieRequestsOptions} series={[getRequestScores.ResolvedRequest]} type='radialBar' height={135} />
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
        </div>     
        ))
      }
      </Card>  
      <UncontrolledTooltip placement='top' target='RequestsOverview'>
      Your Requests Overview
</UncontrolledTooltip> 
    </div>
    ) 
  }

  export default  GenieRequestsAverageScore