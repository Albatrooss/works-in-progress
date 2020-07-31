import React from 'react'
import './Classes.css';
import { Link } from 'react-router-dom'
import classService from '../../utils/classService';



export default function MyClassCard({ clss, handleDelete }) {

  return (
    <>
      <div className="row my-class-card">
        <div className="col s12 l4 my-class-card-left">
          <h5>{clss.name}</h5>
        </div>
        <div className="col s12 l8 my-class-card-right">
          <h5>By {clss.instructor}</h5>
          <Link to={`/class/${clss._id}`} className="go-to-class-link btn">Go to {clss.type === 'C' ? 'Collab' : 'Class'}</Link>
          <button className="btn red my-class-delete" onClick={() => handleDelete(clss)}>X</button>
        </div>
      </div>
    </>
  )
}
