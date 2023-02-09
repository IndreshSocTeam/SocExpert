import React, { useState } from 'react'
// ** Third Party Components
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Tooltip from '@mui/material/Tooltip'

const RequestsOverView = () => {
  
  const [modal, setModal] = useState(false)

  const donutColors = {
    series1: '#ffe700',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#2b9bf4',
    series5: '#FFA1A1'
  }

  // ** Chart Options
  const options = {
    legend: {
      show: true,
      position: 'bottom'
    },
    labels: ['Mock', 'CV Review', 'Borrow Experience', 'Tech. Query', 'S3 Connect'],

    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2, donutColors.series4],
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${parseInt(val)}%`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val) {
                return `${parseInt(val)}%`
              }
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: 'Requests',
              formatter() {
                return '31%'
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  // ** Chart Series
  const series = [85, 16, 50, 50, 25]

  return (
  <div>
  
  <Tooltip title="Click here to See the Pending Requests" arrow> 
  <div>
      <Card onClick={() => setModal(!modal)} style={{cursor:'pointer'}}>    
        <CardHeader>
          <div>
            <CardTitle className='mb-75' tag='h4'>
            Total Requests Resolved Till Now
            </CardTitle>
            <CardSubtitle className='text-muted'>OverView on Various Requests</CardSubtitle>
          </div>
        </CardHeader>
        <CardBody>
          <Chart options={options} series={series} type='donut' height={350} />
        </CardBody>
      </Card>
    </div>
    </Tooltip>
      <Modal isOpen={modal} toggle={() => setModal(!modal)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setModal(!modal)}>Total Requests Pending</ModalHeader>
            <ModalBody>
            <Chart options={options} series={series} type='donut' height={350} />
            </ModalBody>
            {/*<ModalFooter>
              <Button color='primary' onClick={() => setModal(!modal)}>
                Accept
              </Button>
            </ModalFooter>*/}
      </Modal>
      </div>
  )
}

export default RequestsOverView
