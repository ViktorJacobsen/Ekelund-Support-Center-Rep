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

  // Bestäm färg för ikonen och texten beroende på om objektet är aktivt
  const iconColor = active 
    ? themeClasses.primaryText   // ikonen blir primary-färgad om aktiv
    : themeClasses.sidebarText;
  
  // Textfärgen förblir sidebarText även om objektet är aktivt
  const labelColor = themeClasses.sidebarText;
  
  // Bestäm bakgrund (aktiv bakgrund)
  const backgroundClasses = active 
    ? 'bg-[hsl(var(--primary)_/_0.1)]'
    : 'hover:bg-[hsl(var(--primary)_/_0.1)]';
  
  if (expanded) {
    return (
      <a 
        href={href} 
        className={`flex items-center px-3 py-2 ${backgroundClasses} rounded-lg transition-all duration-200`}
      >
        <span className={`w-5 h-5 mr-3 ${iconColor}`}>
          {icon}
        </span>
        <span className={`whitespace-nowrap transition-all duration-300 ${labelColor}`}>
          {label}
        </span>
      </a>
    );
  } else {
    return (
      <SidebarTooltip content={label}>
        <a 
          href={href} 
          className={`p-2 h-9 w-9 ${iconColor} justify-center rounded-lg ${backgroundClasses} transition-all duration-200 flex items-center`}
        >
          <span className="w-5 h-5">{icon}</span>
        </a>
      </SidebarTooltip>
    );
  }
};

export default SidebarItem;