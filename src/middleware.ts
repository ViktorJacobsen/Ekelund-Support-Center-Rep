import { NextRequest, NextResponse } from 'next/server';

// Rutter som inte kräver autentisering
const publicRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Kontrollera om vi behöver autentisering för den här sidan
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // VIKTIGT: Under utveckling, hoppa över auth-kontroll helt
  // Ta bort eller kommentera bort denna rad i produktion
  return NextResponse.next();
  
  /* Kommentera bort resten av middleware under utveckling
  // Hämta JWT-token från cookies
  const authToken = request.cookies.get('auth_token')?.value;
  
  // Om det är en publik rutt, fortsätt. Annars kontrollera om användaren är inloggad
  if (isPublicRoute) {
    // Om användaren är inloggad och försöker komma åt en inloggningssida, 
    // omdirigera till dashboard
    if (authToken && pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // För andra publika rutter, låt användaren fortsätta
    return NextResponse.next();
  }
  
  // Om det inte är en publik rutt och användaren inte är inloggad, 
  // omdirigera till inloggningssidan
  if (!authToken) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
  
  // Användaren är inloggad och försöker komma åt en skyddad rutt, låt dem fortsätta
  return NextResponse.next();
  */
}

// Matchar alla rutter i appen
export const config = {
  matcher: [
    /*
     * Matcha alla rutter utom:
     * - api-rutter
     * - filer med filändelser (bilder, JS, CSS etc.)
     * - favicon.ico och andra static-filer
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};