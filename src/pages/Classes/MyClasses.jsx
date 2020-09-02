import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MyClassCard from './MyClassCard';
import classService from '../../utils/classService';
import requestService from '../../utils/requestService';
import { properNoun } from '../../utils/converters';
import './Classes.css';

export default function MyClasses({ user }) {

  const [classList, setClassList] = useState([]);
  const [collabList, setCollabList] = useState([]);
  const [errMessage, setErrMessage] = useState('');

  const [songForm, setSongForm] = useState({
    song: '',
    dance: ''
  })
  const [songMsg, setSongMsg] = useState('');

  const handleDelete = async (clss) => {
    try {
      let response = await classService.unEnroll(clss, user._id);
      if (response) {
        let newClasses = await classService.getMine();
        setClassList(newClasses.myClasses);
        setCollabList(newClasses.myCollabs);
      }
    } catch (err) {
      setErrMessage(err.message)
    }
  }

  const handleSongChange = (e) => {
    setSongForm({
      ...songForm,
      [e.target.name]: e.target.value
    });
    setSongMsg('');
  }

  const handleSongSubmit = async e => {
    e.preventDefault();
    try {
      let res = await requestService.createSongRequest(songForm)
      setSongForm({
        song: '',
        dance: ''
      });
      setSongMsg('Thanks for your Request!');
    } catch (err) {
      console.log('err: ', err)
    }
  }


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
    <div className="my-classes-container">
      <div className="row">
        <div className="my-outline-class col s12 l8 offset-l2">
          {user && <p className="label-class">{properNoun(user.username)}</p>}
          <h6>Welcome to Works in Progress! Below are all the current Classes and Collabs you have enrolled in</h6>
        </div>
        <p className="red-text center-align">{errMessage}</p>
        {/* <p className="red-text">{errMessage}</p> */}
        <div className="my-outline-class col s12 l10 offset-l1">
          <p className="label-class non-title">My Classes</p>
          <ul>
            {classList.length === 0 ? <p><strong>No Classes to show</strong></p> : ''}
            {classList.map(clss => <li key={clss._id}><MyClassCard clss={clss} handleDelete={handleDelete} /></li>)}
            <li>Looking for more Classes? <Link to='/classes'>Click Here!</Link></li>
          </ul>
        </div>
        <div className="my-outline-class col s12 l10 offset-l1">
          <p className="label-class non-title">My Collabs</p>
          <ul>
            {collabList.map(clss => <li key={clss._id}><MyClassCard clss={clss} handleDelete={handleDelete} /></li>)}
            {collabList.length === 0 ? <p><strong>No Collabs to show</strong></p> : ''}
            <li>Looking for more Collabs? <Link to='/collabs'>Click Here!</Link></li>
          </ul>
        </div>
        <div className="my-outline-class col s12 l10 offset-l1 request-song">
          <form onSubmit={handleSongSubmit}>
            <p className="label-class non-title">Request a Song/Dance</p>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Song</div>
              <input type="text" name="song" value={songForm.song} onChange={handleSongChange} />
            </div>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Dance Type</div>
              <input type="text" name="dance" value={songForm.dance} onChange={handleSongChange} />
            </div>
            <div className="col s12 l10 offset-l1"><p>{songMsg}</p></div>
            <button className='btn' type="submit" >Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
