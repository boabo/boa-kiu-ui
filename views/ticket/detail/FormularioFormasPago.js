import React, { useRef } from 'react';
import * as Yup from "yup";
import Form from "../../../../_pxp/components/Form/Form";
import Typography from "@material-ui/core/Typography";
import Label from "../../../../_pxp/components/Label";
import Box from "@material-ui/core/Box";



const ActionsMedioPagoTarjeta = ({ cantidad }) => {   
      
     /*Armar el json para generar las formas de pago*/
  
     /* useEffect(() => {       
        console.log("aqui llega el envio",cantidad);
        
    }, [cantidad]); */
    

     const countArray = [...Array(cantidad).keys()];

     let columns = {};
     let group = {};
     let gridGroup = {};


     countArray.forEach((e, index)=> {
       //console.log('e',e)
       //console.log('index',index)
       const num =index+1;

       if (cantidad == 1) {
        gridGroup = { xs: 12, sm: 12 };
      } else if (cantidad == 2 ) {
        gridGroup = { xs: 12, sm: 6 };
      } else if (cantidad == 3 ) {
        gridGroup = { xs: 12, sm: 4 };
      } else if (cantidad >= 4 ){
        gridGroup = { xs: 12, sm: 3 };
      }
     
       columns[`id_moneda_${num}`] = {
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
          /**Aqui las validaciones para los medios de pago**/   
          
          /*************************************************/
        },
        group: `groupMedioPago${num}`,        
      };

       columns[`forma_pago_${num}`] = {
        type: 'AutoComplete',
        label: 'Medio Pago',
        initialValue: '',
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
          console.log("aqui llega el dato",obj);

          if (obj.dataValue != null) {
            if (obj.dataValue.codigo == 'CA') {
                console.log("aqui entra el dato por MP",obj);
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
                obj.states.id_venta_1.setIsHide(false);

                obj.states[`num_tarjeta_${num}`].reset();
                obj.states[`cod_tarjeta_${num}`].reset();
                obj.states[`mco_${num}`].reset();
                obj.states[`id_auxiliar_${num}`].reset();
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
         initialValue: '',         
         validate: {
           shape: Yup.string().max(20, 'Tamaño maximo 20 digitos'),           
         },
         group: `groupMedioPago${num}`,
       };    
       
       columns[`cod_tarjeta_${num}`] = {
        type: 'TextField',
        label: 'Código de Tarjeta',
        variant: 'outlined',
        initialValue: '',         
        validate: {
          shape: Yup.string().max(6, 'Tamaño maximo 6 digitos'),           
        },
        group: `groupMedioPago${num}`,
      }; 

      columns[`mco_${num}`] = {
        type: 'TextField',
        label: 'MCO',
        variant: 'outlined',
        initialValue: '',    
        group: `groupMedioPago${num}`,
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
          /**Aqui las validaciones para los medios de pago**/                  
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
          /**Aqui las validaciones para los medios de pago**/                  
          /*************************************************/
        },
        group: `groupMedioPago${num}`,        
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
          /**Aqui las validaciones para los medios de pago**/                  
          /*************************************************/
        },
        group: `groupMedioPago${num}`,
        //disabled: true
      }; 

      columns[`monto_fp_${num}`] = {
        type: 'TextField',
        label: 'Monto',
        variant: 'outlined',
        initialValue: '',       
        
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

     const jsonFormMp = {
      
        columns: { 
          ...columns,
        },

        groups: {
          ...group,
          },


           onSubmit: {       

            url: 'boakiu/MediosPagoBoleto/ModificarMedioPago',
            callback: (resp, dataForSending, obj) => {

            },
            


            extraParams: {  
              cantidad_fp : cantidad
            },

            
          }, 

        resetButton:false,
        submitLabel: false
    }; 


    return (  
        <div>
             <Form data={jsonFormMp}/>
        </div>
        );
};

export default ActionsMedioPagoTarjeta;