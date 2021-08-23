import React, { useState,useEffect } from 'react';
import * as Yup from "yup";
import Form from "../../../../_pxp/components/Form/Form";
import Typography from "@material-ui/core/Typography";
import Label from "../../../../_pxp/components/Label";
import Box from "@material-ui/core/Box";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles, makeStyles  } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import FormularioFormasPago from './FormularioFormasPago';


const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },    
  });


  const useStyles = makeStyles({
    root: {
      //background: '#F39F8E',
      color: 'red'
    }
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);



const ActionsMedioPago = ({dataTicket, initFilter, dataErp}) => {
      
      const classes = useStyles();

      const [open, setOpen] = React.useState(false);
      const [fullWidth, setFullWidth] = React.useState(true);
      const [maxWidth, setMaxWidth] = React.useState('sm');

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };


      const cerrarVentana = (valor) => {
        setOpen(valor);
      };

      

      const [cant_fp, setCantFp] = React.useState(1);
      const [envio, setEnvio] = React.useState(1);

      const reducirFp = () => {
        setCantFp(cant_fp-1);        
      };

      const aumentarFp = () => {        
        setCantFp(cant_fp+1);  
      };
      

      useEffect(() => {       
        setEnvio(cant_fp);

        if (cant_fp == 1 ) {
          setMaxWidth('md');
        } else if (cant_fp == 2 ) {
          setMaxWidth('lg');
        } else if (cant_fp == 3 ){
          setMaxWidth('xl');
        } else if (cant_fp >= 4 ){
          setMaxWidth('xl');
        }

      }, [cant_fp]);            

             return (  
            <div>
                
                <Tooltip title="Modificar Medios de Pago">
                    <Button variant="outlined" color="primary" classes={{root: classes.root}} onClick={handleClickOpen} >
                        MODIFICAR FORMAS DE PAGO <EditIcon />
                    </Button>
                </Tooltip>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={fullWidth} maxWidth={maxWidth}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Formulario para Modificar Medios de Pago
                    </DialogTitle>
                    <DialogContent dividers>     
                         <FormularioFormasPago key={envio} cantidad={envio} dataTicket ={dataTicket} CerrarVentana = {cerrarVentana} initFilter = {initFilter} dataErp = {dataErp}/>
                    </DialogContent>           
                    <DialogActions>
                      {(cant_fp > 1) && (<Button onClick={reducirFp} color="primary">
                                          Quitar Medio de Pago
                                        </Button>
                                        )
                      }                      
                      <Button onClick={aumentarFp} color="primary" autoFocus>
                        Agregar Medio de Pago
                      </Button>
                  </DialogActions>         
                </Dialog>


                      
            </div>
            );
};

export default ActionsMedioPago;
