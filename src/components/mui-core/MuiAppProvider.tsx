// src/components/mui-core/MuiAppProvider.tsx
'use client';

import React, { ReactNode, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/styles/theme/MuiThemeProvider'; // Update this import
import { lightTheme, darkTheme } from '@/styles/theme/mui-theme';

// Import types
import { 
  NavigationItem, 
  NavigationDivider, 
  NavigationHeader, 
  NavigationItems, 
  Router 
} from '@/types/navigation';

// App context for sharing state and navigation data
interface AppContextValue {
  navigation: NavigationItems;
  router: Router;
  darkMode: boolean;
  toggleTheme: () => void;
}

// Create context
const AppContext = React.createContext<AppContextValue | null>(null);

// Hook for using app context
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a MuiAppProvider');
  }
  return context;
};

// Props for app provider
interface MuiAppProviderProps {
  children: ReactNode;
  navigation: NavigationItems;
}

// Create a minimal router that works with Next.js
function useMinimalRouter(): Router {
  // Get current pathname client-side
  const [pathname, setPathname] = React.useState('/');
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
      
      // Listen for URL changes
      const handleRouteChange = () => {
        setPathname(window.location.pathname);
      };
      
      window.addEventListener('popstate', handleRouteChange);
      return () => window.removeEventListener('popstate', handleRouteChange);
    }
  }, []);
  
  // Create router object
  const router = useMemo(() => ({
    pathname,
    navigate: (path: string) => {
      window.location.href = path;
    }
  }), [pathname]);
  
  return router;
}

// Main component - MuiAppProvider
export function MuiAppProvider({ children, navigation }: MuiAppProviderProps) {
  const { darkMode, toggleTheme } = useTheme();
  const router = useMinimalRouter();
  
  // Create context value
  const contextValue = useMemo(() => ({
    navigation,
    router,
    darkMode,
    toggleTheme
  }), [navigation, router, darkMode, toggleTheme]);
  
  return (
    <AppContext.Provider value={contextValue}>
      <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppContext.Provider>
  );
}

// Re-export types for backward compatibility
export type { NavigationItem, NavigationDivider, NavigationHeader, NavigationItems, Router };