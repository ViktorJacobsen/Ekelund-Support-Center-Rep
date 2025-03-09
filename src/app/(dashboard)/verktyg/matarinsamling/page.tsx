'use client';

import React from 'react';
import { useMUI } from '@/lib/mui-config';
import dynamic from 'next/dynamic';

// Dynamiskt importera rätt sida baserat på konfigurationen
const OriginalPage = dynamic(() => import('./page.bak'), { 
  ssr: false,
  loading: () => <div>Laddar...</div>
});

const MuiPage = dynamic(() => import('./mui-page'), {
  ssr: false,
  loading: () => <div>Laddar...</div>
});

export default function MatarinsamlingPage() {
  // Använd MUI-versionen eller den ursprungliga baserat på konfiguration
  return useMUI ? <MuiPage /> : <OriginalPage />;
}