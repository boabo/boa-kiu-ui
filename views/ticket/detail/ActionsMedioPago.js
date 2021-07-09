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



const ActionsMedioPago = ({ dataFormPago, dataTicket, dataErp }) => {

      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };


      /*const [updateUrl, setUpdateUrl] = useState();

    useEffect(() => {        
        if (dataTicket.countryCode == 'BO' && dataErp.datos_emision) {
          setUpdateUrl('seguridad/Persona/guardarPersona2');
        } else {
          setUpdateUrl('seguridad/Persona/guardarPersona');
        }
    }, [dataTicket]);*/

  

    const jsonFormMp = {
        columns: {
            id_moneda_1: {
                type: 'AutoComplete',
                label: 'Moneda',
                initialValue: null,
                store: {
                  url: 'parametros/Moneda/listarMoneda',
                  params: {
                    start: '0',
                    limit: '10',
                    sort: 'moneda',
                    dir: 'ASC',
                    filtrar: 'si',                    
                  },
                  parFilters: 'moneda.moneda#moneda.codigo#moneda.codigo_internacional',
                  idDD: 'id_moneda',
                  descDD: 'codigo_internacional',
                  minChars: 2,
                  renderOption: (option) => {
                    return (
                      <Box display="flex" alignItems="center">
                        <div>
                          <Typography variant="body2" color="inherit">
                            <b>Moneda:</b>
                                {option.moneda}
                          </Typography>
                          <Label color="success">
                                <b>Codigo:</b>
                                {option.codigo_internacional}
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
                  console.log('obj', obj)
                  //obj.states.nombre.setValue(obj.dataValue.nombre_completo1)
                },
                group: 'groupMedioPago1'
              },

            forma_pago_1: {
                type: 'AutoComplete',
                label: 'Medio Pago',
                initialValue: null,                
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
                  if (obj.dataValue != null) {
                    if (obj.dataValue.codigo == 'CA') {
                        console.log("aqui entra el dato por MP",obj);
                        obj.states.num_tarjeta_1.setIsHide(true);
                        obj.states.cod_tarjeta_1.setIsHide(true);
                        obj.states.mco_1.setIsHide(true);
                        obj.states.id_auxiliar_1.setIsHide(true);
                        obj.states.id_auxiliar_anticipo_1.setIsHide(true);
                        obj.states.id_venta_1.setIsHide(true);

                        obj.states.num_tarjeta_1.reset();
                        obj.states.cod_tarjeta_1.reset();
                        obj.states.mco_1.reset();
                        obj.states.id_auxiliar_1.reset();
                        obj.states.id_auxiliar_anticipo_1.reset();
                        obj.states.id_venta_1.reset();


                    } else if (obj.dataValue.codigo == 'CC') {
                        obj.states.num_tarjeta_1.setIsHide(false);
                        obj.states.cod_tarjeta_1.setIsHide(false);
                        obj.states.mco_1.setIsHide(true);
                        obj.states.id_auxiliar_1.setIsHide(true);
                        obj.states.id_auxiliar_anticipo_1.setIsHide(true);
                        obj.states.id_venta_1.setIsHide(true);

                        obj.states.mco_1.reset();
                        obj.states.id_auxiliar_1.reset();
                        obj.states.id_auxiliar_anticipo_1.reset();
                        obj.states.id_venta_1.reset();

                    } else if (obj.dataValue.codigo == 'MCO') {
                        obj.states.num_tarjeta_1.setIsHide(true);
                        obj.states.cod_tarjeta_1.setIsHide(true);
                        obj.states.mco_1.setIsHide(false);
                        obj.states.id_auxiliar_1.setIsHide(true);
                        obj.states.id_auxiliar_anticipo_1.setIsHide(true);
                        obj.states.id_venta_1.setIsHide(true);

                        obj.states.num_tarjeta_1.reset();
                        obj.states.cod_tarjeta_1.reset();
                        obj.states.id_auxiliar_1.reset();
                        obj.states.id_auxiliar_anticipo_1.reset();
                        obj.states.id_venta_1.reset();

                    } else if (obj.dataValue.codigo == 'CU') {
                        obj.states.num_tarjeta_1.setIsHide(true);
                        obj.states.cod_tarjeta_1.setIsHide(true);
                        obj.states.mco_1.setIsHide(true);
                        obj.states.id_auxiliar_1.setIsHide(false);
                        obj.states.id_auxiliar_anticipo_1.setIsHide(true);
                        obj.states.id_venta_1.setIsHide(true);

                        obj.states.num_tarjeta_1.reset();
                        obj.states.cod_tarjeta_1.reset();
                        obj.states.mco_1.reset();
                        obj.states.id_auxiliar_1.reset();
                        obj.states.id_auxiliar_anticipo_1.reset();
                        obj.states.id_venta_1.reset();

                    } else if (obj.dataValue.codigo == 'RANT') {
                        obj.states.num_tarjeta_1.setIsHide(true);
                        obj.states.cod_tarjeta_1.setIsHide(true);
                        obj.states.mco_1.setIsHide(true);
                        obj.states.id_auxiliar_1.setIsHide(true);
                        obj.states.id_auxiliar_anticipo_1.setIsHide(false);
                        obj.states.id_venta_1.setIsHide(false);

                        obj.states.num_tarjeta_1.reset();
                        obj.states.cod_tarjeta_1.reset();
                        obj.states.mco_1.reset();
                        obj.states.id_auxiliar_1.reset();
                    }
                  }


                  



                  /*************************************************/
                },
                group: 'groupMedioPago1'
              },
            
            num_tarjeta_1: {
                type: 'TextField',
                label: 'Número de Tarjeta',
                variant: 'outlined',
                hide:true,
                /*validate: {
                  shape: Yup.string().required('Required'),
                },*/
                group: 'groupMedioPago1',
            },

            cod_tarjeta_1: {
                type: 'TextField',
                label: 'Codigo de Tarjeta',
                variant: 'outlined',
                hide:true,
                /*validate: {
                  shape: Yup.string().required('Required'),
                },*/
                group: 'groupMedioPago1',
            },

            mco_1: {
                type: 'TextField',
                label: 'MCO',
                variant: 'outlined',
                hide:true,
                /*validate: {
                  shape: Yup.string().required('Required'),
                },*/
                group: 'groupMedioPago1',
            },

            id_auxiliar_1: {
                type: 'AutoComplete',
                label: 'Cuenta Corriente',
                initialValue: null,
                hide:true,
                store: {
                  url: 'contabilidad/Auxiliar/listarAuxiliar',
                  params: {
                    start: '0',
                    limit: '10',
                    sort: 'codigo_auxiliar',
                    dir: 'ASC',
                    corriente: 'si',
                    regionales: 'BOL',   
                    ro_activo: 'no',                
                  },
                  parFilters: 'auxcta.codigo_auxiliar#auxcta.nombre_auxiliar',
                  idDD: 'id_auxiliar',
                  descDD: 'nombre_auxiliar',
                  minChars: 2,
                  renderOption: (option) => {
                      console.log("aqui el option",option);
                    return (
                      <Box display="flex" alignItems="center">
                        <div>
                          <Typography variant="body2" color="inherit">
                            <b>Nombre:</b>
                                {option.nombre_auxiliar}
                          </Typography>
                          <Label color="success">
                                <b>Codigo:</b>
                                {option.codigo_auxiliar}
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
                  console.log('obj', obj)
                  //obj.states.nombre.setValue(obj.dataValue.nombre_completo1)
                },
                group: 'groupMedioPago1',
              },

              id_auxiliar_anticipo_1: {
                type: 'AutoComplete',
                label: 'Grupo',
                initialValue: null,
                hide:true,
                store: {
                  url: 'contabilidad/Auxiliar/listarAuxiliar',
                  params: {
                    start: '0',
                    limit: '10',
                    sort: 'codigo_auxiliar',
                    dir: 'ASC',
                    corriente: 'si',
                    regionales: 'BOL',   
                    ro_activo: 'si',                
                  },
                  parFilters: 'auxcta.codigo_auxiliar#auxcta.nombre_auxiliar',
                  idDD: 'id_auxiliar',
                  descDD: 'nombre_auxiliar',
                  minChars: 2,
                  renderOption: (option) => {
                      console.log("aqui el option",option);
                    return (
                      <Box display="flex" alignItems="center">
                        <div>
                          <Typography variant="body2" color="inherit">
                            <b>Nombre:</b>
                                {option.nombre_auxiliar}
                          </Typography>
                          <Label color="success">
                                <b>Codigo:</b>
                                {option.codigo_auxiliar}
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
                  console.log('id_auxiliar_seleccionado', obj);
                    obj.states.id_venta_1.reset();
                    obj.states.id_venta_1.store.data = null;

                    if (obj.dataValue != null) {
                        obj.states.id_venta_1.store.params.id_auxiliar_anticipo = obj.dataValue.id_auxiliar;                        
                    } else {
                        obj.states.id_venta_1.store.params.id_auxiliar_anticipo = null;                    
                    }

                    

                  //obj.states.nombre.setValue(obj.dataValue.nombre_completo1)
                },
                group: 'groupMedioPago1'
              },

              id_venta_1: {
                type: 'AutoComplete',
                label: 'Nro. Recibo',
                initialValue: null,
                hide:true,
                store: {
                  url: 'ventas_facturacion/Venta/listarReciboBoletosAmadeus',
                  params: {
                    start: '0',
                    limit: '10',
                    sort: 'v.nro_factura, v.nombre_factura',
                    dir: 'ASC',
                    corriente: 'si',
                    regionales: 'BOL',   
                    ro_activo: 'si',                
                  },
                  parFilters: 'v.nro_factura#v.nombre_factura',
                  idDD: 'id_venta',
                  descDD: 'nro_factura',
                  minChars: 2,
                  renderOption: (option) => {
                      console.log("aqui el option",option);
                    return (
                      <Box display="flex" alignItems="center">
                        <div>
                          <Typography variant="body2" color="inherit">
                            <b>Número:</b>
                                {option.nro_factura}
                          </Typography>
                          <Typography variant="body2" color="inherit">
                            <b>Nombre:</b>
                                {option.nombre_factura}
                          </Typography>
                          <Label color="success">
                                <b>Monto:</b>
                                {option.total_venta} 
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
                  console.log('obj', obj)
                  //obj.states.nombre.setValue(obj.dataValue.nombre_completo1)
                },
                group: 'groupMedioPago1'
              },

              monto_fp_1: {
                type: 'TextField',
                label: 'Monto',
                variant: 'outlined',                
                /*validate: {
                  shape: Yup.string().required('Required'),
                },*/
                group: 'groupMedioPago1',
            },

              /*****Aqui el segundo Grupo de los medios de pago*****/
              id_moneda_2: {
                type: 'AutoComplete',
                label: 'Moneda',
                initialValue: null,
                store: {
                  url: 'parametros/Moneda/listarMoneda',
                  params: {
                    start: '0',
                    limit: '10',
                    sort: 'moneda',
                    dir: 'ASC',
                    filtrar: 'si',                    
                  },
                  parFilters: 'moneda.moneda#moneda.codigo#moneda.codigo_internacional',
                  idDD: 'id_moneda',
                  descDD: 'codigo_internacional',
                  minChars: 2,
                  renderOption: (option) => {
                    return (
                      <Box display="flex" alignItems="center">
                        <div>
                          <Typography variant="body2" color="inherit">
                            <b>Moneda:</b>
                                {option.moneda}
                          </Typography>
                          <Label color="success">
                                <b>Codigo:</b>
                                {option.codigo_internacional}
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
                  console.log('obj', obj)
                  //obj.states.nombre.setValue(obj.dataValue.nombre_completo1)
                },
                group: 'groupMedioPago2'
              },

            forma_pago_2: {
                type: 'AutoComplete',
                label: 'Medio Pago',
                initialValue: null,
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
                      console.log("aqui el option",option);
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
                    if (obj.dataValue != null) {
                      if (obj.dataValue.codigo == 'CA') {
                          console.log("aqui entra el dato por MP",obj);
                          obj.states.num_tarjeta_2.setIsHide(true);
                          obj.states.cod_tarjeta_2.setIsHide(true);
                          obj.states.mco_2.setIsHide(true);
                          obj.states.id_auxiliar_2.setIsHide(true);
                          obj.states.id_auxiliar_anticipo_2.setIsHide(true);
                          obj.states.id_venta_2.setIsHide(true);
  
                          obj.states.num_tarjeta_2.reset();
                          obj.states.cod_tarjeta_2.reset();
                          obj.states.mco_2.reset();
                          obj.states.id_auxiliar_2.reset();
                          obj.states.id_auxiliar_anticipo_2.reset();
                          obj.states.id_venta_2.reset();
  
  
                      } else if (obj.dataValue.codigo == 'CC') {
                          obj.states.num_tarjeta_2.setIsHide(false);
                          obj.states.cod_tarjeta_2.setIsHide(false);
                          obj.states.mco_2.setIsHide(true);
                          obj.states.id_auxiliar_2.setIsHide(true);
                          obj.states.id_auxiliar_anticipo_2.setIsHide(true);
                          obj.states.id_venta_2.setIsHide(true);
  
                          obj.states.mco_2.reset();
                          obj.states.id_auxiliar_2.reset();
                          obj.states.id_auxiliar_anticipo_2.reset();
                          obj.states.id_venta_2.reset();
  
                      } else if (obj.dataValue.codigo == 'MCO') {
                          obj.states.num_tarjeta_2.setIsHide(true);
                          obj.states.cod_tarjeta_2.setIsHide(true);
                          obj.states.mco_2.setIsHide(false);
                          obj.states.id_auxiliar_2.setIsHide(true);
                          obj.states.id_auxiliar_anticipo_2.setIsHide(true);
                          obj.states.id_venta_2.setIsHide(true);
  
                          obj.states.num_tarjeta_2.reset();
                          obj.states.cod_tarjeta_2.reset();
                          obj.states.id_auxiliar_2.reset();
                          obj.states.id_auxiliar_anticipo_2.reset();
                          obj.states.id_venta_2.reset();
  
                      } else if (obj.dataValue.codigo == 'CU') {
                          obj.states.num_tarjeta_2.setIsHide(true);
                          obj.states.cod_tarjeta_2.setIsHide(true);
                          obj.states.mco_2.setIsHide(true);
                          obj.states.id_auxiliar_2.setIsHide(false);
                          obj.states.id_auxiliar_anticipo_2.setIsHide(true);
                          obj.states.id_venta_2.setIsHide(true);
  
                          obj.states.num_tarjeta_2.reset();
                          obj.states.cod_tarjeta_2.reset();
                          obj.states.mco_2.reset();
                          obj.states.id_auxiliar_2.reset();
                          obj.states.id_auxiliar_anticipo_2.reset();
                          obj.states.id_venta_2.reset();
  
                      } else if (obj.dataValue.codigo == 'RANT') {
                          obj.states.num_tarjeta_2.setIsHide(true);
                          obj.states.cod_tarjeta_2.setIsHide(true);
                          obj.states.mco_2.setIsHide(true);
                          obj.states.id_auxiliar_2.setIsHide(true);
                          obj.states.id_auxiliar_anticipo_2.setIsHide(false);
                          obj.states.id_venta_2.setIsHide(false);
  
                          obj.states.num_tarjeta_2.reset();
                          obj.states.cod_tarjeta_2.reset();
                          obj.states.mco_2.reset();
                          obj.states.id_auxiliar_2.reset();
                      }
                    }
  
  
                    
  
  
  
                    /*************************************************/
                  },
                group: 'groupMedioPago2'
              },
            
            num_tarjeta_2: {
                type: 'TextField',
                label: 'Número de Tarjeta',
                variant: 'outlined',
                hide:true,
                /*validate: {
                  shape: Yup.string().required('Required'),
                },*/
                group: 'groupMedioPago2',
            },

            cod_tarjeta_2: {
                type: 'TextField',
                label: 'Codigo de Tarjeta',
                variant: 'outlined',
                hide:true,
                /*validate: {
                  shape: Yup.string().required('Required'),
                },*/
                group: 'groupMedioPago2',
            },

            mco_2: {
                type: 'TextField',
                label: 'MCO',
                variant: 'outlined',
                hide:true,
                /*validate: {
                  shape: Yup.string().required('Required'),
                },*/
                group: 'groupMedioPago2',
            },

            id_auxiliar_2: {
                type: 'AutoComplete',
                label: 'Cuenta Corriente',
                initialValue: null,
                hide:true,
                store: {
                  url: 'contabilidad/Auxiliar/listarAuxiliar',
                  params: {
                    start: '0',
                    limit: '10',
                    sort: 'codigo_auxiliar',
                    dir: 'ASC',
                    corriente: 'si',
                    regionales: 'BOL',   
                    ro_activo: 'no',                
                  },
                  parFilters: 'auxcta.codigo_auxiliar#auxcta.nombre_auxiliar',
                  idDD: 'id_auxiliar',
                  descDD: 'nombre_auxiliar',
                  minChars: 2,
                  renderOption: (option) => {
                      console.log("aqui el option",option);
                    return (
                      <Box display="flex" alignItems="center">
                        <div>
                          <Typography variant="body2" color="inherit">
                            <b>Nombre:</b>
                                {option.nombre_auxiliar}
                          </Typography>
                          <Label color="success">
                                <b>Codigo:</b>
                                {option.codigo_auxiliar}
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
                  console.log('obj', obj)
                  //obj.states.nombre.setValue(obj.dataValue.nombre_completo1)
                },
                group: 'groupMedioPago2',
              },

              id_auxiliar_anticipo_2: {
                type: 'AutoComplete',
                label: 'Grupo',
                initialValue: null,
                hide:true,
                store: {
                  url: 'contabilidad/Auxiliar/listarAuxiliar',
                  params: {
                    start: '0',
                    limit: '10',
                    sort: 'codigo_auxiliar',
                    dir: 'ASC',
                    corriente: 'si',
                    regionales: 'BOL',   
                    ro_activo: 'si',                
                  },
                  parFilters: 'auxcta.codigo_auxiliar#auxcta.nombre_auxiliar',
                  idDD: 'id_auxiliar',
                  descDD: 'nombre_auxiliar',
                  minChars: 2,
                  renderOption: (option) => {
                      console.log("aqui el option",option);
                    return (
                      <Box display="flex" alignItems="center">
                        <div>
                          <Typography variant="body2" color="inherit">
                            <b>Nombre:</b>
                                {option.nombre_auxiliar}
                          </Typography>
                          <Label color="success">
                                <b>Codigo:</b>
                                {option.codigo_auxiliar}
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
                  console.log('obj', obj)
                  //obj.states.nombre.setValue(obj.dataValue.nombre_completo1)
                },
                group: 'groupMedioPago2'
              },

              id_venta_2: {
                type: 'AutoComplete',
                label: 'Nro. Recibo',
                hide:true,
                initialValue: null,
                store: {
                  url: 'ventas_facturacion/Venta/listarReciboBoletosAmadeus',
                  params: {
                    start: '0',
                    limit: '10',
                    sort: 'v.nro_factura, v.nombre_factura',
                    dir: 'ASC',
                    corriente: 'si',
                    regionales: 'BOL',   
                    ro_activo: 'si',                
                  },
                  parFilters: 'v.nro_factura#v.nombre_factura',
                  idDD: 'id_venta',
                  descDD: 'nro_factura',
                  minChars: 2,
                  renderOption: (option) => {
                      console.log("aqui el option",option);
                    return (
                      <Box display="flex" alignItems="center">
                        <div>
                          <Typography variant="body2" color="inherit">
                            <b>Número:</b>
                                {option.nro_factura}
                          </Typography>
                          <Typography variant="body2" color="inherit">
                            <b>Nombre:</b>
                                {option.nombre_factura}
                          </Typography>
                          <Label color="success">
                                <b>Monto:</b>
                                {option.total_venta} 
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
                  console.log('obj', obj)
                  //obj.states.nombre.setValue(obj.dataValue.nombre_completo1)
                },
                group: 'groupMedioPago2'
              },

              monto_fp_2: {
                type: 'TextField',
                label: 'Monto',
                variant: 'outlined',                
                /*validate: {
                  shape: Yup.string().required('Required'),
                },*/
                group: 'groupMedioPago2',
            },
              /*****************************************************/
              


        },

        groups: {
            groupMedioPago1: {
              titleGroup: 'Medio de Pago 1',              
              gridGroup: { xs: 12, sm: 6 },
            },
            groupMedioPago2: {
              titleGroup: 'Medio de Pago 2',
              gridGroup: { xs: 12, sm: 6 },              
            },

          },

          /* onSubmit: { 

            url: updateUrl,
            callback: (resp, dataForSending) => {
              console.log(resp);
              console.log(dataForSending);
      
            },
            extraParams: {
              
            },
          }, */

        resetButton:false,
        submitLabel: 'Guardar'
    };

    



        return (  
            <div>
                
                <Tooltip title="Modificar Medios de Pago">
                    <Button variant="outlined" color="primary" onClick={handleClickOpen} >
                        <EditIcon />
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


                      
            </div>
            );
};

export default ActionsMedioPago;
