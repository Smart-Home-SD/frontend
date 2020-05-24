import React from 'react';
import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
import SensorCard from './SensorCard/sensorCard';
import MotionCard from './SensorCard/motionCard';
import { webSocketPath } from '../../helpers/path/urlPaths';

// const useStyles = makeStyles({
//   root: {
//     display: 'flex',
//     flexGrow: 1,
//   },
// });

// const classes = useStyles();

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensors: new Map([
        ['0x00124b00191684a1',
          {
            deviceId: '0x00124b00191684a1',
            name: 'Temperatura',
            temp: null,
            humidity: '66.5',
            type: 0,
          },
        ],
        ['0x00124b0018c857e8',
          {
            deviceId: '0x00124b0018c857e8',
            name: 'Presença',
            onOff: null,
            type: 1,
          },
        ],
      ]),
      open: false,
    };
  }

  componentDidMount() {
    this.connectSocket();
  }

  async connectSocket() {
    console.log(webSocketPath);
    const ws = new WebSocket(webSocketPath);
    const self = this;
    ws.onopen = function wsOpen() {
      console.log('websocket connected');
    };

    ws.onmessage = function wsData(device) {
      try {
        const deviceData = device && device.data && JSON.parse(device.data);
        if (deviceData) {
          self.updateSensorData(deviceData);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }

  updateSensorData(deviceData) {
    const { sensors } = this.state;
    const sensorData = deviceData.deviceId && sensors.get(deviceData.deviceId);
    if (sensorData) {
      if (deviceData.temperature !== undefined && deviceData.temperature != null) {
        sensorData.temp = deviceData.temperature;
      }
      if (deviceData.humidity !== undefined && deviceData.humidity != null) {
        sensorData.humidity = deviceData.humidity;
      }
      if (deviceData.onOff !== undefined && deviceData.onOff != null) {
        sensorData.onOff = deviceData.onOff;
      }
      sensors.set(deviceData.deviceId, sensorData);
    }

    this.setState({ sensors });
  }

  handleOpen() {
    this.setState({ open: true });
    console.log(this.state.open);
  }

  handleClose() {
    this.setState({ open: false });
    console.log(this.state.open);
  }

  render() {
    const { sensors, open } = this.state;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="left" spacing={2}>
            {[...sensors.values()].map((value) => ((value.type === 0) ? (
              <Grid key={value[1]} item>
                <SensorCard
                  sensor={value}
                  handleOpen={() => this.handleOpen()}
                  handleClose={() => this.handleClose()}
                  open={open}
                />
              </Grid>
            ) : (
              <Grid key={value[1]} item>
                <MotionCard sensor={value} />
              </Grid>
            )))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
