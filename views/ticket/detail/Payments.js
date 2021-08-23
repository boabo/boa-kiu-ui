import React, {useState,useEffect} from 'react';
import BasicTable from '../../../../_pxp/components/BasicTable';

import ActionsMedioPago from "./ActionsMedioPago";
import ActionsMedioPagoTarjeta from "./ActionsMedioPagoTarjeta";

import Pxp from "../../../../Pxp";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useJsonStore from '../../../../_pxp/hooks/useJsonStore';


const columns = [
  { field: 'paymentCode', headerName: 'Codigo' },
  { field: 'paymentDescription', headerName: 'Desc.' },
  { field: 'paymentCurrency', headerName: 'Moneda' },
  { field: 'paymentAmount', headerName: 'Importe' },
  //{ field: 'reference', headerName: 'Referencia' },
  { field: 'creditCardNumber', headerName: 'Nro. Tarjeta' },
  { field: 'authorizationCode', headerName: 'Cod. Autorización' },
  { field: 'paymentInstanceCode', headerName: 'Cod. Instancia' },
  { field: 'paymentInstanceDescription', headerName: 'Desc. Instancia' },
];

const Payments = ({ data, dataTicket, dataErp, initFilter, fp_tarjeta, modificaciones_stage, cargaConsi}) => {

  /*AUMENTANDO PAR RECUPERAR LAS FORMAS DE PAGO POR DEFECTO*/
const [dataErpFp, setFpDefecto] = useState(null);
const [dataErpFp2, setFpDefecto2] = useState(null);

const [montoFpDefecto, setMontoFpDefecto] = useState();
const [montoFpDefecto2, setMontoFpDefecto2] = useState();
const [nroTarjetaDefecto, setNroTarjetaDefecto] = useState();
const [nroTarjetaDefecto2, setNroTarjetaDefecto2] = useState();
const [nroAutorizacionDefecto, setNroAutorizacionDefecto] = useState();
const [nroAutorizacionDefecto2, setNroAutorizacionDefecto2] = useState();

useEffect(() => {        
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
});


useEffect(() => {   
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
},[ fp_tarjeta ]);

useEffect(() => {      
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

},[fp_tarjeta]);

  return (  
          <>
          <BasicTable tableName={"Forma de Pago Originales"} columns={columns} data={data} />

          <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                {!cargaConsi && dataTicket && dataTicket.countryCode == 'BO' && (((dataErp.data_erp != '' &&  dataErp.data_erp != null) ? dataErp.data_erp.permiso_modificacion.permiso : 0) != 0) && dataErpFp && (dataErpFp ? ((dataErpFp.datos != null && dataErpFp.datos != '') ? dataErpFp.datos[0].codigo : ''):'') == 'CC' &&
                  (modificaciones_stage.length == 0) && 
                (            
                  <>
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
                
                  </>
                  
                )}      

                {!cargaConsi && dataTicket && dataTicket.countryCode == 'BO' && (((dataErp.data_erp != '' &&  dataErp.data_erp != null) ? dataErp.data_erp.permiso_modificacion.permiso_modificacion_medio_pago : 0) != 0) &&  
                  (modificaciones_stage.length == 0) && 
                (   <ActionsMedioPago dataTicket = {dataTicket} initFilter={initFilter} dataErp = {dataErp}/>
                
                )}      

            </ButtonGroup>
          
          </>
        );
};

export default Payments;
