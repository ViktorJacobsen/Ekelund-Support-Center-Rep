// Kontrollera om det finns några oavslutade strängar, parenteser eller liknande
// Säkerställ att alla imports är korrekta
import './globals.css';
import { MuiThemeProvider } from '@/styles/theme/MuiThemeProvider';

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
    <html lang="sv" suppressHydrationWarning>
      <body>
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  );
}