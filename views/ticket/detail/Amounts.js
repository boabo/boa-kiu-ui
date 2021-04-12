import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Typography, makeStyles } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Label from '../../../../_pxp/components/Label';
import AmountBox from './AmountBox';

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

const Amounts = ({ ticket, className, ...rest }) => {
  const classes = useStyles();

  const { taxes = [] } = ticket;
  console.log('taxesss',taxes)
  const impuestoNacional = taxes.reduce((last, newData)=> {
    console.log('newData',newData)
    const amountBo = (newData.taxCode === 'BO') ? newData.taxAmount : 0;
    return last + amountBo;
  }, 0);
  const exento = taxes.reduce((last, newData)=> {
    console.log('newData',newData)
    const amountExento = (newData.taxCode !== 'BO' && newData.taxCode !== 'QM' && newData.taxCode !== 'CP' ) ? newData.taxAmount : 0;
    return last + amountExento;
  }, 0);
  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={3} xs={12}>
          <AmountBox
            descAmount1="Imp. Neto"
            amount1={ticket.netAmount}
            descAmount2="Imp. Nacional"
            amount2={impuestoNacional || 0}
          />
        </Grid>
        <Grid item lg={3} sm={3} xs={12}>
          <AmountBox
            descAmount1="Otros Impuestos"
            amount1={0}
            descAmount2="Service Change"
            amount2={0}
          />
        </Grid>
        <Grid item lg={3} sm={3} xs={12}>
          <AmountBox
            descAmount1="Penalidades"
            amount1={0}
            descAmount2="Excento"
            amount2={exento || 0}
          />
        </Grid>
        <Grid item lg={3} sm={3} xs={12}>
          <AmountBox
            descAmount1="Importe Total"
            amount1={ticket.totalAmount}
            descAmount2="Comision"
            amount2={0}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Amounts;
