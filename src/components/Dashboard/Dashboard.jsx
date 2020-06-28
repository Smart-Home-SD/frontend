import React from 'react';
import Grid from '@material-ui/core/Grid';
import fetch from 'node-fetch';
import moment from 'moment';
import SensorCard from './SensorCard/sensorCard';
import HistoryChart from './HistoryChart';
import { apiPath, webSocketPath } from '../../helpers/path/urlPaths';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensors: new Map(),
      sensorSelected: 1,
      dataArray: [],
    };
  }

  componentDidMount() {
    this.getSensors();
    this.getSensorDatas();
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

  async getSensorDatas() {
    const { sensorSelected } = this.state;
    const dataArray = [];
    try {
      const response = await fetch(`${apiPath}/sensorData/history/${sensorSelected}`, { method: 'GET' });
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse.array)) {
        const { array } = jsonResponse;
        array.forEach((data) => {
          if (data.time != null && data.average != null) {
            const time = moment(data.time).format('HH:mm');
            const sensorData = {
              argument: time,
              value: data.average,
            };
            dataArray.push(sensorData);
          }
        });
        this.setState({ dataArray });
      } else {
        console.log(jsonResponse);
        // window.alert('Nenhum sensor encontrado');
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
    const { sensors, dataArray } = this.state;
    return (
      <div>
        <div>
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
        </div>
        <HistoryChart name="Temperatura" data={dataArray} />
      </div>
    );
  }
}

export default Dashboard;
