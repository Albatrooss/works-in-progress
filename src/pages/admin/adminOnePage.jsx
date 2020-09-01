import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import classService from '../../utils/classService'

export default function AdminOnePage() {

  const { id } = useParams();

  const [clss, setClss] = useState({ enrolled: [] });
  const [errMessage, setErrMessage] = useState('');

  const enrolled = () => {
    let res = [];
    clss.enrolled.forEach(e =>
      <div className="col s12 l8 offset-l2">
        <p>e.username</p>
        <p>e.createdAt</p>
        <p>e.updatedAt</p>
      </div>
    )
    return res;
  }

  useEffect(() => {
    async function oneTime() {
      try {
        let response = await classService.getOneAdmin(id);
        setClss(response);
      } catch (err) {
        setErrMessage(err.message)
      }
    }
    oneTime()
  }, [])

  return (
    <div>
      <h1>{clss.name}</h1>
      <p className="red">{errMessage}</p>
      <div className="row">
        <div className="col s12 l8 offset-l2">
          Enrolled
        </div>
        <div className="col s12 l8 offset-l2 enrolled-list">
          <p>Username</p>
          <p>Signed Up</p>
          <p>Classes</p>
        </div>
        {clss.enrolled.map(e =>
          <div className="col s12 l8 offset-l2 enrolled-list">
            <p>{e.username}</p>
            <p>{new Date(e.createdAt).toLocaleString()}</p>
            {/* <p>{e.classes.length}</p> */}
          </div>
        )}
      </div>
    </div>
  )
}
