import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
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
  { field: 'actions', headerName: 'actions' },
  { field: 'nroaut', headerName: 'Nro Autorizacion/Cuf' },
  { field: 'nro_factura', headerName: 'Factura' },
  { field: 'nit', headerName: 'Nit' },
  { field: 'nombre_factura', headerName: 'Razon Social' },
  { field: 'total_venta', headerName: 'Monto' },
];



const FacturaErp = ({ data = [] }) => {
  const classes = useStyles();

  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  const actionsComponent = (rowClicked) => {
      //9302407966087
      const ver = () => {
          console.log('rowClicked',rowClicked)
          const openSiat = `https://siat.impuestos.gob.bo/consulta/QR?nit=154422029&cuf=${rowClicked.cuf}&numero=${rowClicked.nro_factura}&t=2`;

          console.log('openSiat',openSiat)
          window.open(openSiat, '_blank');

      }
    return (
        <div className={classes.root}>
          <IconButton onClick={ver} aria-label="delete">
            <VisibilityIcon />
          </IconButton>
        </div>
    );
  }


  return <BasicTable tableName={"Factura Asociada"} data={dataWithId} columns={columns} actions={actionsComponent} />;
};

export default FacturaErp;
