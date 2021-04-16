import React, { useState } from 'react';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { Container } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Confirm from '../../../../_pxp/components/Alert/Confirm';
import Pxp from '../../../../Pxp';
import LoadingScreen from '../../../../_pxp/components/LoadingScreen';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ActionsTicket = ({
  ticket,
  initFilter,
  showButtonAnular,
  permission,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { ticketNumber } = ticket.ticketNumber;
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    dataRow: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [textArea, setTextArea] = useState('');

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
    setLoading(true);
    Pxp.apiClient
      .doRequest({
        url: 'boakiu/Boleto/disabledTicket',
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
  };

  const handleTextArea = (e) => {
    setTextArea(e.target.value);
  };

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
            initFilter(ticket.OriginalTicket.trim());
          }}
        >
          Original: {ticket.OriginalTicket}
        </Button>
      )}
      {ticket.ExchangeTicket && (
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
      )}
      <Confirm
        openConfirm={confirmDelete.open}
        setOpenConfirm={setConfirmDelete}
        // dialogContentText={`¿Está seguro de Anular este boleto ${ticket.ticketNumber} ?`}
        dialogContentText={
          <div>
            ¿Está seguro de Anular este boleto {ticket.ticketNumber} ? <br />{' '}
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
