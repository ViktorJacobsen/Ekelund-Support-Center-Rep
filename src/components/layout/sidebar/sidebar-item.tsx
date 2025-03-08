'use client';

import React, { ReactNode } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import SidebarTooltip from './sidebar-tooltip';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  expanded: boolean;
  active?: boolean;
}

/**
 * Temakonsekvent SidebarItem-komponent
 */
const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  href, 
  expanded, 
  active = false 
}) => {
  const { themeClasses } = useTheme();
  
  // Bestäm styling baserat på om elementet är aktivt
  const baseClasses = active 
    ? `${themeClasses.primaryText} ${expanded ? 'bg-[hsl(var(--primary)_/_0.1)]' : 'bg-[hsl(var(--primary)_/_0.1)]'}`
    : `${themeClasses.sidebarText} hover:${themeClasses.text} hover:bg-[hsl(var(--primary)_/_0.1)]`;
  
  if (expanded) {
    return (
      <a 
        href={href} 
        className={`flex items-center px-3 py-2 ${baseClasses} rounded-lg transition-all duration-200`}
      >
        {React.isValidElement(icon) ? (
          <span className="w-5 h-5 mr-3">{icon}</span>
        ) : (
          <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon}
          </svg>
        )}
        <span className="whitespace-nowrap transition-all duration-300 opacity-100">{label}</span>
      </a>
    );
  } else {
    return (
      <SidebarTooltip content={label}>
        <a 
          href={href} 
          className={`p-2 h-9 w-9 ${baseClasses} justify-center rounded-lg transition-all duration-200 flex items-center`}
        >
          {React.isValidElement(icon) ? (
            <span className="w-5 h-5">{icon}</span>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {icon}
            </svg>
          )}
        </a>
      </SidebarTooltip>
    );
  }
};

export default SidebarItem;