'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import Sidebar from '@/components/layout/sidebar/sidebar';
import Header from '@/components/layout/header/header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Huvudlayout för dashboard som samordnar sidebar, header och innehåll
 * Ansvarar för att hantera sidebar-utvidgning och övergripande layout
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { themeClasses } = useTheme();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className={`min-h-screen ${themeClasses.bodyText} ${themeClasses.bg} ${themeClasses.text}`}>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar expanded={sidebarExpanded} onToggle={toggleSidebar} />
        
        {/* Huvudinnehåll */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarExpanded ? 'ml-64' : 'ml-16'
        } pt-0`}>
          {/* Header */}
          <Header />
          <div className="fixed top-4 right-4 z-50 p-4 flex gap-4">
  <div className="h-10 w-10 bg-blue-500 dark:bg-red-500 rounded-full"></div>
  <div className="h-10 w-10 bg-[hsl(var(--primary))] rounded-full"></div>
</div>
          
          {/* Content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;