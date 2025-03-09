'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/styles/theme/theme-context';
import { lightTheme, darkTheme } from './mui-theme'; // Importera temana direkt istället för funktionen

interface MuiThemeProviderProps {
  children: ReactNode;
}

/**
 * MUI Theme Provider som använder ditt befintliga tema-system
 * för att välja rätt MUI-tema baserat på darkMode.
 */
export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  const { darkMode } = useTheme();
  
  // Välj tema direkt istället för att anropa getTheme-funktionen
  const theme = React.useMemo(() => darkMode ? darkTheme : lightTheme, [darkMode]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default MuiThemeProvider;