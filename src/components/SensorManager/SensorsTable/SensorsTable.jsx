import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FaTemperatureLow, FaRunning, FaRegTrashAlt } from 'react-icons/fa';
import fetch from 'node-fetch';
import UpdateSensor from '../UpdateSensor/UpdateSensor';
import { apiPath } from '../../../helpers/path/urlPaths';

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
  sensorIcon: {
    fontSize: '220%',
  },
});

// const rows = [
//   createData('Temperatura', '0x0001234567', 0),
//   createData('Presença', '0x0001234568', 1),

// ];

export default function SensorsTable() {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [sensor, setSensor] = React.useState(rows[0]);
  const classes = useStyles();

  const fetchSensors = async () => {
    try {
      const response = await fetch(`${apiPath}/sensors/`, { method: 'GET' });
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setRows(jsonResponse);
      } else {
        console.log(jsonResponse);
        setRows([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchSensors();
  });

  const handleClickOpen = (row) => {
    console.log(row);
    setSensor(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = async (sensor) => {
    try {
      const response = await fetch(`${apiPath}/sensors/delete/${sensor._id}`, { method: 'DELETE' });
      const jsonResponse = await response.json();
      window.location.reload();
    } catch (error) {
      console.log(error);
      window.alert('Não foi possível remover');
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="sensors table">
        <TableHead>
          <TableRow>
            <TableCell>Sensor</TableCell>
            <TableCell>Serial Number</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows.length) ? rows.map((row) => (
            <TableRow key={row.name}>
              {/* <TableCell component="th" scope="row" onClick={() => handleClickOpen(row)}> */}
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {/* <TableCell component="th" scope="row" onClick={() => handleClickOpen(row)}> */}
              <TableCell component="th" scope="row">
                {row.deviceId}
              </TableCell>
              {/* <TableCell align="right" onClick={() => handleClickOpen(row)}> */}
              <TableCell align="right">
                {row.type === 'TEMP'
                  ? <FaTemperatureLow className={classes.sensorIcon} color="steelblue" />
                  : <FaRunning className={classes.sensorIcon} color="lightsalmon" />}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleRemove(row)}>
                  <FaRegTrashAlt fontSize="90%" color="#ee0000" />
                </IconButton>
              </TableCell>
            </TableRow>
          )) : ''}
          {/* <UpdateSensor
            sensor={sensor}
            handleClose={() => handleClose()}
            open={open}
          /> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
