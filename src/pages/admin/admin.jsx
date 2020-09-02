import React, { useState, useEffect } from 'react';
import NewClassForm from './newClassForm';
// import UpdateClassForm from './UpdateClassForm';

import './adminStyles.css';
import classService from '../../utils/classService';
import ListClass from './ListClass';

export default function Admin(props) {

  const [classes, setClasses] = useState([])
  const [collabs, setCollabs] = useState([])
  const [errMessage, setErrMessage] = useState('')
  // const [selecetedClass, setSelectedClass] = useState({});

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

  const allClasses = (thing) => {
    let ans = []
    thing.forEach(clss => ans.push(<li key={clss._id}><ListClass clss={clss} /></li>))
    return ans
  };

  // const handleUpdateSelect = (id, type) => {
  //   let clss;
  //   if (type === 'd') {
  //     clss = classes.find(x => x._id === id)
  //   } else {
  //     clss = collabs.find(x => x._id === id)
  //   }
  //   console.log(clss)
  //   setSelectedClass(clss);
  // }

  useEffect(() => {
    async function oneTime() {
      try {
        let response = await classService.getAllAdmin();
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
      <h3>ADMIN PAGE</h3>
      <p className="red-text">{errMessage}</p>
      <div className='admin-class-list'>
        <ul>
          <li><h4>Classes</h4></li>
          <li><hr /></li>
          {allClasses(classes)}
          <li><h4>Collabs</h4></li>
          <li><hr /></li>
          {allClasses(collabs)}
        </ul>
      </div>
      <h5 onClick={() => handleShowing('newClass')}>Create a Class/Collab <i className="material-icons">arrow_drop_{whatsShowing.newClass ? 'up' : 'down'}</i></h5>
      <div className="row">
        <div className={whatsShowing.newClass ? 'new-class showing col s12 l6 offset-l3' : 'new-class hidden col s12 l6 offset-l3'}>
          <NewClassForm />
        </div>
      </div>

      {/* <h5 onClick={() => handleShowing('updateClass')}>Update a Class/Collab <i className="material-icons">arrow_drop_{whatsShowing.updateClass ? 'up' : 'down'}</i></h5> */}
      {/* <div className="row">
        <div className={whatsShowing.updateClass ? 'new-class showing col s12 l6 offset-l3' : 'new-class hidden col s12 l6 offset-l3'}>
          {classes.map(c => <div key={c._id} className={selecetedClass === c ? 'my-outline' : ''} onClick={() => handleUpdateSelect(c._id, 'd')}>{c.name}</div>)}
          {collabs.map(c => <div key={c._id} className={selecetedClass === c ? 'my-outline' : ''} onClick={() => handleUpdateSelect(c._id, 'c')}>{c.name}</div>)}
          {selecetedClass._id ? <UpdateClassForm hidden={false} clss={selecetedClass} type={selecetedClass.type} /> : <UpdateClassForm hidden={true} clss={null} type={'E'} />}
        </div>
      </div> */}
    </div >
  )
}
