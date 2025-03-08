'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import SidebarTooltip from './sidebar-tooltip';
import SidebarItem from './sidebar-item';

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

export default function Sidebar({ expanded, onToggle }: SidebarProps) {
  const { themeClasses } = useTheme();
  
  // Example of active state tracking - you might want to use a router or state management
  const activePage = "matinsamling"; // This could come from a router or state
  
  // SVG icon components to keep the code clean
  const icons = {
    home: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    datablad: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    manualer: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    howto: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    installation: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    matinsamling: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    egenprovning: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    help: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    logout: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
    toggleExpand: (
      <svg className="w-5 h-5 transform rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    ),
    toggleCollapse: (
      <svg className="w-5 h-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    )
  };

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen ${themeClasses.sidebarBg} rounded-br-xl z-50 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
        expanded ? 'w-64' : 'w-16'
      }`}
    >
      {/* Header section with logo and name */}
      <div className={`p-4 ${expanded ? 'flex items-center justify-between' : 'flex flex-col items-center'}`}>
        {expanded ? (
          <>
            <div className="flex flex-col items-center">
              <div className={`rounded-lg ${themeClasses.primary} w-10 h-10 flex items-center justify-center mb-0`}>
                <span className={`${themeClasses.primaryFg} ${themeClasses.heading} text-lg`}>E</span>
              </div>
            </div>
            
            <SidebarTooltip content="Stäng menyn">
              <button 
                onClick={onToggle}
                className={`${themeClasses.mutedText} hover:${themeClasses.sidebarText} transition-colors duration-200 mb-3`}
              >
                {icons.toggleExpand}
              </button>
            </SidebarTooltip>
          </>
        ) : (
          <>
            <SidebarTooltip content="Ekelund Support Center">
              <div className={`rounded-lg ${themeClasses.primary} w-10 h-10 flex items-center justify-center`}>
                <span className={`${themeClasses.primaryFg} ${themeClasses.heading} text-lg`}>E</span>
              </div>
            </SidebarTooltip>

            <SidebarTooltip content="Expandera menyn">
              <button 
                onClick={onToggle}
                className={`mt-5 ${themeClasses.mutedText} hover:${themeClasses.sidebarText} transition-colors duration-200`}
              >
                {icons.toggleCollapse}
              </button>
            </SidebarTooltip>
          </>
        )}
      </div>
      
      {/* Scrollable middle section */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Home icon section */}
        <div className={`px-4 ${!expanded && 'flex justify-center'}`}>
          <SidebarItem 
            icon={icons.home}
            label="Översikt"
            href="#"
            expanded={expanded}
            active={activePage === "oversikt"}
          />
        </div>

        {/* Divider line */}
        <div className={`h-px ${themeClasses.dividerColor} ${
              expanded 
                ? `mx-3 mb-3 mt-3` 
                : `mx-3 mb-3 mt-0`
            } `}></div>
        
        {/* Documentation section */}
        <div className={`px-4 pb-4 ${!expanded && 'flex flex-col items-center'}`}>
          <h3 className={`${
            expanded ? `px-3 text-xs uppercase ${themeClasses.sidebarSectionText} tracking-wider mb-2` : 'hidden'
          }`}>
            DOKUMENTATION
          </h3>
          
          <div className={`${expanded ? 'space-y-1' : 'space-y-4'}`}>
            {/* Use SidebarItem for all items */}
            <SidebarItem 
              icon={icons.datablad}
              label="Datablad"
              href="#"
              expanded={expanded}
              active={activePage === "datablad"}
            />
            
            <SidebarItem 
              icon={icons.manualer}
              label="Manualer"
              href="#"
              expanded={expanded}
              active={activePage === "manualer"}
            />
            
            <SidebarItem 
              icon={icons.howto}
              label="How-To Guider"
              href="#"
              expanded={expanded}
              active={activePage === "howto"}
            />
            
            <SidebarItem 
              icon={icons.installation}
              label="Installationsfiler"
              href="#"
              expanded={expanded}
              active={activePage === "installationsfiler"}
            />
          </div>
        </div>

        {/* Divider line */}
        <div className={`h-px ${themeClasses.dividerColor} mx-3 mb-3 mt-0`}></div>

        {/* Tools section */}
        <div className={`px-4 pb-4 ${!expanded && 'flex flex-col items-center'}`}>
          <h3 className={`${
            expanded ? `px-3 text-xs uppercase ${themeClasses.sidebarSectionText} tracking-wider mb-2` : 'hidden'
          }`}>
            VERKTYG
          </h3>
          
          <div className={`${expanded ? 'space-y-1' : 'space-y-4'}`}>
            <SidebarItem 
              icon={icons.matinsamling}
              label="Mätinsamling"
              href="#"
              expanded={expanded}
              active={activePage === "matinsamling"}
            />
            
            <SidebarItem 
              icon={icons.egenprovning}
              label="Egenprovning"
              href="#"
              expanded={expanded}
              active={activePage === "egenprovning"}
            />
          </div>
        </div>
      </div>
      
      {/* Fixed bottom section */}
      <div className="shrink-0">
        {/* Help */}
        <div className={`${expanded ? 'px-4 pt-3' : 'flex justify-center pt-3'}`}>
          <SidebarItem 
            icon={icons.help}
            label="Hjälp"
            href="#"
            expanded={expanded}
            active={activePage === "help"}
          />
        </div>
        
        {/* Logout - Note: This uses special styling so we keep the original implementation */}
        <div className={`${expanded ? 'px-4' : 'flex justify-center'}`}>
          {expanded ? (
            <a
              href="/logout"
              className={`flex items-center px-3 py-2 text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive)_/_0.8)] rounded-lg hover:bg-[hsl(var(--destructive)_/_0.1)] transition-all duration-200 mb-3`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logga ut</span>
            </a>
          ) : (
            <SidebarTooltip content="Logga ut">
              <button
                className={`p-2 h-9 w-9 text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive)_/_0.8)] rounded-lg hover:bg-[hsl(var(--destructive)_/_0.1)] transition-all duration-200 flex items-center justify-center mb-3`}
                type="button"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </SidebarTooltip>
          )}
        </div>

        {/* Divider line */}
        <div className={`h-px ${themeClasses.dividerColor} mx-3 mb-3`}></div>
        
        {/* Sync component - keeping original implementation since it's complex */}
        <div className={`${expanded ? 'px-4 pb-4' : 'flex justify-center pb-4'}`}>
          {expanded ? (
            <div className={`rounded-lg ${themeClasses.bg} border ${themeClasses.border} group transition-all duration-300 ${themeClasses.hoverBorder} hover:shadow-md overflow-hidden`}>
              {/* Compact view (always visible) */}
              <div className="p-2 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                </div>
                <span className={`text-xs ${themeClasses.primaryText} ml-2`}>Synk</span>
                
                {/* "Expand" icon */}
                <svg className={`h-4 w-4 ${themeClasses.mutedText} ml-auto group-hover:opacity-0 transition-opacity duration-200`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Expanded information (visible on hover) */}
              <div className="max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                <div className={`px-3 pb-3 pt-1 border-t ${themeClasses.dividerBorder}/50`}>
                  <div className="flex items-center">
                    <span className={`text-xs ${themeClasses.mutedText}`}>Status: Online</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${themeClasses.mutedText}`}>Senaste synk:</span>
                    <span className={`text-xs ${themeClasses.text}`}>10:24</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative group" style={{ isolation: 'isolate' }}>
              {/* Minimized circle */}
              <div className={`w-8 h-8 rounded-full ${themeClasses.bg} border ${themeClasses.border} flex items-center justify-center transition-all duration-300 ${themeClasses.hoverBorder} hover:shadow-md`}>
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              
              {/* Popup on hover - with extreme z-index to ensure it's above everything */}
              <div className="fixed ml-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-32" 
                style={{ 
                  zIndex: 9999, 
                  left: '4rem', 
                  bottom: expanded ? 'auto' : '1rem'
                }}>
                <div className={`rounded-lg ${themeClasses.bg} border ${themeClasses.border} shadow-lg p-3`}>
                  <div className="flex items-center justify-center mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    <span className={`text-xs ${themeClasses.mutedText}`}>Status: Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${themeClasses.mutedText}`}>Senaste:</span>
                    <span className={`text-xs ${themeClasses.text}`}>10:24</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}