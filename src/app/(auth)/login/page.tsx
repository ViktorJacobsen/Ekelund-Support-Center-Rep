'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/styles/theme/theme-context';
import { useAuth } from '@/lib/auth/auth-context';

export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  const { isAuthenticated, isLoading, login } = useAuth();
  const { themeClasses } = useTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Markera när komponenten är fullständigt monterad på klientsidan
  useEffect(() => {
    setIsMounted(true);
    console.log('LoginPage monterad');
    
    // Rensa eventuella redirect-parametrar från URL:en för att förhindra loopar
    if (window.location.search.includes('redirect')) {
      window.history.replaceState({}, document.title, window.location.pathname);
      console.log('Rensat redirect-parametrar från URL');
    }
  }, []);
  
  // Omdirigera om redan inloggad
  useEffect(() => {
    if (!isMounted || isLoading) return;
    
    // Kontrollera både auth context och localStorage
    const isTestUserLoggedIn = localStorage.getItem('test-admin-auth') === 'true';
    
    if (isAuthenticated || isTestUserLoggedIn) {
      console.log('Användare redan inloggad, omdirigerar till dashboard');
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, isMounted, router]);
  
  // Hantera inloggningsförsök
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Inloggningsformulär skickat');
    
    // Rensa tidigare felmeddelanden
    setErrorMessage(null);
    
    // Validera inmatning
    if (!email.trim()) {
      setErrorMessage('E-postadress måste anges');
      return;
    }
    
    if (!password.trim()) {
      setErrorMessage('Lösenord måste anges');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Försöker logga in med:', email);
      const result = await login(email, password);
      
      if (result.success) {
        console.log('Inloggning lyckades, omdirigerar till dashboard');
        router.push('/dashboard');
      } else {
        setErrorMessage(result.message || 'Inloggningen misslyckades');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Ett fel uppstod vid inloggningen');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Direkt testinloggning (för debugging)
  const handleTestLogin = () => {
    console.log('Direkt testinloggning...');
    setIsSubmitting(true);
    
    try {
      // Sätt testanvändaren direkt i localStorage
      localStorage.setItem('test-admin-auth', 'true');
      console.log('Test-admin-auth satt i localStorage');
      
      // Omdirigera till dashboard
      console.log('Omdirigerar till dashboard');
      router.push('/dashboard');
    } catch (error) {
      console.error('Fel vid testinloggning:', error);
      setErrorMessage(`Fel vid testinloggning: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  // För att undvika hydration errors, visa ingenting förrän client-side mount är klar
  if (!isMounted) {
    return null;
  }

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} flex items-center justify-center p-4`}>
      <div className={`max-w-md w-full ${themeClasses.cardBg} rounded-xl shadow-lg border ${themeClasses.border} p-8`}>
        <div className="text-center mb-8">
          <div className={`h-16 w-16 rounded-full ${themeClasses.primary} mx-auto flex items-center justify-center mb-4`}>
            <span className={`text-2xl font-bold ${themeClasses.primaryFg}`}>E</span>
          </div>
          <h1 className={`text-2xl ${themeClasses.heading} ${themeClasses.text} mb-2`}>Ekelund Support Center</h1>
          <p className={`${themeClasses.mutedText}`}>Logga in för att fortsätta</p>
        </div>
        
        <form onSubmit={handleLogin}>
          {errorMessage && (
            <div className="mb-6 px-4 py-3 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}
          
          <div className="mb-6">
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-2`} htmlFor="email">
              E-postadress
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
              placeholder="namn@ekelund.se"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="mb-6">
            <label className={`block text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText} mb-2`} htmlFor="password">
              Lösenord
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 ${themeClasses.bg} border ${themeClasses.border} rounded-lg ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)_/_0.3)]`}
              placeholder="••••••••"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className={`h-4 w-4 ${themeClasses.border} rounded focus:ring-[hsl(var(--primary)_/_0.3)]`}
              />
              <label htmlFor="remember" className={`ml-2 text-sm ${themeClasses.uiLabel} ${themeClasses.mutedText}`}>
                Kom ihåg mig
              </label>
            </div>
            
            <a href="#" className={`text-sm ${themeClasses.primaryText} hover:underline`}>
              Glömt lösenord?
            </a>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${themeClasses.primary} ${themeClasses.primaryFg} py-3 rounded-lg transition-all duration-300 hover:opacity-90 flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loggar in...</span>
              </>
            ) : (
              <span>Logga in</span>
            )}
          </button>
        </form>
        
        {/* Direkt testinloggningsknapp (kan tas bort i produktion) */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleTestLogin}
            className="w-full text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Utvecklingsläge: Direkt inloggning (admin)
          </button>
        </div>
        
        <div className={`mt-8 pt-6 border-t ${themeClasses.border} text-center`}>
          <p className={`text-sm ${themeClasses.mutedText}`}>
            Behöver du ett konto?{' '}
            <a href="/kontakt" className={`${themeClasses.primaryText} hover:underline`}>Kontakta administratören</a>
          </p>
        </div>
      </div>
    </div>
  );
}