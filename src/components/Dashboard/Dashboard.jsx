import React from 'react';
import Grid from '@material-ui/core/Grid';
import fetch from 'node-fetch';
// import { makeStyles } from '@material-ui/core/styles';
import SensorCard from './SensorCard/sensorCard';
import { apiPath, webSocketPath } from '../../helpers/path/urlPaths';

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
      sensors: new Map(),
    };
  }

  componentDidMount() {
    this.getSensors();
    this.connectSocket();
  }

  async getSensors() {
    const { sensors } = this.state;
    sensors.clear();
    try {
      const response = await fetch(`${apiPath}/sensors/`, { method: 'GET' });
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        jsonResponse.forEach((sensor) => {
          const sensorData = {
            ...sensor,
            value: null,
          };
          if (!sensors.has(sensor.deviceId)) {
            sensors.set(sensor.deviceId, sensorData);
          }
        });
        this.setState(sensors);
      } else {
        console.log(jsonResponse);
        this.setState(sensors);
        window.alert('Nenhum sensor encontrado');
      }
    } catch (error) {
      console.log(error);
    }
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
    const sensorData = deviceData.id && sensors.get(deviceData.id);
    if (sensorData) {
      if (deviceData.temperature !== undefined && deviceData.temperature != null) {
        sensorData.value = deviceData.temperature.toFixed(2);
      }
      if (deviceData.active !== undefined && deviceData.active != null) {
        sensorData.value = deviceData.active;
      }
      sensors.set(deviceData.id, sensorData);
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
