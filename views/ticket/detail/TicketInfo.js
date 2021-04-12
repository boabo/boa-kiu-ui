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

const TicketInfo = ({ ticket, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Divider />
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={4} xs={12}>
            Date:<b> {ticket.issueDate} </b> <Divider />
            Pax: <b> {ticket.passengerName} </b> <Divider />
            Pax Type:<b> </b> <Divider />
            FOID:<b> {ticket.FOID} </b> <Divider />
            Clave Fiscal:<b> </b> <Divider /> Frequent Flyer:<b> </b>{' '}
            <Divider />
            Frequent Flyer:<b> </b> <Divider />
            Fare Calc Mode:<b> </b> <Divider />
            FCPI:
          </Grid>
          <Grid item lg={4} sm={4} xs={12}>
            Tour Code:<b> {ticket.TourCode} </b> <Divider /> Type:<b> </b>{' '}
            <Divider /> Pais Em.:<b> </b> <Divider /> Interv.:
            <b> {ticket.issueAgencyCode} </b> <Divider /> OfficeId Reserva:
            <b> {ticket.reserveOfficeID} </b> <Divider /> OfficeId Emisor:
            <b> {ticket.issueOfficeID} </b> <Divider /> Agente Reserva:
            <b> {ticket.ReserveAgent} </b> <Divider />{' '}
          </Grid>
          <Grid item lg={4} sm={4} xs={12}>
            Agente Emisor:<b> </b> <Divider /> Cod. Reserva:
            <b> {ticket.pnrCode} </b> <Divider /> Endoso:
            <b> {ticket.Endorsement} </b> <Divider /> Host:<b> {ticket.Host}</b>{' '}
            <Divider />{' '}
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </Card>
  );
};

export default TicketInfo;
