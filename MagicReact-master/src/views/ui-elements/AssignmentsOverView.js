// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'
import { Circle } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

const AssignmentOverView = () => {
  // ** State
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('https://covid19.mathdro.id/api').then(res => setData(res.data)) 
  }, [])


  const options = {
      labels: ['Finished', 'Pending', 'Total'],
      plotOptions: {
        radialBar: {
          size: 150,
          hollow: {
            size: '20%'
          },
          track: {
            strokeWidth: '100%',
            margin: 15
          },
          dataLabels: {
            value: {
              fontSize: '1rem',
              colors: '#5e5873',
              fontWeight: '500',
              offsetY: 5
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '1.286rem',
              colors: '#5e5873',
              fontWeight: '500',

              formatter() {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 42459
              }
            }
          }
        }
      },
      colors: ["#FF0000", "#FF5733", "#0008FF"],
      stroke: {
        lineCap: 'round'
      },
      chart: {
        height: 355,
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        }
      }
    },
    series = [70, 52, 26]

  return data !== null ? (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Assignments</CardTitle>
        <UncontrolledDropdown className='chart-dropdown'>
          <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
            Last 7 days
          </DropdownToggle>
          <DropdownMenu end>
              <DropdownItem className='w-100'>
              </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='radialBar' height={325} />
        <div className='d-flex justify-content-between mb-1'>
          <div className='d-flex align-items-center'>
            <Circle size={15} className='text-primary' />
            <span className='fw-bold ms-75'>Finished</span>
          </div>
          <span></span>
        </div>
        <div className='d-flex justify-content-between mb-1'>
          <div className='d-flex align-items-center'>
            <Circle size={15} className='text-warning' />
            <span className='fw-bold ms-75'>Pending</span>
          </div>
          <span></span>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <Circle size={15} className='text-danger' />
            <span className='fw-bold ms-75'>Total</span>
          </div>
          <span></span>
        </div>
      </CardBody>
    </Card>
  ) : null
}
export default AssignmentOverView
