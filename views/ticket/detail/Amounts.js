import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Typography, makeStyles } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Label from '../../../../_pxp/components/Label';
import AmountBox from './AmountBox';
import { currencyFormat } from '../../../../_pxp/utils/Common';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48,
  },
}));

const Amounts = ({ ticket, dataErp, className, ...rest }) => {
  const classes = useStyles();
  const { taxes = [], boaCommissions = [] } = ticket;
  console.log('taxesss', taxes);
  const impuestoNacional = taxes.reduce((last, newData) => {
    console.log('newData', newData);
    const amountBo = newData.taxCode === 'BO' ? newData.taxAmount : 0;
    return last + amountBo;
  }, 0);
  const exento = taxes.reduce((last, newData) => {
    console.log('newData', newData);
    const amountExento =
      newData.taxCode !== 'BO' &&
      newData.taxCode !== 'QM' &&
      newData.taxCode !== 'CP'
        ? newData.taxAmount
        : 0;
    return last + amountExento;
  }, 0);
  const charge = taxes.reduce((last, newData) => {
    console.log('newData', newData);
    const amountAux = newData.taxCode === 'QM' ? newData.taxAmount : 0;
    return last + amountAux;
  }, 0);
  const othersTax = taxes.reduce((last, newData) => {
    console.log('newData', newData);
    const amountAux = newData.taxCode !== 'BO' ? newData.taxAmount : 0;
    return last + amountAux;
  }, 0);
  const penalidades = taxes.reduce((last, newData) => {
    console.log('newData', newData);
    const amountAux = newData.taxCode === 'CP' ? newData.taxAmount : 0;
    return last + amountAux;
  }, 0);

  const comisionesTotal = boaCommissions.reduce((accumulator, object) => {
    return accumulator + object.CommissionAmount;
  }, 0);


  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={3} xs={12}>
          <AmountBox
            descAmount1="Imp. Neto"
            amount1={
              currencyFormat({ value: ticket.netAmount, withCode: false }) || 0
            }
            descAmount2="Imp. Nacional"
            amount2={
              currencyFormat({ value: impuestoNacional, withCode: false }) || 0
            }
            currency={ticket.currency}
          />
        </Grid>
        <Grid item lg={3} sm={3} xs={12}>
          <AmountBox
            descAmount1="Otros Impuestos"
            amount1={
              currencyFormat({ value: othersTax, withCode: false }) || 0
            }
            descAmount2="Service Charge"
            amount2={currencyFormat({ value: charge, withCode: false }) || 0}
            currency={ticket.currency}
          />
        </Grid>
        <Grid item lg={3} sm={3} xs={12}>
          <AmountBox
            descAmount1="Penalidades"
            amount1={
              currencyFormat({ value: penalidades, withCode: false }) || 0
            }
            descAmount2="Excento"
            amount2={currencyFormat({ value: exento, withCode: false }) || 0}
            currency={ticket.currency}
          />
        </Grid>
        <Grid item lg={3} sm={3} xs={12}>
          <AmountBox
            descAmount1="Importe Total"
            amount1={
              currencyFormat({ value: ticket.totalAmount, withCode: false }) ||
              0
            }
            descAmount2="Comision"
            amount2={currencyFormat({ value: 0, withCode: false })}
            currency={ticket.currency}
          />
        </Grid>
        <Grid item lg={3} sm={3} xs={12}>
          <AmountBox
            descAmount1="Comision Agencia"
            amount1={currencyFormat({ value: (dataErp.comision_erp != '' && dataErp.comision_erp != undefined && dataErp.comision_erp != null) ? dataErp.comision_erp.comision : '0', withCode: false })}
            currency={ticket.currency}

            descAmount2=""
            amount2=""
            currency={ticket.currency}
          />
        </Grid>
        <Grid item lg={3} sm={3} xs={12}>
          <AmountBox
            descAmount1="Comision"
            amount1={currencyFormat({ value: comisionesTotal, withCode: false })}
            currency={ticket.currency}

            descAmount2=""
            amount2=""
          />
        </Grid>

      </Grid>
    </Container>
  );
};

export default Amounts;
