/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import {
  useFormik,
} from 'formik';
import {
  Grid, makeStyles, Card, Typography, CardContent, CardMedia, Button, TextField,
} from '@material-ui/core';
import Axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import loginBanner from '../assets/img/login.png';
import { url } from '../config/variables';
import { useAuth } from '../helpers/auth/auth';

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    padding: theme.spacing(3),
    height: '100vh',
    background: 'radial-gradient(#ffff 10%, #85c7f2 80%)',
  },
  cardContainer: {
    margin: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: theme.spacing(40),
    minHeight: theme.spacing(50),
  },
  media: {
    margin: 'auto',
    minHeight: 100,
    minWidth: 100,
  },
}));

function Login() {
  const history = useHistory();
  const classes = useStyles();
  const { authTokens, setAuthTokens } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      Axios.post(`${url}users/login`, values).then((res) => {
        if (res.status === 200) { setAuthTokens(res.data.token); history.push('/'); }
      });
    },
  });
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.loginContainer}
      >

        <Card
          className={classes.cardContainer}
          elevation={3}
        >
          <CardMedia
            className={classes.media}
            image={loginBanner}
            title="Login"
          />
          <CardContent>

            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={6}
              >

                <Grid item>
                  <TextField
                    id="username"
                    label="Nome de Usuário"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="password"
                    label="Senha"
                    variant="outlined"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </Grid>
                <Button type="submit" variant="contained">Entrar</Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default Login;
