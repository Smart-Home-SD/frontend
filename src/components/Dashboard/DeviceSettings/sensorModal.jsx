import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FaTemperatureLow, FaRunning } from 'react-icons/fa';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import fetch from 'node-fetch';
import { apiPath } from '../../../helpers/path/urlPaths';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '15px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: '0',
  },
  h4: {
    fontWeight: 'bold',
  },
  deviceType: {
    display: 'flex',
    paddingTop: '5%',
  },
  sensorIcon: {
    fontSize: 'xx-large',
    marginRight: '3%',
  },
  textField: {
    width: '100%',
    marginTop: '6%',
  },
  button: {
    marginTop: '5%',
    marginRight: '3%',
  },
}));

function TemperatureSensor() {
  const classes = useStyles();

  return (
    <div className={classes.deviceType}>
      <FaTemperatureLow className={classes.sensorIcon} color="steelblue" />
      <Typography variant="h6" className={classes.h4}>
        Sensor de Temperatura
      </Typography>
    </div>
  );
}

function MotionSensor() {
  const classes = useStyles();

  return (
    <div className={classes.deviceType}>
      <FaRunning className={classes.sensorIcon} color="lightsalmon" />
      <Typography variant="h6" className={classes.h4}>
        Sensor de Presença
      </Typography>
    </div>
  );
}

export default function SensorModal(props) {
  const classes = useStyles();
  const { open, handleClose } = props;
  const { sensor } = props;

  const formik = useFormik({
    initialValues: {
      deviceId: sensor.deviceId,
      name: sensor.name,
      owner: sensor.owner,
      type: sensor.type,
      id: sensor._id,
    },
  });

  const handleRemove = async () => {
    try {
      const response = await fetch(`${apiPath}/sensors/delete/${sensor._id}`, { method: 'DELETE' });
      const jsonResponse = await response.json();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    return handleClose();
  };

  const handleSave = async (values) => {
    try {
      const response = await fetch(`${apiPath}/sensors/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.message === 'sensor updated!') {
        window.location.reload();
      } else {
        window.alert('Não foi possível salvar');
      }
    } catch (error) {
      console.log(error);
      window.alert('Não foi possível salvar');
    }
    return handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disablePortal
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography className={classes.h4} variant="h4" component="h4">
            Editar Dispositivo
          </Typography>
          {(sensor.type === 'TEMP')
            ? <TemperatureSensor />
            : <MotionSensor />}
          <form noValidate autoComplete="off" onSubmit={formik.onSubmit}>
            <div>
              <TextField
                disabled
                id="deviceId"
                label="Número de Série"
                value={formik.values.deviceId}
                variant="outlined"
                className={classes.textField}
                onChange={formik.handleChange}
              />
              <TextField
                id="name"
                label="Name"
                value={formik.values.name}
                variant="outlined"
                className={classes.textField}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => handleClose()}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleRemove}
              >
                Remover
              </Button>
              <Button
                // type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleSave(formik.values)}
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

SensorModal.propTypes = {
  sensor: {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
