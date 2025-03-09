'use client';

import * as React from 'react';
import { ThemeProvider, Theme } from '@mui/material/styles';

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
  const contextValue = React.useMemo(
    () => ({
      navigation,
      router,
      window,
    }),
    [navigation, router, window]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}