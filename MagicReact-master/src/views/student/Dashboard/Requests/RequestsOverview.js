import { Card,  CardBody, Row, Col, UncontrolledTooltip } from 'reactstrap'

import { useEffect, useState,CSSProperties } from 'react'

import {axiosClient} from '../../../../Client'
import '@src/@core/scss/react/libs/charts/apex-charts.scss'
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

const RequestByTypeOverview = () => {

    //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
    const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
    const [requestScores, setRequestScores] = useState([])
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
        axiosClient.get(`Dashboard/getStudentDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setRequestScores([res.data])
          setLoading(false)
        }).catch((error) => {
          console.log(error)
        })
    }, [])
  
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
            labels: ['Mock', 'Borrow Experience', 'CV Review'],
            stroke: { width: 0 },
            colors: ['#1313ed', '#ed9d13', '#ed3213'],
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
                      label: 'Total'
                      // formatter() {
                      //   return '53%'
                      // }
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
        
          const AvgMockOptions = {
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
          <div>
               
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
         <Row key={index} >
         <Col lg='12'>
         <Card>
                <CardBody id='AvgMock'>
                    <h5>Mock Score</h5>
                    <br/>
                    <Row>
                        <Col>
                        <h2>{getRequestScores.Mocks}</h2>
                        <p>Rquests</p>
                        </Col>
                        <Col style = {{marginTop : -30}}>
                        <Chart options={AvgMockOptions} series={[getRequestScores.AverageMockScore]} type='radialBar' height={135} />         
       <p className='text-center'>Average Mock Score</p>
                        </Col>
                    </Row>
                </CardBody>              
 
<UncontrolledTooltip placement='top' target='AvgMock'>
Your Average Mock Scores
</UncontrolledTooltip> 
            </Card>
            </Col>
            <Col lg='12'>
            <Card id='RequestTypes'>
                <CardBody>
                    <h5>Requests by Type</h5>  
                    
             <Chart key={index} options={options} series={[getRequestScores.Mocks, getRequestScores.BorrowExperience, getRequestScores.CVReview]} type='donut' height={100} />
                    <div className='d-flex align-items-center me-2 d-inline'>
                <span className='bullet bullet-primary me-50'></span>
                <span>Mock - {getRequestScores.Mocks}</span>
             </div>
             <div className='d-flex align-items-center d-inline'>
                
                 <span className='bullet bullet-danger me-50'></span>
                 <span>Borrow Experience - {getRequestScores.BorrowExperience}</span>
             </div>
             <div className='d-flex align-items-center d-inline'>
                 <span className='bullet bullet-warning me-50'></span>
                 <span>CV Review - {getRequestScores.CVReview}</span>
             </div>
                </CardBody>
                <UncontrolledTooltip placement='top' target='RequestTypes'>
                Your Total Requests
              </UncontrolledTooltip> 
            </Card>
            </Col>            
            </Row>
            ))
          }
           
            </div>
        )
      }

  
  export default RequestByTypeOverview


