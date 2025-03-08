'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { cn } from '@/lib/utils';
import { Slot } from "@radix-ui/react-slot";

interface ThemeButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  [key: string]: any; // För att tillåta HTML button attribut
}

/**
 * Temakonsekvent button-komponent som använder themeClasses
 */
const ThemeButton = React.forwardRef<HTMLButtonElement, ThemeButtonProps>(
  ({ 
    children, 
    variant = 'primary',
    size = 'md',
    className,
    asChild = false,
    isLoading = false,
    icon,
    iconPosition = 'left',
    ...props
  }, ref) => {
    const { themeClasses } = useTheme();
    const Comp = asChild ? Slot : "button";
    
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return `${themeClasses.primary} ${themeClasses.primaryFg} hover:opacity-90`;
        case 'secondary':
          return `${themeClasses.secondary} ${themeClasses.secondaryText} hover:opacity-90`;
        case 'outline':
          return `bg-transparent border ${themeClasses.border} ${themeClasses.text} hover:bg-[hsl(var(--primary)_/_0.1)]`;
        case 'ghost':
          return `bg-transparent ${themeClasses.text} hover:bg-[hsl(var(--primary)_/_0.1)]`;
        case 'link':
          return `bg-transparent ${themeClasses.primaryText} underline-offset-4 hover:underline`;
        case 'destructive':
          return `bg-[hsl(var(--destructive))] text-white hover:opacity-90`;
        default:
          return `${themeClasses.primary} ${themeClasses.primaryFg} hover:opacity-90`;
      }
    };
    
    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'h-8 px-3 py-1 text-sm';
        case 'lg':
          return 'h-11 px-6 py-2.5 text-base';
        case 'icon':
          return 'h-9 w-9 p-2';
        default:
          return 'h-10 px-4 py-2 text-sm';
      }
    };
    
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)] disabled:opacity-50 disabled:pointer-events-none',
          getVariantClasses(),
          getSizeClasses(),
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </Comp>
    );
  }
);

ThemeButton.displayName = "ThemeButton";

export default ThemeButton;