import { Fragment } from 'react'

// ** Hooks
import { useRTL } from '@hooks/useRTL'

// ** Third Party Components
import SwiperCore, {
  Grid,
  Lazy,
  Virtual,
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow
} from 'swiper'

// ** Demo Components

import SwiperFade from './RequestDetailSwiperFade'

import ExtensionsHeader from '@components/extensions-header'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/libs/swiper/swiper.scss'

// ** Init Swiper Functions
SwiperCore.use([Navigation, Grid, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const Slider = () => {
  // ** Hooks
  const [isRtl] = useRTL()

  return (
    <Fragment>
      
      <Row>
        
        <Col sm='12'>
          <SwiperFade isRtl={isRtl} />
        </Col>
       
      </Row>
    </Fragment>
  )
}

export default Slider
