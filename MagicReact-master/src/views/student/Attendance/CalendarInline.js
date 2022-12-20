// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Reactstrap Imports
import { Label } from 'reactstrap'

import {axiosClient} from '../../../Client'
import './presentButton.scss'
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
const PickerInline = () => {
  // ** State
  const [databaseCalandar, setDatabaseCalandar] = useState()
  const [calandar, setCalandar] = useState(new Date())


  useEffect(() => {
    axiosClient.get('Attandance/getStudentAttandanceReport?StudentId=503').then((res) => {
      setDatabaseCalandar([res.data[0].Date])
      console.log("database date", res.data[0].Date)
    })
    
}, [])


  return (
    <Fragment>
      <Flatpickr
      className={databaseCalandar === calandar ? 'flatpickr-calendar' : 'flatpickr-calendar1' }
        value={calandar}
        options={{ inline: true }}
        onChange={date => {setCalandar(date); console.log("calnader date", calandar)}}
      />
    </Fragment>
  )
}

export default PickerInline
