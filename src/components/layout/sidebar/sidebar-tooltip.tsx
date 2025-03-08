'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

/**
 * Anpassad Tooltip-komponent specifikt för sidebaren
 * Använder themeClasses för att stilsätta tooltip i enlighet med temafärgerna
 */
const SidebarTooltip: React.FC<SidebarTooltipProps> = ({ 
  children, 
  content, 
  side = "right", 
  sideOffset = 4 
}) => {
  const { themeClasses } = useTheme();
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          sideOffset={sideOffset}
          hideArrow={true}
          className={`${themeClasses.cardBg} ${themeClasses.text} border ${themeClasses.border} px-3 py-1.5 text-sm shadow-md`}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarTooltip;