import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import moment from 'moment';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});
const columns = [
  { field: 'Formato', headerName: 'Administradora' },
  { field: 'AuthorizationCode', headerName: 'Autorizacion' },
  { field: 'CreditCardNumber', headerName: 'Tarjeta' },
  { field: 'PaymentAmmount', headerName: 'Monto' },
];


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#9E9E9E',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Concilliation = ({ data = [] }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;    
  }, []);

//<BasicTable tableName={""}  data={dataWithId} columns={((data.NameComercio != undefined && data.NameComercio != '') ? columnsComercioNombre:columnsComercio)} />
  return ( <>
            <BasicTable tableName={"Conciliacion"}  data={dataWithId} columns={columns} />
            
            <TableContainer component={Paper}>
              <Table className={useStyles.table} size="small" aria-label="customized table">
                <TableHead className={useStyles.head}>
                  <TableRow>
                    <StyledTableCell>Fecha de Tx</StyledTableCell>
                    <StyledTableCell>Nro. Comercio</StyledTableCell>
                    <StyledTableCell>Nombre de Comercio</StyledTableCell>
                    <StyledTableCell>Lote</StyledTableCell>                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataWithId.map((row) => (
                    <TableRow>                      
                      <TableCell>{moment(row.PaymentDate, 'YYYY-MM-DD').format('DD/MM/YYYY',)}</TableCell>
                      <TableCell>{row.EstablishmentCode}</TableCell>
                      <TableCell>{((row.NameComercio != undefined && row.NameComercio != null && row.NameComercio != '') ? row.NameComercio : (row.EstablishmentCode))}</TableCell>
                      <TableCell>{row.LotNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>


          </>
         );
};

export default Concilliation;
