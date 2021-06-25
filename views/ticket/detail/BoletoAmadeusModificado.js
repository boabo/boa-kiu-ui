import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const columns = [
  { field: 'forma_pago', headerName: 'Codigo' },
  { field: 'nombre_mp', headerName: 'Desc.' },
  { field: 'moneda', headerName: 'Moneda' },
  { field: 'importe', headerName: 'Importe' },
  //{ field: 'referencia', headerName: 'Referencia' },
  { field: 'numero_tarjeta', headerName: 'Nro. Tarjeta' },
  { field: 'codigo_tarjeta', headerName: 'Cod. Autorización' },
];


const BoletoAmadeusModificado = ({ data = [] }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  console.log("aqui llega el dato ERP TARJETA",dataWithId);

  return <BasicTable tableName={"Forma de Pago Modificado en ERP"} data={dataWithId} columns={columns} />;
};

export default BoletoAmadeusModificado;
