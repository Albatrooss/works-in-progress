import React, { useState, useEffect } from 'react';
import NewClassForm from './newClassForm';
import UpdateClassForm from './UpdateClassForm';

import './adminStyles.css';
import classService from '../../utils/classService';


export default function Admin(props) {

  const [classes, setClasses] = useState([])
  const [collabs, setCollabs] = useState([])
  const [errMessage, setErrMessage] = useState('')
  const [selecetedClass, setSelectedClass] = useState({});

  const [whatsShowing, setWhatsShowing] = useState({
    newClass: false,
    updateClass: false
  });

  const handleShowing = (thing) => {
    setWhatsShowing({
      ...whatsShowing,
      [thing]: !whatsShowing[thing]
    })
  }

  const handleUpdateSelect = (id, type) => {
    let clss;
    if (type === 'd') {
      clss = classes.find(x => x._id === id)
    } else {
      clss = collabs.find(x => x._id === id)
    }
    console.log(clss)
    setSelectedClass(clss);
  }

  useEffect(() => {
    async function oneTime() {
      try {
        let response = await classService.getAllAdmin();
        console.log(response)
        setClasses(response.classes);
        setCollabs(response.collabs);
      } catch (err) {
        setErrMessage(err.message)
      }
    }
    oneTime()
  }, [])

  return (
    <div className='admin'>
      <h1>ADMIN PAGE</h1>
      <p className="red-text">{errMessage}</p>
      <h5 onClick={() => handleShowing('newClass')}>Create a Class/Collab <i className="material-icons">arrow_drop_{whatsShowing.newClass ? 'up' : 'down'}</i></h5>
      <div className="row">
        <div className={whatsShowing.newClass ? 'new-class showing col s12 l6 offset-l3' : 'new-class hidden col s12 l6 offset-l3'}>
          <NewClassForm />
        </div>
      </div>
      <h5 onClick={() => handleShowing('updateClass')}>Update a Class/Collab <i className="material-icons">arrow_drop_{whatsShowing.updateClass ? 'up' : 'down'}</i></h5>
      <div className="row">
        <div className={whatsShowing.updateClass ? 'new-class showing col s12 l6 offset-l3' : 'new-class hidden col s12 l6 offset-l3'}>
          {classes.map(c => <div key={c._id} className={selecetedClass === c ? 'my-outline' : ''} onClick={() => handleUpdateSelect(c._id, 'd')}>{c.name}</div>)}
          {collabs.map(c => <div key={c._id} className={selecetedClass === c ? 'my-outline' : ''} onClick={() => handleUpdateSelect(c._id, 'c')}>{c.name}</div>)}
          {selecetedClass._id && <UpdateClassForm clss={selecetedClass} type={selecetedClass.type} />}
        </div>
      </div>
    </div >
  )
}
