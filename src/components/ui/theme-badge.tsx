'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { cn } from '@/lib/utils';

interface ThemeBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Temakonsekvent badge-komponent som använder themeClasses
 */
const ThemeBadge: React.FC<ThemeBadgeProps> = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className
}) => {
  const { themeClasses } = useTheme();
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `${themeClasses.primary} ${themeClasses.primaryFg}`;
      case 'secondary':
        return `${themeClasses.secondary} ${themeClasses.secondaryText}`;
      case 'outline':
        return `bg-transparent border ${themeClasses.border} ${themeClasses.text}`;
      case 'success':
        return `bg-[hsl(var(--primary)_/_0.2)] ${themeClasses.primaryText}`;
      case 'warning':
        return `bg-[hsl(var(--primary)_/_0.1)] ${themeClasses.primaryText}`;
      case 'error':
        return `bg-[hsl(var(--destructive)_/_0.1)] ${themeClasses.destructiveText}`;
      default:
        return `bg-[hsl(var(--muted))] ${themeClasses.mutedText}`;
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-3 py-1.5 text-sm';
      default:
        return 'px-2.5 py-1 text-xs';
    }
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap',
        getVariantClasses(),
        getSizeClasses(),
        className
      )}
    >
      {children}
    </span>
  );
};

export default ThemeBadge;