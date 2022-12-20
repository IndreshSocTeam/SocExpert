import { DAYS } from "./const"
import { React, Fragment, useState, useEffect} from 'react'
import {axiosClient} from '../../../../Client'


export const range = (end) => {
    const {result} = Array.from({length: end}).reduce(({result, current}) => ({
        result: [...result, current],
        current: current + 1
    }), {result: [], current:1})
    return result
}

export const getDaysInMonths = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
}

export const getSortedDays = (month, year) => {
    const dayIndex = new Date(year, 1).getDay()
    return [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)]
}

export const getDateObj = (day, month, year) => {
    return new Date(year, month, day)
}

export const areDateTheSame = (first, second) => {
    return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
    )
}


// export const AttandanceEvents = [
//         {StringDate: new Date(2022, 10, 1), IsPresent: 'true'},
//         {StringDate: new Date(2022, 10, 20), IsPresent: 'false'},
//         {StringDate: new Date(2022, 11, 10), IsPresent: 'false'},
//         {StringDate: new Date(2022, 11, 15), IsPresent: 'true'}
// ]

// export const AttandanceEvents = [
//         {StringDate: 'Wed Nov 16 2022 00:00:00 GMT+0530 (India Standard Time)', IsPresent: 'true'},
//         {StringDate: 'Sun Nov 27 2022 00:00:00 GMT+0530 (India Standard Time)', IsPresent: 'false'},
//         {StringDate: 'Tue Nov 29 2022 00:00:00 GMT+0530 (India Standard Time)', IsPresent: 'false'},
//         {StringDate: 'Sun Dec 04 2022 00:00:00 GMT+0530 (India Standard Time)', IsPresent: 'true'}
// ]

// function eg() {
//     useEffect(() => {
//     const [attandanceReport, setAttandanceReport] = useState([])
// axiosClient.get(`Attandance/getStudentAttandanceReport?StudentId=${loggedInUserDetails.StudentId}`).then((Attres2) => {
//     setAttandanceReport([Attres2.data]) 
//     console.log('Attandance Report utils',  Attres2.data)
//  })
// }, [attandanceReport])
//  return attandanceReport
// }

// const q = axiosClient.get(`Attandance/getStudentAttandanceReport?StudentId=${503}`).then((Attres2) => { return [Attres2.data] })
// export const AttandanceEvents = [q, console.log("q", q)]
//     //console.log('Attandance Report utils',  Attres2.data)