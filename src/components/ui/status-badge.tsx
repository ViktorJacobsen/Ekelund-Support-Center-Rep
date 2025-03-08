'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'syncing' | 'error' | 'warning' | 'success' | 'neutral';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
}

/**
 * Statusindikator-komponent som använder tematiska färger
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  size = 'md',
  animate = false,
  className
}) => {
  const { themeClasses } = useTheme();
  
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return `bg-[hsl(var(--primary)_/_0.5)]`;
      case 'offline':
        return `bg-[hsl(var(--destructive)_/_0.5)]`;
      case 'syncing':
        return `bg-[hsl(var(--primary)_/_0.7)]`;
      case 'error':
        return `bg-[hsl(var(--destructive))]`;
      case 'warning':
        return `bg-[hsl(var(--primary)_/_0.8)]`;
      case 'success':
        return `bg-[hsl(var(--primary)_/_0.6)]`;
      case 'neutral':
      default:
        return `bg-[hsl(var(--muted))]`;
    }
  };
  
  const getStatusText = () => {
    if (text) return text;
    
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'syncing': return 'Synkroniserar';
      case 'error': return 'Fel';
      case 'warning': return 'Varning';
      case 'success': return 'Framgång';
      case 'neutral': return 'Neutral';
      default: return '';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': 
        return text ? 'text-xs px-2 py-0.5' : 'w-2 h-2';
      case 'lg': 
        return text ? 'text-sm px-3 py-1' : 'w-4 h-4';
      case 'md':
      default:
        return text ? 'text-xs px-2.5 py-0.75' : 'w-3 h-3';
    }
  };
  
  if (text) {
    return (
      <span
        className={cn(
          'inline-flex items-center rounded-full',
          getStatusColor(),
          getSizeClasses(),
          animate && 'animate-pulse',
          className
        )}
      >
        <span className={`${themeClasses.primaryFg} font-medium`}>{getStatusText()}</span>
      </span>
    );
  }
  
  // Bara en punkt utan text
  return (
    <span
      className={cn(
        'inline-block rounded-full',
        getStatusColor(),
        getSizeClasses(),
        animate && 'animate-pulse',
        className
      )}
    ></span>
  );
};

export default StatusBadge;