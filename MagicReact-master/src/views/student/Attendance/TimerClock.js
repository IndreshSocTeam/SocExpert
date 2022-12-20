import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const TimerClock = () => {
    
  return (
    <CountdownCircleTimer
    isPlaying
    duration={300}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[300, 200, 100, 30]}
  >
  {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
  )
}

export default TimerClock
