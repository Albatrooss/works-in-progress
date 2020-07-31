import React from 'react';

import { convertDate } from '../../utils/converters'


export default function ClassCard({ clss, history, user }) {

  const handleEnroll = () => {
    console.log('here');
    history.push('/class/' + clss._id)
  }

  let btn = clss.enrolled.includes(user._id) ?
    <button onClick={handleEnroll} className="btn classes-btn">Enroll in this class!</button> :
    <button onClick={handleEnroll} className="btn classes-btn">Go to your Class</button>
  return (
    <div className="my-class-card">
      <div className="inner-class-card z-depth-2">

        <span className="and-background">{clss.name}</span>
        <div className="inner-container-class">
          <div className="left-class">
            <img src={`images/b-w_pic0${Math.floor(Math.random() * 7) + 1}.png`} alt="dancer" className="class-sider" />
            <h6>{clss.type === 'C' ? 'Due:' : 'Instructor:'}</h6>
            <p>{clss.type === 'C' ? convertDate(clss.dueDate) : clss.instructor}</p>
          </div>
          <div className="right-class">
            <h6><strong>{clss.description}</strong></h6>
            <div style={{ borderBottom: '1px solid var(--dark)' }} />
            {btn}
          </div>
        </div>
      </div>
    </div>
  )
}
