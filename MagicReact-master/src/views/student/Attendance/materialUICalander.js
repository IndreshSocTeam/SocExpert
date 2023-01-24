import React, {useState, useEffect} from 'react'
import DateFnsUtils from "@date-io/date-fns"
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import {Paper, Grid} from "@material-ui/core"
import { createTheme } from '@material-ui/core/styles'
//import {createMuiTheme} from "@material-ui/core/styles"
import {ThemeProvider} from "@material-ui/styles"
import {makeStyles} from '@material-ui/core/styles'
import Card from '@mui/material/Card'
//import { alpha } from '@material-ui/core/styles'
import {axiosClient} from '../../../Client'

import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'

//MuiPickersBasePicker-pickerView
const materialTheme = createTheme({
    overrides: { 
        MuiPickersBasePicker: {
            pickerView: {
                minWidth:'300px',
              maxWidth: '100%',
              height:'auto'
            },
            ['@media (min-width:1500px)']: { // eslint-disable-line no-useless-computed-key
                fontSize: '32px'
              }
          },      
        MuiPickersToolbar: {
            toolbar: {backgroundColor: "#7367f0"}
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                backgroundColor: "white",
                color: "#1b5e20"
        }
    }
}
})

export const styles = makeStyles(() => ({ //define CSS for different date types
    notInThisMonthDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#bab6b6",
        margin: "3px",
        boxShadow: "none",
        borderRadius: '25px',
        padding: "8px",
        border:".1px solid #dbd7d7"        
    },
    normalDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#e8f5e9",
        margin: "3px",
        boxShadow: "none",
        borderRadius: '25px',
        padding: "8px",
        cursor: "pointer",
        fontSize:'14px',
        border:".1px solid #dbd7d7",
        color:'#000',
        fontWeight:'500'
    },
    selectedDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#ada8e3",
        margin: "3px",
        boxShadow: "none",
        borderRadius: '25px',
        padding: "8px",
        cursor: "pointer",
        border:".1px solid #7367f0",
        color:'#fff',
        fontWeight:'800'
    },
    todayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#7367f0",
        margin: "3px",
        boxShadow: "none",
        borderRadius: '25px',
        padding: "8px",
        cursor: "pointer",
        color: " white",
        fontWeight:'500',
        border:".1px solid #dbd7d7"
    }
}))

const MaterialUICalander = () => {
    
  //const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
  const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))

    const [selectedDate, handleDateChange] = useState(new Date())    
    const [attandanceReport, setAttandanceReport] = useState([])

    useEffect(() => {
          axiosClient.get(`Attandance/getStudentAttandanceReport?StudentId=${loggedInUserDetails.StudentId}`).then((res2) => {
            setAttandanceReport(res2.data)     
            }).catch((error) => {
                //console.log(error)
            toast.error('Internal Server Error')
        })
    }, [])

    const classes = styles() // import those CSS
    const today = new Date() // just Date object of today
      
    function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
       
        const isPresent = attandanceReport.filter((t) => t.IsPresent === 'True').map((pd) => pd.StringDate).includes(day.toString())
        const isAbsent = attandanceReport.filter((f) => f.IsPresent === 'False').map((ad) => ad.StringDate).includes(day.toString())
        const isSelected = day.getDate() === selectedDate.getDate()
        const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth()


        // const isSunny = sunnyDays.includes(day.getDate()); 
        // const isSelected = day.getDate() === selectedDate.getDate();
        // const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

     //   let dateTile
    //     if (isInCurrentMonth) { //conditionally return appropriate Element of date tile.
    //         if (isSunny) {
    //             dateTile = (
    //                 <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>
    //                     <Grid item><WbSunnyIcon style={{color: "orange"}}/></Grid>
    //                     <Grid item>
    //                         {day.getDate()}
    //                     </Grid>
    //                 </Paper>)
    //         } else {
    //             dateTile = (
    //               <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>   
    //               <Grid item><br/></Grid>
    //                 <Grid item> {day.getDate()}</Grid>
    //             </Paper>)
    //         }

    //     } else {
    //         dateTile = (<Paper className={classes.notInThisMonthDayPaper}>
    //             <Grid item><br/></Grid>
    //             <Grid item style={{color: "lightGrey"}}>
    //                 {day.getDate()}
    //             </Grid>
    //         </Paper>)
    //     }
    //     return dateTile
    // }

    let dateTile
    if (isInCurrentMonth) { //conditionally return appropriate Element of date tile.
        if (isPresent) {
            dateTile = (
                <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper} style={{background: "#28c76f", color:'#fff'}}>
                   {day.getDate()}
                </Paper>)
        } else if (isAbsent) {
            dateTile = (
                <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper} style={{background: "#ea5455", color:'#fff'}}>
                   {day.getDate()}
                </Paper>)
        } else {
            dateTile = (
              <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>   
             {day.getDate()}
            </Paper>)
        }

    } else {
        dateTile = (<Paper className={classes.notInThisMonthDayPaper} style={{color: "black"}}>
                {day.getDate()}
        </Paper>)
    }
    return dateTile
}


  return (
    <div>
    <div>
    <Card Col='6' lg={6}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={materialTheme}>
            <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                variant="static"
                // using our function 
                renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}
            />           
        </ThemeProvider>           
    </MuiPickersUtilsProvider>
    <div className='border-top'>
    <div className='m-2'>
    <div className='d-flex align-items-center me-2 d-inline'>
            <span className='bullet bullet-success me-50'></span>
            <span>Present</span>
    </div>
    <div className='d-flex align-items-center me-2 d-inline'>
            <span className='bullet bullet-danger me-50'></span>
            <span>Absent</span>
    </div>
    </div>
    </div>
    </Card>
  </div>
    </div>
  )
}

export default MaterialUICalander

















// import React, {useState} from 'react'
// import DateFnsUtils from "@date-io/date-fns"
// import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
// import {Paper, Grid} from "@material-ui/core";
// import { createTheme } from '@material-ui/core/styles'
// //import {createMuiTheme} from "@material-ui/core/styles"
// import {ThemeProvider} from "@material-ui/styles";
// import {makeStyles} from "@material-ui/core/styles"
// import WbSunnyIcon from '@material-ui/icons/WbSunny'

// console.log('dfdf')
// const materialTheme = createTheme({
//     overrides: {
//         MuiPickersToolbar: {
//             toolbar: {backgroundColor: "#8bc34a",},
//         },
//         MuiPickersCalendarHeader: {
//             switchHeader: {
//                 backgroundColor: "white",
//                 color: "#1b5e20",
//         },},},});

// export const styles = makeStyles(() => ({ //define CSS for different date types
//     notInThisMonthDayPaper: {
//         width: "35px",
//         height: "35px",
//         backgroundColor: "#eeeeee",
//         margin: "3px",
//         boxShadow: "none",
//         borderRadius: 0,
//         padding: "1px",
//     },
//     normalDayPaper: {
//         width: "35px",
//         height: "35px",
//         backgroundColor: "#e8f5e9",
//         margin: "3px",
//         boxShadow: "none",
//         borderRadius: 0,
//         padding: "1px",
//         cursor: "pointer",
//     },
//     selectedDayPaper: {
//         width: "31px",
//         height: "31px",
//         backgroundColor: "#f9fbe7",
//         margin: "3px",
//         boxShadow: "none",
//         borderRadius: 0,
//         borderStyle: "solid",
//         borderWidth: "2px",
//         borderColor: "lime",
//         padding: "1px",
//         cursor: "pointer",
//     },
//     todayPaper: {
//         width: "35px",
//         height: "35px",
//         backgroundColor: "lightGreen",
//         margin: "3px",
//         boxShadow: "none",
//         borderRadius: 0,
//         padding: "1px",
//         cursor: "pointer",
//         color: " white",
//     },}));

// const MaterialUICalander = () => {
//     const [selectedDate, handleDateChange] = useState(new Date());
//     const classes = styles(); // import those CSS
//     const today = new Date(); // just Date object of today
//     const sunnyDays = [1, 6, 10, 24, 15] // array of sunny days 1st,6th etc
    
//     function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
//         //generate boolean 
//         console.log("day.getDate()", day)
        // const isSunny = sunnyDays.includes(day.getDate()); 
        // const isSelected = day.getDate() === selectedDate.getDate();
        // const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

     //   let dateTile
    //     if (isInCurrentMonth) { //conditionally return appropriate Element of date tile.
    //         if (isSunny) {
    //             dateTile = (
    //                 <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>
    //                     <Grid item><WbSunnyIcon style={{color: "orange"}}/></Grid>
    //                     <Grid item>
    //                         {day.getDate()}
    //                     </Grid>
    //                 </Paper>)
    //         } else {
    //             dateTile = (
    //               <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>   
    //               <Grid item><br/></Grid>
    //                 <Grid item> {day.getDate()}</Grid>
    //             </Paper>)
    //         }

    //     } else {
    //         dateTile = (<Paper className={classes.notInThisMonthDayPaper}>
    //             <Grid item><br/></Grid>
    //             <Grid item style={{color: "lightGrey"}}>
    //                 {day.getDate()}
    //             </Grid>
    //         </Paper>)
    //     }
    //     return dateTile
    // }


//   return (
//     <div>
//     <div>
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <ThemeProvider theme={materialTheme}>
//             <DatePicker
//                 value={selectedDate}
//                 onChange={handleDateChange}
//                 variant="static"
//                 // using our function 
//                 renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}
//             />

//         </ThemeProvider>
//     </MuiPickersUtilsProvider>
//   </div>
//     </div>
//   )
// }

// export default MaterialUICalander
