import React from 'react';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Pxp from "../../../../Pxp";

import moment from 'moment';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});
const columns = [
  { field: 'Formato', headerName: 'Administradora' },
  { field: 'AuthorizationCode', headerName: 'Autorizacion' },
  { field: 'CreditCardNumber', headerName: 'Tarjeta' },
  { field: 'PaymentAmmount', headerName: 'Monto' },
];



const Concilliation = ({ data = [], dataBoleto }) => {

  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;    
  }, []);

  console.log("aqui llega el data Boleto",dataBoleto);

  /*Funcion que llamara al servicio con los datos que se recuperara*/

  const [open, setOpen] = React.useState(false);
  const [respuesta, setRepuesta] = React.useState(null);

  const recuperarDatos = (nro_autorizacion,nro_tarjeta) => {     
    setOpen(true);
    console.log("aqui llega lso datos",nro_autorizacion,nro_tarjeta);
    setRepuesta(nro_autorizacion);

    /*Llamar al servicio del GORO*/
    Pxp.apiClient
      .doRequest({
        url: 'ventas_facturacion/FormaPago/listarFormaPago',
        params: {
          start: '0',
          limit: '10',
          sort: 'id_medio_pago_pw',
          dir: 'ASC',
          boa_kiu: 'si',
          codigo_fp: 'CASH',
          sw_tipo_venta: 'BOLETOS',
          regionales: 'BOL',
        },
      })
      .then((resp) => {
        //setRepuesta(resp.datos[0].codigo);   
        console.log("aqui llega lso datos",resp);
      });  



  };


  const handleClose = () => {
    setOpen(false);
  };
  
  /*****************************************************************/

  //<BasicTable tableName={"Conciliacion"}  data={dataWithId} columns={columns} />
  return ( <>
            <TableContainer component={Paper}>             
            <Typography
                component="h3"
                gutterBottom
                variant="overline"
                color="textSecondary"
                align={"center"}
              >
                {(dataBoleto.issueDate >= '01/01/2021') ? 'Concilicación' : 'Boletos anteriores al 01/01/2021 no cuentan con iformación, por lo tanto se debe proceder de la forma antigua'}
              </Typography>
              <Table className={useStyles.table} size="small" aria-label="customized table">
                <TableHead className={useStyles.head}>
                  <TableRow>
                    <TableCell>Administradora</TableCell>
                    <TableCell>Autorizacion</TableCell>
                    <TableCell>Tarjeta</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Fecha de Transacción</TableCell>
                    <TableCell>Nro. Comercio</TableCell>
                    <TableCell>Nombre de Comercio</TableCell>
                    <TableCell>Lote</TableCell>                   
                    <TableCell>Accion</TableCell>                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataWithId.map((row) => (
                    <TableRow>        
                      <TableCell>{row.Formato}</TableCell>
                      <TableCell>{row.AuthorizationCode}</TableCell>
                      <TableCell>{row.CreditCardNumber}</TableCell>
                      <TableCell>{row.PaymentAmmount}</TableCell>
                      <TableCell>{moment(row.PaymentDate, 'YYYY-MM-DD').format('DD/MM/YYYY',)}</TableCell>
                      <TableCell>{row.TerminalNumber}</TableCell>
                      <TableCell>{((row.NameComercio != undefined && row.NameComercio != null && row.NameComercio != '') ? row.NameComercio : (row.EstablishmentCode))}</TableCell>
                      <TableCell>{row.LotNumber}</TableCell>
                      <TableCell><Button variant="contained" color="primary" onClick={(e) => recuperarDatos(row.AuthorizationCode,row.CreditCardNumber)}>Detalle</Button></TableCell>                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Detalle del Pago con Tarjeta {respuesta}
                    </DialogTitle>
                    <DialogContent dividers>
                        
                    </DialogContent>                    
                </Dialog>


          </>
         );
};

export default Concilliation;
