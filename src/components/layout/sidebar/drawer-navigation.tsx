'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Typer för navigationsstrukturen
interface NavItem {
  title: string;
  segment: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

interface NavDivider {
  kind: 'divider';
}

interface NavHeader {
  kind: 'header';
  title: string;
}

type NavigationItem = NavItem | NavDivider | NavHeader;

interface DrawerNavigationProps {
  navigation: NavigationItem[];
  basePath?: string;
}

const DrawerNavigation: React.FC<DrawerNavigationProps> = ({ 
  navigation,
  basePath = ''
}) => {
  const { themeClasses } = useTheme();
  const pathname = usePathname();
  
  // Funktion för att kolla om en länk är aktiv
  const isActiveLink = (segment: string) => {
    return pathname.includes(`/${segment}`);
  };
  
  // Funktion för att rendera olika typer av navigationsobjekt
  const renderNavItem = (item: NavigationItem, index: number) => {
    // Divider
    if ('kind' in item && item.kind === 'divider') {
      return (
        <div 
          key={`divider-${index}`} 
          className={`my-3 h-px ${themeClasses.dividerColor}`}
        />
      );
    }
    
    // Header/rubrik
    if ('kind' in item && item.kind === 'header') {
      return (
        <h3 
          key={`header-${index}`}
          className={`mb-2 mt-4 px-4 text-xs uppercase ${themeClasses.sidebarSectionText} tracking-wider`}
        >
          {item.title}
        </h3>
      );
    }
    
    // Navigationsobjekt
    const navItem = item as NavItem;
    const isActive = isActiveLink(navItem.segment);
    const hasChildren = navItem.children && navItem.children.length > 0;
    
    // Expanderbart objekt
    if (hasChildren) {
      return (
        <div key={`nav-${navItem.segment}`} className="mb-1">
          <button
            className={`flex w-full items-center justify-between px-4 py-2 rounded-lg transition-colors ${
              isActive 
                ? `${themeClasses.primary} ${themeClasses.primaryFg}`
                : `hover:bg-[hsl(var(--primary)_/_0.1)] ${themeClasses.text}`
            }`}
          >
            <div className="flex items-center">
              {navItem.icon && (
                <span className="mr-3 h-5 w-5">
                  {navItem.icon}
                </span>
              )}
              <span>{navItem.title}</span>
            </div>
            <svg 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Undernavigering */}
          <div className="ml-4 mt-1 pl-4 border-l border-[hsl(var(--divider))]">
            {navItem.children?.map((child, childIndex) => (
              <Link
                key={`child-${navItem.segment}-${childIndex}`}
                href={`${basePath}/${navItem.segment}/${child.segment}`}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActiveLink(`${navItem.segment}/${child.segment}`) 
                    ? `${themeClasses.primary} ${themeClasses.primaryFg}`
                    : `hover:bg-[hsl(var(--primary)_/_0.1)] ${themeClasses.text}`
                }`}
              >
                {child.icon && (
                  <span className="mr-3 h-5 w-5">
                    {child.icon}
                  </span>
                )}
                <span>{child.title}</span>
              </Link>
            ))}
          </div>
        </div>
      );
    }
    
    // Enkelt objekt
    return (
      <Link
        key={`nav-${navItem.segment}`}
        href={`${basePath}/${navItem.segment}`}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          isActive 
            ? `${themeClasses.primary} ${themeClasses.primaryFg}`
            : `hover:bg-[hsl(var(--primary)_/_0.1)] ${themeClasses.text}`
        }`}
      >
        {navItem.icon && (
          <span className="mr-3 h-5 w-5">
            {navItem.icon}
          </span>
        )}
        <span>{navItem.title}</span>
      </Link>
    );
  };
  
  return (
    <nav className="py-4">
      {navigation.map(renderNavItem)}
    </nav>
  );
};

export { DrawerNavigation };
export type { NavigationItem };