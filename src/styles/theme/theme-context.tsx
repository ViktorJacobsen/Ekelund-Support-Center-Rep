'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Exporterar funktioner som skapar CSS-klasser baserat på de CSS-variabler som definieras i globals.css
export const getThemeClasses = () => {
  return {
    // Core backgrounds
    bg: "bg-[hsl(var(--background))]",
    cardBg: "bg-[hsl(var(--card))]",
    popoverBg: "bg-[hsl(var(--popover))]",
    
    // Text colors
    text: "text-[hsl(var(--foreground))]",
    cardText: "text-[hsl(var(--card-foreground))]",
    mutedText: "text-[hsl(var(--muted-foreground))]",
    
    // Accent/Primary colors
    primary: "bg-[hsl(var(--primary))]", 
    primaryText: "text-[hsl(var(--primary))]",
    primaryFg: "text-[hsl(var(--primary-foreground))]",
    
    // Secondary colors
    secondary: "bg-[hsl(var(--secondary))]",
    secondaryText: "text-[hsl(var(--secondary-foreground))]",
    
    // Accent colors
    accent: "bg-[hsl(var(--accent))]",
    accentText: "text-[hsl(var(--accent-foreground))]",
    
    // Destructive colors
    destructive: "bg-[hsl(var(--destructive))]",
    destructiveText: "text-[hsl(var(--destructive))]",
    
    // Borders
    border: "border-[hsl(var(--border))]",
    
    // Hovers
    hoverBorder: "hover:border-[hsl(var(--primary))]",
    hoverText: "hover:text-[hsl(var(--primary))]",
    
    // Sidebar
    sidebarBg: "bg-[hsl(var(--secondary))]",
    sidebarText: "text-[hsl(var(--secondary-foreground))]",
    sidebarActiveText: "text-[hsl(var(--primary-foreground))]",
    sidebarSectionText: "text-[hsl(var(--muted-foreground))] uppercase text-xs font-semibold",
    
    // Other
    dividerColor: "bg-[hsl(var(--divider))]",
    
    // Primary button gradient
    primaryGradient: "from-[hsl(var(--primary))] to-[hsl(var(--primary)_/_0.8)]",

    // Typografi
    heading: "font-[var(--font-display)] font-semibold tracking-tight", 
    subheading: "font-[var(--font-display)] font-medium tracking-normal",
    bodyText: "font-[var(--font-sans)] text-base", 
    codeText: "font-[var(--font-mono)]",
    
    // Specifika varianter
    displayLarge: "font-[var(--font-display)] text-5xl md:text-6xl font-bold tracking-tighter",
    displayMedium: "font-[var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight",
    displaySmall: "font-[var(--font-display)] text-3xl md:text-4xl font-semibold tracking-tight",
    
    // UI-text
    uiLabel: "font-[var(--font-sans)] font-medium",
    uiText: "font-[var(--font-sans)] text-sm",
  };
};

// Definiera typen för ThemeContext
type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
  themeClasses: ReturnType<typeof getThemeClasses>;
};

// Skapa default-värden för context
const defaultContext: ThemeContextType = {
  darkMode: false,
  toggleTheme: () => {},
  themeClasses: getThemeClasses()
};

// Skapa context
const ThemeContext = createContext<ThemeContextType>(defaultContext);

// Hook för att använda temat
export const useTheme = () => useContext(ThemeContext);

// Script som körs på klientsidan för att förhindra FOUC (Flash of Unstyled Content)
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}

// ThemeProvider komponent
export function ThemeProvider({ children }: { children: ReactNode }) {
  // State för att hålla koll på mörk/ljus temapreferens
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Tema-klasser som tillhandahålls för alla komponenter
  const themeClasses = getThemeClasses();
  
  // Synka initial darkMode med localStorage eller system preference när sidan laddas
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        setDarkMode(true);
      }
    } catch (e) {
      // Ignorera fel från localStorage
    }
    
    // Märk att komponenten är monterad
    setMounted(true);
  }, []);
  
  // Uppdatera dokumentets class när darkMode ändras
  useEffect(() => {
    if (!mounted) return;
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {
        // Ignorera localStorage-fel
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {
        // Ignorera localStorage-fel
      }
    }
  }, [darkMode, mounted]);
  
  // Toggle-funktion för tema
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  // Ge alla barnen tillgång till tema-kontexten
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, themeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
}