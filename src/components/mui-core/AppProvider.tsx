'use client';

import * as React from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import { useTheme } from '@/styles/theme/theme-context';

// Define the Navigation type to match the template
export type NavigationItem = {
  segment: string;
  title: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
};

export type NavigationDivider = {
  kind: 'divider';
};

export type NavigationHeader = {
  kind: 'header';
  title: string;
};

export type Navigation = (NavigationItem | NavigationDivider | NavigationHeader)[];

// Define the Router type to match the template
export interface Router {
  pathname: string;
  searchParams: URLSearchParams;
  navigate: (path: string | URL) => void;
}

// Props for the AppProvider component
interface AppProviderProps {
  children: React.ReactNode;
  navigation: Navigation;
  router: Router;
  theme: Theme;
  window?: Window;
}

// Context for providing navigation and router
interface AppContextValue {
  navigation: Navigation;
  router: Router;
  window?: Window;
  themeClasses: ReturnType<typeof useTheme>['themeClasses'];
  darkMode: boolean;
  toggleTheme: () => void;
}

const AppContext = React.createContext<AppContextValue | null>(null);

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// AppProvider component to provide theme, navigation, and router
export function AppProvider({
  children,
  navigation,
  router,
  theme,
  window,
}: AppProviderProps) {
  // Hämta temainformation från ditt huvudtema-system
  const { themeClasses, darkMode, toggleTheme } = useTheme();

  const contextValue = React.useMemo(
    () => ({
      navigation,
      router,
      window,
      themeClasses,
      darkMode,
      toggleTheme
    }),
    [navigation, router, window, themeClasses, darkMode, toggleTheme]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </AppContext.Provider>
  );
}