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
            deviceId: '0x00124b00191684a1',
            name: 'Temperatura',
            value: null,
            type: 0,
          },
        ],
        ['0x00124b0018c857e8',
          {
            deviceId: '0x00124b0018c857e8',
            name: 'Presença',
            value: null,
            type: 1,
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
        sensorData.value = deviceData.temperature;
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

  render() {
    const { sensors } = this.state;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="left" spacing={2}>
            {[...sensors.values()].map((value) => (
              <Grid key={value[1]} item>
                <SensorCard
                  sensor={value}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
