import React from 'react';
import { Grid } from '@material-ui/core';
import SensorsTable from './SensorsTable/SensorsTable';
import CreateSensor from './CreateSensor/CreateSensor';

export default function SensorManager() {
  return (
    <div>
      {/* {!mobileMatcher && <UsersTable />} */}
      <Grid item xs={12}>
        <SensorsTable />
      </Grid>
      <CreateSensor />
    </div>
  );
}
