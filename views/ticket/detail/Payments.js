import React, {useState,useEffect} from 'react';
import BasicTable from '../../../../_pxp/components/BasicTable';

import ActionsMedioPago from "./ActionsMedioPago";
import ActionsMedioPagoTarjeta from "./ActionsMedioPagoTarjeta";

import useJsonStore from "../../../../_pxp/hooks/useJsonStore";
import Pxp from "../../../../Pxp";


const columns = [
  { field: 'paymentCode', headerName: 'Codigo' },
  { field: 'paymentDescription', headerName: 'Desc.' },
  { field: 'paymentCurrency', headerName: 'Moneda' },
  { field: 'paymentAmount', headerName: 'Importe' },
  { field: 'reference', headerName: 'Referencia' },
];

const Payments = ({ data, dataTicket, dataErp, fp_tarjeta_code , initFilter, formas_pago_erp_tarjeta, fp_tarjeta}) => {

  /*AUMENTANDO PAR RECUPERAR LAS FORMAS DE PAGO POR DEFECTO*/
const [dataErpFp, setFpDefecto] = useState(null);
const [dataErpFp2, setFpDefecto2] = useState(null);

const [montoFpDefecto, setMontoFpDefecto] = useState();
const [montoFpDefecto2, setMontoFpDefecto2] = useState();
const [nroTarjetaDefecto, setNroTarjetaDefecto] = useState();
const [nroTarjetaDefecto2, setNroTarjetaDefecto2] = useState();
const [nroAutorizacionDefecto, setNroAutorizacionDefecto] = useState();
const [nroAutorizacionDefecto2, setNroAutorizacionDefecto2] = useState();



const { state, set, data: medioPagoERP1, loading } = useJsonStore({
  url: 'ventas_facturacion/FormaPago/listarFormaPago',
  params: {
    start: '0',
    limit: '10',
    sort: 'id_medio_pago_pw',
    dir: 'ASC',
    boa_kiu: 'si',
    codigo_fp: (formas_pago_erp_tarjeta != null ? (formas_pago_erp_tarjeta[0].mop_code):null),
    sw_tipo_venta: 'BOLETOS',
    regionales: 'BOL',
  },
  load : false
});


const initFilterFp = (inputValue) => {
  set({
    ...state,
    params: {
      start: '0',
      limit: '10',
      sort: 'id_medio_pago_pw',
      dir: 'ASC',
      boa_kiu: 'si',
      codigo_fp: inputValue,
      sw_tipo_venta: 'BOLETOS',
      regionales: 'BOL',
    },
    load: true,
  });
};

useEffect(() => {  
  if (formas_pago_erp_tarjeta != null && formas_pago_erp_tarjeta != '') {  
    setMontoFpDefecto(formas_pago_erp_tarjeta[0].importe);
    setNroTarjetaDefecto(formas_pago_erp_tarjeta[0].numero_tarjeta);
    setNroAutorizacionDefecto(formas_pago_erp_tarjeta[0].codigo_tarjeta);

      setMontoFpDefecto2(null);
      setNroTarjetaDefecto2(null);
      setNroAutorizacionDefecto2(null);
    
    if (formas_pago_erp_tarjeta.length == 2) {
      setMontoFpDefecto2(formas_pago_erp_tarjeta[1].importe);
      setNroTarjetaDefecto2(formas_pago_erp_tarjeta[1].numero_tarjeta);
      setNroAutorizacionDefecto2(formas_pago_erp_tarjeta[1].codigo_tarjeta);
    }
  } else {
    
    if (fp_tarjeta != null && fp_tarjeta != '') { 
      setMontoFpDefecto(fp_tarjeta[0].paymentAmount);
      setNroTarjetaDefecto(fp_tarjeta[0].creditCardNumber);
      setNroAutorizacionDefecto(fp_tarjeta[0].authorizationCode);

      setMontoFpDefecto2(null);
      setNroTarjetaDefecto2(null);
      setNroAutorizacionDefecto2(null);

      if (fp_tarjeta.length == 2) {
        setMontoFpDefecto2(fp_tarjeta[1].paymentAmount);
        setNroTarjetaDefecto2(fp_tarjeta[1].creditCardNumber);
        setNroAutorizacionDefecto2(fp_tarjeta[1].authorizationCode);
      }
    }
  }
  
  //montoFpDefecto
});




 useEffect(() => {  
    if (formas_pago_erp_tarjeta != null && formas_pago_erp_tarjeta != '') {    
      Pxp.apiClient
                .doRequest({
                  url: 'ventas_facturacion/FormaPago/listarFormaPago',
                  params: {
                    start: '0',
                    limit: '10',
                    sort: 'id_medio_pago_pw',
                    dir: 'ASC',
                    boa_kiu: 'si',
                    codigo_fp: ((formas_pago_erp_tarjeta != null && formas_pago_erp_tarjeta != '') ? (formas_pago_erp_tarjeta[0].mop_code):null),
                    sw_tipo_venta: 'BOLETOS',
                    regionales: 'BOL',
                  },
                })
                .then((resp) => {
                  setFpDefecto(resp);
                  
                });       
  
    } else {      
        Pxp.apiClient
                  .doRequest({
                    url: 'ventas_facturacion/FormaPago/listarFormaPago',
                    params: {
                      start: '0',
                      limit: '10',
                      sort: 'id_medio_pago_pw',
                      dir: 'ASC',
                      boa_kiu: 'si',
                      codigo_fp: ((fp_tarjeta != null && fp_tarjeta != '') ? (fp_tarjeta[0].paymentMethodCode):null),
                      sw_tipo_venta: 'BOLETOS',
                      regionales: 'BOL',
                    },
                  })
                  .then((resp) => {
                    setFpDefecto(resp);
                  });       
    } 

  },[formas_pago_erp_tarjeta,fp_tarjeta]);

  useEffect(() => {  
    if (formas_pago_erp_tarjeta != null && formas_pago_erp_tarjeta != '') {

      if (formas_pago_erp_tarjeta.length == 2) {      
        Pxp.apiClient
                  .doRequest({
                    url: 'ventas_facturacion/FormaPago/listarFormaPago',
                    params: {
                      start: '0',
                      limit: '10',
                      sort: 'id_medio_pago_pw',
                      dir: 'ASC',
                      boa_kiu: 'si',
                      codigo_fp: ((formas_pago_erp_tarjeta != null && formas_pago_erp_tarjeta != '') ? (formas_pago_erp_tarjeta[1].mop_code):null),
                      sw_tipo_venta: 'BOLETOS',
                      regionales: 'BOL',
                    },
                  })
                  .then((resp2) => {
                    setFpDefecto2(resp2);
                    
                  });    
      } else {
        Pxp.apiClient
                  .doRequest({
                    url: 'ventas_facturacion/FormaPago/listarFormaPago',
                    params: {
                      start: '0',
                      limit: '10',
                      sort: 'id_medio_pago_pw',
                      dir: 'ASC',
                      boa_kiu: 'si',
                      codigo_fp: null,
                      sw_tipo_venta: 'BOLETOS',
                      regionales: 'BOL',
                    },
                  })
                  .then((resp2) => {
                    setFpDefecto2(resp2);
                    
                  });           
      }
  
    } else {      
      if (fp_tarjeta.length == 2) {
        Pxp.apiClient
                  .doRequest({
                    url: 'ventas_facturacion/FormaPago/listarFormaPago',
                    params: {
                      start: '0',
                      limit: '10',
                      sort: 'id_medio_pago_pw',
                      dir: 'ASC',
                      boa_kiu: 'si',
                      codigo_fp: ((fp_tarjeta != null && fp_tarjeta != '') ? (fp_tarjeta[1].paymentMethodCode):null),
                      sw_tipo_venta: 'BOLETOS',
                      regionales: 'BOL',
                    },
                  })
                  .then((resp2) => {
                    setFpDefecto2(resp2);
                  });  
      } else {
        Pxp.apiClient
                  .doRequest({
                    url: 'ventas_facturacion/FormaPago/listarFormaPago',
                    params: {
                      start: '0',
                      limit: '10',
                      sort: 'id_medio_pago_pw',
                      dir: 'ASC',
                      boa_kiu: 'si',
                      codigo_fp: null,
                      sw_tipo_venta: 'BOLETOS',
                      regionales: 'BOL',
                    },
                  })
                  .then((resp2) => {
                    setFpDefecto2(resp2);
                  });  
      }
             
    } 

  },[formas_pago_erp_tarjeta,fp_tarjeta]);

  return (  
          <>
          <BasicTable tableName={"Forma de Pago Originales"} columns={columns} data={data} />

            {dataTicket && dataTicket.countryCode == 'BO' && dataErpFp && (dataErpFp ? ((dataErpFp.datos != null && dataErpFp.datos != '') ? dataErpFp.datos[0].codigo : ''):'') == 'CC' &&(
            
             <ActionsMedioPagoTarjeta dataFormPago={data} 
                                      dataTicket = {dataTicket} 
                                      dataErp = {dataErp} 
                                      fp1Defecto = {dataErpFp} 
                                      montoFp = {montoFpDefecto}
                                      nroTarjetaDefecto = {nroTarjetaDefecto}
                                      nroAutorizacionDefecto = {nroAutorizacionDefecto}
                                      initFilter={initFilter} 
                                      fp2Defecto = {dataErpFp2} 
                                      montoFp2 = {montoFpDefecto2}
                                      nroTarjetaDefecto2 = {nroTarjetaDefecto2}
                                      nroAutorizacionDefecto2 = {nroAutorizacionDefecto2}                                     
              />
          )} 
          </>
        );
};

export default Payments;
