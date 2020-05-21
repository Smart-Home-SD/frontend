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
import SpeedOutlinedIcon from '@material-ui/icons/SpeedOutlined';

const useStyles = makeStyles({
  root: {
    margin: '1%',
    width: '100%',
    height: '100%',
    borderRadius: '15%',
    borderBottomWidth: '7px',
    borderBottomColor: 'steelblue',
  },
  content: {
    display: 'flex',
    paddingTop: '1%',
  },
  sensorIcon: {
    fontSize: 'xxx-large',
    marginRight: '15%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  h6: {
    fontSize: 14,
  },
});

function SensorCard(props) {
  const { sensor } = props;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
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
        <SpeedOutlinedIcon className={classes.sensorIcon} />
        <Typography variant="body1">
          {`${sensor.temp} °C`}
          <br />
          {`${sensor.humidity} %`}
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
};

export default SensorCard;
