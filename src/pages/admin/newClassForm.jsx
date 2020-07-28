import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  const [instructor, setInstructor] = useState('');

  const instructors = [
    'Caitlin Elmslie',
    'Tim Robillard',
    'Michelle D',
    'Brianna Schneider'
  ]

  const handleChange = e => {
    setInstructor(e.target.value)
  }
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField required label="Name" variant="outlined" />
        <TextField required label="Description" variant="outlined" />
      </form>
      <form className={classes.container} noValidate >
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="instructor-select">Instructor</InputLabel>
          <Select
            labelId="instructor-select"
            value={instructor}
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
          defaultValue="2017-05-24T10:30"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </>
  )
}
