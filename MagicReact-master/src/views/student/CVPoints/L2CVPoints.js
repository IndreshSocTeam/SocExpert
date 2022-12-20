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

const L2CVPoints = () => {
 
  return (
    <Fragment>
        <Row>
          <Col xs={12}>
          <Card>
          <CardHeader className='border-bottom'>
            <CardTitle tag='h4'>CV Points for L2 Security Analyst</CardTitle>
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
                Strong hands-on experience in security management tools like Splunk Security Incident and Event Management (SIEM).
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Good experience in working/communicating with cross-functional IT infrastructure teams like network, system, database, application, security to build and manage effective security operations.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Strong hands-on experience in security management tools like Splunk Security Incident and Event Management (SIEM).
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Good knowledge on skills like Malware Analysis, Threat Hunting, Dark Web Monitoring.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Exposure to using frameworks and compliances like MITRE ATT&CK. CIS Critical Controls, OWASP, PCI-DSS, ISO 27001 etc.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Exposure to related areas of cybersecurity including Host Security, Network Security, IAM, Vulnerability Management, Penetration Testing, Compliance etc..
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Experience of Integrating tools with SOAR and designing incident response workflows in SOAR platform.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Intermediatory knowledge on Python and Regular Expressions.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Capable of independently learning new technology by utilising available documentation and vendor support resources..
              </li>
            </ul>       
            </Col>
            </Row>
            <Row>
          <Col>
          <br/><br/>
          <Row>
          <Col>
          <h4>L2 SOC Analyst (Senior Security Analyst)</h4>
            <ul className='list-style-icons'>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Deep dive analysis of triggered alerts using SIEM, SOAR and other analysis tools
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Handling escalated alerts L1 Security Analysts.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Investigating incidents, remediation, tracking and follow-up for incident closure with concerned teams, stakeholders.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Advise incident responders on the steps to take to investigate and resolve computer security incidents.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Perform root case analysis of incidents/breaches.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Build weekly and monthly reports as per SOC Manager and CISO requirements.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Onboarding log source using different collection methods.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Develop content for SIEM by writing custom parsers, correlation rules, dashboards, reports and alerts.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Maintain up-to-date documentation of designs/configurations.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Co-ordinate with auditing and compliance team by providing requested report and data.
              </li>
              <li>
                <ChevronRight size={14} className='rotate-rtl me-50' />
                Actively involved in threat hunting activities from building hypothesis to finding evidence and enhancing security controls and detection logic.
              </li>
              <li>
              <ChevronRight size={14} className='rotate-rtl me-50' />
              Periodic upgradation/creation of correlation rules based on emerging threats and requirement following MITRE Attack US-Cert and other TTP sources.
            </li>
            <li>
              <ChevronRight size={14} className='rotate-rtl me-50' />
              Participate in case review meetings to walk through the handled incidents to peers, SOC Manager and CISO.
            </li>
            </ul>
            </Col>
            </Row>
            <br/><br/>
            <Row>
            <Col>
            <h4>MSSP Responsibilities</h4>
              <ul className='list-style-icons'>
                <li>
                  <ChevronRight size={14} className='rotate-rtl me-50' />
                  Participated in conference calls, onsite meetings and roundtables with customers, sales, internal product development and support to gather data, scope new and existing work, evaluate or suggest new product features and assist in resolving existing product issues.
                </li>
                <li>
                  <ChevronRight size={14} className='rotate-rtl me-50' />
                  Own and respond to RFP/RFIs and prepare HLDs and LLDs for implementation.
                </li>
                <li>
                  <ChevronRight size={14} className='rotate-rtl me-50' />
                  Participated in pre-sales discussion with customers to highlight technical capabilities of our MSS practice.
                </li>
                <li>
                  <ChevronRight size={14} className='rotate-rtl me-50' />
                  Hire and train SOC Analysts.
                </li>
              </ul>
              </Col>
              </Row>
          </Col>
        </Row>
        
          </CardBody>
        </Card>         
          </Col>
        </Row>
    </Fragment>
  )
}

export default L2CVPoints
