import React, { useState } from 'react'
import ReactPlayer from 'react-player';
import amazonService from '../utils/amazon'

export default function Test() {

  const [file, setFile] = useState({})
  const [name, setName] = useState('')
  const [message, setMessage] = useState('Nothing to show..')
  const dueDate = new Date();

  const handleFileChange = e => {
    e.preventDefault();
    setFile(e.target.files[0]);
  }

  const handleNameChange = e => {
    e.preventDefault();
    setName(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let answer = amazonService.uploadAndCreateDanceClass({ file, name, dueDate })
      console.log(answer);
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  return (
    <div>
      {message}
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleNameChange} />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">SUBMIT</button>

      </form>
    </div>
  )
}
