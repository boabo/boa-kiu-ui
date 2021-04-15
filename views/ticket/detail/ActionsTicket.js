import React, { useState } from 'react';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import Confirm from '../../../../_pxp/components/Alert/Confirm';
import Pxp from '../../../../Pxp';
import LoadingScreen from "../../../../_pxp/components/LoadingScreen";
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ActionsTicket = ({ ticket, initFilter }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    dataRow: undefined,
  });
  const [loading, setLoading] = useState(false);

  const handleDisabledTicket = (e) => {
    alert('asdasdas');
  };

  const handleConfirmDelete = (row) => {
    setConfirmDelete({
      open: true,
      data: row,
    });
  };

  const handleDelete = (row) => {
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
          fecha_emision: moment(ticket.issueDate, 'YYYY-MM-DD').format('DD/MM/YYYY'),
          issueDate: moment(ticket.issueDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        },
      })
      .then((resp) => {
        console.log(resp);
        setLoading(false);

        if(resp.success) {
          enqueueSnackbar('Success', {
            variant: 'success',
            action: <Button>See all</Button>,
          });
          initFilter(ticket.ticketNumber);
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

  return (
    <>
      Acciones:{' '}
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<RemoveShoppingCartIcon />}
        onClick={handleConfirmDelete}
      >
        Anular Boleto
      </Button>
      <Confirm
        openConfirm={confirmDelete.open}
        setOpenConfirm={setConfirmDelete}
        dialogContentText={`¿Está seguro de Anular este boleto ${ticket.ticketNumber} ?`}
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
