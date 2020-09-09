
import React, { useState, useEffect } from 'react';
import classService from '../../utils/classService';
import './Classes.css';

import ClassCard from './ClassCard';

export default function Classes({ user, history }) {

  const [moveBDs, setMoveBDs] = useState([])
  const [errMessage, setErrMessage] = useState('')

  useEffect(() => {
    async function oneTime() {
      try {
        let temp = await classService.getMoveBDs();
        if (temp.err) return;
        setMoveBDs(temp.classes);
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
          <p className="label-class">Movement Breakdown</p>
          <h6>Here are some short videos that break down common Pilates movements. Helpful to deepen your understanding when taking classes!</h6>
        </div>
        <p className="red-text">{errMessage}</p>
        <ul className="col s12 l6 offset-l3">
          {moveBDs.length > 0 ? moveBDs.map((clss, i) => <li key={`class-${i}`}><ClassCard history={history} clss={clss} user={user} /></li>) : <h3>COMING SOON</h3>}
        </ul>
      </div>
    </div>
  )
}