'use client';

import React from 'react';
import { MuiAppProvider } from '@/components/mui-core/MuiAppProvider';
import { DashboardLayout as DashboardComponent } from '@/components/mui-core/DashboardLayout';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import MenuBookIcon from '@mui/icons-material/MenuBook';
// import HelpIcon from '@mui/icons-material/Help';  // Ta bort om den inte används
import { NavigationItems, NavigationDivider, NavigationHeader, NavigationItem } from '@/types/navigation';

// Definiera navigationsstrukturen med korrekta typer
const NAVIGATION: NavigationItems = [
  {
    kind: 'header',
    title: 'Huvudmeny',
  } as NavigationHeader,
  {
    segment: 'dashboard',
    title: 'Översikt',
    icon: <DashboardIcon />,
  } as NavigationItem,
  {
    kind: 'divider', // Säkerställ att detta stämmer med NavigationDivider
  } as NavigationDivider,
  {
    kind: 'header',
    title: 'Dokumentation',
  } as NavigationHeader,
  {
    segment: 'dokumentation',
    title: 'Dokumentation',
    icon: <ArticleIcon />,
    children: [
      {
        segment: 'installationsguider',
        title: 'Installationsguider',
        icon: <InstallDesktopIcon />,
      },
      {
        segment: 'manualer',
        title: 'Manualer',
        icon: <MenuBookIcon />,
      },
    ],
  } as NavigationItem,
  {
    kind: 'divider',
  } as NavigationDivider,
  {
    kind: 'header',
    title: 'Verktyg',
  } as NavigationHeader,
  {
    segment: 'verktyg',
    title: 'Verktyg',
    icon: <BuildIcon />,
    children: [
      {
        segment: 'matarinsamling',
        title: 'Mätinsamling',
        icon: <AssessmentIcon />,
      },
      {
        segment: 'egenprovning',
        title: 'Egenprovning',
        icon: <DescriptionIcon />,
      },
    ],
  } as NavigationItem,
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Denna funktion har samma namn som importen, vilket orsakar konflikten
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <MuiAppProvider navigation={NAVIGATION}>
      {/* Använd det nya namnet här */}
      <DashboardComponent>
        {children}
      </DashboardComponent>
    </MuiAppProvider>
  );
}