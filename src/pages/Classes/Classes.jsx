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
          <h6>These online dance classes are posted weekly on Sunday evening! Remember that it is <span>not about perfection</span>, it is about communicating emotions through <span>authentic movement</span>. Let joy be your guide as you enjoy the process and let go of outcomes.</h6>
        </div>
        <p className="red-text">{errMessage}</p>
        <ul className="col s12 l6 offset-l3">
          {classes.map((clss, i) => <li key={`class-${i}`}><ClassCard history={history} clss={clss} /></li>)}
        </ul>
      </div>
    </div>
  )
}