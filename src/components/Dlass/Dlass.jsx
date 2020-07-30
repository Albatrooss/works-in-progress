import React from 'react'
import { Link } from 'react-router-dom'
import './Dlass.css';

import { convertDate } from '../../utils/converters';

export default function Dlass({ clss }) {
  if (clss.type === 'C') {
    return (
      <Link to={'/class/' + clss._id} >
        <div className="dlass-container z-depth-2" >
          <div className="left-dlass">COLLAB</div>
          <div className="right-dlass">
            <p>{clss.name}</p>
            <p>DUE: {convertDate(clss.dueDate)}</p>
          </div>
        </div>
      </Link>
    )
  } else {
    return (
      <Link to={'/class/' + clss._id} >
        <div className="dlass-container z-depth-2" >
          <div className="left-dlass">CLASS</div>
          <div className="right-dlass">
            <p>{clss.name}</p>
            <p>WITH: {clss.instructor}</p>
          </div>
        </div>
      </Link>
    )
  }
}
