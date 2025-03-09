'use client';

import * as React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { cn } from '@/lib/utils';

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  width?: string;
  className?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  onClose,
  side = 'left',
  width = '300px',
  className
}) => {
  const { themeClasses } = useTheme();
  
  // Hantera utanförklick för att stänga drawer
  const drawerRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Förhindra scrollning när drawer är öppen
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Förhindra propagering från drawer-innehållet
  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  console.log("Drawer rendering, isOpen:", isOpen); // DEBUG-utskrift
  
  return (
    <>
      {/* Backdrop/overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        onClick={handleDrawerClick}
        className={cn(
          `fixed z-50 h-full ${themeClasses.cardBg} ${themeClasses.text} shadow-xl transition-transform duration-300 ease-in-out`,
          side === 'left' ? 'left-0' : 'right-0',
          isOpen 
            ? 'translate-x-0' 
            : side === 'left' 
              ? '-translate-x-full' 
              : 'translate-x-full',
          className
        )}
        style={{ width }}
      >
        {children}
      </div>
    </>
  );
};

export { Drawer };