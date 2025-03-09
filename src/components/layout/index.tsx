'use client';

import { useMUI } from '@/lib/mui-config';

// Original komponenter
import OriginalHeader from './header/header';
import OriginalSearch from './header/search';
import OriginalSidebar from './sidebar/sidebar';
import OriginalSidebarDrawer from './sidebar/sidebar-drawer';
import OriginalTabNavigation from './tab-navigation';

// MUI komponenter
// OBS! Vissa av dessa kan behöva skapas om de inte finns än
import MuiHeader from './header/mui-header';
import MuiSearch from './header/mui-search';
import { default as MuiSidebar } from '@/components/mui-core/MuiDashboardLayout';
import MuiTabNavigation from './mui-tab-navigation';

// Exportera rätt komponenter baserat på MUI-konfigurationen
// För komponenter som inte har MUI-versioner ännu, använd original
export const Header = useMUI && MuiHeader ? MuiHeader : OriginalHeader;
export const Search = useMUI ? MuiSearch : OriginalSearch;
export const Sidebar = useMUI ? MuiSidebar : OriginalSidebar;
export const SidebarDrawer = useMUI ? MuiSidebar : OriginalSidebarDrawer;
export const TabNavigation = useMUI && MuiTabNavigation ? MuiTabNavigation : OriginalTabNavigation;

// För direkt import
export default {
  Header,
  Search,
  Sidebar,
  SidebarDrawer,
  TabNavigation
};