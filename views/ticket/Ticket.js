import React, { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles,
} from '@material-ui/core';
import Details from './detail/Details';
import useJsonStore from '../../../_pxp/hooks/useJsonStore';
import Filter from './Filter';
import LoadingScreen from '../../../_pxp/components/LoadingScreen';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const Ticket = () => {
  const { state, set, data, loading } = useJsonStore({
    url: 'boakiu/Boleto/getTicketInformationRecursive',
    params: {
      nro_ticket: '',
    },
    load: false,
  });

  const [ticketInformation, setTicketInformation] = useState();
  // when the data has gotten an resp
  useEffect(() => {
    console.log(data);
    if (data) {
      setTicketInformation(data);
    }
  }, [data]);

  const classes = useStyles();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');

  const tabs = [
    { value: 'details', label: 'Detalle Boleto' },
    /* { value: 'invoices', label: 'Invoices' },
    { value: 'logs', label: 'Logs' } */
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const initFilter = (inputValue) => {
    set({
      ...state,
      params: {
        nro_ticket: inputValue,
      },
      load: true,
    });
  };

  return (
    <>
      <Container maxWidth={false}>
        <Filter initFilter={(inputValue) => initFilter(inputValue)} />

        {loading && <LoadingScreen />}
        {!loading && (
          <>
            <Box mt={3}>
              <Tabs
                onChange={handleTabsChange}
                scrollButtons="auto"
                value={currentTab}
                variant="scrollable"
                textColor="secondary"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </Tabs>
            </Box>
            <Divider />
            <Box mt={3}>
              {currentTab === 'details' && ticketInformation && (
                <Details ticketInformation={ticketInformation} />
              )}
              {/* {currentTab === 'invoices' && <Details />}
          {currentTab === 'logs' && <Details />} */}
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default Ticket;
