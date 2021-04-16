import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Typography, makeStyles } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Label from '../../../../_pxp/components/Label';

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

const AmountBox = ({ descAmount1 = 'desc amount', amount1 = 0 , descAmount2 = 'desc amount', amount2 = 0 , currency, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box flexGrow={1}>
      {/*  <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          Todays money 123
        </Typography>*/}

        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            {descAmount1}
          </Typography>
          <Label
            className={classes.label}
            color={'success'}
          >
            <b>{amount1}</b>
          </Label>
        </Box>
        <Box display="flex" alignItems="center" flexWrap="wrap">

          <Typography
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            {descAmount2}
          </Typography>
          <Label
            className={classes.label}
            color={'success'}
          >
            <b>{amount2}</b>
          </Label>
        </Box>
      </Box>
      <Avatar className={classes.avatar}>
        {currency !== undefined ? currency : <AttachMoneyIcon />}
      </Avatar>
    </Card>
  );
};

export default AmountBox;
