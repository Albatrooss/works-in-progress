import React, { useState, useEffect } from 'react';
import classService from '../../utils/classService';
import './Classes.css';

import ClassCard from './ClassCard';

export default function Classes({ user, history }) {

  const [classes, setClasses] = useState([])
  const [errMessage, setErrMessage] = useState('')

  useEffect(() => {
    async function oneTime() {
      try {
        let temp = await classService.getCollabs();
        setClasses(temp.classes);
      } catch (err) {
        setErrMessage(err.message)
      }
    }
    oneTime();
  }, [])

  return (
    <div className="classes-container">
      <h1>Collabs</h1>
      <p className="red-text">{errMessage}</p>
      <ul>
        {classes.map((clss, i) => <li key={`class-${i}`}><ClassCard history={history} clss={clss} /></li>)}
      </ul>
    </div>
  )
}