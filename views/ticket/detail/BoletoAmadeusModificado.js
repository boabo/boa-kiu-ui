import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from '../../../../_pxp/components/BasicTable';
import Pxp from "../../../../Pxp";
import ActionsMedioPagoTarjeta from "./ActionsMedioPagoTarjeta";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ActionsMedioPago from "./ActionsMedioPago";
import useJsonStore from '../../../../_pxp/hooks/useJsonStore';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const columns = [
  { field: 'payCode', headerName: 'Codigo' },
  { field: 'payDescription', headerName: 'Desc.' },
  { field: 'payCurrency', headerName: 'Moneda' },
  { field: 'payAmount', headerName: 'Importe' },
  //{ field: 'reference', headerName: 'Referencia' },
  { field: 'creditCardNumber', headerName: 'Nro. Tarjeta' },
  { field: 'authorizationCode', headerName: 'Cod. Autorización' },
  { field: 'payInstanceCode', headerName: 'Cod. Instancia' },
  { field: 'payMethodDescription', headerName: 'Desc. Instancia' },
  

  //{ field: 'numero_tarjeta', headerName: 'Nro. Tarjeta' },
  //{ field: 'codigo_tarjeta', headerName: 'Cod. Autorización' },
];


const BoletoAmadeusModificado = ({ data = [], dataTicket, dataErp, initFilter, formas_pago_erp_tarjeta, modificaciones_stage, cargaConsi, medio_pago_defecto, paymentOriginales }) => {
  
  const [dataErpFp, setFpDefecto] = useState(null);
  const [dataErpFp2, setFpDefecto2] = useState(null);
  const [cargaMp, setCargaMp] = useState(false);

  const [montoFpDefecto, setMontoFpDefecto] = useState();
  const [montoFpDefecto2, setMontoFpDefecto2] = useState();
  const [nroTarjetaDefecto, setNroTarjetaDefecto] = useState();
  const [nroTarjetaDefecto2, setNroTarjetaDefecto2] = useState();
  const [nroAutorizacionDefecto, setNroAutorizacionDefecto] = useState();
  const [nroAutorizacionDefecto2, setNroAutorizacionDefecto2] = useState();

    useEffect(() => {        
      if (formas_pago_erp_tarjeta != null && formas_pago_erp_tarjeta != '') { 
        setMontoFpDefecto(formas_pago_erp_tarjeta[0].payAmount);
        setNroTarjetaDefecto(formas_pago_erp_tarjeta[0].creditCardNumber);
        setNroAutorizacionDefecto(formas_pago_erp_tarjeta[0].authorizationCode);

        setMontoFpDefecto2(null);
        setNroTarjetaDefecto2(null);
        setNroAutorizacionDefecto2(null);

        if (formas_pago_erp_tarjeta.length == 2) {
          setMontoFpDefecto2(formas_pago_erp_tarjeta[1].payAmount);
          setNroTarjetaDefecto2(formas_pago_erp_tarjeta[1].creditCardNumber);
          setNroAutorizacionDefecto2(formas_pago_erp_tarjeta[1].authorizationCode);
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
                  codigo_fp: ((formas_pago_erp_tarjeta != null && formas_pago_erp_tarjeta != '') ? (formas_pago_erp_tarjeta[0].payMethodCode):null),
                  sw_tipo_venta: 'BOLETOS',
                  regionales: 'BO',
                },
              })
              .then((resp) => {
                setFpDefecto(resp);
              }); 
},[ formas_pago_erp_tarjeta ]);

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
                    codigo_fp: ((formas_pago_erp_tarjeta != null && formas_pago_erp_tarjeta != '') ? (formas_pago_erp_tarjeta[1].payMethodCode):null),
                    sw_tipo_venta: 'BOLETOS',
                    regionales: 'BO',
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
                    regionales: 'BO',
                  },
                })
                .then((resp2) => {
                  setFpDefecto2(resp2);
                });  
    } 
  
  }
  

},[formas_pago_erp_tarjeta]);
  
  
  const dataWithId = data.reduce((lastValue, value, index) => {
    lastValue.push({
      ...value,
      id: index,
    });
    return lastValue;
  }, []);

  return (  
            <>
            <BasicTable tableName={"Forma de Pago Modificado"} data={dataWithId} columns={columns} />
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
           
              {!cargaConsi && dataTicket && dataTicket.countryCode == 'BO' && formas_pago_erp_tarjeta != '' && (((dataErp.data_erp != '' &&  dataErp.data_erp != null) ? dataErp.data_erp.permiso_modificacion.permiso : 0) != 0) && dataErpFp && (dataErpFp ? ((dataErpFp.datos != null && dataErpFp.datos != '') ? dataErpFp.datos[0].codigo : ''):'') == 'CC' && 
              
              (modificaciones_stage.length > 0) &&(
                <>
                <ActionsMedioPagoTarjeta  dataFormPago={data} 
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

              {!cargaConsi && dataTicket && dataTicket.countryCode == 'BO' && (((dataErp.data_erp != '' &&  dataErp.data_erp != null) ? dataErp.data_erp.permiso_modificacion_medio_pago.permiso : 0) != 0) &&  
              (modificaciones_stage.length > 0) &&( 
                  <ActionsMedioPago dataTicket = {dataTicket} initFilter={initFilter} dataErp = {dataErp} total_medios_pago = {modificaciones_stage.length} medio_pago_defecto = {medio_pago_defecto} data_defecto = {modificaciones_stage} paymentOriginales={paymentOriginales}/>
                )}
                  
            </ButtonGroup>
            </>
         );
};

export default BoletoAmadeusModificado;
