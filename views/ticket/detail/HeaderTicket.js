import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Button from '@material-ui/core/Button';
import ButtonPxp from '../../../../_pxp/components/ButtonPxp';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import ActionsTicket from "./ActionsTicket";
import Link from '@material-ui/core/Link';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Pxp from "../../../../Pxp";
import moment from 'moment';

import DetallePNR from "./DetallePnr";
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


const HeaderTicket = ({ ticket, datosEmision, permission, initFilter }) => {

  const {counter = '', cajero = ''} = datosEmision || {};
  console.log('permission', permission)
  let colorTransaction = 'black';
  let showButtonAnular = true;
  if(ticket.transaction === 'CANX' || ticket.transaction === 'CANN') {
    colorTransaction = 'red';
    showButtonAnular = false;
  }

  /*Llamar al servicio para recuperar el Pnr*/
  const [dataPnr, setDataPnr] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  
  const handleClose = () => {
    setOpen(false);
  };

  const recuperarDatosPnr = (pnrCode,fecha) => {     
    setOpen(true);  
    setLoading(true);  
    /*Llamar al servicio*/
    Pxp.apiClient
      .doRequest({
        url: 'boakiu/Boleto/GetTicketData',
        params: {
          pnr: pnrCode,
          issueDate: fecha,
          nroTarjeta: '',
          codAutorizacion: '',
          tyCons: 'cod_pnr',
        },
      })
      .then((resp) => {
        setDataPnr(resp);
        setLoading(false);  
      });  
    }
  /*****************************************/

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={6} sm={6} xs={6}>
          <Typography align="left">
          Codigo de Reserva:<Link
                            component="button"
                            variant="body2"
                            onClick={(e) => recuperarDatosPnr(ticket.pnrCode,moment(ticket.issueDate, 'YYYY-MM-DD').format('YYYY-MM-DD',))}
                          >
                          <b> {ticket.pnrCode} </b>
                          </Link> <Divider />
          Nro Ticket :<b> {ticket.ticketNumber} </b> <Divider />
          Transacción: <b style={{color:colorTransaction}}>{ticket.transaction}{' '}</b>
          <Divider />
          <ActionsTicket ticket={ticket} initFilter={initFilter}  showButtonAnular={showButtonAnular} permission={permission}/>
          </Typography>
          </Grid>
        <Grid item lg={6} sm={6} xs={6}>
          <Typography align="right">
            Punto de Venta:<b> {ticket.issueAgencyCode}({ticket.issueOfficeID})  </b> <Divider />
            {ticket.pointOfSale}({ticket.cityCode})<Divider />
            Agente Emisor:
            <b> {ticket.issueAgent} ({counter}) </b><Divider />

          </Typography>
        </Grid>
      </Grid>

      {dataPnr &&(  

      <Dialog fullWidth="true"  maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        DETALLE DE BOLETOS
                    </DialogTitle>
                    <DialogContent dividers>
                        <DetallePNR dataPnr = {dataPnr} />
                    </DialogContent>                    
      </Dialog>

      )}

      {loading == true && <LoadingScreen />}



    </Container>    
  );
};

export default HeaderTicket;
