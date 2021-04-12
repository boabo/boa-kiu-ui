import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BasicTable from '../../../../_pxp/components/BasicTable';

const TableCellChanged = withStyles({
  root: {
    fontSize: '12px',
  },
})(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const columns = [
  { field: 'taxCode', headerName: 'Codigo' },
  { field: 'reference', headerName: 'Ref.' },
  { field: 'taxAmount', headerName: 'Importe' },
];

const Taxes = ({ data }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    console.log('lastValue', lastValue);
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return <BasicTable tableName={"Impuestos"} columns={columns} data={dataWithId} />;
};

export default Taxes;
