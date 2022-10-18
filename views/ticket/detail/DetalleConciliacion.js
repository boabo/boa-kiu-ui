import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const columns = [
  { field: 'AuthorizationNumber', headerName: 'Authorization Number' },
  { field: 'ConcilliationObservations', headerName: 'Concilliation Observations' },
  { field: 'Currency', headerName: 'Currency' },
  { field: 'DocumentAmount', headerName: 'Document Amount' },
  { field: 'DocumentNumber', headerName: 'Document Number' },
  { field: 'DocumentType', headerName: 'Document Type' },
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
