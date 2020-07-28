import React from 'react'
import './Schedule.css'

import Dlass from '../Dlass/Dlass'

const colors = {
  tap: '#A66A5D',
  jazz: '#D9B4A7'
}

export default function Schedule() {
  return (
    <div className='schedule z-depth-2'>
      <h5>UPCOMING CLASSES..</h5>
      <Dlass type={'Tap'} color={colors.tap} />
      <Dlass type={'Jazz'} color={colors.jazz} />
    </div>
  )
}
