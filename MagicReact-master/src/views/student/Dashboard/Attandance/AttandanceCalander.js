// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Label } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

const AttandanceCalander = () => {
  // ** State
  const [picker, setPicker] = useState(new Date())
  return (
    <Fragment>
     
      <Flatpickr
        className='form-control'
        value={picker}
        options={{ inline: true }}
        onChange={date => setPicker(date)}
      />
    </Fragment>
  )
}

export default AttandanceCalander
