'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
// Importera den nya drawer-baserade sidebaren
import { SidebarDrawer } from '@/components/layout/sidebar/sidebar-drawer';
import Header from '@/components/layout/header/header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { themeClasses } = useTheme();

  return (
    <div className={`min-h-screen ${themeClasses.bodyText} ${themeClasses.bg} ${themeClasses.text}`}>
      {/* Använd SidebarDrawer istället för Sidebar */}
      <SidebarDrawer>
        <Header />
        <main>
          {children}
        </main>
      </SidebarDrawer>
    </div>
  );
};

export default DashboardLayout;