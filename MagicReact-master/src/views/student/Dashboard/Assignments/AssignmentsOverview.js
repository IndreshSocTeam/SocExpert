import { Card, CardHeader, CardTitle, CardBody, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledTooltip } from 'reactstrap'

import { useEffect, useState } from 'react'
import {axiosClient} from '../../../../Client'


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


import { Circle } from 'react-feather'
import Cookies from 'js-cookie'

const AssignmentsOverview = () => {
    // ** State
    //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
    const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
    const [dashboardScores, setDashboardScores] = useState([])
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
        axiosClient.get(`Dashboard/getStudentDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setDashboardScores([res.data])
          setLoading(false)
        }).catch((error) => {
          console.log(error)
        })
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
                fontWeight: '500'
  
                // formatter() {
                //   // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                //   return 42459
                // }
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
      }
      //series = [70, 52, 26]
  
    return (
      <Card id='AssignmentOverview'>
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
            dashboardScores.map((getAssgnScores, index) => (
        <CardBody key={index}>
          <Chart options={options} series={[getAssgnScores.AssignementsCompletedByStudent, getAssgnScores.TotalAssignements - getAssgnScores.AssignementsCompletedByStudent, getAssgnScores.TotalAssignements]} type='radialBar' height={325} />
          <div className='d-flex justify-content-between mb-1'>
            <div className='d-flex align-items-center'>
              <Circle size={15} className='text-primary' />
              <span className='fw-bold ms-75'>Finished</span>
            </div>
            <span>{getAssgnScores.AssignementsCompletedByStudent}</span>
          </div>
          <div className='d-flex justify-content-between mb-1'>
            <div className='d-flex align-items-center'>
              <Circle size={15} className='text-warning' />
              <span className='fw-bold ms-75'>Pending</span>
            </div>
            <span>{getAssgnScores.TotalAssignements - getAssgnScores.AssignementsCompletedByStudent}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <Circle size={15} className='text-danger' />
              <span className='fw-bold ms-75'>Total</span>
            </div>
            <span>{getAssgnScores.TotalAssignements}</span>
          </div>        
        </CardBody>  
        ))
    } 
    
  <UncontrolledTooltip placement='top' target='AssignmentOverview'>
  Assignments Overview
</UncontrolledTooltip> 
      </Card>
    )
}


  export default AssignmentsOverview