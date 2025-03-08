'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { cn } from '@/lib/utils';

interface ThemeCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  elevation?: 'flat' | 'low' | 'medium' | 'high';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

/**
 * Temakonsekvent card-komponent som använder themeClasses
 */
const ThemeCard: React.FC<ThemeCardProps> = ({ 
  children, 
  className,
  interactive = false,
  elevation = 'low',
  padding = 'md',
  onClick
}) => {
  const { themeClasses } = useTheme();
  
  const getElevationClasses = () => {
    switch (elevation) {
      case 'flat':
        return 'shadow-none';
      case 'medium':
        return 'shadow-md hover:shadow-lg';
      case 'high':
        return 'shadow-lg hover:shadow-xl';
      default:
        return 'shadow-sm hover:shadow-md';
    }
  };
  
  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return 'p-0';
      case 'sm':
        return 'p-3';
      case 'lg':
        return 'p-8';
      default:
        return 'p-6';
    }
  };
  
  return (
    <div
      className={cn(
        `${themeClasses.cardBg} border ${themeClasses.border} rounded-xl overflow-hidden`,
        getElevationClasses(),
        getPaddingClasses(),
        interactive && `${themeClasses.hoverBorder} transition-all duration-300 cursor-pointer transform hover:translate-y-[-2px]`,
        className
      )}
      onClick={interactive ? onClick : undefined}
    >
      {children}
    </div>
  );
};

export default ThemeCard;