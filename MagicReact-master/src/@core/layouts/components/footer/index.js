// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
      learn@socexperts.com
        <a href='https://www.socexperts.com/' target='_blank' rel='noopener noreferrer'>
        socexperts
        </a>
        
      </span>
      <span className='float-md-end d-none d-md-block'>
        By Magic Soc Expert
        <Heart size={14} />
      </span>
    </p>
  )
}

export default Footer
