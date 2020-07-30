import React from 'react';

import { convertDate } from '../../utils/converters'

export default function ClassCard({ clss, history }) {

  const handleEnroll = () => {
    console.log('here');
    history.push('/class/' + clss._id)
  }

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
            <button onClick={handleEnroll} className="btn classes-btn">Enroll in this class!</button>
          </div>
        </div>
      </div>
    </div>
  )
}
