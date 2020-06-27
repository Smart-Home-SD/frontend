import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FaTemperatureLow, FaRunning } from 'react-icons/fa';
import SensorModal from '../DeviceSettings/sensorModal';

const useStyles = makeStyles({
  root: {
    margin: '1%',
    minWidth: '160px',
    width: '100%',
    height: '100%',
    borderRadius: '15%',
    borderBottomWidth: '7px',
    backgroundColor: '#fdfdfd',
  },
  rootOffline: {
    margin: '1%',
    width: '100%',
    minWidth: '160px',
    height: '100%',
    borderRadius: '15%',
    borderBottomWidth: '7px',
    backgroundColor: '#e3e3e3',
  },
  temperature: {
    borderBottomColor: 'steelblue',
  },
  motion: {
    borderBottomColor: 'lightsalmon',
  },
  content: {
    display: 'flex',
    paddingTop: '1%',
  },
  sensorIcon: {
    fontSize: '280%',
    marginRight: '15%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '1rem',
  },
  pos: {
    marginBottom: 12,
  },
  h6: {
    fontSize: 14,
  },
});

function TemperatureContent(props) {
  const { sensor } = props;
  const classes = useStyles();

  return (
    <CardContent className={classes.content}>
      <FaTemperatureLow className={classes.sensorIcon} color="steelblue" />
      <Typography variant="body1">
        {(sensor.value != null) ? `${sensor.value} °C` : ''}
        {/* <br />
          {(sensor.temp != null) ? `${sensor.humidity} %` : ''} */}
      </Typography>
    </CardContent>
  );
}

function MotionContent(props) {
  const { sensor } = props;
  const classes = useStyles();

  return (
    <CardContent className={classes.content}>
      <FaRunning className={classes.sensorIcon} color="lightsalmon" />
      <Typography variant="body1">
        {(sensor.value == null) ? '' : (sensor.value) ? 'Presente' : 'Ausente'}
      </Typography>
    </CardContent>
  );
}

function SensorCard(props) {
  const { sensor } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const sensorClasses = [
    (sensor.value != null && sensor.value !== 0) ? classes.root : classes.rootOffline,
    (sensor.type === 'TEMP') ? classes.temperature : classes.motion,
  ];

  const handleOpen = () => {
    setOpen(true);
    console.log(open);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };
  // className={(sensor.temp != null) ? classes.root : classes.rootOffline}
  return (
    <Card className={sensorClasses} variant="outlined">
      <CardHeader
        classes={{ title: classes.title }}
        action={(
          <IconButton
            aria-label="settings"
            onClick={() => handleOpen()}
          >
            <MoreVertIcon />
          </IconButton>
        )}
        title={sensor.name}
      />
      <SensorModal
        handleClose={() => handleClose()}
        open={open}
        sensor={sensor}
      />
      {sensor.type === 'TEMP'
        ? <TemperatureContent sensor={sensor} />
        : <MotionContent sensor={sensor} />}
    </Card>
  );
}

SensorCard.propTypes = {
  sensor: {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }.isRequired,
};

TemperatureContent.propTypes = {
  sensor: {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }.isRequired,
};

MotionContent.propTypes = {
  sensor: {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }.isRequired,
};

export default SensorCard;
