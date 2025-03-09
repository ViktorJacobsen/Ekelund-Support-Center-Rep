'use client';

// Direkt export av MUI komponenter
export { default as Header } from './header/mui-header';
export { default as Search } from './header/mui-search';
export { default as TabNavigation } from './mui-tab-navigation';

// MUI komponenter för sidebar och drawer
import { default as MuiSidebar } from '@/components/mui-core/MuiDashboardLayout';
export const Sidebar = MuiSidebar;
export const SidebarDrawer = MuiSidebar;

// För direkt import
export default {
  Header,
  Search,
  Sidebar,
  SidebarDrawer,
  TabNavigation
};