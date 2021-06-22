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
  { field: 'referencia', headerName: 'Referencia' },
];


const BoletoAmadeusModificado = ({ data = [] }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return <BasicTable tableName={"Forma de Pago Modificado en ERP"} data={dataWithId} columns={columns} />;
};

export default BoletoAmadeusModificado;
