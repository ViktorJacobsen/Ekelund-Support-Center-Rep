'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import MuiMeterForm from '@/components/tools/mui-meter-form';

// MUI imports
import { Container, Typography, Box, Paper, LinearProgress } from '@mui/material';

export default function MuiMatarinsamlingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  // Redirect if user is not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 3 }}>
        <Paper sx={{ p: 3, width: '100%', maxWidth: 500 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Laddar...</Typography>
          <LinearProgress />
        </Paper>
      </Box>
    );
  }
  
  // If user is not authenticated, show nothing (redirect handled by useEffect)
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mätarinsamling
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Använd detta verktyg för att samla in och exportera mätardata. Du kan skanna mätar-ID med kameran eller ange dem manuellt.
        </Typography>
      </Box>
      
      <MuiMeterForm />
    </Container>
  );
}