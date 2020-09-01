import React, { useState, useEffect } from 'react';

import './adminStyles.css'

import amazonService from '../../utils/amazon';

export default function NewClassForm() {
  const [formData, setFormData] = useState({
    type: 'C',
    className: '',
    description: '',
    instructor: '',
    date: '',
    time: '',
    file: '',
    icon: 1
  });
  const [iconsShowing, setIconsShowing] = useState(false);
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

  const handleCollab = e => {
    e.preventDefault();
    setFormData({
      ...formData,
      type: formData.type === 'C' ? 'D' : 'C'
    })
  }

  const showIcons = e => {
    e.preventDefault();
    setIconsShowing(true);
  }

  const hideIcons = e => {
    e.preventDefault();
    setIconsShowing(false);
  }

  const setIcon = num => {
    setFormData({
      ...formData,
      icon: num
    })
    setIconsShowing(false);
  }

  const icons = (x) => {
    let res = []
    for (let i = 0; i < x; i++) {
      res.push(<li onClick={() => setIcon(i + 1)}><img src={`images/b-w_pic0${i + 1}.png`} alt={`icon-${i + 1}`} className="icon-list-img" /></li>)
    }
    return res;
  }


  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      let answer = await amazonService.uploadAndCreateDanceClass(formData)
      setLoading(false);
      setMessage(`${answer.danceClass.name} Created!`)
      setNewClass(true);
    } catch (err) {
      console.log(err)
      setErrMessage(`Error! ${err.message}`)
    }
  }

  let myButton = <button type="submit" className="waves-effect btn-large">Create Class</button>;

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
    setFormData({
      ...formData,
      date: `${newDate[2]}-${newDate[0].toString().padStart(2, '0')}-${newDate[1].toString().padStart(2, '0')}`,
      time: `${hours}:${mins}`
    })
  }, [])

  return (
    <>
      <div className="row create-class">
        {iconsShowing && <div className="speech-bubble">
          <ul>
            {icons(7)}
          </ul>
          <button className='icon-exite' onClick={hideIcons}>X</button>
        </div>}
        <div className="col s12 l8 offset-l2">
          <p className="red-text">{errMessage}</p>
          <form onSubmit={handleSubmit}>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Name</div>
              <input type="text" name="className" required onChange={handleChange} />
            </div>
            <div className="input-field col s12 l6 my-form-outline">
              <div className="my-label">Instructor</div>
              <input type="text" name="instructor" required onChange={handleChange} />
            </div>
            <div className="input-field col s6 l3 my-form-outline">
              <button className={`collab-sel my-form-outline ${formData.type === 'C' ? 'is-collab' : 'not-collab'}`} onClick={handleCollab}><p>Collab</p></button>
              <div className="my-label collab-label">Type</div>
            </div>
            <div className="input-field col s6 l3 my-form-outline">
              <button onClick={showIcons} className={`icons-sel my-form-outline`} ><img src={`images/b-w_pic0${formData.icon}.png`} alt="icon button" /></button>
              <div className="my-label collab-label">Icon</div>

            </div>
            <div className="input-field col s12 my-form-outline">
              <div className="my-label">Description</div>
              <textarea name="description" cols="30" rows="20" required onChange={handleChange} />
            </div>
            <div className={`input-field col s12 l6 my-form-outline ${formData.type === 'D' ? 'hidden' : ''}`}>
              <div className="my-label">Date</div>
              <input type="date" value={formData.date} name="date" required onChange={handleChange} />
            </div>
            <div className={`input-field col s12 l6 my-form-outline ${formData.type === 'D' ? 'hidden' : ''}`}>
              <div className="my-label">Time</div>
              <input type="time" value={formData.time} name="time" required onChange={handleChange} />
            </div>
            <div className="input-field col s12 l8 my-form-outline">
              <div className="my-label">Video</div>
              <input type="file" name="file" required onChange={handleChange} />
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
