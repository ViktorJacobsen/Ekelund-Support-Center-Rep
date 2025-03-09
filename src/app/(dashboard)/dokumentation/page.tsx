'use client';

import React from 'react';
import { useMUI } from '@/lib/mui-config';
import dynamic from 'next/dynamic';

// Dynamiskt importera rätt sida baserat på konfigurationen
const OriginalPage = dynamic(() => import('./page.bak'), { 
  ssr: false,
  loading: () => <div>Laddar...</div>
});

// Vi behöver skapa en MUI-version av dokumentationssidan
const MuiPage = dynamic(() => import('./mui-page'), {
  ssr: false,
  loading: () => <div>Laddar...</div>
});

export default function DokumentationPage() {
  // Använd MUI-versionen eller den ursprungliga baserat på konfiguration
  // Temporärt: Använd bara original eftersom MUI-versionen inte finns än
  return useMUI ? <OriginalPage /> : <OriginalPage />;
  // När MUI-versionen är klar:
  // return useMUI ? <MuiPage /> : <OriginalPage />;
}