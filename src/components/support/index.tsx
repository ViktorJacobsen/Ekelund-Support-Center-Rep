'use client';

// Importera MUI komponenter
import MuiTicketForm from './mui-ticket-form';
import MuiTicketList from './mui-ticket-list';

// Exportera komponenter
export const TicketForm = MuiTicketForm;
export const TicketList = MuiTicketList;

// För direkt import
export default {
  TicketForm: MuiTicketForm,
  TicketList: MuiTicketList
};