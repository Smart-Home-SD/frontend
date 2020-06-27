import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Switch, Typography } from '@material-ui/core';
import Axios from 'axios';
import { url } from '../../../config/variables';
import EditUser from '../EditUser/EditUser';
// import MaterialTableIcons from './MaterialTableIcons';

const useStyles = makeStyles({
  table: {
    minWidth: 70,
  },
  tableControlers: {
    padding: '0px 10px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});


const data = [
  { name: 'Leo', accessLevel: 'Admin' },
  { name: 'Felipe', accessLevel: 'Admin' },
  { name: 'Marcel', accessLevel: 'Admin' },
  { name: 'Fred', accessLevel: 'Admin' },
  { name: 'Breno', accessLevel: 'Admin' },
];

export default function UsersTable() {
  const classes = useStyles();
  const [filterOn, setfilterOn] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    Axios.get(`${url}users/`).then((res) => {
      console.log(res.data);
      setUsers(res.data);
      console.log('asdasd');
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <EditUser username="breno" userType="ADMIN" />
      <MaterialTable
        // icons={MaterialTableIcons}
        title="Gerenciador de Usuários"
        columns={[
          { title: 'Username', field: 'username' },
          { title: 'Permissão', field: 'userType' },
        ]}
        options={{
          filtering: filterOn,
          actionsColumnIndex: -1,
        }}
        data={users}
        localization={{
          pagination: {
            labelDisplayedRows: '{from}-{to} de {count}',
            labelRowsSelect: 'linhas',
          },
          toolbar: {
            nRowsSelected: '{0} Linha(s) selecionada(s)',
          },
          header: {
            actions: 'Ações',
          },
          body: {
            emptyDataSourceMessage: 'Sem dados',
            filterRow: {
              filterTooltip: 'Filtro',
            },
          },
        }}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div className={classes.tableControlers}>
                <Typography>
                  Mostrar Filtros
                </Typography>
                <Switch
                  checked={filterOn}
                  onChange={(e) => setfilterOn(e.target.checked)}
                  color="primary"
                  name="Show Filters"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </div>
            </div>
          ),
        }}
        actions={[
          {
            icon: EditIcon,
            tooltip: 'Editar Usuário',
            onClick: (event, rowData) => console.log('asds'),
          },
          {
            icon: DeleteIcon,
            tooltip: 'Deletar Usuário',
            onClick: (event, rowData) => Axios.delete(`${url}users/delete/${rowData._id}`).then((res) => (res.status === 200 && window.location.reload()) || (res.status !== 200 && window.alert('Não foi possivel deletar'))),
          },
        ]}
      />
    </div>
  );
}
