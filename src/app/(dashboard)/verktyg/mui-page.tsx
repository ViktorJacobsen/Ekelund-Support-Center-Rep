'use client';

import React, { useEffect } from 'react';
import { Container, Typography, Box, Paper, LinearProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import MuiMeterForm from '@/components/tools/mui-meter-form';
import { useAuth } from '@/lib/auth/auth-context';

export default function MeterCollectionPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  // Omdirigera om användaren inte är inloggad
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  // Visa laddningsindikator om vi kontrollerar autentisering
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
  
  // Om användaren inte är autentiserad, visa ingenting (redirect hanteras av useEffect)
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