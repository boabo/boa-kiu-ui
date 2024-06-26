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

import DetalleConciliacion from "./DetalleConciliacion";
import LoadingScreen from '../../../../_pxp/components/LoadingScreen';


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
  },
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

  /*Funcion que llamara al servicio con los datos que se recuperara*/

  const [open, setOpen] = React.useState(false);
  const [respuesta, setRepuesta] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const recuperarDatos = (documentDetails) => {
    setOpen(true);
    console.log('documentDetails',documentDetails)
    setRepuesta(documentDetails);

  };

  const pdf = async () => {
    setLoading(true);
    console.log('ticket.ticketNumber', dataBoleto.ticketNumber);
    const bodyData = {
      controller: 'boa-stage-nd/Reports/formaPagoPdf',
      method: 'POST',
      params: JSON.stringify({
        ticketNumber: dataBoleto.ticketNumber,
      }),
    };

    Pxp.apiClient
        .doRequest({
          url: 'boakiu/PxpNdCaller/doRequest',
          method: 'POST',
          params: bodyData,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);


          const out = res.pdf;
          console.log('out',out)
          const url = 'data:application/pdf;base64,' + btoa(out);


          let pdfWindow = window.open("")
          pdfWindow.document.write(
              "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
              btoa(out) + "'></iframe>"
          )

        })
        .catch(() => {
          setLoading(false);
        });

    /* const req = await GetReport(
      'http://erpmobile.obairlines.bo/rest/boakiu/PxpNdCaller/doRequest',
      bodyData,
    );
    const res = await req.data;
    setLoadingForm(false);
    if (res.success === false) {
      alert(res.msg);
    } else {
      const out = res.body;
      const arr = out.data;
      const byteArray = new Uint8Array(arr);
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(
        new Blob([byteArray], { type: 'application/octet-stream' }),
      );
      a.download = 'export.xls';

      // Append anchor to body.
      document.body.appendChild(a);
      a.click();
    } */
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
                    <TableCell>Nro Comprobante</TableCell>
                    <TableCell>Autorizacion</TableCell>
                    <TableCell>Tarjeta</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Moneda</TableCell>
                    <TableCell>Porcentaje Comisión</TableCell>
                    <TableCell>Monto Comisión</TableCell>
                    <TableCell>Fecha de Transacción</TableCell>
                    <TableCell>Fecha de Cierre</TableCell>
                    <TableCell>Cod. Establecimiento</TableCell>
                    <TableCell>Nro. Terminal</TableCell>
                    <TableCell>Nombre de Comercio</TableCell>
                    <TableCell>Lote</TableCell>  
                    <TableCell>Observaciones</TableCell>                  
                    <TableCell>Accion</TableCell>                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataWithId.map((row) => (
                    <TableRow>        
                      <TableCell>{row.Formato}</TableCell>
                      <TableCell>{row.PaymentTicket}</TableCell>
                      <TableCell>{row.AuthorizationCode}</TableCell>
                      <TableCell>{row.CreditCardNumber}</TableCell>
                      <TableCell>{row.PaymentAmmount}</TableCell>
                      <TableCell>{row.Currency}</TableCell>
                      <TableCell>{row.CommissionPercent}</TableCell>
                      <TableCell>{row.CommissionAmount}</TableCell>
                      <TableCell>{moment(row.PaymentDate, 'YYYY-MM-DD').format('DD/MM/YYYY',)}</TableCell>
                      <TableCell>{moment(row.ReportDate, 'YYYY-MM-DD').format('DD/MM/YYYY',)}</TableCell>
                      <TableCell>{row.EstablishmentCode}</TableCell>
                      <TableCell>{row.TerminalNumber}</TableCell>
                      <TableCell>{((row.NameComercio != undefined && row.NameComercio != null && row.NameComercio != '') ? row.NameComercio : (row.Formato = 'ATC' ? row.EstablishmentCode : row.TerminalNumber))}</TableCell>
                      <TableCell>{row.LotNumber}</TableCell>
                      <TableCell style={{color: ((row.MatchStatus == 'Conciliacion Correcta')?'green':'red')}}>{row.MatchStatus}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={(e) => recuperarDatos(row.documentDetails)}>Detalle</Button>
                        <Button variant="contained" color="primary" onClick={(e) => pdf(row)}>PDF</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {respuesta &&(        

            <Dialog fullWidth="true"  maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        DETALLE DE BOLETOS
                    </DialogTitle>
                    <DialogContent dividers>
                        <DetalleConciliacion dataTarjeta = {respuesta} />
                    </DialogContent>                    
                </Dialog>

              
            )}

            {loading == true && <LoadingScreen />}

          </>
         );
};

export default Concilliation;
