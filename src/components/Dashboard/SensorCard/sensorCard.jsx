import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FaTemperatureLow } from 'react-icons/fa';
import SensorModal from '../DeviceSettings/sensorModal';

const useStyles = makeStyles({
  root: {
    margin: '1%',
    minWidth: '160px',
    width: '100%',
    height: '100%',
    borderRadius: '15%',
    borderBottomWidth: '7px',
    borderBottomColor: 'steelblue',
    backgroundColor: '#fdfdfd',
  },
  rootOffline: {
    margin: '1%',
    width: '100%',
    minWidth: '160px',
    height: '100%',
    borderRadius: '15%',
    borderBottomWidth: '7px',
    borderBottomColor: 'steelblue',
    backgroundColor: '#e3e3e3',
  },
  content: {
    display: 'flex',
    paddingTop: '1%',
  },
  sensorIcon: {
    fontSize: '280%',
    marginRight: '15%',
    color: 'steelblue',
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

function SensorCard(props) {
  const {
    sensor, handleOpen, handleClose, open,
  } = props;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={(sensor.temp != null) ? classes.root : classes.rootOffline} variant="outlined">
      <CardHeader
        classes={{ title: classes.title }}
        action={(
          <IconButton
            aria-label="settings"
            onClick={handleOpen}
          >
            <SensorModal
              handleClose={() => handleClose()}
              open={open}
              sensor={sensor}
            />
            <MoreVertIcon />
          </IconButton>
        )}
        title={sensor.name}
      />
      <CardContent className={classes.content}>
        {/* <Typography variant="h5" component="h2">
          {sensor.name}
        </Typography> */}
        {/* <CardActions>
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        </CardActions> */}
        <FaTemperatureLow className={classes.sensorIcon} />
        <Typography variant="body1">
          {(sensor.temp != null) ? `${sensor.temp} °C` : ''}
          {/* <br />
          {(sensor.temp != null) ? `${sensor.humidity} %` : ''} */}
        </Typography>
      </CardContent>
    </Card>
  );
}

SensorCard.propTypes = {
  sensor: {
    name: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
  }.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SensorCard;
