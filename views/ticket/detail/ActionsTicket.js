import React, { useState } from 'react';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { Container, Select, MenuItem } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Confirm from '../../../../_pxp/components/Alert/Confirm';
import Pxp from '../../../../Pxp';
import LoadingScreen from '../../../../_pxp/components/LoadingScreen';
import siatInvoice from './SiatInvoice';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ActionsTicket = ({
  ticket,
  dataErp,
  initFilter,
  showButtonAnular,
  permission,
}) => {
  /* Aumentando para recuperar del Array exchange */
  const dataWithId = ticket.ExchangeTicket.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);
  /** ******************************************* */

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { ticketNumber } = ticket.ticketNumber;
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    dataRow: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [textArea, setTextArea] = useState('');

  const [values, setValues] = React.useState([
    { value: 1, desc: 'FACTURA MAL EMITIDA' },
    { value: 3, desc: 'DATOS DE EMISION INCORRECTOS' },
    { value: 4, desc: 'FACTURA O NOTA DE CREDITO-DEBITO DEVUELTA' },
  ]);
  const [selected, setSelected] = useState(1);

  function handleChange(event) {
    setSelected(event.target.value);
  }

  const handleDisabledTicket = (e) => {
    alert('asdasdas');
  };

  const handleConfirmDelete = (row) => {
    setConfirmDelete({
      open: true,
      data: row,
    });
  };

  const handleDelete = (row, valueMotive) => {
    console.log('textArea', valueMotive);
    // diff if is object or array
    // array is when the delete was executed with selections
    // object is when the delete was executed from actions menu
    let dataSiatToSend;
    let continueFetch = true;
    if (ticket.siatInvoice) {
      dataSiatToSend = ticket.siatInvoice.find(
        (si) => si.estado === 'VALIDADO POR SIAT',
      );
      console.log('dataSiatToSend', dataSiatToSend);
    }

    if (ticket.siatInvoice) {
      const pendienteDeEnvioAlSiat = ticket.siatInvoice.find(
        (si) => si.estado === 'PENDIENTE DE ENVIO AL SIAT',
      );
      if (pendienteDeEnvioAlSiat) {
        continueFetch = false;
      }
      if(!ticket.siatInvoice[0].estado) {
        continueFetch = false;
      }
    }

    if (continueFetch) {
      setLoading(true);
      Pxp.apiClient
        .doRequest({
          url: 'boakiu/Boleto/disabledTicket',
          ...(dataSiatToSend && {
            url: 'boakiu/Boleto/disabledTicketWithSiat',
          }),
          method: 'POST',
          params: {
            nro_tkt: ticket.ticketNumber,
            ticketNumber: ticket.ticketNumber,
            pnrCode: ticket.pnrCode,
            fecha_emision: moment(ticket.issueDate, 'YYYY-MM-DD').format(
              'DD/MM/YYYY',
            ),
            issueDate: moment(ticket.issueDate, 'YYYY-MM-DD').format(
              'YYYY-MM-DD',
            ),
            motivo: textArea,
            ...(dataSiatToSend && {
              siatInvoice: JSON.stringify(dataSiatToSend),
              motivoAnulacionSiat: selected,
            }),
          },
        })
        .then((resp) => {
          console.log(resp);
          setLoading(false);

          if (resp.success) {
            enqueueSnackbar(
              <div>
                ERP: ${resp.response_from_erp} STAGE:
                <pre
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                  }}
                >
                  {JSON.stringify(resp.response_from_stage, null, 2)}
                </pre>
              </div>,
              {
                variant: 'success',
                persist: false,
              },
            );

            initFilter(ticket.ticketNumber.trim());
          } else {
            enqueueSnackbar(resp.response_from_erp, {
              variant: 'error',
            });
          }
        })
        .catch((err) => {
          setLoading(false);

          enqueueSnackbar(err.message, {
            variant: 'error',
          });
        });
    } else {
      alert('NO PUEDES ANULAR ESTE BOLETO INTENTE MAS TARDE, PENDIENTE DE ENVIO AL SIAT');
    }
  };

  const handleTextArea = (e) => {
    setTextArea(e.target.value);
  };

  console.log('ticket.OriginalTicket', ticket.OriginalTicket);

  return (
    <>
      Acciones:{' '}
      {permission.permission === true && showButtonAnular && (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<RemoveShoppingCartIcon />}
          onClick={handleConfirmDelete}
          disabled={
            !(
              dataErp.estado_periodo &&
              dataErp.estado_periodo[0].estado === 'open'
            )
          }
        >
          Anular Boleto
        </Button>
      )}
      {ticket.OriginalTicket && (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ConfirmationNumberIcon />}
          onClick={() => {
            initFilter(ticket.OriginalTicket.ticketNumber.trim());
          }}
        >
          Original: {ticket.OriginalTicket.ticketNumber}
        </Button>
      )}
      {ticket.ExchangeTicket.length >= 1 &&
        dataWithId.map((row) => (
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<ConfirmationNumberIcon />}
            onClick={() => {
              initFilter(row.ExchangeTicket.trim());
            }}
          >
            Exchange: {row.ExchangeTicket}
          </Button>
        ))}
      {/* {ticket.ExchangeTicket && (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ConfirmationNumberIcon />}
          onClick={() => {
            initFilter(ticket.ExchangeTicket.trim());
          }}
        >
          Exchange: {ticket.ExchangeTicket}
        </Button>
      )} */}
      <Confirm
        openConfirm={confirmDelete.open}
        setOpenConfirm={setConfirmDelete}
        // dialogContentText={`¿Está seguro de Anular este boleto ${ticket.ticketNumber} ?`}
        dialogContentText={
          <div>
            ¿Está seguro de Anular este boleto {ticket.ticketNumber} ? <br />{' '}
            {ticket.siatInvoice && (
              <>
                <br />
                <Select
                  fullWidth
                  value={selected}
                  onChange={handleChange}
                  inputProps={{
                    name: 'agent',
                    id: 'age-simple',
                  }}
                >
                  {values.map((value, index) => {
                    return (
                      <MenuItem value={value.value}>{value.desc}</MenuItem>
                    );
                  })}
                </Select>
              </>
            )}
            <TextareaAutosize
              onChange={handleTextArea}
              style={{ width: '100%' }}
              value={textArea}
              aria-label="minimum height"
              rowsMin={3}
              placeholder="Cual es la razón para anular este boleto?"
            />
          </div>
        }
        data={confirmDelete.data}
        onConfirm={handleDelete}
        disagree="Cancelar"
        agree="Anular"
      />
      {loading && <LoadingScreen />}
    </>
  );
};

export default ActionsTicket;
