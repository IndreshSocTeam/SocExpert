// ** Third Party Components
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'


import CardCongratulations from '../DashboardCard/BatchOverViewCard'

const params = {
    autoplay:{
        delay: 2500,
        disableOnInteraction: true,
      },
  pagination: {
    clickable: true
  },
  navigation: true
}

const BatchOverView = ({ isRtl }) => {
  return (
    <div>
        <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
          <SwiperSlide>          
            <CardCongratulations />
          </SwiperSlide>
          <SwiperSlide>
            <CardCongratulations />
          </SwiperSlide>
          <SwiperSlide>
             <CardCongratulations />
          </SwiperSlide>
          <SwiperSlide>
            <CardCongratulations />
          </SwiperSlide>
          <SwiperSlide>
            <CardCongratulations />
          </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default BatchOverView
