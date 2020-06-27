import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { Select, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  select: {
    margin: theme.spacing(1),
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      accessLevel: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <div>
        <Grid container>
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <TextField
              required
              id="outlined-required"
              label="Username"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12}>

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              value={formik.values.password}
              autoComplete="current-password"
              variant="outlined"
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={12} md={12} sm={12}>

            <Select
              id="outlined-accessLevel-input"
              native
              className={classes.select}
              value={formik.values.accessLevel}
              variant="outlined"
              onChange={formik.handleChange}
            >
              <option value="ADMIN">Admin</option>
              <option value="USER">Usuário comum</option>
            </Select>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}
