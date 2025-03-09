'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { useScrollHeader } from '@/hooks/use-scroll-header';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Header() {
  const { themeClasses, darkMode, toggleTheme } = useTheme();
  const { isHeaderVisible } = useScrollHeader();

  return (
    <header 
      className={`${themeClasses.cardBg} backdrop-blur-sm border-b ${themeClasses.border} sticky top-0 z-30 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full shadow-lg'
      }`}
    >
      <div className="w-full px-4 py-3.5 flex justify-between items-center">
        {/* Lämna utrymme för hamburger-knappen */}
        <div className="w-10"></div>
        
        <div>
          <h1 className={`text-xl ${themeClasses.heading} ${themeClasses.text}`}>Ekelund Support Center</h1>
          <p className={`text-xs ${themeClasses.mutedText}`}>Ekelund Styr</p>
        </div>
        
        <div className="flex items-center space-x-5">
          <button className={`p-2 ${themeClasses.mutedText} hover:${themeClasses.text} relative transition-colors duration-300`}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${themeClasses.primary} animate-pulse`}></span>
          </button>

          <div className={`h-8 border-r ${themeClasses.border}`}></div>
          
          {/* Theme Toggle Button with MUI icons */}
          <Tooltip title={`Byt till ${darkMode ? "ljust" : "mörkt"} tema`}>
            <IconButton 
              onClick={toggleTheme} 
              className={`p-2 rounded-full bg-gradient-to-br ${themeClasses.primaryGradient} ${themeClasses.primaryFg} transition-all duration-300 hover:scale-105`}
              sx={{ color: 'inherit' }}
              size="small"
            >
              {darkMode ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <div className="flex items-center space-x-3">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${themeClasses.primaryGradient} flex items-center justify-center ${themeClasses.primaryFg} transition-transform duration-300 hover:scale-105 shadow-md`}>
              <span className={`${themeClasses.heading}`}>VJ</span>
            </div>
            <span className="text-sm hidden md:block">Viktor Jacobsen</span>
          </div>
        </div>
      </div>
    </header>
  );
}