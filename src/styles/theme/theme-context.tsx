// Förslag för uppdaterad theme-context.tsx
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getThemeClasses } from './theme-variables';

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
  // I din theme-context.tsx, modifiera useEffect-funktionen
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    if (darkMode) {
      root.classList.add('dark');
      // Direkt överstyra CSS-variabler
      root.style.setProperty('--background', '216 37% 8%');
      root.style.setProperty('--foreground', '218 5% 100%');
      root.style.setProperty('--card', '216 32% 12%');
      // Lägg till fler variabler...
      
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {}
    } else {
      root.classList.remove('dark');
      // Återställ till standardvärdena
      root.style.removeProperty('--background');
      root.style.removeProperty('--foreground');
      root.style.removeProperty('--card');
      // Återställ fler...
      
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {}
    }
  }, [darkMode, mounted]);
  
  // Uppdatera tema när darkMode ändras
  useEffect(() => {
    if (!mounted) return;
    
    console.log(`Theme changing to: ${darkMode ? 'dark' : 'light'}`);
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {
        console.error("localStorage error:", e);
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {
        console.error("localStorage error:", e);
      }
    }
    
    // Debug-information
    setTimeout(() => {
      console.log("Current document classes:", document.documentElement.className);
      console.log("Current CSS variables:", {
        background: getComputedStyle(document.documentElement).getPropertyValue('--background'),
        foreground: getComputedStyle(document.documentElement).getPropertyValue('--foreground'),
        primary: getComputedStyle(document.documentElement).getPropertyValue('--primary')
      });
    }, 100);
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