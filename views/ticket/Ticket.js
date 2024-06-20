import React, { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Details from './detail/Details';
import useJsonStore from '../../../_pxp/hooks/useJsonStore';
import Filter from './Filter';
import LoadingScreen from '../../../_pxp/components/LoadingScreen';
import { Grid } from '@material-ui/core';
import Concilliation from './detail/Concilliation';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useParams} from "react-router-dom";
import HistoryExchange from "./detail/HistoryExchange";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  carga: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Ticket = () => {
  const { paramTicket } = useParams();
  console.log('paramTicket', paramTicket);
  const [permission, setPermission] = useState(false);
  // verify permission for render button for disabled ticket
  const { data: dataPermission } = useJsonStore({
    url: 'boakiu/Boleto/verifyPermissionForDisabled',
    params: {},
  });

  // when the data has gotten an resp
  useEffect(() => {
    console.log(dataPermission);
    if (dataPermission) {
      setPermission(dataPermission);
    }
  }, [dataPermission]);

  const { state, set, data, loading } = useJsonStore({
    url: 'boakiu/Boleto/getTicketInformationRecursive',
    params: {
      nro_ticket: '',
    },
    load: false,
  });

  const { state: datosConciliation, set:envio, data: datosRecuConciliation, loading:cargaConsiliation } = useJsonStore({
    url: 'boakiu/Boleto/getConcilliation',
    params: {
      nro_ticket: '',
    },
    load: false,
  });

  const [ticketInformation, setTicketInformation] = useState();
  const [conciliationDetail, setConsiliationDetail] = useState();
  // when the data has gotten an resp
  useEffect(() => {
    console.log(data);
    if (data) {
      console.log("aqui llega data",data);
      setTicketInformation(data);
      filterConcilliation((data != null && data != '' && data != undefined) ? ((data.data != '' && data.data != undefined)?data.data[0].ticketNumber.trim():null):null);

      //create the tabs
      if(data.data != '' && data.data != undefined) {
        const tabsAux = data.data.reduce((prev, currentData, index) => {
          const t = {
            value: index, label: currentData.transaction
          };
          return [...prev, t];

        }, []);

        setTabs(tabsAux);
        setCurrentTab(tabsAux[0].value);
      }

    }
  }, [data]);

  useEffect(() => {
    console.log('ticketInformation',ticketInformation)
  }, [ticketInformation]);

  useEffect(() => {
    if (datosRecuConciliation) {
      setConsiliationDetail(datosRecuConciliation);
    }
  }, [datosRecuConciliation]);

  const classes = useStyles();
  const [customer, setCustomer] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState('details');


  const handleTabsChange = (event, value) => {
    console.log('tab changed', value)
    console.log('ticketInformation.data[value]', ticketInformation.data[value])
    filterConcilliation(ticketInformation.data[value].ticketNumber.trim());

    setCurrentTab(value);
  };

  const filterConcilliation = (inputValue) => {
    console.log("Servicio de Conciliacion Llamado",inputValue);
    envio({
      ...datosConciliation,
      params: {
        nro_ticket: inputValue,
      },
      load: true,
    });
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
        <Filter defaultValue={paramTicket} initFilter={(inputValue) => initFilter(inputValue)} />

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
              {tabs.map((tab) => (
                <TabPanel value={currentTab} index={tab.value}>
                  {ticketInformation &&
                  ticketInformation.data && (
                    <Details ticketInformation={ticketInformation} position={tab.value} permission={permission} initFilter={initFilter} cargaConsi = {cargaConsiliation}/>
                  )}

                  {cargaConsiliation &&
                  <div className={classes.carga}>
                    <h2>Cargando Conciliación</h2>
                    <center><CircularProgress /></center>
                  </div>}

                  {!cargaConsiliation && (
                    <div>
                      <br/>
                      {conciliationDetail && conciliationDetail.conciliacion_oficial != null && (
                        <Concilliation data={conciliationDetail.conciliacion_oficial} dataBoleto = {ticketInformation.data[0]}/>

                      )}
                    </div>
                  )}

                  <HistoryExchange />




                </TabPanel>
              ))}
              {/*{currentTab === 'details' &&
                ticketInformation &&
                ticketInformation.data && (
                  <Details ticketInformation={ticketInformation} permission={permission} initFilter={initFilter} cargaConsi = {cargaConsiliation}/>
                )}*/}
              {currentTab === 'details' &&
                ticketInformation &&
                ticketInformation.errorTicket && (
                  <div>{ticketInformation.message}</div>
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
