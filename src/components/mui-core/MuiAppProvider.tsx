'use client';

import React, { ReactNode, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/styles/theme/theme-context';
import { getTheme } from '@/styles/theme/mui-theme';
import { NavigationItems } from './MuiDashboardLayout';

// Router-liknande interface för att hålla koll på navigering
export interface Router {
  pathname: string;
  navigate: (path: string) => void;
}

// App context för att dela tillstånds- och navigeringsdata
interface AppContextValue {
  navigation: NavigationItems;
  router: Router;
  darkMode: boolean;
  toggleTheme: () => void;
}

// Skapa context
const AppContext = React.createContext<AppContextValue | null>(null);

// Hook för att använda app context
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a MuiAppProvider');
  }
  return context;
};

// Props för app provider
interface MuiAppProviderProps {
  children: ReactNode;
  navigation: NavigationItems;
}

// Skapa en minimal router som fungerar med Next.js
function useMinimalRouter(): Router {
  // Få nuvarande pathname client-side
  const [pathname, setPathname] = React.useState('/');
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
      
      // Lyssna på URL-ändringar
      const handleRouteChange = () => {
        setPathname(window.location.pathname);
      };
      
      window.addEventListener('popstate', handleRouteChange);
      return () => window.removeEventListener('popstate', handleRouteChange);
    }
  }, []);
  
  // Skapa router-objekt
  const router = useMemo(() => ({
    pathname,
    navigate: (path: string) => {
      window.location.href = path;
    }
  }), [pathname]);
  
  return router;
}

// Huvudkomponent - MuiAppProvider
export function MuiAppProvider({ children, navigation }: MuiAppProviderProps) {
  const { darkMode, toggleTheme } = useTheme();
  const router = useMinimalRouter();
  
  // Skapa theme baserat på dark mode
  const muiTheme = useMemo(() => getTheme(darkMode), [darkMode]);
  
  // Skapa context-värdet
  const contextValue = useMemo(() => ({
    navigation,
    router,
    darkMode,
    toggleTheme
  }), [navigation, router, darkMode, toggleTheme]);
  
  return (
    <AppContext.Provider value={contextValue}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline /> {/* Normaliserar CSS */}
        {children}
      </MuiThemeProvider>
    </AppContext.Provider>
  );
}