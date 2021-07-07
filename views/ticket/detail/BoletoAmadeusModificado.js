import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const columns = [
  { field: 'payCode', headerName: 'Codigo' },
  { field: 'payDescription', headerName: 'Desc.' },
  { field: 'payCurrency', headerName: 'Moneda' },
  { field: 'payAmount', headerName: 'Importe' },
  //{ field: 'reference', headerName: 'Referencia' },
  { field: 'creditCardNumber', headerName: 'Nro. Tarjeta' },
  { field: 'authorizationCode', headerName: 'Cod. Autorización' },
  { field: 'payInstanceCode', headerName: 'Cod. Instancia' },
  { field: 'payInstanceDescription', headerName: 'Desc. Instancia' },
  //{ field: 'numero_tarjeta', headerName: 'Nro. Tarjeta' },
  //{ field: 'codigo_tarjeta', headerName: 'Cod. Autorización' },
];


const BoletoAmadeusModificado = ({ data = [] }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    console.log("aqui llega la respuesta para la TABLA",lastValue);
    return lastValue;
  }, []);

  return <BasicTable tableName={"Forma de Pago Modificado"} data={dataWithId} columns={columns} />;
};

export default BoletoAmadeusModificado;
