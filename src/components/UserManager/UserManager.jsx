import React from 'react';
import { Grid } from '@material-ui/core';
import UsersTable from './UsersTable/UsersTable';
import CreateUser from './CreateUser/CreateUser';

export default function UserManager() {
  // const theme = useTheme();
  // const mobileMatcher = useMediaQuery(theme.breakpoints.down('sm'));
  // const classes = useStyles();

  return (
    <div>
      {/* {!mobileMatcher && <UsersTable />} */}
      <Grid item xs={12}>
        <UsersTable />
      </Grid>
      <CreateUser />
    </div>
  );
}
