import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  Tooltip, Fab, makeStyles, TextField, Grid, Select, InputLabel,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik';
import Axios from 'axios';
import { url } from '../../../config/variables';

const useStyles = makeStyles((theme) => ({

  actionIcon: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
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

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Requerido';
  } else if (values.username.length > 5) {
    errors.username = 'O usuário deve ter pelo menos 5 caracteres';
  }

  if (!values.password) {
    errors.password = 'Requerido';
  } else if (values.password.length > 5) {
    errors.password = 'O usuário deve ter pelo menos 5 caracteres';
  }

  if (!values.userType) {
    errors.userType = 'Requerido';
  }

  return errors;
};

export default function CrateUser() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      userType: '',
    },
    // validate,
    onSubmit: (values) => {
      Axios.post(`${url}users/`, values).then((res) => {
        if (res.status !== 200) {
          window.alert('Erro ao adicionar');
        } else {
          window.location.reload();
        }
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formik.handleReset();
    setOpen(false);
  };
  return (
    <div>
      <div className={classes.actionIcon}>
        <Tooltip title="Criar Usuário" aria-label="add">
          <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        scroll="body"
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Criar Novo usuário</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <div>
              <Grid container>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <TextField
                    required
                    error={formik.touched.username && formik.errors.username}
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>

                  <TextField
                    required
                    error={formik.touched.password && formik.errors.password}
                    id="password"
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
                    id="userType"
                    native
                    error={formik.touched.userType && formik.errors.userType}
                    required
                    className={classes.select}
                    value={formik.values.userType}
                    labelId="accessLvl"
                    variant="outlined"
                    onChange={formik.handleChange}
                    label="Tipo de Usuário"
                  >
                    <option aria-label="None" value="" />
                    <option value="ADMIN">Admin</option>
                    <option value="USER">Usuário comum</option>
                  </Select>

                </Grid>
              </Grid>
            </div>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary" autoFocus>
                Criar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
