// ** Third Party Components
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'

const Earnings = ({ success }) => {
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

export default Earnings
