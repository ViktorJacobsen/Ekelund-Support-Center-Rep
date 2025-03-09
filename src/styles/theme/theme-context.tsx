'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getThemeClasses } from './theme-variables';

// Förenklade tema-variabler - bara Light 1 och Dark 1
const lightThemeValues = {
  '--gradient': 'linear-gradient(to top left,#25324b,#325169)',
  '--background': '219 96.7% 98.44%',
  '--foreground': '219 3.4000000000000004% 0.88%',
  '--muted': '219 3.4000000000000004% 92.2%',
  '--muted-foreground': '219 1.7000000000000002% 42.2%',
  '--popover': '219 62.8% 92.2%',
  '--popover-foreground': '219 3.4000000000000004% 1.1%',
  '--card': '219 62.8% 92.2%',
  '--card-foreground': '219 3.4000000000000004% 1.1%',
  '--border': '219 8.4% 89.88%',
  '--input': '219 8.4% 89.88%',
  '--primary': '219 34% 22%',
  '--primary-foreground': '219 0.68% 92.2%',
  '--secondary': '219 1.7000000000000002% 96.1%',
  '--secondary-foreground': '219 3.04% 12.2%',
  '--accent': '219 1.7000000000000002% 96.1%',
  '--accent-foreground': '219 3.04% 12.2%',
  '--destructive': '0 84.2% 60.2%',
  '--destructive-foreground': '0 0% 98%',
  '--ring': '219 34% 22%',
  '--divider': '204 9.9% 55.2%',
};

const darkThemeValues = {
  '--gradient': 'linear-gradient(to top left,#0acffe,#495aff)',
  '--background': '204 64.35% 4.16%',
  '--foreground': '204 9.9% 97.6%',
  '--muted': '204 49.5% 15.600000000000001%',
  '--muted-foreground': '204 9.9% 55.2%',
  '--popover': '204 45.2% 6.76%',
  '--popover-foreground': '204 9.9% 97.6%',
  '--card': '204 45.2% 6.76%',
  '--card-foreground': '204 9.9% 97.6%',
  '--border': '204 49.5% 15.600000000000001%',
  '--input': '204 49.5% 15.600000000000001%',
  '--primary': '204 99% 52%',
  '--primary-foreground': '204 9.9% 5.2%',
  '--secondary': '204 49.5% 15.600000000000001%',
  '--secondary-foreground': '204 9.9% 97.6%',
  '--accent': '204 49.5% 15.600000000000001%',
  '--accent-foreground': '204 9.9% 97.6%',
  '--destructive': '0 62.8% 30.6%',
  '--destructive-foreground': '204 9.9% 97.6%',
  '--ring': '204 99% 52%',
  '--divider': '204 49.5% 15.600000000000001%',
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

// Förbättrad ThemeScript
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
        `
      }}
    />
  );
}

// Förbättrad ThemeProvider
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const themeClasses = getThemeClasses();
  
  // Synka med system-preferens och localStorage
  useEffect(() => {
    try {
      // Kolla först om vi kör på klientsidan
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
        setDarkMode(shouldBeDark);
      }
    } catch (e) {
      console.error("Theme initialization error:", e);
    }
    
    setMounted(true);
  }, []);
  
  // Uppdatera tema när darkMode ändras
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    if (darkMode) {
      root.classList.add('dark');
      
      // Applicera alla CSS-variabler för Dark 1-temat
      Object.entries(darkThemeValues).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
      
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) { /* ignorera */ }
    } else {
      root.classList.remove('dark');
      
      // Applicera alla CSS-variabler för Light 1-temat
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