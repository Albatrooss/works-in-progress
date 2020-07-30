import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './ClassPage.css';

import ReactPlayer from 'react-player';

import classService from '../../utils/classService';

export default function ClassPage({ user }) {
  const { id } = useParams()
  const [clss, setClss] = useState({ enrolled: [] });
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [enrolled, setEnrolled] = useState(user && clss.enrolled.includes(user._id));

  const handleEnroll = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await classService.enroll(clss._id, user._id);
      if (response._id === clss._id) {
        setEnrolled(true);
      }
      setLoading(false)
    } catch (err) {
      setErrMessage(err.message);
    }
  }

  let enrollBtn = <button className="btn" onClick={handleEnroll}>Enroll in this {clss.type === 'C' ? 'Class' : 'Collab'}!</button>;
  if (loading) {
    enrollBtn = <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  }

  useEffect(() => {
    async function getOne() {
      try {
        let response = await classService.getOne(id);
        setClss(response);
      } catch (err) {
        setErrMessage(err.message)
      }
    }
    getOne();
  }, [id])

  useEffect(() => {
    setEnrolled(user && clss.enrolled.includes(user._id));
  }, [clss])

  if (enrolled) {
    return (
      <div className="class-page">
        <p className="red-text">{errMessage}</p>
        <h1>{clss.name}</h1>
        <p>{clss.description}</p>
        <div className='player-container'>
          <div className="inside-player">
            <ReactPlayer url={clss.video} controls={true} width="100%" />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="class-page">
        <p className="red-text">{errMessage}</p>
        <h1>{clss.name}</h1>
        <p>{clss.description}</p>
        {enrollBtn}
      </div>
    )
  }
}
