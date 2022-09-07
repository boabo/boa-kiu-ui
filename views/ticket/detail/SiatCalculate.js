import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const columns = [
  { field: 'importeNeto', headerName: 'importeNeto' },
  { field: 'importeQM', headerName: 'importeQM' },
  { field: 'importeBO', headerName: 'importeBO' },
  { field: 'importeExento', headerName: 'importeExento' },
  { field: 'importeTotal', headerName: 'importeTotal' },
];

const SiatCalculate = ({ data = [] }) => {
  const dataAux = [];
  dataAux.push(data)
  const dataWithId = dataAux.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return <BasicTable tableName={"Siat Calculate"} data={dataWithId} columns={columns} />;
};

export default SiatCalculate;
