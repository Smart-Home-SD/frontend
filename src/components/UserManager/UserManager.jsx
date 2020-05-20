import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip, useMediaQuery, Grid } from '@material-ui/core';
import UsersTable from './UsersTable/UsersTable';

const useStyles = makeStyles((theme) => ({

  usersList: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  userTable: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  actionIcon: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));


export default function UserManager() {
  const theme = useTheme();
  const mobileMatcher = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  return (
    <div>
      {/* {!mobileMatcher && <UsersTable />} */}
      <Grid item xs={12}>
        <UsersTable />
      </Grid>
      <FloatingActionButtons />
    </div>
  );
}

function FloatingActionButtons() {
  const classes = useStyles();

  return (
    <div className={classes.actionIcon}>
      <Tooltip title="Criar Usuário" aria-label="add">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
