import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const columns = [
  { field: 'razon_social_cli', headerName: 'Razón Social' },
  { field: 'nit_ci_cli', headerName: 'NIT' },
  { field: 'nro_factura', headerName: 'Nro. Documento' },
  { field: 'nro_autorizacion', headerName: 'Nro. Autorización' },
  { field: 'fecha_factura', headerName: 'Fecha Documento' },
  { field: 'importe_otros_no_suj_iva', headerName: 'Exento' },
  { field: 'importe_total_venta', headerName: 'Importe Total' },
  { field: 'estado', headerName: 'Estado' },  
];


const FacturaLibroVentas = ({ data = [] }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);
  return <BasicTable tableName={"Factura Libro de Ventas"} data={dataWithId} columns={columns} />;
};

export default FacturaLibroVentas;
