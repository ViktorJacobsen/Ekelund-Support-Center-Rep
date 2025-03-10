// src/app/Provider.tsx
'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/styles/theme/MuiThemeProvider'; // Update this import
import { darkTheme, lightTheme } from '@/styles/theme/mui-theme'; // Make sure this path is correct

interface ProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  const { darkMode } = useTheme();
  
  // Create MUI theme based on darkMode
  const muiTheme = React.useMemo(() => 
    darkMode ? darkTheme : lightTheme, 
    [darkMode]
  );
  
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}