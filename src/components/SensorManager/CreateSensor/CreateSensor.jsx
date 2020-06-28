import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  Tooltip, Fab, makeStyles, TextField, Grid, Select,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik';
import fetch from 'node-fetch';
import { apiPath } from '../../../helpers/path/urlPaths';

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
  if (!values.name) {
    errors.name = 'Requerido';
  } else if (values.name.length < 5) {
    errors.name = 'O nome deve ter pelo menos 5 caracteres';
  }

  if (!values.deviceId) {
    errors.deviceId = 'Requerido';
  }

  if (!values.type) {
    errors.type = 'Requerido';
  }

  return errors;
};

async function handleSubmit(sensor) {
  try {
    const response = await fetch(`${apiPath}/sensors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sensor),
    });
    const jsonResponse = await response.json();
    return jsonResponse.Status;
  } catch (error) {
    console.log(error);
  }
}

export default function CrateSensor(props) {
  const { users } = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: '',
      deviceId: '',
      owner: 'Owner',
      type: 'Tipo',
    },
    validate,
    onSubmit: async (values) => {
      const status = await handleSubmit(values);
      if (status === true) {
        setOpen(false);
      } else {
        console.log(status);
        alert('Não foi possível inserir. Verifique se este sensor já não foi inserido!');
      }
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formik.handleReset();
    setOpen(false);
  };
  console.log(users);
  return (
    <div>
      <div className={classes.actionIcon}>
        <Tooltip title="Criar Sensor" aria-label="add">
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
        <DialogTitle id="responsive-dialog-title">Criar Novo Sensor</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <div>
              <Grid container>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <TextField
                    required
                    error={formik.touched.name && formik.errors.name}
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>

                  <TextField
                    required
                    error={formik.touched.deviceId && formik.errors.deviceId}
                    id="deviceId"
                    label="Serial Number"
                    type="deviceId"
                    value={formik.values.deviceId}
                    autoComplete="current-deviceId"
                    variant="outlined"
                    onChange={formik.handleChange}
                  />

                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <Select
                    id="type"
                    native
                    error={formik.touched.type && formik.errors.type}
                    required
                    className={classes.select}
                    value={formik.values.type}
                    variant="outlined"
                    onChange={formik.handleChange}
                    label="Tipo de Sensor"
                  >
                    <option value="" label="Selecione o Tipo" />
                    <option value="TEMP">Temperatura</option>
                    <option value="PRES">Presença</option>
                  </Select>

                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  <Select
                    id="owner"
                    native
                    error={formik.touched.owner && formik.errors.owner}
                    required
                    className={classes.select}
                    value={formik.values.owner}
                    variant="outlined"
                    onChange={formik.handleChange}
                    label="Owner"
                  >
                    <option value="" label="Selecione o Usuario" />
                    {(users && users.length)
                      ? users.map((user) => <option value={user.username}>{user.username}</option>)
                      : <option value="">{' '}</option>}
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

CrateSensor.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
