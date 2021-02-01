import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import TicketInfo from './TicketInfo';
import Coupons from './Coupons';
import FareCalc from './FareCalc';
import Taxes from './Taxes';
import Payments from './Payments';
/* import CustomerInfo from './CustomerInfo';
import Emails from './Emails';
import Invoices from './Invoices';
import OtherActions from './OtherActions'; */

const useStyles = makeStyles(() => ({
  root: {},
}));

const Details = ({ ticketInformation, className, ...rest }) => {
  const classes = useStyles();

  const ticket = ticketInformation.data[0];
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <TicketInfo ticket={ticket} />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Coupons data={ticket.coupon} />
        <b>importe Neto:</b>
        {ticket.netAmount}
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <FareCalc desc="fare Calc" value={ticket.fareCalculation} />
      </Grid>
      {ticket.taxes && (
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <Taxes data={ticket.taxes} />
        </Grid>
      )}
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <Payments data={ticket.payment} />
      </Grid>
    </Grid>
  );
};

export default Details;
