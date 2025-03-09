'use client';

import React from 'react';
import { MuiAppProvider } from './MuiAppProvider';
import MuiDashboardLayout from './MuiDashboardLayout';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HelpIcon from '@mui/icons-material/Help';

// Definiera navigationsstrukturen
const NAVIGATION = [
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

interface MuiDashboardWrapperProps {
  children: React.ReactNode;
}

// Wrapper-komponent som ger hela MUI-kontexten och layouten
export default function MuiDashboardWrapper({ children }: MuiDashboardWrapperProps) {
  return (
    <MuiAppProvider navigation={NAVIGATION}>
      <MuiDashboardLayout navigation={NAVIGATION}>
        {children}
      </MuiDashboardLayout>
    </MuiAppProvider>
  );
}