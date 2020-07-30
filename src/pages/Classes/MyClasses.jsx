import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import classService from '../../utils/classService';

export default function MyClasses({ user }) {

  const [classList, setClassList] = useState([]);
  const [collabList, setCollabList] = useState([]);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {

    async function loadClassList() {
      try {
        let response = await classService.getMine();
        setClassList(response.myClasses);
        setCollabList(response.myCollabs);
      } catch (err) {
        setErrMessage(err.message);
      }
    }
    loadClassList();
  }, [])

  return (
    <div>
      <h1>MY CLASSES</h1>
      <p className="red-text">{errMessage}</p>
      <h4>My Classes</h4>
      <ul>
        {classList.map(clss => <li>{clss.name}</li>)}
        <li>Looking for more Classes? <Link to='/classes'>Click Here!</Link></li>
      </ul>
      <h4>My Collabs</h4>
      <ul>
        {collabList.map(clss => <li>{clss.name}</li>)}
      </ul>
    </div>
  )
}
