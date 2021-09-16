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
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

import LoadingScreen from '../../../../_pxp/components/LoadingScreen';
import useJsonStore from '../../../../_pxp/hooks/useJsonStore';

import { useSnackbar } from 'notistack';
import moment from 'moment';




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



const ActionsMedioPagoTarjeta = ({ dataTicket, dataErp,  fp1Defecto, montoFp, nroTarjetaDefecto, nroAutorizacionDefecto, initFilter, fp2Defecto, montoFp2, nroTarjetaDefecto2, nroAutorizacionDefecto2, fpArray}) => {

      const [open, setOpen] = React.useState(false);

      const [loading, setLoading] = useState(false);


      /*Armar el json para generar las formas de pago*/
      const fp_count = (((fp1Defecto != null && fp1Defecto != '') && (fp2Defecto != null && fp2Defecto.total > 0))?2:1);

      /*/console.log("aqui llega el fp1",fp1Defecto);
      console.log("aqui llega el fp2",fp2Defecto);

      console.log([...Array(fp_count).keys()])*/

      const countArray = [...Array(fp_count).keys()];

      let columns = {};
      let group = {};

      countArray.forEach((e, index)=> {
        //console.log('e',e)
        //console.log('index',index)
        const num =index+1;

        let initialValueFp = [];
        let initialValueMonto;
        let initialValueNroTarjeta;
        let initialValueNroAutorizacion;
        let gridGroup = {};
        
        if (fp_count == 1) {
          gridGroup = { xs: 12, sm: 12 };
        } else {
          gridGroup = { xs: 12, sm: 6 };
        }

        if (num == 2) {
          initialValueFp = [((fp2Defecto != null && fp2Defecto.total > 0) ? ({
                                id_forma_pago:((fp2Defecto != null && fp2Defecto != '') ? ((fp2Defecto.datos[0] != undefined) ? fp2Defecto.datos[0].id_forma_pago : null) : null),
                                nombre:((fp2Defecto != null && fp2Defecto != '') ? ((fp2Defecto.datos[0] != undefined) ? fp2Defecto.datos[0].nombre : null) : null)
                            }): null)];

          initialValueMonto = montoFp2;
          initialValueNroTarjeta = nroTarjetaDefecto2;
          initialValueNroAutorizacion = nroAutorizacionDefecto2;
          

        } else {
          initialValueFp = [((fp1Defecto != null) ? ({
                                id_forma_pago:((fp1Defecto != null && fp1Defecto != '') ? ((fp1Defecto.datos[0] != undefined) ? fp1Defecto.datos[0].id_forma_pago : null) : null),
                                nombre:((fp1Defecto != null && fp1Defecto != '') ? ((fp1Defecto.datos[0] != undefined) ? fp1Defecto.datos[0].nombre : null) : null)
                            }): null)];
          
          initialValueMonto = montoFp;
          initialValueNroTarjeta = nroTarjetaDefecto;
          initialValueNroAutorizacion = nroAutorizacionDefecto;
          
        }

        

        columns[`forma_pago_${num}`] = {
          type: 'AutoComplete',
          label: 'Medio Pago',
          initialValue: ((initialValueFp != null && initialValueFp != '') ? initialValueFp[0] : null ),
          store: {
            url: 'ventas_facturacion/FormaPago/listarFormaPago',
            params: {
              start: '0',
              limit: '10',
              sort: 'id_medio_pago_pw',
              dir: 'ASC',
              sw_tipo_venta: 'BOLETOS',
              regionales: 'BOL',                   
            },
            parFilters: 'forpa.name#pago.fop_code',
            idDD: 'id_forma_pago',
            descDD: 'nombre',
            minChars: 2,                
            renderOption: (option) => {
              return (
                <Box display="flex" alignItems="center">
                  <div>
                    <Typography variant="body2" color="inherit">
                      <b>Medio de Pago:</b>
                          {option.nombre}
                    </Typography>
                    <Label color="success">
                          <b>Codigo:</b>
                          {option.codigo}
                    </Label>                          
                  </div>
                </Box>
              )
            }
          },
          remote: true,
          //gridForm: { xs: 12, sm: 12 },
          variant: 'outlined',
          isSearchable: true,
          /*validate: {
            shape: Yup.string().required('Required'),
          },*/
          helperText: '',
          onChange: (obj) => {        
            /**Aqui las validaciones para los medios de pago**/                  
            /*************************************************/
          },
          group: `groupMedioPago${num}`,
          disabled: true
        };


        columns[`num_tarjeta_${num}`] = {
          type: 'TextField',
          label: 'Número de Tarjeta',
          variant: 'outlined',
          initialValue: initialValueNroTarjeta,
          onChange: (obj) => {        
            /**Aqui las validaciones para los medios de pago**/
            obj.states[`num_tarjeta_${num}`].setValue(obj.value.trim());       
            /*************************************************/
          },
          validate: {
            shape: Yup.string().max(20, 'Tamaño maximo 20 digitos').required('Este Campo es Requerido'),
            
          },
          group: `groupMedioPago${num}`,
        };

        columns[`cod_tarjeta_${num}`] = {
          type: 'TextField',
          label: 'Codigo de Tarjeta',
          variant: 'outlined',
          initialValue: initialValueNroAutorizacion,
          
          validate: {
            shape: Yup.string().max(6, 'Tamaño maximo 6 digitos').required('Este Campo es Requerido'),
          },
          onChange: (obj) => {   
            obj.states[`cod_tarjeta_${num}`].setValue(obj.value.toUpperCase().trim());
          },
          group: `groupMedioPago${num}`,
        };

        columns[`monto_fp_${num}`] = {
          type: 'TextField',
          label: 'Monto',
          variant: 'outlined',
          initialValue: initialValueMonto,
          disabled: true,
          
         /* validate: {
            shape: Yup.string().max(6, 'Tamaño maximo 6 digitos').required('Este Campo es Requerido'),
          },*/
          group: `groupMedioPago${num}`,
        };
      
        group[`groupMedioPago${num}`] = {
          titleGroup: `Medio de Pago ${num}`,
          gridGroup
        }
      
      })

      //console.log('config',columns);
      //console.log('group',group);
      /*********************************************/


      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
      const { enqueueSnackbar } = useSnackbar();
      
      const [updateUrl, setUpdateUrl] = useState();

        useEffect(() => {        
            if (dataTicket.countryCode == 'BO' && ((dataErp.data_erp != '' &&  dataErp.data_erp != null) ? dataErp.data_erp.existe_erp : 'no') == 'si') {
                setUpdateUrl('boakiu/Boleto/modificarTarjetasErp');
                console.log("Modificaciones en ERP");
              //setUpdateUrl('boakiu/Boleto/modificarTarjetaStage');
            } else {              
              if (dataTicket.countryCode == 'BO') {
                setUpdateUrl('boakiu/Boleto/modificarTarjetaStage');
                console.log("Modificaciones solo STAGE");
              }
              //setUpdateUrl('boakiu/Boleto/modificarTarjetasErp');
            }
        }, [dataTicket]);


    const jsonFormMp = {
      
        columns: {           

            boleto_a_modificar: {
              type: 'TextField',
              label: 'BOLETO A MODIFICAR',
              variant: 'outlined',  
              initialValue:dataTicket.ticketNumber,            
              /*validate: {
                shape: Yup.string().required('Required'),
              },*/
              group: 'groupMedioPago1',
              disabled: true
              
          },

          ...columns,
        },

        groups: {
          ...group,
          },


          onSubmit: { 

            url: updateUrl,
            callback: (resp, dataForSending, obj) => {        
              
              if (resp.error == false) {
                enqueueSnackbar(
                  <div>                    
                    <pre
                      style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                      }}
                    >
                      {resp.data.mensaje_exito}
                    </pre>
                  </div>,
                  {
                    variant: 'success',
                    persist: false,
                  },
                );
      
                setOpen(false);
                initFilter(dataForSending.boleto_a_modificar.trim());

              } else {
                enqueueSnackbar(resp,{
                  variant: 'error',
                });
              }
              

              /*if (resp.error == false) { 
                setOpen(false);
                initFilter(dataForSending.boleto_a_modificar.trim());
              }       */       
            },
            extraParams: {
              /*Aqui los parametros Extra como ser la fecha*/
              fecha_emision : moment(dataTicket.issueDate, 'YYYY-MM-DD').format('DD/MM/YYYY',),
              issueDate: moment(dataTicket.issueDate, 'YYYY-MM-DD').format('YYYY-MM-DD',),
              nro_boleto: dataTicket.ticketNumber,

              nro_tarjeta_1_old: nroTarjetaDefecto,
              nro_autorizacion_1_old: nroAutorizacionDefecto,

              nro_tarjeta_2_old: nroTarjetaDefecto2,
              nro_autorizacion_2_old: nroAutorizacionDefecto2,
              /*******************************************/
            },

            
          },

        resetButton:false,
        submitLabel: 'Guardar'
    };

 


        return (  
            <div>
                
                <Tooltip title="Modificar Medios de Pago">
                    <Button variant="outlined" color="primary" onClick={handleClickOpen} >
                        EDITAR TARJETAS <EditIcon />
                    </Button>
                </Tooltip>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Formulario para Modificar Medios de Pago
                    </DialogTitle>
                    <DialogContent dividers>
                         <Form data={jsonFormMp} />
                    </DialogContent>                    
                </Dialog>

                {loading == true && <LoadingScreen />}


                      
            </div>
            );
};

export default ActionsMedioPagoTarjeta;
