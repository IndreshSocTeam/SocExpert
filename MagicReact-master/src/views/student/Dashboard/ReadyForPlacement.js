import { Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip  } from 'reactstrap'

import { useEffect, useState } from 'react'
import {axiosClient} from '../../../Client'

import ClipLoader from "react-spinners/ClipLoader"
import Cookies from 'js-cookie'
import {AES, enc} from 'crypto-js'

const override: CSSProperties = {
  display:"block",
  margin:"auto",
  left:"0",
  right:"0%",
  bottom:"0",
  top:"0",
  position: "absolute",
};

const ReadyForPlacement = () => {

  //const loggedInUserDetails = JSON.parse(sessionStorage.getItem("loggedInUserDetails"))
  //const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))
  const loggedInUserDetails = JSON.parse(AES.decrypt(Cookies.get("loggedInUserDetails"), 'secret-key').toString(enc.Utf8));
 

    const [readyForPlacement, setreadyForPlacement] = useState([])
    const [centeredModal, setCenteredModal] = useState(false)
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
        axiosClient.get(`Dashboard/GetStudnetProgressNumberForDashboard?StudentId=${loggedInUserDetails.StudentId}`).then((res) => {
            setreadyForPlacement([res.data.ReadyForPlacement])
            setLoading(false)
        }).catch((error) => {
          console.log(error)
        })
    }, [])

    return (
        <Card id='placement'>
<CardBody>
<ClipLoader
         color={"#6610f2"}
         loading={loading}
         cssOverride={override}
         size={40}
         aria-label="Loading Spinner"
         data-testid="loader"
         speedMultiplier="1"
       />
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
  <Button color='primary' id='check' className='d-inline btn-sm' style={{ marginLeft: "auto" }} onClick={() => setCenteredModal(!centeredModal)}>CHECK</Button>
  <UncontrolledTooltip placement='top' target='check'>
    Check! Are you Placed?
  </UncontrolledTooltip> 
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
  <UncontrolledTooltip placement='top' target='placement'>
    Placement Eligiblity Criteria
  </UncontrolledTooltip>  
</Card>
    )
}

export default ReadyForPlacement