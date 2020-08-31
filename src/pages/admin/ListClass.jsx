import React from 'react'
import { Link } from 'react-router-dom';

export default function ListClass({ clss, handleClick }) {
  return (
    <div className="row" >
      <Link to={`/admin/${clss._id}`}>
        <div className="list-class col s12 l8 offset-l2">
          <div className="name">
            {clss.name}
          </div>
          <div className="enrolled">
            {clss.enrolled.length}
          </div>
          <div className="rest">
            <button>UPDATE</button>
            <button>DELETE</button>
          </div>
        </div>
      </Link>
    </div>
  )
}
