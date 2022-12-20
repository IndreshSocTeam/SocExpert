import { Card, CardHeader, CardTitle, CardBody, CardText, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Alert  } from 'reactstrap'

import { useEffect, useState } from 'react'
import {axiosClient} from '../../../Client'

import Chart from 'react-apexcharts'

import { Circle } from 'react-feather'

const ReadyForPlacement = () => {

  const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
    const [readyForPlacement, setreadyForPlacement] = useState([])
    const [centeredModal, setCenteredModal] = useState(false)
  
    useEffect(() => {
        axiosClient.get(`Dashboard/GetStudnetProgressNumberForDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setreadyForPlacement([res.data.ReadyForPlacement])
          console.log('Ready For Placement',  res.data)
        }).catch((error) => {
          console.log(error)
        })
    }, [])

    return (
        <Card>
<CardBody>
<div className='vertically-centered-modal'>
<Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
  <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Ready for Placements?</ModalHeader>
  <ModalBody>  
  {
    (readyForPlacement === undefined || readyForPlacement === false) ? (
      <h1>No</h1>
      ) : (
        <h1>Yes</h1>
      )
  }  
  </ModalBody>
  <ModalFooter>
    <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
      Accept
    </Button>{' '}
  </ModalFooter>
</Modal>
</div>
  <div  style={{ display: "flex" }}>
  <h5 className='d-inline'>Ready for Placements?</h5>
  <Button color='primary' className='d-inline btn-sm' style={{ marginLeft: "auto" }} onClick={() => setCenteredModal(!centeredModal)}>CHECK</Button>
  </div>
  <hr/>
 <p>You are considered eligible for placements if:
 </p>
 <div className='d-flex align-items-center me-2'>
    <span className='bullet bullet-primary me-50'></span>
    <span>You have raised at least 18 req</span>
  </div>
  <div className='d-flex align-items-center'>
    <span className='bullet bullet-primary me-50'></span>
    <span>Completed 15 Assignments</span>
  </div>
  <div className='d-flex align-items-center me-2'>
    <span className='bullet bullet-primary me-50'></span>
    <span>Have 70% attendance</span>
  </div>
  </CardBody>
</Card>
    )
}

export default ReadyForPlacement