import React from 'react'
import { Link } from 'react-router-dom'
import './Dlass.css';

import { convertDate } from '../../utils/converters';

export default function Dlass({ clss }) {
  return (
    <Link to={'/class/' + clss._id} >
      <div className="dlass-container" >
        <div className="left-dlass">CLASS</div>
        <div className="right-dlass">
          <p>{clss.name}</p>
          <p>DUE: {convertDate(clss.dueDate)}</p>
        </div>
      </div>
    </Link>
  )
}
