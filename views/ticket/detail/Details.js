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
//import Concilliation from './Concilliation';
import FacturaErp from './FacturaErp';
import BoletoAmadeusModificado from './BoletoAmadeusModificado';
import FacturaLibroVentas from './FacturaLibroVentas';

import Devoluciones from './Devoluciones';


import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Commissions from "./Commissions";
import SiatInvoice from "./SiatInvoice";
import SiatCalculate from "./SiatCalculate";
/* import CustomerInfo from './CustomerInfo';
import Emails from './Emails';
import Invoices from './Invoices';
import OtherActions from './OtherActions'; */

const useStyles = makeStyles(() => ({
  root: {},
}));

const Details = ({
  ticketInformation,
  position,
  permission,
  initFilter,
  cargaConsi,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const ticket = ticketInformation.data[position];
  /*Aumentando para la forma de pago Tarjeta*/
  const fp_tarjeta_code = ticketInformation.forma_pago_tarjeta_code;
  const fp_tarjeta = ticketInformation.forma_pago_tarjeta;
  const boleto_modificado_stage = ((ticketInformation.medios_pago_modificadas_stage != '' && ticketInformation.medios_pago_modificadas_stage != null && ticketInformation.medios_pago_modificadas_stage != undefined)?ticketInformation.medios_pago_modificadas_stage:null);
  const forma_pago_modificadas_stage = ticketInformation.forma_pago_modificadas_stage;
  const medios_pago_defecto_modificados = ((ticketInformation.medios_pago_Defecto != '' && ticketInformation.medios_pago_Defecto != null && ticketInformation.medios_pago_Defecto != undefined)?ticketInformation.medios_pago_Defecto:null);
  const medio_pago_originales = ((ticketInformation.medios_pago_Defecto_original != '' && ticketInformation.medios_pago_Defecto_original != null && ticketInformation.medios_pago_Defecto_original != undefined)?ticketInformation.medios_pago_Defecto_original:null);
  /******************************************/
  console.log("DATOS SERVICIO",ticket);
  const {
    factura_erp: facturaErp,
    factura_libro_ventas: facturaLibroVentas,
    boleto_amadeus_modificado: boletoAmadeusModificado,
    datos_emision: datosEmision,
    /*Aumentando para las formas de pago ERP*/
    formas_pago_erp_tarjeta:formas_pago_erp_tarjeta,


  } = ticketInformation.data_erp;
  console.log("DATOS SERVICIO ERP",ticketInformation);
  const {siatInvoice} = ticket;
  console.log("siatInvoice",siatInvoice);
  console.log("ticket.SIATCalculate",ticket.SIATCalculate);

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
          dataErp={ticketInformation.data_erp}
          datosEmision={datosEmision}
          permission={permission}
          initFilter={initFilter}
        />
      </Grid>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Amounts ticket={ticket} dataErp={ticketInformation.data_erp}/>
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
        <Grid item lg={6} md={6} xl={6} xs={6}>
          <Taxes data={ticket.taxes} />
        </Grid>
      )}
      {ticket.SIATCalculate && (
        <Grid item lg={6} md={6} xl={6} xs={6}>
          <SiatCalculate data={ticket.SIATCalculate} />
        </Grid>
      )}
      {ticket.boaCommissions && (
        <Grid item lg={6} md={6} xl={6} xs={6}>
          <Commissions data={ticket.boaCommissions} />
        </Grid>
      )}

      {Array.isArray(facturaErp) && facturaErp.length > 0 && (
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <FacturaErp data={facturaErp || []} />
        </Grid>
      )}

      {Array.isArray(siatInvoice) && siatInvoice.length > 0 && (
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <SiatInvoice data={siatInvoice || []} />
        </Grid>
      )}

      {!siatInvoice && !facturaErp && Array.isArray(facturaLibroVentas) && (
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <FacturaLibroVentas data={facturaLibroVentas || []} />
        </Grid>
      )}


      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Payments data={ticket.payment}
                  dataTicket = {ticket}
                  dataErp = {ticketInformation}
                  initFilter={initFilter}
                  fp_tarjeta = {fp_tarjeta}
                  modificaciones_stage = {boleto_modificado_stage}
                  cargaConsi = {cargaConsi}
                  medio_pago_defecto = {medio_pago_originales}
                  paymentOriginales = 'si'
        />

        {/* Aqui mandar el ticket con las condiciones que se dijo para habilitar el boton editar */}
      </Grid>

      {boleto_modificado_stage && (boleto_modificado_stage.length > 0) &&(
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <BoletoAmadeusModificado data={boleto_modificado_stage || []}
                                 dataTicket = {ticket}
                                 dataErp = {ticketInformation}
                                 initFilter={initFilter}
                                 formas_pago_erp_tarjeta = {forma_pago_modificadas_stage}
                                 modificaciones_stage = {boleto_modificado_stage}
                                 cargaConsi = {cargaConsi}
                                 medio_pago_defecto = {medios_pago_defecto_modificados}
                                 paymentOriginales = 'no' />
      </Grid>
      )}

      {/* {conciliationDetail.conciliacion_oficial != null &&(
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Concilliation data={conciliationDetail.conciliacion_oficial} dataBoleto = {ticket}/>
      </Grid>
      )} */}

    {ticketInformation.data_erp.nota_debito_credito && (ticketInformation.data_erp.nota_debito_credito.length > 0) &&(
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <Devoluciones data={ticketInformation.data_erp.nota_debito_credito}/>
      </Grid>
      )}

    </Grid>
  );
};

export default Details;
