'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/styles/theme/theme-context';
import getTheme from './mui-theme';

interface MuiThemeProviderProps {
  children: ReactNode;
}

/**
 * MUI Theme Provider som använder ditt befintliga tema-system
 * för att välja rätt MUI-tema baserat på darkMode.
 */
export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  const { darkMode } = useTheme();
  
  // Hämta rätt MUI-tema baserat på darkMode
  const theme = React.useMemo(() => getTheme(darkMode), [darkMode]);
  
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default MuiThemeProvider;