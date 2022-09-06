import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Label from '../../../../_pxp/components/Label';
import Amounts from './Amounts';
import AmountBox from './AmountBox';

const TableCellChanged = withStyles({
  root: {
    borderBottom: 'none',
    fontSize: '13px',
  },
})(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const TicketInfo = ({ ticket, datosEmision = {}, className, ...rest }) => {
  const classes = useStyles();

  console.log('datosEmision',datosEmision)
  const {counter = '', cajero = ''} = datosEmision || {};
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Divider />
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={4} xs={12}>
            Fecha emision:<b> {ticket.issueDate} </b> <Divider />
            Pasajero: <b> {ticket.passengerName} </b> <Divider />
            Tipo Pax:<b> </b> <Divider />
            FOID:<b> {ticket.FOID} </b> <Divider />
            Clave Fiscal:<b>{ticket.nit || 0} </b> <Divider />
            Razon Social:<b>{ticket.bussinesName} </b> <Divider />
          </Grid>
          <Grid item lg={4} sm={4} xs={12}>
            Tour Code:<b> {ticket.TourCode} </b> <Divider /> Tipo:<b> </b>{' '}
            <Divider /> Pais Em.:<b> </b> <Divider /> Codigo IATA Reserva.:
            <b> {ticket.reserveAgencyCode} </b> <Divider /> OfficeId Reserva:
            <b> {ticket.reserveOfficeID} </b> <Divider />  Agente Reserva:
            <b> {ticket.ReserveAgent}</b><Divider />
            Cajero: <b>{cajero}</b>

            <Divider />{' '}
          </Grid>
          <Grid item lg={4} sm={4} xs={12}>
             Endoso:
            <b> {ticket.Endorsement} </b> <Divider /> Host:<b> {ticket.Host}</b>{' '}
            <Divider /> fileName : <b> {ticket.fileName} </b>
            <Divider /> loadDate : <b> {ticket.loadDate} </b>
            <Divider /> source : <b> {ticket.source} </b>
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </Card>
  );
};

export default TicketInfo;
