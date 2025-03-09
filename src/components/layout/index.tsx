'use client';

// Importera MUI komponenter
import MuiHeader from './header/mui-header';
import MuiSearch from './header/mui-search';
import MuiTabNavigation from './mui-tab-navigation';
import { DashboardLayout } from '@/components/mui-core/DashboardLayout';

// Exportera komponenter för användning i andra filer
export const Header = MuiHeader;
export const Search = MuiSearch;
export const TabNavigation = MuiTabNavigation;
export const Sidebar = DashboardLayout;
export const SidebarDrawer = DashboardLayout;

// Fixa anonymt export-objekt genom att namnge det
const components = {
  Header: MuiHeader,
  Search: MuiSearch,
  TabNavigation: MuiTabNavigation,
  Sidebar: DashboardLayout,
  SidebarDrawer: DashboardLayout
};

export default components;