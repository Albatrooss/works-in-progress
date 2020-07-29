import React from 'react'
import { Link } from 'react-router-dom'

import { convertDate } from '../../utils/converters';

export default function Dlass({ clss }) {
  return (
    <Link to={'/class/' + clss._id} >
      <div style={{ backgroundColor: 'white' }} >
        <h4>{clss.name}</h4>
        <p>DUE: {convertDate(clss.dueDate)}</p>
      </div>
    </Link>
  )
}
