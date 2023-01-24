import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {axiosClient} from '../../../Client'
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback, Nav, NavItem, NavLink  } from 'reactstrap'

import ModuleCertificateImg from '@src/assets/images/student/Modulewise_Cert_BG.png'
const downloadCertificate = () => {

    const {CertificateId} = useParams()
    const [certificateDetails, setCertificateDetails] = useState([])

    useEffect(() => {
        axiosClient.get('Certificate/GetModularCertificateData', {params:{MappId:CertificateId}}).then((res) => {
          setCertificateDetails([res.data])
        }).catch((error) => {
          console.log(error)
        })
    }, [])
  return (
    
    <div>
    {
    certificateDetails.map((cd, index) => (
      <div key={index}>
      <div className="mt-4 d-flex justify-content-center parent" style={{margin: "20px"}}>
        <div id="to_save2" className="img-fluid" style={{width: "1080px", textAlign: "center", backgroundImage: "url(" + ModuleCertificateImg + ")", backgroundRepeat: "no-repeat", backgroundSize: "1080px"}}>
        <div style={{height: "1080px", padding: "20px", textAlign: "center"}}>
        <div style={{fontSize: "40px", marginTop: "390px", fontFamily: "Bad script", fontWeight: "600", letterSpacing: "1px"}}>
        <Label style={{color: "#2c7872", fontSize: "40px", fontFamily: "Bad script", fontWeight: "600", letterSpacing: "1px"}}>{cd.StudentName}</Label> <br/><br/>
        <p style={{marginTop:" 20px", lineHeight: "4.5rem", height: "200px", fontFamily: "Montserrat", fontSize: "20px", fontWeight: "500"}}>
        for completing the&nbsp; 
        <Label style={{marginTop: "50px", fontSize: "25px", fontWeight: "800"}}>{cd.CertificateName}</Label><br/>
        module of the &nbsp;
        <Label className="d-flex justify-content-center" style={{color: "#2c7872"}}>{cd.ModuleName}</Label>        
        </p>
      </div>
      <p style={{marginTop: "60px", marginLeft: "630px", fontFamily: "montserrat", fontSize: "20px", color: "#ed803"}}>
      <Label style={{ marginLeft: "50px"}}>{cd.Date}</Label>
        </p>
      </div> 
      </div>
        </div>
        <br />
        <div className="mb-4 d-flex justify-content-center" style={{margin:"20px"}}>
            <Button className='me-1' color='primary' type='button'><i className="fa fa-download"></i>&nbsp;Download</Button>
         </div>
      </div>
    ))
    }
    </div>
  )
}

export default downloadCertificate
