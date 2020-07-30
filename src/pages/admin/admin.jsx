import React, { useState } from 'react';
import NewClassForm from './newClassForm';

import './adminStyles.css';


export default function Admin(props) {

  const [whatsShowing, setWhatsShowing] = useState({
    newClass: false
  });

  const handleShowing = (thing) => {
    setWhatsShowing({
      ...whatsShowing,
      [thing]: !whatsShowing[thing]
    })
  }

  return (
    <div className='admin'>
      <h1>ADMIN PAGE</h1>
      <h5 onClick={() => handleShowing('newClass')}>Create a Class/Collab <i className="material-icons">arrow_drop_{whatsShowing.newClass ? 'up' : 'down'}</i></h5>
      <div className={whatsShowing.newClass ? 'new-class showing' : 'new-class hidden'}>
        <NewClassForm />
      </div>

    </div>
  )
}
