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

  useEffect(() => {
    async function effect() {
      try {
        let response = await classService.getAll();
        setClasses(response.classes)
      } catch (err) {
        setMessage(err.message)
      }
    }
    effect();
  }, [])

  return (
    <div className="row">
      <div className='schedule z-depth-2 col s12 l6 push-l3' style={{ padding: 0 }}>
        <h5>AVAILABLE NOW</h5>
        <p>{message}</p>
        {classes.map(clss => <Dlass clss={clss} />)}
      </div>
    </div>
  )
}
