import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const columns = [
  { field: 'nro_liquidacion', headerName: 'Nro. de Liquidación' },
  { field: 'fecha_liqui', headerName: 'Fecha Liquidación' },
  { field: 'importe_nota', headerName: 'Importe Liquidación' },
  { field: 'elaborado_por', headerName: 'Elaborado Por' },
  { field: 'nro_nota', headerName: 'Nro. de nota de C/D' },
  { field: 'fecha_nota', headerName: 'Fecha Nota C/D' },
  { field: 'importe_nota', headerName: 'Importe Nota C/D' },
  { field: 'nro_factura_pagada', headerName: 'Nro. de Factura' },
  { field: 'fecha_factura_pagada', headerName: 'Fecha Factura' },
  { field: 'total_venta_pagada', headerName: 'Importe Factura' }
];


const Devoluciones = ({ data = [] }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return <BasicTable tableName={"Datos Devolucion"} data={dataWithId} columns={columns} />;
};

export default Devoluciones;
