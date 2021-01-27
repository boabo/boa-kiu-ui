import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Input,
  makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const selectOptions = [
  {
    label: 'Type',
    options: ['Freelance', 'Full Time', 'Part Time', 'Internship'],
  },
  {
    label: 'Level',
    options: ['Novice', 'Expert'],
  },
  {
    label: 'Location',
    options: [
      'Africa',
      'Asia',
      'Australia',
      'Europe',
      'North America',
      'South America',
    ],
  },
  {
    label: 'Roles',
    options: ['Android', 'Web Developer', 'iOS'],
  },
];

const useStyles = makeStyles((theme) => ({
  root: {},
  searchInput: {
    marginLeft: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

const Filter = ({ className, initFilter, ...rest }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([
    'Freelance',
    'Full Time',
    'Novice',
    'Europe',
    'Android',
    'Web Developer',
  ]);

  const handleInputChange = (event) => {
    event.persist();
    setInputValue(event.target.value);
  };

  const handleInputKeyup = (event) => {
    event.persist();

    if (event.keyCode === 13 && inputValue) {
      console.log('llega')
      initFilter(inputValue);
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={2} display="flex" alignItems="center">
        <SearchIcon />
        <Input
          disableUnderline
          fullWidth
          className={classes.searchInput}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyup}
          placeholder="Busca con el nro de Boleto"
          value={inputValue}
        />
      </Box>
      <Divider />
    </Card>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
};

export default Filter;
