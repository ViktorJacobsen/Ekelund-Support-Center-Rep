'use client';

import React, { ReactNode } from 'react';
import { useTheme } from '@/styles/theme/theme-context';

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
  expanded: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ 
  title, 
  children, 
  expanded 
}) => {
  const { themeClasses } = useTheme();
  
  return (
    <div className={`px-4 pb-4 ${!expanded && 'flex flex-col items-center'}`}>
      <h3 className={`${
        expanded ? `px-3 text-xs uppercase ${themeClasses.sidebarSectionText} tracking-wider mb-2` : 'hidden'
      }`}>
        {title}
      </h3>
      
      <div className={`${expanded ? 'space-y-1' : 'space-y-4'}`}>
        {children}
      </div>
    </div>
  );
};

export default SidebarSection;