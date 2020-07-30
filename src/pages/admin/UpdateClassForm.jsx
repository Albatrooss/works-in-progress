import React, { useState, useEffect } from 'react';

import './adminStyles.css'

import amazonService from '../../utils/amazon';
import classService from '../../utils/classService';

export default function NewClassForm({ clss, type, hidden }) {
  const [formData, setFormData] = useState({
    type: '',
    className: '',
    description: '',
    instructor: '',
    date: '',
    time: '',
    file: '',
  })

  const [loading, setLoading] = useState(false);
  const [newClass, setNewClass] = useState(false);
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleChange = e => {
    if (e.target.name === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      })
    } else if (e.target.name === 'type') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.toUpperCase()
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      let answer = await classService.updateOne(formData, clss)
      setLoading(false);
      console.log(answer)
      setNewClass(true);
    } catch (err) {
      console.log(err)
      setErrMessage(`Error! ${err.message}`)
    }
  }

  let myButton = <button type="submit" className="waves-effect btn-large">Update Class</button>;

  if (newClass) {
    myButton = <p>{message}</p>
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

  useEffect(() => {
    let now = new Date();
    let date = now.toLocaleDateString();
    let newDate = date.split('/');
    let hours = now.getHours();
    let mins = now.getMinutes().toString().padStart(2, '0');
    if (type === 'D') {
      setFormData({
        ...formData,
        className: clss.name,
        description: clss.description,
        instructor: clss.instructor,
        type: 'D',
        date: `${newDate[2]}-${newDate[0].toString().padStart(2, '0')}-${newDate[1].toString().padStart(2, '0')}`,
        time: `${hours}:${mins}`
      })
    } else if (type === 'D') {
      now = new Date(clss.dueDate);
      date = now.toLocaleDateString();
      newDate = date.split('/');
      hours = now.getHours();
      mins = now.getMinutes().toString().padStart(2, '0');
      setFormData({
        ...formData,
        className: clss.name,
        description: clss.description,
        instructor: clss.instructor,
        type: 'C',
        date: `${newDate[2]}-${newDate[0].toString().padStart(2, '0')}-${newDate[1].toString().padStart(2, '0')}`,
        time: `${hours}:${mins}`
      })
    }
  }, [clss])

  return (
    <>
      <div className={`row update-class${hidden ? '' : ' showing'}`} >
        <div className="col s12 l8 offset-l2">
          <p className="red-text">{errMessage}</p>
          <form onSubmit={handleSubmit}>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Name</div>
              <input value={formData.className} type="text" name="className" onChange={handleChange} />
            </div>
            <div className="input-field col s12 l6 my-form-outline">
              <div className="my-label">Instructor</div>
              <input value={formData.instructor} type="text" name="instructor" onChange={handleChange} />
            </div>
            <di className="input-field col s12 l6 my-form-outline">
              <div className="my-label">Type (C or D)</div>
              <input value={formData.type} type="text" name="type" pattern="^(c|d|C|D)$" onChange={handleChange} />
            </di>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Description</div>
              <textarea value={formData.description} name="description" cols="30" rows="20" onChange={handleChange} />
            </div>
            <div className={`input-field col s12 l6 my-form-outline ${formData.type === 'D' ? 'hidden' : ''}`}>
              <div className="my-label">Date</div>
              <input type="date" value={formData.date} name="date" onChange={handleChange} />
            </div>
            <div className={`input-field col s12 l6 my-form-outline ${formData.type === 'D' ? 'hidden' : ''}`}>
              <div className="my-label">Time</div>
              <input type="time" value={formData.time} name="time" onChange={handleChange} />
            </div>
            <div className="input-field col s12 l8 my-form-outline">
              <div className="my-label">Video</div>
              <input value={formData.file} type="file" name="file" onChange={handleChange} />
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
