import React from 'react'
import { Link } from 'react-router-dom'

export default function Dlass({ type, color }) {
  return (
    <Link to={'/' + type} >
      <div style={{ backgroundColor: color }} >
        <h4>Fun {type} Class</h4>
      </div>
    </Link>
  )
}
