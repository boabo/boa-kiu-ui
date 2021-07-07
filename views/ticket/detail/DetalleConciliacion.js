import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const columns = [
  { field: 'IssueDate', headerName: 'Fecha Emisión' },
  { field: 'PnrCode', headerName: 'PNR' },
  { field: 'TicketNumber', headerName: 'Nro. Boleto' },
  { field: 'OriginCity', headerName: 'Origen' },
  { field: 'DestinationCity', headerName: 'Destino' },
  { field: 'Transaction', headerName: 'Transacción' },
];


const DetalleConciliacion = ({ dataTarjeta = [] }) => {
  const dataWithId = dataTarjeta.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return <BasicTable tableName={""} data={dataWithId} columns={columns} />;

};

export default DetalleConciliacion;
