import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import amazonService from '../../utils/amazon';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

export default function NewClassForm() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    className: '',
    description: '',
    instructor: '',
    dueDate: '',
    file: ''
  });
  const [message, setMessage] = useState('');

  const instructors = [
    'Caitlin Elmslie',
    'Tim Robillard',
    'Michelle D',
    'Brianna Schneider'
  ]

  const handleChange = e => {
    if (e.target.name === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
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
      let answer = await amazonService.uploadAndCreateDanceClass(formData)
      setMessage(`New ${answer.danceClass.name} Class Created!`)
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }
  return (
    <>
      <p className="red-text">{message}</p>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField required label="Name" variant="outlined" name="className" onChange={handleChange} />
        <TextField required label="Description" variant="outlined" name="description" onChange={handleChange} />
      </form>
      <form className={classes.container} noValidate onSubmit={handleSubmit}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="instructor-select">Instructor</InputLabel>
          <Select
            labelId="instructor-select"
            value={formData.instructor}
            name='instructor'
            onChange={handleChange}
            label="Instructor"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {instructors.map(instructor => <MenuItem value={instructor}>{instructor}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          id="datetime-local"
          label="Due Date"
          type="datetime-local"
          variant="outlined"
          defaultValue={Date.now()}
          className={classes.textField}
          name="dueDate"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <input type="file" name="file" onChange={handleChange} />
        <Button type="submit" >Submit</Button>
      </form>
    </>
  )
}
