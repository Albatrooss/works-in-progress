import React, { useState, useEffect } from 'react'
import './Schedule.css'

import classService from '../../utils/classService';

import Dlass from '../Dlass/Dlass'

export default function Schedule() {

  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function effect() {
      try {
        let response = await classService.getAll();
        if (response.classes) {
          setClasses(response.classes)
        } else {
          console.log(response)
          setMessage(response.err)
        }
      } catch (err) {
        setMessage(err.message)
      }
    }
    effect();
  }, [])

  return (
    <div className="row schedule">
      <div className='col s12 l8 offset-l2 my-outline-class'>
        <p className='label-class'>Pre-Recorded Classes</p>
        <p>{message}</p>
        {classes.map(clss => <Dlass key={clss._id} clss={clss} />)}
      </div>
    </div>
  )
}
