'use client';

import React, { useState } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import Sidebar from '@/components/layout/sidebar/sidebar';

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
          
          {/* Content */}
          {children}
        </main>
      </div>
    </div>
  );
};


export default DashboardLayout;