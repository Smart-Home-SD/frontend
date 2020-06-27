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
  Tooltip, Fab, makeStyles, TextField, Grid, Select, InputLabel, Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik';

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
  } else if (values.deviceId.length < 5) {
    errors.deviceId = 'O usuário deve ter pelo menos 5 caracteres';
  }

  if (values.type === undefined || values.type == null) {
    errors.type = 'Requerido';
  }

  return errors;
};

export default function UpdateSensor(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const { sensor, handleClose, open } = props;
  const formik = useFormik({
    initialValues: {
      name: sensor.name,
      deviceId: sensor.deviceId,
      owner: sensor.owner,
      type: sensor.type,
      _id: sensor._id,
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      handleClose();
    },
  });

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        scroll="body"
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Editar Sensor</DialogTitle>
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
                    <option aria-label="None" value="" />
                    <option value={0}>Temperatura</option>
                    <option value={1}>Presença</option>
                  </Select>

                </Grid>
              </Grid>
            </div>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary" autoFocus>
                Salvar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

UpdateSensor.propTypes = {
  sensor: {
    deviceId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string,
    type: PropTypes.string.isRequired,
    _id: PropTypes.string,
  }.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
