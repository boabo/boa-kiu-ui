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




const HeaderTicket = ({ ticket, permission, initFilter }) => {

  console.log('permission', permission)
  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={6} sm={6} xs={6}>
          PNR:<b> {ticket.pnrCode} </b> <Divider />
          Nro Ticket :<b> {ticket.ticketNumber} </b> Trans: {ticket.transaction}{' '}
          <Divider />
          {permission.permission === true && <ActionsTicket ticket={ticket} initFilter={initFilter} /> }
        </Grid>
        <Grid item lg={6} sm={6} xs={6}>
          <Typography align="right">
            Agencia:<b> {ticket.reserveAgencyCode} </b> <Divider />
            {ticket.pointOfSale}({ticket.cityCode})
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderTicket;
