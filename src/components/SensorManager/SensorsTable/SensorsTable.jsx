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
import UpdateSensor from '../UpdateSensor/UpdateSensor';

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
  sensorIcon: {
    fontSize: '220%',
  },
});

function createData(name, deviceId, type) {
  return {
    name, deviceId, type,
  };
}

const rows = [
  createData('Temperatura', '0x0001234567', 0),
  createData('Presença', '0x0001234568', 1),

];

export default function SensorsTable() {
  const [open, setOpen] = React.useState(false);
  const [sensor, setSensor] = React.useState(rows[0]);
  const classes = useStyles();

  const handleClickOpen = (row) => {
    setSensor(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = (sensor) => {
    alert(sensor.deviceId);
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" onClick={() => handleClickOpen(row)}>
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row" onClick={() => handleClickOpen(row)}>
                {row.deviceId}
              </TableCell>
              <TableCell align="right" onClick={() => handleClickOpen(row)}>
                {row.type === 0
                  ? <FaTemperatureLow className={classes.sensorIcon} color="steelblue" />
                  : <FaRunning className={classes.sensorIcon} color="lightsalmon" />}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleRemove(row)} >
                  <FaRegTrashAlt fontSize="90%" color="#ee0000" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        <UpdateSensor
          sensor={sensor}
          handleClose={() => handleClose()}
          open={open}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
