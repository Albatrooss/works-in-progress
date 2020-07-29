import React, { useState, useEffect } from 'react'
import './Schedule.css'

import classService from '../../utils/classService';

import Dlass from '../Dlass/Dlass'

const colors = {
  tap: '#A66A5D',
  jazz: '#D9B4A7'
}

export default function Schedule() {

  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(async () => {
    try {
      let response = await classService.getAll();
      setClasses(response.classes)
    } catch (err) {
      setMessage(err.message)
    }
  }, [])

  return (
    <div className='schedule z-depth-2'>
      <h5>UPCOMING CLASSES..</h5>
      <p>{message}</p>
      {classes.map(clss => <Dlass clss={clss} />)}
    </div>
  )
}
