'use client';

// Importera MUI komponenter
import MuiHeader from './header/mui-header';
import MuiSearch from './header/mui-search';
import MuiTabNavigation from './mui-tab-navigation';
import MuiSidebar from '@/components/mui-core/MuiDashboardLayout';

// Exportera komponenter för användning i andra filer
export const Header = MuiHeader;
export const Search = MuiSearch;
export const TabNavigation = MuiTabNavigation;
export const Sidebar = MuiSidebar;
export const SidebarDrawer = MuiSidebar;

// För direkt import
export default {
  Header: MuiHeader,
  Search: MuiSearch,
  TabNavigation: MuiTabNavigation,
  Sidebar: MuiSidebar,
  SidebarDrawer: MuiSidebar
};