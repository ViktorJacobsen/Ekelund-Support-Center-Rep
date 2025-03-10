// src/app/layout.tsx
'use client';

import './globals.css';
import { MuiThemeProvider } from '@/styles/theme/MuiThemeProvider';

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