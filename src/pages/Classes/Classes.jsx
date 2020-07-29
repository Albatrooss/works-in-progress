import React, { useState, useEffect } from 'react';
import classService from '../../utils/classService';
import './Classes.css';

import { convertDate } from '../../utils/converters'

function ClassCard({ clss }) {

  console.log(clss)
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card main-background">
          <div className="card-content white-text">
            <span className="card-title">{clss.name}</span>
            <p>{clss.description}</p>
            <h6>DUE</h6>
            <p>{convertDate(clss.dueDate)}</p>
          </div>
          <div className="card-action classes-btn">
            <button className="btn classes-btn">Enroll in this class!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Classes() {

  const [classes, setClasses] = useState([])

  useEffect(async () => {
    console.log(classService.getAll())
    let temp = await classService.getAll();
    setClasses(temp.classes);
  }, [])

  return (
    <div className="classes-container">
      <h1>CLASSES</h1>
      <ul>
        {classes.map((clss, i) => <li key={`class-${i}`}><ClassCard clss={clss} /></li>)}
      </ul>
    </div>
  )
}