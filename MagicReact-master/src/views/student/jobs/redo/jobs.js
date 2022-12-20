import mock from './mock'
const data = {
  faqData: {
    // payment
    CyberSecurityAnalyst: {
      icon: 'Briefcase',
      title: 'IBM',
      subtitle: 'Security and Risk Governance Analyst',
      qandA: [
        {
          question: 'Job details : Full-time',
          ans: 'Introduction Software Developers at IBM are the backbone of our strategic initiatives to design, code, test, and provide industry-leading solutions that make the world run today - planes and trains take off on time, bank transactions complete in the blink of an eye and the world remains safe because of the work our software developers do. Whether you are working on projects internally or for a client, software development is critical to the success of IBM and our clients worldwide. At IBM, you will use the latest software development tools, techniques and approaches and work with leading minds in the industry to build solutions you can be proud of'
          
        }
      ]
    },
    // delivery
    CYBERSECURITYANALYST: {
      icon: 'Briefcase',
      title: 'UST',
      subtitle: 'CYBER SECURITY ANALYST',
      qandA: [
        {
          question: 'Handle the internal audits to ensure the compliance requirements of various applicable standards and more independently handle VAPT/Red Teaming assignments and involve in customer discussions to identify requirements.',
          ans: 'Handle the assigned tasks from the allocated domain with minimal guidance from the leads. (Domain Examples: BCMS Risk assessment Incident management HITRUST SOC Customer Assurance Awareness activities Data Privacy VAPT Red Teaming etc.)'
        }
      ]
    },
    // cancellation and return
    Providance: {
      icon: 'Briefcase',
      title: 'Providance',
      subtitle: 'Security Analyst',
      qandA: [
        {
          question: 'Providence, one of the US’s largest not-for-profit healthcare systems, is committed to high quality, compassionate healthcare for all. Driven by the belief that health is a human right and the vision, ‘Health for a better world’, Providence and its 120,000 caregivers strive to provide everyone access to affordable quality care and services.',
          ans: 'Providence has a network of 52 hospitals, 1,000+ care clinics, senior services, supportive housing, and other health and educational services in the US. Providence India was established to bring to fruition the transformational shift of the healthcare ecosystem to Health 2.0. The India center will have focused efforts around healthcare technology and innovation, and play a vital role in driving digital transformation for Improved patient outcomes and experiences, caregiver efficiency, and running the business of Providence at scale.'
        }
      ]
    },
    // my orders
    TechnipEnergies: {
      icon: 'Briefcase',
      title: 'Technip Energies',
      subtitle: 'Senior Cybersecurity administrator for the SOC',
      qandA: [
        {
          question: 'Technip Energies is a leading Engineering & Technology company for the energy transition, with leadership positions in Liquefied Natural Gas (LNG), hydrogen and ethylene as well as growing market positions in blue and green hydrogen, sustainable chemistry and CO2 management. The company benefits from its robust project delivery model supported by extensive technology, products and services offering.',
          ans: 'Technip Energies is a leading Engineering & Technology company for the energy transition, with leadership positions in Liquefied Natural Gas (LNG), hydrogen and ethylene as well as growing market positions in blue and green hydrogen, sustainable chemistry and CO2 management. The company benefits from its robust project delivery model supported by extensive technology, products and services offering.'
        }
      ]
    },
    // product and services
    IB: {
      icon: 'Briefcase',
      title: 'IB',
      subtitle: 'Security and Risk Governance Analyst',
      qandA: [
        {
          question: 'Software Developers at IBM are the backbone of our strategic initiatives to design, code, test, and provide industry-leading solutions that make the world run today - planes and trains take off on time, bank transactions complete in the blink of an eye and the world remains safe because of the work our software developers do. Whether you are working on projects internally or for a client, software development is critical to the success of IBM and our clients worldwide. At IBM, you will use the latest software development tools, techniques and approaches and work with leading minds in the industry to build solutions you can be proud of.',
          ans: 'Security and Risk Governance analyst for our public cloud. The security governance program for public cloud is aimed to establish and maintain a framework to provide assurance that information security strategies are aligned with and support business objectives, are consistent with applicable laws and regulations through adherence to policies and internal controls, and provide assignment of responsibility, all in an effort to manage risk.  A Security and Risk Governance analyst in our team will participate in some or all of the following:'
        }
      ]
    }
  }
}

mock.onGet('/faq/data').reply(config => {
  const { q = '' } = config.params
  const queryLowered = q.toLowerCase()

  const filteredData = {}

  Object.entries(data.faqData).forEach(entry => {
    const [categoryName, categoryObj] = entry
    const filteredQAndAOfCategory = categoryObj.qandA.filter(qAndAObj => {
      return qAndAObj.question.toLowerCase().includes(queryLowered)
    })
    filteredData[categoryName] = {
      ...categoryObj,
      qandA: filteredQAndAOfCategory.length ? filteredQAndAOfCategory : []
    }
  })

  return [200, filteredData]
})
