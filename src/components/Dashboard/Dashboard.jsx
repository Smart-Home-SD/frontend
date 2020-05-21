import React from 'react';
import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
import SensorCard from './SensorCard/sensorCard';
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
            name: 'Sensor 1',
            temp: '23.5',
            humidity: '66.5',
          },
        ],
        ['0x00124b001916a879',
          {
            name: 'Sensor 2',
            temp: '23.5',
            humidity: '66.5',
          },
        ],
      ]),
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
      sensors.set(deviceData.deviceId, sensorData);
    }

    this.setState({ sensors });
  }

  render() {
    const { sensors } = this.state;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="left" spacing={2}>
            {[...sensors.values()].map((value) => (
              <Grid key={value[1]} item>
                <SensorCard sensor={value} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
