// ** React Imports
import { Fragment} from 'react'

// ** Third Party Components
//import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap'
import { ChevronRight } from 'react-feather'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const L1CVPoints = () => {
 
  return (
    <Fragment>
        <Row>
          <Col xs={12}>
          <Card>
          <CardHeader className='border-bottom'>
            <CardTitle tag='h4'>CV Points for L1 Security Analyst</CardTitle>
          </CardHeader>    
          <CardBody className='py-2 my-25'>
          <Row>
          <Col>
            <CardText> 
            <h4>Summary/Highlights</h4>
            </CardText>
            <ul className='list-style-icons'>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Solid understanding of common network services and protocols.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Good knowledge on cyberattacks and attack vectors.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Working level knowledge on security solutions like Antivirus, Firewall, IPS, Email Gateway, Proxy, IAM, TI, VA Scanners, WAF etc.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Basic knowledge on skills like Malware Analysis, Threat Hunting, Dark Web Monitoring.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Exposure to using frameworks and compliances like MITRE ATT&CK. CIS Critical Controls, OWASP, PCI-DSS, ISO 27001 etc.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Good understanding of various SOC processes like monitoring, analysis, playbooks, escalation, incident documentation, SLAs, client meetings, report walk throughs, bridge calls, RFPs, etc.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Exposure to AWS cloud, cloud security, scripting (Python) and regex.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Keeping updated with the latest developments in the cyber security landscape.
              </li>
            </ul>       
            </Col>
            </Row>
            <Row>
          <Col>
          <br/><br/>
          <h4>SOC Analyst Skills</h4>
            <ul className='list-style-icons'>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Solid understanding of common network services and protocols.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Good knowledge on cyberattacks and attack vectors.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Working level knowledge on security solutions like Antivirus, Firewall, IPS, Email Gateway, Proxy, IAM, TI, VA Scanners, WAF etc.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Basic knowledge on skills like Malware Analysis, Threat Hunting, Dark Web Monitoring.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Exposure to using frameworks and compliances like MITRE ATT&CK. CIS Critical Controls, OWASP, PCI-DSS, ISO 27001 etc.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Good understanding of various SOC processes like monitoring, analysis, playbooks, escalation, incident documentation, SLAs, client meetings, report walk throughs, bridge calls, RFPs, etc.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Exposure to AWS cloud, cloud security, scripting (Python) and regex.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Keeping updated with the latest developments in the cyber security landscape.
              </li>
            </ul>
          </Col>
        </Row>
          </CardBody>
        </Card>         
          </Col>
        </Row>
    </Fragment>
  )
}

export default L1CVPoints
