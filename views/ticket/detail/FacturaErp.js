import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const columns = [
  { field: 'nroaut', headerName: 'Nro Autorizacion' },
  { field: 'nro_factura', headerName: 'Factura' },
  { field: 'nit', headerName: 'Nit' },
  { field: 'nombre_factura', headerName: 'Razon Social' },
  { field: 'total_venta', headerName: 'Monto' },
];


const FacturaErp = ({ data = [] }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return <BasicTable tableName={"Factura Asociada"} data={dataWithId} columns={columns} />;
};

export default FacturaErp;
