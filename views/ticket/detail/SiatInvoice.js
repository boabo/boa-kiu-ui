import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/";
import VisibilityIcon from '@material-ui/icons/Visibility';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    '& > *': {
      margin: 1,
    },
  },
});


const columns = [
  { field: 'CodigoRecepcion', headerName: 'CodigoRecepcion' },
  { field: 'FechaEnvio', headerName: 'FechaEnvio' },
  { field: 'FechaValidacion', headerName: 'FechaValidacion' },
  { field: 'Observaciones', headerName: 'Observaciones' },
  { field: 'cuf', headerName: 'cuf' },
  { field: 'cufd', headerName: 'cufd' },
  { field: 'estado', headerName: 'estado' },
  { field: 'fechaEmision', headerName: 'fechaEmision' },
  { field: 'montoSujetoIva', headerName: 'montoSujetoIva' },
  { field: 'montoTarifa', headerName: 'montoTarifa' },
  { field: 'montoTotal', headerName: 'montoTotal' },
  { field: 'nombreRazonSocial', headerName: 'nombreRazonSocial' },
  { field: 'numeroDocumento', headerName: 'numeroDocumento' },
  { field: 'numeroFactura', headerName: 'numeroFactura' },
];


const SiatInvoice = ({ data = [] }) => {


  const classes = useStyles();


  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return <BasicTable tableName={"Factura Siat"} data={dataWithId} columns={columns} />;
};

export default SiatInvoice;
