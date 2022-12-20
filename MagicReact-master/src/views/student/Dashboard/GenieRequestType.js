import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

//import RequestByType from '@src/views/ui-elements/RequestByType'
//import GoalOverview from '@src/views/ui-elements/GoalOverview'
//import Earnings from '@src/views/ui-elements/Earnings'
import axios from 'axios'
import Chart from 'react-apexcharts'
// ** Styles
import '@src/@core/scss/react/libs/charts/apex-charts.scss'

import { useEffect, useState } from 'react'
  
const GenieRequestsAverageScore = props => {
    // ** State
    const [data, setData] = useState(null)
  
    useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon/ditto').then(res => setData(res.data))
      return () => setData(null)
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
            gradientToColors: [props.success],
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
      },
      series = [83]
  
    return data !== null ? (
      // <Card>
      //   <CardHeader>
      //     <CardTitle tag='h4'>Goal Overview</CardTitle>
      //     <HelpCircle size={8} className='text-muted cursor-pointer' />
      //   </CardHeader>
      //   <CardBody className='p-0'>
          <Chart options={GenieRequestsOptions} series={series} type='radialBar' height={135} />
      //   </CardBody>
      //   <Row className='border-top text-center mx-0'>
      //     <Col xs='6' className='border-end py-1'>
      //       <CardText className='text-muted mb-0'>Completed</CardText>
      //       <h3 className='fw-bolder mb-0'>{data.completed}</h3>
      //     </Col>
      //     <Col xs='6' className='py-1'>
      //       <CardText className='text-muted mb-0'>In Progress</CardText>
      //       <h3 className='fw-bolder mb-0'>{data.inProgress}</h3>
      //     </Col>
      //   </Row>
      // </Card>
    ) : null
  }


  const RequestByType = ({ success }) => {
    const options = {
      chart: {
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: { show: false },
      comparedResult: [2, -3, 8],
      labels: ['App', 'Service', 'Product'],
      stroke: { width: 0 },
      colors: ['#1313ed', '#ed9d13', '#ed3213', success],
      grid: {
        padding: {
          right: -20,
          bottom: -8,
          left: -10
        }
      },
      plotOptions: {
        pie: {
          startAngle: -10,
          donut: {
            labels: {
              show: true,
              name: {
                offsetY: 15
              },
              value: {
                offsetY: -15,
                formatter(val) {
                  return `${parseInt(val)} %`
                }
              },
              total: {
                show: true,
                offsetY: 15,
                label: 'App',
                formatter() {
                  return '53%'
                }
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 1325,
          options: {
            chart: {
              height: 150
            }
          }
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              height: 150
            }
          }
        },
        {
          breakpoint: 1065,
          options: {
            chart: {
              height: 150
            }
          }
        },
        {
          breakpoint: 992,
          options: {
            chart: {
              height: 150
            }
          }
        }
      ]
    }
  
    return (
      <Card className='earnings-card'>
        <CardBody>
          <Row>
            <Col xs='12'>
              <Chart options={options} series={[53, 35, 12]} type='donut' height={100} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }

const GenieRequests = () => {

    
    return (
     <Row>
     <Col lg='12'>
     <Card>
            <CardBody>
                <h5>Genie Requests</h5>
                <br/>
                <Row>
                    <Col>
                    <h2>10</h2>
                    <p>Rquests</p>
                    </Col>
                    <Col style = {{marginTop : -30}}>
                    <GenieRequestsAverageScore/>
                    <p className='text-center'>Average Score</p>
                    </Col>
                </Row>
            </CardBody>
        </Card>
        </Col>
        <Col lg='12'>
        <Card>
            <CardBody>
                <h5>Requests by Type</h5>  
                <div className='d-flex align-items-center me-2 d-inline'>
            <span className='bullet bullet-primary me-50'></span>
            <span>Mock - 58.6%</span>
         </div>
         <div className='d-flex align-items-center d-inline'>
            
             <span className='bullet bullet-danger me-50'></span>
             <span>Borrow Experience - 34.9%</span>
         </div>
         <div className='d-flex align-items-center d-inline'>
             <span className='bullet bullet-warning me-50'></span>
             <span>CV Review - 6.5%</span>
         </div>
                <RequestByType/>
            </CardBody>
        </Card>
        </Col>
        </Row>
    )
  }


  export default GenieRequests