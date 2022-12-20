// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign, Plus, Book, CheckCircle, CreditCard } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

const StatsCard = ({ cols }) => {
  const data = [
    {
      title: 'Attendance',
      subtitle: '',
      color: 'light-primary',
      icon: <CheckCircle size={24} />
    },
    {
      title: 'Submit Assignment',
      subtitle: '',
      color: 'light-info',
      icon: <Book size={24} />
    },
    {
      title: 'Create Request',
      subtitle: '',
      color: 'light-danger',
      icon: <Plus size={24} />
    },
    {
      title: 'SE Wallet',
      subtitle: '',
      color: 'light-success',
      icon: <CreditCard size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h6 className='fw-bolder mb-0'>{item.title}</h6>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Shortcuts</CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'>Shortcuts directs to specified pages</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard