// Förslag för uppdaterad theme-context.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getThemeClasses } from './theme-variables';

const lightThemeValues = {
    '--background': '218 32% 100%',
    '--foreground': '218 5% 10%',
    '--card': '218 32% 100%',
    '--card-foreground': '218 5% 15%',
    '--popover': '218 32% 100%',
    '--popover-foreground': '218 95% 10%',
    '--primary': '218 81% 34%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '218 30% 90%',
    '--secondary-foreground': '0 0% 0%',
    '--muted': '180 30% 95%',
    '--muted-foreground': '218 5% 40%',
    '--accent': '180 30% 90%',
    '--accent-foreground': '218 5% 15%',
    '--destructive': '0 50% 50%',
    '--destructive-foreground': '218 5% 100%',
    '--border': '218 30% 82%',
    '--divider': '213 4% 16%',
    '--input': '218 30% 50%',
    '--ring': '218 81% 34%',
};

const darkThemeValues = {
    '--background': '216 37% 8%',
    '--foreground': '218 5% 100%',
    '--card': '216 32% 12%',
    '--card-foreground': '218 5% 100%',
    '--popover': '216 32% 12%',
    '--popover-foreground': '218 5% 100%',
    '--primary': '218 81% 34%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '216 32% 12%',
    '--secondary-foreground': '0 0% 100%',
    '--muted': '187 79% 28%',
    '--muted-foreground': '218 5% 65%',
    '--accent': '187 79% 28%',
    '--accent-foreground': '218 5% 95%',
    '--destructive': '0 50% 50%',
    '--destructive-foreground': '218 5% 100%',
    '--border': '213 4% 27%',
    '--divider': '213 4% 27%',
    '--input': '218 30% 50%',
    '--ring': '218 81% 34%',
};

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
  themeClasses: ReturnType<typeof getThemeClasses>;
};

const defaultContext: ThemeContextType = {
  darkMode: false,
  toggleTheme: () => {},
  themeClasses: getThemeClasses()
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

// ThemeScript justeras för att passa Next.js 13 bättre
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
              document.documentElement.classList.add('dark');
              console.log("Dark theme applied via script");
            } else {
              document.documentElement.classList.remove('dark');
              console.log("Light theme applied via script");
            }
          } catch (e) {
            console.error("Theme script error:", e);
          }
        `,
      }}
    />
  );
}

// ThemeProvider med förbättrad kompabilitet
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const themeClasses = getThemeClasses();
  
  // Synka med system-preferens och localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      setDarkMode(shouldBeDark);
      
      // Force update av DOM
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error("Theme initialization error:", e);
    }
    
    setMounted(true);
  }, []);
  
  // Uppdatera tema när darkMode ändras
  // In your ThemeProvider component
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    if (darkMode) {
      root.classList.add('dark');
      
      // Applicera alla mörka temavärden
      Object.entries(darkThemeValues).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
      
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) { /* ignorera */ }
    } else {
      root.classList.remove('dark');
      
      // Applicera alla ljusa temavärden
      Object.entries(lightThemeValues).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
      
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) { /* ignorera */ }
    }
  }, [darkMode, mounted]);
  
  // Toggle-funktion
  const toggleTheme = () => {
    console.log(`Toggling theme: ${darkMode ? 'light' : 'dark'}`);
    setDarkMode(!darkMode);
  };
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, themeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
}