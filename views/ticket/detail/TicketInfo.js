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
import {  withStyles } from "@material-ui/core/styles";

import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import Label from '../../../../_pxp/components/Label';

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
      <CardHeader title={`${ticket.issueAgencyCode} (${ticket.currency}) Nro. Ticket: ${ticket.ticketNumber} Trans: ${ticket.transaction}`} />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCellChanged align="center" padding="none">

                Date:<b> {ticket.issueDate} </b> | Pax:
                <b> {ticket.passengerName} </b> | Pax Type:<b> </b> | FOID:
                <b> {ticket.FOID} </b> | Clave Fiscal:<b> </b> | Frequent Flyer:<b> </b> |{' '}
                Frequent Flyer:<b> </b> | Fare Calc Mode:<b> </b> | FCPI:
                <b> </b> |{' '}
            </TableCellChanged>
          </TableRow>
          <TableRow>
            <TableCellChanged align="center" padding="none">
                Tour Code:<b> {ticket.TourCode} </b> | Type:<b> </b> | Pais Em.:<b> </b> |{' '}
                Interv.:<b> {ticket.issueAgencyCode} </b> | OfficeId Reserva:
                <b> {ticket.reserveOfficeID} </b> | OfficeId Emisor:
                <b> {ticket.issueOfficeID} </b> | Agente Reserva:
                <b> {ticket.ReserveAgent} </b> |{' '}
            </TableCellChanged>
          </TableRow>
          <TableRow>
            <TableCellChanged align="center" padding="none">
                Agente Emisor:<b> </b> | Cod. Reserva:<b> {ticket.pnrCode} </b>{' '}
                | Endoso:<b> {ticket.Endorsement} </b> | Host:<b> {ticket.Host}</b> |{' '}
            </TableCellChanged>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default TicketInfo;
