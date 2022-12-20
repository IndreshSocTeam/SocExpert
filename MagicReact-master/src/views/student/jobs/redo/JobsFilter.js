// ** Icons Imports
import { Search } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Form, Input, InputGroup, InputGroupText } from 'reactstrap'

const FaqFilter = ({ searchTerm, setSearchTerm, getFAQData }) => {
  const handleFaqFilter = e => {
    setSearchTerm(e.target.value)
    getFAQData(e.target.value)
  }

  return (
    <div id='faq-search-filter'>
      
          <Form className='faq-search-input' onSubmit={e => e.preventDefault()}>
            <InputGroup className='input-group-merge'>
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input value={searchTerm} onChange={e => handleFaqFilter(e)} placeholder='Search Jobs'/>
            </InputGroup>
          </Form>
    </div>
  )
}

export default FaqFilter
