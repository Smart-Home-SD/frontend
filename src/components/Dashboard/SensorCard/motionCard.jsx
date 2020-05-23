import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FaRunning } from 'react-icons/fa';

const useStyles = makeStyles({
  root: {
    margin: '1%',
    width: '100%',
    minWidth: '160px',
    height: '100%',
    borderRadius: '15%',
    borderBottomWidth: '7px',
    borderBottomColor: 'lightsalmon',
    backgroundColor: '#fdfdfd',
  },
  rootOffline: {
    margin: '1%',
    width: '100%',
    minWidth: '160px',
    height: '100%',
    borderRadius: '15%',
    borderBottomWidth: '7px',
    borderBottomColor: 'lightsalmon',
    backgroundColor: '#e3e3e3',
  },
  content: {
    display: 'flex',
    paddingTop: '1%',
  },
  sensorIcon: {
    fontSize: '280%',
    marginRight: '15%',
    color: 'lightsalmon',
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

function MotionCard(props) {
  const { sensor } = props;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={(sensor.onOff) ? classes.root : classes.rootOffline} variant="outlined">
      <CardHeader
        classes={{ title: classes.title }}
        action={(
          <IconButton aria-label="settings">
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
        <FaRunning className={classes.sensorIcon} />
        <Typography variant="body1">
          {(sensor.onOff) ? 'Presente' : 'Ausente'}
        </Typography>
      </CardContent>
    </Card>
  );
}

MotionCard.propTypes = {
  sensor: {
    name: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
  }.isRequired,
};

export default MotionCard;
