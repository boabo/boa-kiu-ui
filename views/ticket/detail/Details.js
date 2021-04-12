import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import TicketInfo from './TicketInfo';
import Coupons from './Coupons';
import FareCalc from './FareCalc';
import Taxes from './Taxes';
import Payments from './Payments';
import Amounts from './Amounts';
import HeaderTicket from './HeaderTicket';
import Concilliation from './Concilliation';
import FacturaErp from './FacturaErp';
import BoletoAmadeusModificado from "./BoletoAmadeusModificado";
/* import CustomerInfo from './CustomerInfo';
import Emails from './Emails';
import Invoices from './Invoices';
import OtherActions from './OtherActions'; */

const useStyles = makeStyles(() => ({
  root: {},
}));

const Details = ({ ticketInformation, permission, initFilter, className, ...rest }) => {
  const classes = useStyles();

  const ticket = ticketInformation.data[0];
  const {
    factura_erp: facturaErp,
    boleto_amadeus_modificado: boletoAmadeusModificado,
  } = ticketInformation.data_erp;
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <HeaderTicket ticket={ticket} permission={permission} initFilter={initFilter}/>
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Amounts ticket={ticket} />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <TicketInfo ticket={ticket} />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Coupons data={ticket.coupon} />
      </Grid>

      <Grid item lg={12} md={12} xl={12} xs={12}>
        <FareCalc desc="fare Calc" value={ticket.fareCalculation} />
      </Grid>
      {ticket.taxes && (
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <Taxes data={ticket.taxes} />
        </Grid>
      )}
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Concilliation data={ticket.concilliation} />
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <FacturaErp data={facturaErp} />
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Payments data={ticket.payment} />
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <BoletoAmadeusModificado data={boletoAmadeusModificado} />
      </Grid>
    </Grid>
  );
};

export default Details;
