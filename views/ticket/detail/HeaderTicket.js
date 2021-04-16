import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Button from '@material-ui/core/Button';
import ButtonPxp from '../../../../_pxp/components/ButtonPxp';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ActionsTicket from "./ActionsTicket";




const HeaderTicket = ({ ticket, datosEmision, permission, initFilter }) => {

  const {counter = '', cajero = ''} = datosEmision || {};
  console.log('permission', permission)
  let colorTransaction = 'black';
  let showButtonAnular = true;
  if(ticket.transaction === 'CANX' || ticket.transaction === 'CANN') {
    colorTransaction = 'red';
    showButtonAnular = false;
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={6} sm={6} xs={6}>
          <Typography align="left">
          Codigo de Reserva:<b> {ticket.pnrCode} </b> <Divider />
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
    </Container>
  );
};

export default HeaderTicket;
