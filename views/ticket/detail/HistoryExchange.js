import React from 'react';
import BasicTable from '../../../../_pxp/components/BasicTable';

const columns = [
  { field: 'TicketNumber', headerName: 'TicketNumber' },
  { field: 'IssueDate', headerName: 'IssueDate' },
];
const HistoryExchange = () => {
  const data = [
    {
      TicketKey: 11651413,
      TicketNumber: '9302404397200',
      IssueDate: '2020-11-04',
      Transaction: 'TKTT',
      ExchangeTicketNumber: '9302406087101',
      CountryCode: 'BO',
      Iatacode: '56991012',
      OfficeId: '',
      Currency: 'BOB',
      NetAmount: 1325.0,
      TotalAmount: 1609.0,
      FlightItinerary: 'LPB - CBB - TJA - CBB - SRE - CBB - LPB',
      stops: -4,
    },
    {
      TicketKey: 11651413,
      TicketNumber: '9302406087101',
      IssueDate: '2021-10-18',
      Transaction: 'TKTT',
      ExchangeTicketNumber: '9302406890137',
      OriginalTicketNumber: '9302404397200',
      CountryCode: 'BO',
      Iatacode: '56991012',
      OfficeId: 'LPBOB0106',
      Currency: 'BOB',
      NetAmount: 48.0,
      TotalAmount: 59.0,
      FlightItinerary: 'LPB - CBB - SRE - CBB - LPB - CBB - TJA - LPB',
      stops: -3,
    },
    {
      TicketKey: 11651413,
      TicketNumber: '9302406890137',
      IssueDate: '2022-02-24',
      Transaction: 'TKTT',
      ExchangeTicketNumber: '9302407115120',
      OriginalTicketNumber: '9302406087101',
      CountryCode: 'BO',
      Iatacode: '56991023',
      OfficeId: 'LPBOB00CM',
      Currency: 'BOB',
      NetAmount: 8.0,
      TotalAmount: 9.0,
      FlightItinerary: 'LPB - CBB - TJA - LPB - CBB - SRE - CBB - LPB',
      stops: -2,
    },
    {
      TicketKey: 11651413,
      TicketNumber: '9302407115120',
      IssueDate: '2022-04-01',
      Transaction: 'TKTT',
      ExchangeTicketNumber: '9302407256412',
      OriginalTicketNumber: '9302406890137',
      CountryCode: 'BO',
      Iatacode: '56991012',
      OfficeId: 'LPBOB0106',
      Currency: 'BOB',
      NetAmount: 47.0,
      TotalAmount: 72.0,
      FlightItinerary: 'LPB - CBB//LPB - CBB - SRE - CBB - LPB',
      stops: -1,
    },
    {
      TicketKey: 11651413,
      TicketNumber: '9302407256412',
      IssueDate: '2022-04-26',
      Transaction: 'TKTT',
      ExchangeTicketNumber: '9302408875359',
      OriginalTicketNumber: '9302407115120',
      CountryCode: 'BO',
      Iatacode: '56991012',
      OfficeId: 'LPBOB0106',
      Currency: 'BOB',
      NetAmount: 21.0,
      TotalAmount: 24.0,
      FlightItinerary: 'LPB - CBB//LPB - CBB - SRE - CBB - LPB',
      stops: 0,
    },
    {
      TicketKey: 11651413,
      TicketNumber: '9302408875359',
      IssueDate: '2022-12-30',
      Transaction: 'TKTT',
      ExchangeTicketNumber: '',
      OriginalTicketNumber: '9302407256412',
      CountryCode: 'BO',
      Iatacode: '56991012',
      OfficeId: 'LPBOB0106',
      Currency: 'BOB',
      NetAmount: 0.0,
      TotalAmount: 15.0,
      FlightItinerary: 'LPB - CBB - SRE - CBB - LPB',
      stops: 1,
    },
  ];
  return (
    <div>
      <BasicTable tableName="Historial de Canjes" data={data} columns={columns} />;
    </div>
  );
};

export default HistoryExchange;
