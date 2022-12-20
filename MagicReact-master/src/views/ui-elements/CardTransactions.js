// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const CardTransactions = () => {
  const transactionsArr = [
    {
      title: 'Attendance',
      color: 'light-primary',
      subtitle: '',
      amount: '2 / 3',
      Icon: Icon['Pocket'],
      down: true
    },
    {
      title: 'Coin Balance',
      color: 'light-success',
      subtitle: '',
      amount: '100',
      Icon: Icon['Check']
    },
    {
      title: 'No of Mocks',
      color: 'light-danger',
      subtitle: '',
      amount: '6',
      Icon: Icon['DollarSign']
    },
    {
      title: 'Avg. Mock Score',
      color: 'light-warning',
      subtitle: '',
      amount: '8.5',
      Icon: Icon['CreditCard'],
      down: true
    },
    {
      title: 'No. of Assignmnets',
      color: 'light-info',
      subtitle: '',
      amount: '0 / 1',
      Icon: Icon['TrendingUp']
    },
    {
      title: 'Avg. Assignment Score',
      color: 'light-primary',
      subtitle: '',
      amount: '7.8',
      Icon: Icon['Activity']
    },
    {
      title: 'Ready for Placements ?',
      color: 'light-success',
      subtitle: '',
      amount: 'No',
      Icon: Icon['Check']
    }
  ]

  const renderTransactions = () => {
    return transactionsArr.map(item => {
      return (
        <div key={item.title} className='transaction-item'>
          <div className='d-flex'>
            <Avatar className='rounded' color={item.color} icon={<item.Icon size={18} />} />
            <div>
              <h6 className='transaction-title'>{item.title}</h6>
              <small>{item.subtitle}</small>
            </div>
          </div>  
          <div className={`fw-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.amount}</div>
        </div>
      )
    })
  }

  return (
    <Card className='card-transaction'>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions