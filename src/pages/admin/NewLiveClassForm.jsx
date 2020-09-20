import React, { useState, useEffect } from 'react';

import './adminStyles.css'

import amazonService from '../../utils/amazon';

export default function NewLiveClassForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructor: '',
    dayOfWeek: '',
    time: 3,
    zoomLink: ''
  });

  const [loading, setLoading] = useState(false);
  const [newClass, setNewClass] = useState(false);
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log('here: ', formData);
      let answer = await amazonService.createLiveClass(formData);
      setLoading(false);
      setMessage(`${answer.name} Created!`)
      setNewClass(true);
    } catch (err) {
      setErrMessage(`Error! ${err.message}`)
    }
  }

  let myButton = <button type="submit" className="waves-effect btn-large">Create Class</button>;

  if (newClass) {
    myButton = <p style={{ color: '#333' }}>{message}</p>
  } else if (loading) {
    myButton = <div className="preloader-wrapper big active">
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

  return (
    <>
      <div className="row create-class">
        <div className="col s12 l8 offset-l2">
          <p className="red-text">{errMessage}</p>
          <form onSubmit={handleSubmit}>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Name</div>
              <input type="text" name="name" required onChange={handleChange} />
            </div>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Instructor</div>
              <input type="text" name="instructor" required onChange={handleChange} />
            </div>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Description</div>
              <textarea name="description" cols="30" rows="20" required onChange={handleChange} />
            </div>
            <div className={`input-field col s12 l6 my-form-outline`}>
              <div className="my-label">Day of Week</div>
              <input type="number" value={formData.date} name="dayOfWeek" required onChange={handleChange} />
            </div>
            <div className={`input-field col s12 l6 my-form-outline`}>
              <div className="my-label">Time</div>
              <input type="number" value={formData.time} name="time" required onChange={handleChange} />
            </div>
            <div className="input-field col s12 l8 my-form-outline">
              <div className="my-label">Zoom Link</div>
              <input type="text" name="zoomLink" required onChange={handleChange} />
            </div>
            <div className="input-field col s12 l4 my-create-class-btn">
              {myButton}
            </div>
          </form>
        </div>
      </div>


    </>
  )
}
