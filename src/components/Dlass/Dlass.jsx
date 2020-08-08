import React from 'react'
import { Link } from 'react-router-dom'
import './Dlass.css';

import { convertDate } from '../../utils/converters';

export default function Dlass({ clss }) {
  // if (clss.type === 'C') {
  //   return (
  //     <Link to={'/class/' + clss._id} >
  //       <div className="dlass-container z-depth-2" >
  //         <div className="left-dlass">COLLAB</div>
  //         <div className="right-dlass">
  //           <p>{clss.name}</p>
  //           <p>DUE: {convertDate(clss.dueDate)}</p>
  //         </div>
  //       </div>
  //     </Link>
  //   )
  // } else {
  //   return (
  //     <Link to={'/class/' + clss._id} >
  //       <div className="dlass-container z-depth-2" >
  //         <div className="left-dlass">CLASS</div>
  //         <div className="right-dlass">
  //           <p>{clss.name}</p>
  //           <p>WITH: {clss.instructor}</p>
  //         </div>
  //       </div>
  //     </Link>
  //   )
  // }

  return (
    <div className="dlass-new-container">
      <Link to={`/class/${clss._id}`}>
        <div className="row dlass">
          <div className="col s12 l10 offset-l1 my-outline-class">
            <h3 className="label-class">{clss.type === 'C' ? 'Collab' : 'Class'}</h3>
            <h5>{clss.name}</h5>
            <p>{clss.type === 'C' ? `Due: ${convertDate(clss.dueDate)}` : `With: ${clss.instructor}`}</p>
          </div>
        </div>
      </Link>
    </div>
  )

}
