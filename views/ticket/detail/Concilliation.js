import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const columns = [
  { field: 'Formato', headerName: 'Administradora' },
  { field: 'AuthorizationCode', headerName: 'Autorizacion' },
  { field: 'CreditCardNumber', headerName: 'Tarjeta' },
  { field: 'PaymentAmmount', headerName: 'Monto' },
];


const Concilliation = ({ data = [] }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return <BasicTable tableName={"Conciliacion"}  data={dataWithId} columns={columns} />;
};

export default Concilliation;
