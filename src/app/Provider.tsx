'use client';

import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMUI } from '@/lib/mui-config';
import { useTheme } from '@/styles/theme/theme-context';
import { getTheme } from '@/styles/theme/mui-theme';

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  const { darkMode } = useTheme();
  
  // Skapa MUI-tema baserat på darkMode
  const muiTheme = React.useMemo(() => getTheme(darkMode), [darkMode]);
  
  // Om MUI inte används, returnera bara children
  if (!useMUI) {
    return <>{children}</>;
  }
  
  // Annars applicera MUI-tema
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}