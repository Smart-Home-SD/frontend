import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from  'formik';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FaTemperatureLow, FaRunning } from 'react-icons/fa';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  let sensor;
  sensor = props.sensor;

  const formik = useFormik({
    initialValues: {
      deviceId: sensor.deviceId,
      name: sensor.name,
      type: sensor.type,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleRemove = () => {
    console.log('remove');
    console.log(sensor.deviceId);
    return handleClose();
  };

  const handleSave = () => {
    console.log('save');
    console.log(JSON.stringify(sensor));
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
          {(sensor.type === 0)
            ? <TemperatureSensor />
            : <MotionSensor />}
          <form noValidate autoComplete="off" onSubmit={formik.onSubmit}>
            <div>
              <TextField
                disabled
                id="outlined-disabled"
                label="Número de Série"
                value={formik.values.deviceId}
                variant="outlined"
                className={classes.textField}
                onChange={formik.handleChange}
              />
              <TextField
                id="outlined-required"
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
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                // onClick={handleSave}
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
