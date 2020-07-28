import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import NewClassForm from './newClassForm';

import adminStyles from './adminStyles.css';

// const useStyles = makeStyles({
//   root: {
//     ba
//   }
// })

export default function admin(props) {
  const teachers = [
    'Caitlin Elmslie',
    'Tim Robillard',
    'Michelle D',
    'Brianna Schneider'
  ]

  let date = new Date(Date.now());
  let today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  const handleSubmit = e => {
    e.preventDefault();
    alert('clicked')
  }

  // let teacherSelects = .join('');
  return (
    <>
      <h1>ADMIN PAGE</h1>
      <h5>Create a Class</h5>
      <NewClassForm />

    </>
  )
}
