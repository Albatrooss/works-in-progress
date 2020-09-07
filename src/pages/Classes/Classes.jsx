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
        let temp = await classService.getClasses();
        console.log(temp);
        if (temp.err) return;
        setClasses(temp.classes);
      } catch (err) {
        setErrMessage(err.message)
      }
    }
    oneTime();
  }, [])

  return (
    <div className="classes-container">
      <div className="row">
        <div className="my-outline-class col s12 l8 offset-l2">
          <p className="label-class">Works in Progress Classes</p>
          <h6>These online dance and Pilates classes are posted weekly on Sunday evening! Let joy be your guide as you enjoy the process and let go of outcomes.</h6>
        </div>
        <p className="red-text">{errMessage}</p>
        <ul className="col s12 l6 offset-l3">
          {classes.length > 0 ? classes.map((clss, i) => <li key={`class-${i}`}><ClassCard history={history} clss={clss} user={user} /></li>) : <h3>COMING SOON</h3>}
        </ul>
      </div>
    </div>
  )
}