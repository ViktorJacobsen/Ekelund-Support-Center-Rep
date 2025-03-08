'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Endast köra denna kod på klientsidan
    if (typeof window === 'undefined') return;
    
    // Rensa eventuella redirect-parametrar från URL:en
    if (window.location.search.includes('redirect')) {
      window.history.replaceState({}, document.title, window.location.pathname);
      console.log('Rensat redirect-parametrar från URL');
    }
    
    // Kontrollera om vi är på en dashboard-sida men inte inloggade
    const checkAuth = () => {
      // Kontrollera både auth context och localStorage
      const isTestUserLoggedIn = localStorage.getItem('test-admin-auth') === 'true';
      
      // Endast omdirigera om användaren inte är inloggad enligt både auth context och localStorage
      if (!isAuthenticated && !isLoading && !isTestUserLoggedIn) {
        console.log('Användare ej autentiserad, omdirigerar till login');
        router.push('/login');
      }
    };
    
    // Anropa med en liten fördröjning för att undvika race conditions
    const timer = setTimeout(checkAuth, 200);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, router]);
  
  // Rendera alltid children - vi låter klientsidans logik hantera omdirigeringen
  return <>{children}</>;
}