import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './ClassPage.css';

import ReactPlayer from 'react-player';

import classService from '../../utils/classService';
import amazonService from '../../utils/amazon';

export default function ClassPage({ user }) {
  const { id } = useParams()
  const [clss, setClss] = useState({ enrolled: [] });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [enrolled, setEnrolled] = useState(user && clss.enrolled.includes(user._id));
  const [file, setFile] = useState('');

  const handleEnroll = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await classService.enroll(clss._id, user._id);
      if (response._id === clss._id) {
        setEnrolled(true);
      }
    } catch (err) {
      setErrMessage(err.message);
    }
    setLoading(false)
  }

  let enrollBtn = <button className="btn btn-large" onClick={handleEnroll}>Enroll in this {clss.type === 'D' ? 'Class' : 'Collab'}!</button>;
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

  const handleChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await amazonService.uploadFromUser(file, user._id, id);
    } catch (err) {
      alert('something went wrong..')
    }
    setLoading(false)
    setSent(true);
  }

  useEffect(() => {
    async function getOne() {
      try {
        let response = await classService.getOne(id);
        setClss(response);
        let uploaded = await amazonService.checkUpload(id);
        console.log(uploaded)
        setUploaded(uploaded);
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
      <div className="class-page row">
        <p className="red-text">{errMessage}</p>
        <div className="col s12 l8 offset-l2 my-outline-class">
          <p className="label-class">{clss.name}</p>
          <p>{clss.description}</p>
        </div>
        <div className='player-container col s12'>
          <div className="inside-player">
            <ReactPlayer url={clss.video} controls={true} width="100%" />
          </div>
        </div>
        {clss.type === 'C' &&
          <div className="col s12 l6 offset-l3 my-outline-class">
            <p className="label-class">Submit your video</p>
            {!uploaded && !sent && <><h6>Mastered this dance? Submit your video below to be featured in this months Collab!</h6>
              <form onSubmit={handleSubmit} className='submit-form'>
                <input type="file" name='file' onChange={handleChange} />
                {loading ? <div className="preloader-wrapper big active">
                  <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                      <div className="circle"></div>
                    </div><div className="gap-patch">
                      <div className="circle"></div>
                    </div><div className="circle-clipper right">
                      <div className="circle"></div>
                    </div>
                  </div>
                </div> : <button type="submit" className="btn">Submit</button>}
              </form>
            </>}
            {(sent || uploaded) && <h6>Thanks for Uploading! Check your email soon for the Collab!</h6>}
          </div>}
      </div>
    )
  } else {
    return (
      <div className="class-page row">
        <p className="red-text">{errMessage}</p>
        <div className="col s12 l8 offset-l2 my-outline-class">
          <p className="label-class">{clss.name}</p>
          <p>{clss.description}</p>
        </div>
        <div className="col s12 l6 offset-l3 enroll-div">
          <h5>Sound like a {clss.type === 'D' ? 'Class' : 'Collab'} for you!?</h5>
          {enrollBtn}
        </div>
      </div>
    )
  }
}
