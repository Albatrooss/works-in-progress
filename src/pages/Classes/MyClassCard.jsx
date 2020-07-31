import React from 'react'
import './Classes.css';

export default function MyClassCard({ clss }) {
  return (
    <div className="row my-class-card">
      <div className="col s12 l4 my-class-card-left">
        <h5>{clss.name}</h5>
      </div>
      <div className="col s8 my-class-card-right">
        <h5>By {clss.instructor}</h5>
      </div>
    </div>
  )
}
