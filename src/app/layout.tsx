import './globals.css';
import { Inter, Raleway, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider, ThemeScript } from '@/styles/theme/theme-context';

// Konfigurera typsnitt med rätt undergrupper
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata = {
  title: 'Ekelund Support Center',
  description: 'Intern support, dokumentation och verktyg för Ekelund Styr',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${inter.variable} ${raleway.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* Explicit CSS import i head om det hjälper */}
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}