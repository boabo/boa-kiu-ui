import React, { useState,useEffect,useRef } from 'react';
import * as Yup from "yup";
import Form from "../../../../_pxp/components/Form/Form";
import Typography from "@material-ui/core/Typography";
import Label from "../../../../_pxp/components/Label";
import Box from "@material-ui/core/Box";
import moment from 'moment';
import { useSnackbar } from 'notistack';

const ActionsMedioPagoTarjeta = ({cantidad, dataTicket, CerrarVentana, initFilter, dataErp, medio_pago_defecto, data_defecto, paymentOriginales }) => {  
  
    console.log("aqui DATOS PARA LA dataTicket",dataTicket);
    console.log("aqui DATOS PARA LA medio_pago_defecto",medio_pago_defecto);
    console.log("aqui DATOS PARA LA data_defecto",data_defecto);
    console.log("aqui DATOS PARA LA paymentOriginales",paymentOriginales);
      
    const [updateUrl, setUpdateUrl] = useState();
    useEffect(() => {        
        if (dataTicket.countryCode == 'BO' && ((dataErp.data_erp != '' &&  dataErp.data_erp != null) ? dataErp.data_erp.datos_emision : null) != null) {
          setUpdateUrl('boakiu/MediosPagoBoleto/ModificarMedioPago');  
          //setUpdateUrl('boakiu/MediosPagoBoleto/ModificarMedioPagoStage');                     
          console.log("Modificaciones en ERP");          
        } else {  
          if (dataTicket.countryCode == 'BO') {
            setUpdateUrl('boakiu/MediosPagoBoleto/ModificarMedioPagoStage');           
            console.log("Modificaciones solo STAGE");  
          }            
                  
        }
    }, [dataTicket]);
    
     const { enqueueSnackbar } = useSnackbar();

     const countArray = [...Array(cantidad).keys()];

     let columns = {};
     let group = {};
     let gridGroup = {};
     let listar_recibo = '';


     if (dataTicket.countryCode == 'BO' && ((dataErp.data_erp != '' &&  dataErp.data_erp != null) ? dataErp.data_erp.datos_emision : null) != null) {
       console.log("entra aqui para ERP");
       listar_recibo = 'si';      
    } else {  
      if (dataTicket.countryCode == 'BO') {
        console.log("aqui SOLO STAGE");
        listar_recibo = 'no';
      }            
              
    }


     countArray.forEach((e, index)=> {
       //console.log('e',e)
       //console.log('index',index)
       const num =index+1;
       const num_array =index;
       
       if (cantidad == 1) {
        gridGroup = { xs: 12, sm: 6 };
      } else if (cantidad == 2 ) {
        gridGroup = { xs: 12, sm: 4 };
      } else if (cantidad == 3 ) {
        gridGroup = { xs: 12, sm: 3 };
      } else if (cantidad >= 4 ){
        gridGroup = { xs: 12, sm: 3 };
      }
      
      columns[`pay_Currency_${num}`] = {
        type: 'TextField',
        label: 'PayCurrency',
        variant: 'outlined',
        initialValue: (paymentOriginales == 'si' ? (((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].paymentCurrency : null) : null)) : ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].payCurrency : null) : null)),  
        group: `groupMedioPago${num}`,
        form: false,
        //hide: true,
      }; 


       columns[`id_moneda_${num}`] = {
        type: 'AutoComplete',
        label: 'Moneda',
        initialValue: paymentOriginales == 'si' ? ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? {id_moneda : (data_defecto[num_array].paymentCurrency = 'BOB')?1:2, codigo_internacional:data_defecto[num_array].paymentCurrency } : null) : null):((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? {id_moneda : (data_defecto[num_array].payCurrency = 'BOB')?1:2, codigo_internacional:data_defecto[num_array].payCurrency } : null) : null),
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
          console.log("aqui llega de la moneda al seleccionar",obj);
          /**Aqui las validaciones para los medios de pago**/  
          obj.states[`id_venta_${num}`].store.set({
            ...obj.states[`id_venta_${num}`].store.state,
            params: {
              ...obj.states[`id_venta_${num}`].store.state.params,
              id_moneda: (obj.dataValue) != null ? obj.dataValue.id_moneda : null, // added the id_persona to params
            },
          });
        
          if (obj.dataValue != null ) {
            obj.states[`pay_Currency_${num}`].setValue(obj.dataValue.codigo_internacional);
          } else {
            obj.states[`pay_Currency_${num}`].reset();
          }
          
          /*************************************************/
        },
        group: `groupMedioPago${num}`,        
      };

      columns[`pay_Code_${num}`] = {
        type: 'TextField',
        label: 'PayCode',
        variant: 'outlined',
        initialValue: paymentOriginales == 'si' ? ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].paymentCode: null) : null):((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].payCode: null) : null),  
        group: `groupMedioPago${num}`,
        form: false,
        //hide: true,
      }; 

      columns[`pay_Description_${num}`] = {
        type: 'TextField',
        label: 'payDescription',
        variant: 'outlined',
        initialValue: paymentOriginales == 'si' ? ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].paymentDescription :null ): null):((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].payDescription :null ): null),
        group: `groupMedioPago${num}`,
        form: false,
        //hide: true,
      }; 

      columns[`pay_MethodCode_${num}`] = {
        type: 'TextField',
        label: 'payMethodCode',
        variant: 'outlined',
        initialValue: paymentOriginales == 'si' ? ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].paymentMethodCode : null ): null):((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].payMethodCode : null ): null),
        group: `groupMedioPago${num}`,
        form: false,
        //hide: true,
      }; 

      columns[`pay_MethodDescription_${num}`] = {
        type: 'TextField',
        label: 'payMethodDescription',
        variant: 'outlined',
        initialValue: paymentOriginales == 'si' ? ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].payMethodDescription : null ): null):((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].payMethodDescription : null ): null),
        group: `groupMedioPago${num}`,
        form: false,
        //hide: true,
      }; 

       columns[`forma_pago_${num}`] = {
        type: 'AutoComplete',
        label: 'Medio Pago',
        initialValue: paymentOriginales == 'si' ? ((medio_pago_defecto[num_array] != undefined && medio_pago_defecto[num_array] != '' && medio_pago_defecto[num_array] != null) ? ((medio_pago_defecto[num_array].data_medio_pago[0] != null && medio_pago_defecto[num_array].data_medio_pago[0] != '' && medio_pago_defecto[num_array].data_medio_pago[0] != undefined) ? medio_pago_defecto[num_array].data_medio_pago[0] : null) : null):(medio_pago_defecto[num_array] != undefined ? ((medio_pago_defecto[num_array].data_medio_pago[0] != null && medio_pago_defecto[num_array].data_medio_pago[0] != '' && medio_pago_defecto[num_array].data_medio_pago[0] != undefined ) ? medio_pago_defecto[num_array].data_medio_pago[0]:null) : null),
        store: {
          url: 'ventas_facturacion/FormaPago/listarFormaPago',
          params: {
            start: '0',
            limit: '10',
            sort: 'id_medio_pago_pw',
            dir: 'ASC',
            sw_tipo_venta: 'BOLETOS',
            regionales: 'BOL',
            incluye_recibo : listar_recibo                 
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
                obj.states[`num_tarjeta_${num}`].setIsHide(true);
                obj.states[`cod_tarjeta_${num}`].setIsHide(true);
                obj.states[`mco_${num}`].setIsHide(true);
                obj.states[`id_auxiliar_${num}`].setIsHide(true);
                obj.states[`id_auxiliar_anticipo_${num}`].setIsHide(true);
                obj.states[`id_venta_${num}`].setIsHide(true);

                obj.states[`num_tarjeta_${num}`].reset();
                obj.states[`cod_tarjeta_${num}`].reset();
                obj.states[`mco_${num}`].reset();
                obj.states[`id_auxiliar_${num}`].reset();
                obj.states[`id_auxiliar_anticipo_${num}`].reset();
                obj.states[`id_venta_${num}`].reset();


            } else if (obj.dataValue.codigo == 'CC') {
                obj.states[`num_tarjeta_${num}`].setIsHide(false);
                obj.states[`num_tarjeta_${num}`].setYupValidate(false);



                obj.states[`cod_tarjeta_${num}`].setIsHide(false);
                obj.states[`mco_${num}`].setIsHide(true);
                obj.states[`id_auxiliar_${num}`].setIsHide(true);
                obj.states[`id_auxiliar_anticipo_${num}`].setIsHide(true);
                obj.states[`id_venta_${num}`].setIsHide(true);

                obj.states[`mco_${num}`].reset();
                obj.states[`id_auxiliar_${num}`].reset();
                obj.states[`id_auxiliar_anticipo_${num}`].reset();
                obj.states[`id_venta_${num}`].reset();

            } else if (obj.dataValue.codigo == 'MCO') {
                obj.states[`num_tarjeta_${num}`].setIsHide(true);
                obj.states[`cod_tarjeta_${num}`].setIsHide(true);
                obj.states[`mco_${num}`].setIsHide(false);
                obj.states[`id_auxiliar_${num}`].setIsHide(true);
                obj.states[`id_auxiliar_anticipo_${num}`].setIsHide(true);
                obj.states[`id_venta_${num}`].setIsHide(true);

                obj.states[`num_tarjeta_${num}`].reset();
                obj.states[`cod_tarjeta_${num}`].reset();
                obj.states[`id_auxiliar_${num}`].reset();
                obj.states[`id_auxiliar_anticipo_${num}`].reset();
                obj.states[`id_venta_${num}`].reset();

            } else if (obj.dataValue.codigo == 'CU') {
                obj.states[`num_tarjeta_${num}`].setIsHide(true);
                obj.states[`cod_tarjeta_${num}`].setIsHide(true);
                obj.states[`mco_${num}`].setIsHide(true);
                obj.states[`id_auxiliar_${num}`].setIsHide(false);
                obj.states[`id_auxiliar_anticipo_${num}`].setIsHide(true);
                obj.states.id_venta_1.setIsHide(true);

                obj.states[`num_tarjeta_${num}`].reset();
                obj.states[`cod_tarjeta_${num}`].reset();
                obj.states[`mco_${num}`].reset();
                obj.states[`id_auxiliar_${num}`].reset();
                obj.states[`id_auxiliar_anticipo_${num}`].reset();
                obj.states[`id_venta_${num}`].reset();

            } else if (obj.dataValue.codigo == 'RANT') {
                obj.states[`num_tarjeta_${num}`].setIsHide(true);
                obj.states[`cod_tarjeta_${num}`].setIsHide(true);
                obj.states[`mco_${num}`].setIsHide(true);
                obj.states[`id_auxiliar_${num}`].setIsHide(true);
                obj.states[`id_auxiliar_anticipo_${num}`].setIsHide(false);
                obj.states[`id_venta_${num}`].setIsHide(false);

                obj.states[`num_tarjeta_${num}`].reset();
                obj.states[`cod_tarjeta_${num}`].reset();
                obj.states[`mco_${num}`].reset();
                obj.states[`id_auxiliar_${num}`].reset();
            }

            if (obj.dataValue != null ) {
              obj.states[`pay_Code_${num}`].setValue(obj.dataValue.codigo);
              obj.states[`pay_Description_${num}`].setValue(obj.dataValue.nombre_fp);
              obj.states[`pay_MethodCode_${num}`].setValue(obj.dataValue.codigo_fp);
              obj.states[`pay_MethodDescription_${num}`].setValue(obj.dataValue.nombre);
              
              
            } else {
              obj.states[`pay_Code_${num}`].reset();
              obj.states[`pay_Description_${num}`].reset();
              obj.states[`pay_MethodCode_${num}`].reset();
              obj.states[`pay_MethodDescription_${num}`].reset();
            } 

          }
          /*************************************************/
        },
        group: `groupMedioPago${num}`,
      };
         
       columns[`num_tarjeta_${num}`] = {
         type: 'TextField',
         label: 'Número de Tarjeta',
         variant: 'outlined',
         initialValue: ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].creditCardNumber.trim() : null) : null),         
         validate: {
           shape: Yup.string().max(20, 'Tamaño maximo 20 digitos'),           
         },
         group: `groupMedioPago${num}`,
         hide: paymentOriginales == 'si' ? ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? (data_defecto[num_array].creditCardNumber.trim() != '' ? false : true):true) : true):((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? (data_defecto[num_array].creditCardNumber!='' ? false : true):true) : true),
       };    
       
       columns[`cod_tarjeta_${num}`] = {
        type: 'TextField',
        label: 'Código de Tarjeta',
        variant: 'outlined',     
        initialValue: paymentOriginales == 'si' ? ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].authorizationCode.trim() : null) : null):((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].authorizationCode : null) : null),         
        validate: {
          shape: Yup.string().max(6, 'Tamaño maximo 6 digitos'),           
          shape: Yup.string().min(6, 'Tamaño maximo 6 digitos'),           
        },
        onChange: (obj) => {   
          obj.states[`cod_tarjeta_${num}`].setValue(obj.value.toUpperCase());
          console.log("Aqui llega el cambio",obj); 
          console.log("Aqui llega el cambio",obj.value.toUpperCase()); 
        },
        group: `groupMedioPago${num}`,
        hide: paymentOriginales == 'si' ? ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? ((data_defecto[num_array].authorizationCode.trim() != '') ? false:true) : true) : true ):((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? ((data_defecto[num_array].authorizationCode != '') ? false:true) : true) : true )
      }; 

      columns[`mco_${num}`] = {
        type: 'TextField',
        label: 'MCO',
        variant: 'outlined',
        initialValue: '',    
        group: `groupMedioPago${num}`,
        hide:true
      }; 


      columns[`pay_InstanceDescription_${num}`] = {
        type: 'TextField',
        label: 'payInstanceDescription',
        variant: 'outlined',
        initialValue: ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].payInstanceDescription:null) : null), 
        group: `groupMedioPago${num}`,
        form: false,
        //hide: true,
      }; 

      columns[`pay_InstanceCode_${num}`] = {
        type: 'TextField',
        label: 'payInstanceDescription',
        variant: 'outlined',
        initialValue: ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].payInstanceCode : null) : null), 
        group: `groupMedioPago${num}`,
        form: false,
        //hide: true,
      };

      columns[`id_auxiliar_${num}`] = {
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
          /**Aqui las validaciones para los medios de pago**/  
          console.log("aqui llega data axuliar",obj);
          if (obj.dataValue != null ) {
            obj.states[`pay_InstanceDescription_${num}`].setValue(obj.dataValue.nombre_auxiliar);
            obj.states[`pay_InstanceCode_${num}`].setValue(obj.dataValue.codigo_auxiliar);
             
          } else {
            obj.states[`pay_InstanceDescription_${num}`].reset();
            obj.states[`pay_InstanceCode_${num}`].reset();
          } 
                       
          /*************************************************/
        },
        group: `groupMedioPago${num}`,       
      }; 

      columns[`id_auxiliar_anticipo_${num}`] = {
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
          /**Aqui las validaciones para los medios de pago**/  
          console.log("aqui llega del anticipo",obj);
          obj.states[`id_venta_${num}`].store.set({
            ...obj.states[`id_venta_${num}`].store.state,
            params: {
              ...obj.states[`id_venta_${num}`].store.state.params,
              id_auxiliar_anticipo: (obj.dataValue != null ? obj.dataValue.id_auxiliar : null), // added the id_persona to params
            },
          });                              
          /*************************************************/
        },
        group: `groupMedioPago${num}`,        
      }; 


      columns[`saldo_recibo_${num}`] = {
        type: 'TextField',
        label: 'Saldo Recibo',
        variant: 'outlined',
        initialValue: '',  
        group: `groupMedioPago${num}`,
        form: false
      };   

      columns[`id_venta_${num}`] = {
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
                        <div dangerouslySetInnerHTML={{ __html: option.tex_saldo }}/>

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
          console.log("aqui llega de la venta",obj);         
           if (obj.dataValue != null ) {
            obj.states[`saldo_recibo_${num}`].setValue(obj.dataValue.saldo);
             
          } else {
            obj.states[`saldo_recibo_${num}`].reset();
          }    
          /*************************************************/
        },
        group: `groupMedioPago${num}`,
        //disabled: true
      }; 

      columns[`monto_fp_${num}`] = {
        type: 'TextField',
        label: 'Monto',
        variant: 'outlined',
        initialValue: paymentOriginales == 'si' ? ((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].paymentAmount.toString() : null) : null):((data_defecto != '' && data_defecto != null && data_defecto != undefined) ? (data_defecto[num_array] != undefined ? data_defecto[num_array].payAmount.toString() : null) : null),
        /* onChange: (obj) => {   

          console.log("aqui el total de la venta",obj);
          setTotalVentaDivision(totalVenta - obj.value);

          console.log("aqui el total de la venta",totalVenta);
        }, */
        group: `groupMedioPago${num}`,
      };

       group[`groupMedioPago${num}`] = {
        titleGroup: `Medio de Pago ${num}`, 
        gridGroup       
      }
     
     })

     const jsonFormMp = {
      
        columns: { 

          boleto_a_modificar: {
            type: 'TextField',
            label: 'BOLETO A MODIFICAR',
            variant: 'outlined',  
            initialValue: dataTicket.ticketNumber.trim(),            
            /*validate: {
              shape: Yup.string().required('Required'),
            },*/
            group: 'datos_boleto',
            disabled: true
            
        },        

        fecha_emision: {
          type: 'TextField',
          label: 'FECHA EMISIÓN',
          variant: 'outlined',  
          initialValue:  moment( dataTicket.issueDate, 'YYYY-MM-DD').format('YYYY-MM-DD',),            
          /*validate: {
            shape: Yup.string().required('Required'),
          },*/
          group: 'datos_boleto',
          disabled: true
          
      },   

      total_venta: {
          type: 'TextField',
          label: 'TOTAL BOLETO',
          variant: 'outlined',  
          initialValue:  dataTicket.totalAmount,            
          /*validate: {
            shape: Yup.string().required('Required'),
          },*/
          group: 'datos_boleto',
          disabled: true
          
      },  

      comision_venta: {
        type: 'TextField',
        label: 'COMISIÓN AGENCIA',
        variant: 'outlined',  
        initialValue:  (dataErp.data_erp.comision_erp != null ? dataErp.data_erp.comision_erp.comision.toString() : '0'),            
        /*validate: {
          shape: Yup.string().required('Required'),
        },*/
        group: 'datos_boleto',
        disabled: true
        
    },

    total_venta_comision: {
      type: 'TextField',
      label: 'TOTAL VENTA COMISIÓN',
      variant: 'outlined',  
      initialValue:  (dataErp.data_erp.comision_erp != null ? (dataTicket.totalAmount-dataErp.data_erp.comision_erp.comision).toString() : '0'),            
      /*validate: {
        shape: Yup.string().required('Required'),
      },*/
      group: 'datos_boleto',
      disabled: true
      
  },

      moneda_venta: {
        type: 'TextField',
        label: 'MONEDA',
        variant: 'outlined',  
        initialValue:  dataTicket.currency,            
        /*validate: {
          shape: Yup.string().required('Required'),
        },*/
        group: 'datos_boleto',
        disabled: true
        
    },  

       

          ...columns,
        },

        groups: {

          datos_boleto: {
            titleGroup: 'Datos del Boleto', 
            gridGroup : gridGroup
          },

          ...group,
          },


           onSubmit: {       

            url: updateUrl,
            callback: (resp, dataForSending, obj) => {

              if (resp.success) {
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
      
                CerrarVentana(false);
                initFilter(dataTicket.ticketNumber.trim());

              } else {
                CerrarVentana(false);
                enqueueSnackbar(resp.data.mensaje_exito,{
                  variant: 'error',
                });
              }

            },
            


            extraParams: {  
              cantidad_fp : cantidad,   
              boleto :  dataTicket.ticketNumber.trim(),
              fecha_boleto :  moment( dataTicket.issueDate, 'YYYY-MM-DD').format('YYYY-MM-DD',),   
              datos_modificados : JSON.stringify(dataTicket.accountingPayment),
              total_venta : dataTicket.totalAmount,
              moneda_venta : dataTicket.currency,
              comision_venta : (dataErp.data_erp.comision_erp != null ? dataErp.data_erp.comision_erp.comision.toString() : '0')
            },

            
          }, 

        resetButton:false,
        submitLabel: 'Guardar'
    }; 


    return (  
        <div>
             <Form data={jsonFormMp}/>
        </div>
        );
};

export default ActionsMedioPagoTarjeta;