import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const columns = [
  { field: 'conjuntionTicketNumber', headerName: 'Nro Boleto' },
  { field: 'couponNumber', headerName: 'Cupon' },
  { field: 'StopOver', headerName: 'Stop Over' },
  { field: 'Carrier', headerName: 'Operador' },
  { field: 'origin', headerName: 'Origen' },
  { field: 'destination', headerName: 'Destino' },
  { field: 'flightNumber', headerName: 'Nro Vuelo' },
  { field: 'Class', headerName: 'Clase' },
  { field: 'depatureDate', headerName: 'Fecha Vuelo' },
  { field: 'fareBasis', headerName: 'Fare Basis' },
  { field: 'CouponStatus', headerName: 'Estado' },
  { field: 'FreeBaggageAllowance', headerName: 'Equipaje' },
  { field: 'FrequentFlyerReference', headerName: 'Cod. Pax Frecuente' },
  {
    field: 'UsageDate',
    headerName: 'Usage Date',
    render: (value) => moment(value, 'YYYYMMDD').format('DD/MM/YYYY'),
  },
];


const Coupons = ({ data = [] }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return <BasicTable tableName={"Cupones"} data={dataWithId} columns={columns} />;
};

export default Coupons;
