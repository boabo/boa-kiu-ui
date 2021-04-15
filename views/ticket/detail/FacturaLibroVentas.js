import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const columns = [
  { field: 'estado', headerName: 'Estado' },
  { field: 'fecha_factura', headerName: 'Fecha Factura' },
  { field: 'importe_otros_no_suj_iva', headerName: 'Exento' },
  { field: 'importe_total_venta', headerName: 'Importe Total' },
  { field: 'nro_autorizacion', headerName: 'Nro Aut' },
  { field: 'nro_factura', headerName: 'Nro Documento' },
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
