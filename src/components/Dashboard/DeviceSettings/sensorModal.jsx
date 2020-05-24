import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FaTemperatureLow } from 'react-icons/fa';
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
    color: 'steelblue',
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

export default function SensorModal(props) {
  const classes = useStyles();
  const { open, handleClose, sensor } = props;

  const handleRemove = () => {
    console.log('remove');
    return handleClose();
  };

  const handleSave = () => {
    console.log('save');
    return handleClose();
  };

  return (
    <div>
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
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography className={classes.h4} variant="h4" component="h4">
              Editar Dispositivo
            </Typography>
            <div className={classes.deviceType}>
              <FaTemperatureLow className={classes.sensorIcon} />
              <Typography variant="h6" className={classes.h4}>
                Sensor de Temperatura
              </Typography>
            </div>
            <div>
              <TextField
                disabled
                id="outlined-disabled"
                label="Número de Série"
                defaultValue={sensor.deviceId}
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-text"
                label="Name"
                defaultValue={sensor.name}
                variant="outlined"
                className={classes.textField}
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
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSave}
              >
                Salvar
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

SensorModal.propTypes = {
  sensor: {
    name: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
  }.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
