import { Row, Col, Card, CardBody, Progress  } from 'reactstrap'
import { CalandarHead, Wrapper, HeadDay, OneWeekSevenDaysColGrid, CalandarBody, StyledDay, StyledAbsent, StyledPresent, StyledDayPresent, StyledDayAbsent} from './styled'
import { DAYS, MONTHS } from './const'
import { ArrowRightCircle, ArrowLeftCircle } from 'react-feather'
import { range, getDaysInMonths, getSortedDays, areDateTheSame, getDateObj, AttandanceEvents} from './utils'
import { React, Fragment, useState, useEffect } from 'react'
import {axiosClient} from '../../../../Client'

const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))

const calandar = ({startingDate, eventsArr}) => {
    const [currentMonth, setcurrentMonth] = useState(startingDate.getMonth())
    const [currentYear, setcurrentYear] = useState(startingDate.getFullYear())
    const DAYSINMONTHS =  getDaysInMonths(currentMonth, currentYear)
    //const [attandanceReport, setAttandanceReport] = useState([])
    const [isHover, setIsHover] = useState(false)

    const boxStyle = {
        color: isHover ? 'black' : '',
        fontSize: isHover ? '1.1rem' : '',
        cursor: 'pointer',
        boxShadow: isHover ? '3px 1px #e6e6e6, -0.5em 0 .4em #b8c2cc' : '',
        borderRadius: isHover ? '50%' : ''
     }

    const handleMouseEnter = () => {
       setIsHover(true)
    }
    const handleMouseLeave = () => {
       setIsHover(false)
    }
    // useEffect(() => {
    //     axiosClient.get(`Attandance/getStudentAttandanceReport?StudentId=${loggedInUserDetails.StudentId}`).then((Attres2) => {
    //         setAttandanceReport([Attres2.data])          
    //         // console.log('Attandance Report My calander',  Attres2.data.map((a) => (a.Date)))
    //         // console.log('Attandance Report My calander Year',  Attres2.data.map((a) => (a.Date.slice(0, 4))))
    //         // console.log('Attandance Report My calander Month',  Attres2.data.map((a) => (a.Date.slice(5, 7))))
    //         // console.log('Attandance Report My calander Day',  Attres2.data.map((a) => (a.Date.slice(8, 10))))
    //         // const year = Attres2.data.map((y) => (parseInt(y.Date.slice(0, 4))))
    //         // const month = Attres2.data.map((m) => (parseInt(m.Date.slice(5, 7))))
    //         // const day = Attres2.data.map((d) => (parseInt(d.Date.slice(8, 10))))
    //         console.log('Attandance Report',  Attres2.data)
    //         console.log('Attandance Report string Date', new Date('Wed Nov 16 2022 00:00:00 GMT+0530 (India Standard Time)').getFullYear())
    //         // const mydate = [year, month, day]
    //         // console.log('mydate',  new Date(parseInt(year), parseInt(month), parseInt(day)))
    //         // const eg = [{MyAttandanceDate: mydate.map((md) => md.mydate), MyIsPresent:Attres2.data.map((p) => (p.IsPresent))}]
    //         // console.log('Put to calander Attandance Report', eg)
    //     }).catch((error) => {
    //         console.log(error)
    //   })
    // }, [])

    const nextMonth  = () => {
        if (currentMonth < 11) {
            setcurrentMonth((prev) => prev + 1)
        } else {
            setcurrentMonth(0)
            setcurrentYear((prev) => prev + 1)
        }
    }


    const prevtMonth  = () => {
        if (currentMonth > 0) {
            setcurrentMonth((prev) => prev - 1)
        } else {
            setcurrentMonth(11)
            setcurrentYear((prev) => prev - 1)
        }
    }
  return (
    <div> 
    <Wrapper>
    <CalandarHead>
    <ArrowLeftCircle style={boxStyle}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave} onClick={prevtMonth}/>
    <p>{MONTHS[currentMonth]} {currentYear}</p>
    <ArrowRightCircle style={boxStyle}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave} onClick={nextMonth}/>
    </CalandarHead>    
    <OneWeekSevenDaysColGrid>
    {getSortedDays(currentMonth, currentYear).map((day) => (
        <HeadDay>{day}</HeadDay>
        ))}
    </OneWeekSevenDaysColGrid>
    <CalandarBody fourCol={DAYSINMONTHS === 28}>
    {range(DAYSINMONTHS).map((day) => (
        
        <StyledDay active={areDateTheSame(new Date(), getDateObj(day, currentMonth, currentYear))}>
        {day}
        {            
            eventsArr.map((ev) =>(areDateTheSame(getDateObj(day, currentMonth, currentYear), new Date(ev.StringDate))) ? <div>{(ev.IsPresent === 'True') ? <StyledPresent>Present</StyledPresent> : <StyledAbsent>Absent</StyledAbsent>}</div>: '')
        }
        
        </StyledDay>))}
    </CalandarBody>
    </Wrapper>
    </div>
  )
}

export default calandar

// <CalandarBody fourCol={DAYSINMONTHS === 28}>
//     {range(DAYSINMONTHS).map((day) => (
        
//         <StyledDay active={areDateTheSame(new Date(), getDateObj(day, currentMonth, currentYear))} >
//         {day}
//         {            
//             eventsArr.map((ev) =>(areDateTheSame(getDateObj(day, currentMonth, currentYear), new Date(ev.StringDate))) ? <div>{(ev.IsPresent === 'True') ? <StyledPresent>Present</StyledPresent> : <StyledAbsent>Absent</StyledAbsent>}</div>: '')
//         }
        
//         </StyledDay>))}
//     </CalandarBody>