import React from 'react'
import DashboardCard from  '../DashboardCard/DashboardCard'
import './Dashboard.scss'
import Grid from '@mui/material/Grid'
import StudentIcon from '@src/assets/images/student/studentIcon.png'
import GenieIcon from '@src/assets/images/student/genie.png'
import TrainerIcon from '@src/assets/images/student/TrainerIcon.png'
import S3Icon from '@src/assets/images/student/s3Icon.png'
import Coins from '@src/assets/images/student/dollar.png'
import Requests from '@src/assets/images/student/warning.png'
import RequestsResolved from '@src/assets/images/student/technical-support.png'
import RequestsOverView from '../DashboardCard/RequestsOverView'
import BatchOverView from '../DashboardCard/BatchOverView'
import SwiperCore, { Autoplay,  Navigation,  Pagination} from 'swiper'
import { useRTL } from '@hooks/useRTL'
import '@styles/react/libs/swiper/swiper.scss'
import Tooltip from '@mui/material/Tooltip'


SwiperCore.use([Navigation,  Pagination, Autoplay])

const index = () => {

  const [isRtl] = useRTL()

  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto"
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35
      },

      fill: {
        colors: ["#fff"],
        type: "gradient"
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth",
        colors: ["white"]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      grid: {
        show: true
      },
      xaxis: {
        labels: {
          show: true,
          formatter: function(val) {
              return 'Hello2'; // formats to hours:minutes
          }        
      },
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ],
        
      title: {
          text: 'Date',
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title'
          }
      }
      
      },
      yaxis: {
        labels: {
          show: true,
          formatter: function(val) {
              return 'Hello1'; // formats to hours:minutes
          }        
      },
        type: "Number",
                
      title: {
          text: 'Total Number Of Logins',
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title'
          }
       }
      }
    },
    series:{
      name: "LoggedIn",
      data: [31, 40, 28, 51, 42, 109, 100]
    }
  }

  return (
    <div className='MainDashboard'>
    <Grid container spacing={2}>
    <Tooltip title="Click here to Over View" arrow> 
    <Grid item xs={12} sm={6} lg={3}>        
    <DashboardCard 
      cardTitle='SignIn Today'
      totalValue={800}
      progressTitle='Students' 
      progressValue={80} 
      icon={StudentIcon} 
      graphTitle='Total Students SignIn till Now' 
      data={data.options} 
      series={data.series}
      bgColor='blue'
      boxShadowColor='0px 10px 20px 0px #e0c6f5' 
      />
    </Grid>
    </Tooltip>
    <Grid item xs={12} sm={6} lg={3}>
    <DashboardCard 
      cardTitle='SignIn Today'
      totalValue={800}
      progressTitle='Geine' 
      progressValue={80} 
      icon={GenieIcon} 
      graphTitle='Total Genie SignIn till Now' 
      data={data.options} 
      series={data.series}
      bgColor='red'
      boxShadowColor='0px 10px 20px 0px #e0c6f5' 
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={3}>
    <DashboardCard 
      cardTitle='SignIn Today'
      totalValue={800}
      progressTitle='Trainer' 
      progressValue={80} 
      icon={TrainerIcon} 
      graphTitle='Total Trainer SignIn till Now' 
      data={data.options} 
      series={data.series}
      bgColor='green'
      boxShadowColor='0px 10px 20px 0px #e0c6f5' 
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={3}>
    <DashboardCard 
      cardTitle='SignIn Today'
      totalValue={800}
      progressTitle='S3' 
      progressValue={80} 
      icon={S3Icon} 
      graphTitle='Total S3 SignIn till Now' 
      data={data.options} 
      series={data.series}
      bgColor='yellow'
      boxShadowColor='0px 10px 20px 0px #e0c6f5' 
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
    <DashboardCard 
      cardTitle='Coins Earned In Today'
      totalValue={800}
      progressTitle='Coins' 
      progressValue={80} 
      icon={Coins} 
      graphTitle='Coins Earned Till Now' 
      data={data.options} 
      series={data.series}
      bgColor='orange'
      boxShadowColor='0px 10px 20px 0px #e0c6f5' 
      />
    </Grid>    
    <Grid item xs={12} sm={6} lg={4}>
    <DashboardCard 
      cardTitle='Requested Today'
      totalValue={800}
      progressTitle='Requests' 
      progressValue={80} 
      icon={Requests} 
      graphTitle='Total Requests Till Now' 
      data={data.options} 
      series={data.series}
      bgColor='purple'
      boxShadowColor='0px 10px 20px 0px #e0c6f5' 
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
    <DashboardCard 
      cardTitle='Requests Resolved Today'
      totalValue={800}
      progressTitle='Resolved' 
      progressValue={80} 
      icon={RequestsResolved} 
      graphTitle='Total Requests Resolved Till Now' 
      data={data.options} 
      series={data.series}
      bgColor='grey'
      boxShadowColor='0px 10px 20px 0px #e0c6f5' 
      />
    </Grid>
    <Grid item xs={12} sm={6} lg={6}>
    <RequestsOverView/>
    </Grid>    
    <Grid item xs={12} sm={6} lg={6}>
    <BatchOverView isRtl={isRtl}/>
    </Grid>    
    </Grid>
    </div>
  )
}

export default index
