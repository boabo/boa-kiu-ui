import React from 'react';
import Paper from '@material-ui/core/Paper';

const FareCalc = ({ desc, value }) => {
  return (
    <Paper>
      <b>{desc}:</b> {value}
    </Paper>
  );
};

export default FareCalc;
