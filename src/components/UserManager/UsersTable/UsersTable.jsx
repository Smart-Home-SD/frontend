import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Switch, Typography } from '@material-ui/core';
import MaterialTableIcons from './MaterialTableIcons';

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
  return (
    <div>
      <MaterialTable
        icons={MaterialTableIcons}
        title="Gerenciador de Usuários"
        columns={[
          { title: 'Username', field: 'name' },
          { title: 'Permissão', field: 'accessLevel' },
        ]}
        options={{
          filtering: filterOn,
          actionsColumnIndex: -1,
        }}
        data={data}
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
            onClick: (event, rowData) => window.alert(`You saved ${rowData.name}`),
          },
          {
            icon: DeleteIcon,
            tooltip: 'Deletar Usuário',
            onClick: (event, rowData) => window.confirm(`You want to delete ${rowData.name}`),
          },
        ]}
      />
    </div>
  );
}
