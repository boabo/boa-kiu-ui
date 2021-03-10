import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const columns = [
  { field: 'conjuntionTicketNumber', headerName: 'Doc' },
  { field: 'couponNumber', headerName: 'Cpn' },
  { field: 'StopOver', headerName: 'X/o' },
  { field: 'Carrier', headerName: 'CD' },
  { field: 'origin', headerName: 'From' },
  { field: 'destination', headerName: 'To' },
  { field: 'flightNumber', headerName: 'Flight' },
  { field: 'Class', headerName: 'Class' },
  { field: 'depatureDate', headerName: 'Flight Date' },
  { field: 'fareBasis', headerName: 'Fare Basis' },
  { field: 'FreeBaggageAllowance', headerName: 'Baggage' },
];


const Coupons = ({ data = [] }) => {
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return <BasicTable data={dataWithId} columns={columns} />;
};

export default Coupons;
