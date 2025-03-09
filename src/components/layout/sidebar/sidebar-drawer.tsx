'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { Drawer } from '@/components/ui/drawer';
import { DrawerNavigation, NavigationItem } from './drawer-navigation';

// SVG-ikoner för navigation
const DashboardIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const DocumentIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ChartIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ToolsIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Navigationskonfiguration
const NAVIGATION: NavigationItem[] = [
  {
    kind: 'header',
    title: 'Huvudmeny',
  },
  {
    segment: 'dashboard',
    title: 'Översikt',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Dokumentation',
  },
  {
    segment: 'dokumentation',
    title: 'Dokumentation',
    icon: <DocumentIcon />,
    children: [
      {
        segment: 'installationsguider',
        title: 'Installationsguider',
        icon: <DocumentIcon />,
      },
      {
        segment: 'manualer',
        title: 'Manualer',
        icon: <DocumentIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Verktyg',
  },
  {
    segment: 'verktyg',
    title: 'Verktyg',
    icon: <ToolsIcon />,
    children: [
      {
        segment: 'matarinsamling',
        title: 'Mätinsamling',
        icon: <ChartIcon />,
      },
    ],
  },
];

interface SidebarDrawerProps {
  children?: React.ReactNode;
  initialOpen?: boolean;
  onStateChange?: (isOpen: boolean) => void;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ 
  children,
  initialOpen = false,
  onStateChange
}) => {
  const { themeClasses } = useTheme();
  const [isOpen, setIsOpen] = useState(initialOpen);
  
  useEffect(() => {
    // Synka med externa state-ändringar
    if (initialOpen !== undefined && initialOpen !== isOpen) {
      setIsOpen(initialOpen);
    }
  }, [initialOpen, isOpen]);

  // Uppdatera extern state när intern state ändras
  const handleStateChange = (newState: boolean) => {
    setIsOpen(newState);
    if (onStateChange) {
      onStateChange(newState);
    }
  };

  console.log("SidebarDrawer rendering, isOpen:", isOpen); // DEBUG-utskrift
  
  return (
    <>
      {/* Hamburger-knapp - Öka z-index och placera synligt */}
      <button
        onClick={() => handleStateChange(true)}
        className="fixed top-4 left-4 z-[100] p-2 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Drawer med navigation */}
      <Drawer isOpen={isOpen} onClose={() => handleStateChange(false)} width="300px">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`rounded-lg ${themeClasses.primary} w-10 h-10 flex items-center justify-center`}>
                <span className={`${themeClasses.primaryFg} ${themeClasses.heading} text-lg`}>E</span>
              </div>
              <h2 className={`text-xl ${themeClasses.heading}`}>Ekelund</h2>
            </div>
            
            <button
              onClick={() => handleStateChange(false)}
              className={`p-2 ${themeClasses.mutedText} hover:${themeClasses.text} rounded-lg`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <DrawerNavigation navigation={NAVIGATION} />
        </div>
      </Drawer>
      
      {/* Innehåll */}
      <div className="ml-0">
        {children}
      </div>
    </>
  );
};

export { SidebarDrawer };