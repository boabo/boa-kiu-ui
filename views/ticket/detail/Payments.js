import React from 'react';
import BasicTable from '../../../../_pxp/components/BasicTable';

const columns = [
  { field: 'paymentCode', headerName: 'Codigo' },
  { field: 'paymentDescription', headerName: 'Desc.' },
  { field: 'paymentAmount', headerName: 'Importe' },
  { field: 'reference', headerName: 'Referencia' },
];

const Payments = ({ data }) => {
  return <BasicTable tableName={"Forma de Pago Originales"} columns={columns} data={data} />;
};

export default Payments;
