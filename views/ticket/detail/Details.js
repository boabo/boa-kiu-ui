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
import BoletoAmadeusModificado from './BoletoAmadeusModificado';
import FacturaLibroVentas from './FacturaLibroVentas';
/* import CustomerInfo from './CustomerInfo';
import Emails from './Emails';
import Invoices from './Invoices';
import OtherActions from './OtherActions'; */

const useStyles = makeStyles(() => ({
  root: {},
}));

const Details = ({
  ticketInformation,
  permission,
  initFilter,
  className,
  ...rest
}) => {
  const classes = useStyles();
  console.log("aqui llega el permiso 22222222",permission);
  const ticket = ticketInformation.data[0];
  /*Aumentando para la forma de pago Tarjeta*/
  const fp_tarjeta_code = ticketInformation.forma_pago_tarjeta_code;
  const fp_tarjeta = ticketInformation.forma_pago_tarjeta;
  /******************************************/
  const {
    factura_erp: facturaErp,
    factura_libro_ventas: facturaLibroVentas,
    boleto_amadeus_modificado: boletoAmadeusModificado,
    datos_emision: datosEmision,
    /*Aumentando para las formas de pago ERP*/
    formas_pago_erp_tarjeta:formas_pago_erp_tarjeta, 

  } = ticketInformation.data_erp;
  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <HeaderTicket
          ticket={ticket}
          datosEmision={datosEmision}
          permission={permission}
          initFilter={initFilter}
        />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Amounts ticket={ticket} />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <TicketInfo ticket={ticket} datosEmision={datosEmision} />
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
      {Array.isArray(facturaErp) && facturaErp.length > 0 && (
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <FacturaErp data={facturaErp || []} />
        </Grid>
      )}

      {!facturaErp && Array.isArray(facturaLibroVentas) && (
        <Grid item lg={6} md={6} xl={6} xs={12}>
          <FacturaLibroVentas data={facturaLibroVentas || []} />
        </Grid>
      )}

      <Grid item lg={6} md={6} xl={6} xs={12}>
        <Payments data={ticket.payment} 
                  dataTicket = {ticket} 
                  dataErp = {ticketInformation} 
                  fp_tarjeta_code = {fp_tarjeta_code} 
                  initFilter={initFilter}
                  formas_pago_erp_tarjeta = {formas_pago_erp_tarjeta}
                  fp_tarjeta = {fp_tarjeta} 

        /> 
        {/* Aqui mandar el ticket con las condiciones que se dijo para habilitar el boton editar */}
      </Grid>
      <Grid item lg={6} md={6} xl={6} xs={12}>
        <BoletoAmadeusModificado data={boletoAmadeusModificado || []} />
      </Grid>
    </Grid>
  );
};

export default Details;
