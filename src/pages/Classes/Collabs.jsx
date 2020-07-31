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
        if (temp.err) throw new Error(temp.err)
        setClasses(temp.classes);
      } catch (err) {
        console.log('jere')
        setErrMessage(err.message)
      }
    }
    oneTime();
  }, [])

  return (
    <div className="classes-container">
      <div className="row">
        <div className="my-outline-class col s12 l8 offset-l2">
          <p className="label-class">Works in Progress Collabs</p>
          <h6>Learn a piece of choreography before the deadline then film yourself performing it to be <span>featured in a video</span> that you can share online! A new piece will be posted on the first Friday of each month!</h6>
        </div>
        <p className="red-text">{errMessage}</p>
        <ul className="col s12 l6 offset-l3">
          {classes.map(clss => <li key={clss._id}><ClassCard history={history} clss={clss} user={user} /></li>)}
        </ul>
      </div>
    </div>
  )
}