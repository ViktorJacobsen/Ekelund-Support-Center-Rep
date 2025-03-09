'use client';

import { useMUI } from '@/lib/mui-config';

// Original komponenter
import OriginalTicketForm from './ticket-form';
import OriginalTicketList from './ticket-list';

// MUI komponenter
import MuiTicketForm from './mui-ticket-form';
import MuiTicketList from './mui-ticket-list';

// Exportera rätt komponenter baserat på MUI-konfigurationen
export const TicketForm = useMUI ? MuiTicketForm : OriginalTicketForm;
export const TicketList = useMUI ? MuiTicketList : OriginalTicketList;

// För direkt import
export default {
  TicketForm,
  TicketList
};