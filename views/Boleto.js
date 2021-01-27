import React, {useState, useEffect} from 'react';
import useJsonStore from "../../_pxp/hooks/useJsonStore";
import Details from "./ticket/detail/Details";

const Boleto = () => {


  const { data } = useJsonStore({
    url: 'boakiu/Boleto/getTicketInformationRecursive',
    params: {
      nro_ticket: '9302404631617',
    },
  });

  const [ticketInformation, setTicketInformation] = useState();
  // when the data has gotten an resp
  useEffect(() => {
    console.log(data)
    if (data) {
      setTicketInformation(data);
    }
  }, [data]);

  return (
    <div>
      {ticketInformation && JSON.stringify(ticketInformation)}
      <Details />
    </div>
  );
};

export default Boleto;
