import React from 'react';
import { Grid } from '@material-ui/core';
import fetch from 'node-fetch';
import SensorsTable from './SensorsTable/SensorsTable';
import CreateSensor from './CreateSensor/CreateSensor';
import { apiPath } from '../../helpers/path/urlPaths';

export default function SensorManager() {
  const [users, setUsers] = React.useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiPath}/users/`, { method: 'GET' });
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setUsers(jsonResponse);
      } else {
        console.log(jsonResponse);
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  });

  return (
    <div>
      {/* {!mobileMatcher && <UsersTable />} */}
      <Grid item xs={12}>
        <SensorsTable />
      </Grid>
      <CreateSensor users={users} />
    </div>
  );
}
