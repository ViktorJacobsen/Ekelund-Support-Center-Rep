'use client';

import React, { useEffect } from 'react';
import { useMUI } from '@/lib/mui-config';
import dynamic from 'next/dynamic';

// Dynamiskt importera rätt sida baserat på konfigurationen
const OldDashboardPage = dynamic(() => import('./components/original-dashboard'), { 
  ssr: false,
  loading: () => <div>Laddar...</div>
});

const MuiDashboardPage = dynamic(() => import('./components/mui-dashboard'), {
  ssr: false,
  loading: () => <div>Laddar...</div>
});

export default function DashboardPage() {
  // Använd MUI-versionen eller den ursprungliga baserat på konfiguration
  return useMUI ? <MuiDashboardPage /> : <OldDashboardPage />;
}