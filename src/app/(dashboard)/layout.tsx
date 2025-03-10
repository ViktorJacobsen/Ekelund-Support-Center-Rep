'use client';

import React from 'react';
import { MuiAppProvider } from '@/components/mui-core/MuiAppProvider';
// Ändra importen för att undvika konflikter med komponentnamnet
import { DashboardLayout as DashboardLayoutComponent } from '@/components/mui-core/DashboardLayout';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import MenuBookIcon from '@mui/icons-material/MenuBook';
// Ta bort oanvänd import
// import HelpIcon from '@mui/icons-material/Help';
import { NavigationItems } from '@/types/navigation';

// Definiera navigationsstrukturen
const NAVIGATION: NavigationItems = [
  {
    kind: 'header',
    title: 'Huvudmeny',
  },
  {
    segment: 'dashboard',
    title: 'Översikt',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Dokumentation',
  },
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
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Verktyg',
  },
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
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <MuiAppProvider navigation={NAVIGATION}>
      {/* Skicka inte navigation som prop eftersom den inte finns i DashboardLayoutProps */}
      <DashboardLayoutComponent>
        {children}
      </DashboardLayoutComponent>
    </MuiAppProvider>
  );
}