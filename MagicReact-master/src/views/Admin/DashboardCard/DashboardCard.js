import React, { useState } from "react"
import "./DashboardCard.scss"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
//import { motion, AnimateSharedLayout } from "framer-motion"
import { UilTimes } from "@iconscout/react-unicons"

import Chart from "react-apexcharts"

const DashboardCard = (props) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </div>
  )
}

function CompactCard({ param, setExpanded }) {
  const Icon = param.icon
  return (
    <div
      className="CompactCard"
      style={{
        background: param.bgColor,
        boxShadow: param.boxShadowColor
      }}
      //layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.progressValue}
          text={param.progressValue}
          //text={`${param.barValue}%`}
        />
        <span>{param.progressTitle}</span>
      </div>
      <div className="detail">
      <img src={Icon} alt='icon' className='rounded me-50' height='40' width='40'/>       
        <span>Total: {param.totalValue}</span>
        <span>{param.cardTitle}</span>
      </div>
    </div>
  )
}



// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  
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
              return 'Hello'; // formats to hours:minutes
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
              return 'Hello'; // formats to hours:minutes
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
    <div
      className="ExpandedCard"
      style={{
        background: param.bgColor,
        boxShadow: param.boxShadowColor
      }}
      //layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
        <span>{param.graphTitle}</span>
      <div className="chartContainer">
        <Chart options={param.data === null ? data.options : param.data} series={[param.series] === null ? [data.series] : [param.series]} type="line" />
      </div>
      <span>Last 24 hours</span>
    </div>
  )
}

export default DashboardCard
