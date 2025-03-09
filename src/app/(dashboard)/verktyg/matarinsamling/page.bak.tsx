'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import MeterForm from '@/components/tools/meter-form';
import { useAuth } from '@/lib/auth/auth-context';
import { useRouter } from 'next/navigation';

export default function MeterCollectionPage() {
  const { themeClasses } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  // Omdirigera om användaren inte är inloggad
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  // Visa laddningsindikator om vi kontrollerar autentisering
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-[hsl(var(--primary))]"></div>
      </div>
    );
  }
  
  // Om användaren inte är autentiserad, visa ingenting (redirect hanteras av useEffect)
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className={`text-3xl ${themeClasses.heading} ${themeClasses.text} mb-2`}>Mätarinsamling</h1>
        <p className={`${themeClasses.bodyText} ${themeClasses.mutedText}`}>
          Använd detta verktyg för att samla in och exportera mätardata. Du kan skanna mätar-ID med kameran eller ange dem manuellt.
        </p>
      </div>
      
      <MeterForm />
    </div>
  );
}