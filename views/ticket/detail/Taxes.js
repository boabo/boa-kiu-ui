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
import TaxesTable from "../components/TaxesTable";
import useJsonStore from "../../../../_pxp/hooks/useJsonStore";

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
  { field: 'correctTax', headerName: 'Correcto' },
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

  const { state, set, data: dataTaxes, loading } = useJsonStore({
    url: 'boakiu/Taxes/getTaxCode',
    params: {
      nro_ticket: '',
    },
    load: true,
  });

  return (
    <>
      {dataTaxes && (<TaxesTable tableName={"Impuestos"} columns={columns} data={dataWithId} dataTaxes={dataTaxes} />)}
    </>
  );
};

export default Taxes;
