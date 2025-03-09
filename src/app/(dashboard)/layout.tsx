'use client';

import React from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppProvider, Navigation } from '@/components/mui-core/AppProvider';
import { DashboardLayout } from '@/components/mui-core/DashboardLayout';
import Header from '@/components/layout/header/header';
import CssBaseline from '@mui/material/CssBaseline';

// Import icons from Material UI
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// Configure navigation structure
const NAVIGATION: Navigation = [
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

function useLocalRouter() {
  const [pathname, setPathname] = React.useState("/dashboard");
  
  React.useEffect(() => {
    // Update pathname on initial load and navigation
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
      
      const handleRouteChange = () => {
        setPathname(window.location.pathname);
      };
      
      window.addEventListener('popstate', handleRouteChange);
      return () => window.removeEventListener('popstate', handleRouteChange);
    }
  }, []);
  
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: typeof window !== 'undefined' 
        ? new URLSearchParams(window.location.search) 
        : new URLSearchParams(),
      navigate: (path: string | URL) => {
        const newPath = String(path);
        window.history.pushState({}, '', newPath);
        setPathname(newPath);
      },
    };
  }, [pathname]);
  
  return router;
}

const DashboardLayoutWrapper: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { themeClasses, darkMode } = useTheme();
  const router = useLocalRouter();
  
  // Create a custom theme based on app's dark/light mode
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#64B5F6' : '#1e4575', // Match the app's primary color
          },
          secondary: {
            main: darkMode ? '#81c784' : '#2e7d32',
          },
          background: {
            default: darkMode ? '#121212' : '#f5f5f5',
            paper: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
        typography: {
          fontFamily: [
            'var(--font-sans)',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          h6: {
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
      }),
    [darkMode]
  );

  // Get window client-side only to avoid SSR issues
  const [windowObj, setWindowObj] = React.useState<Window | undefined>(undefined);
  React.useEffect(() => {
    setWindowObj(window);
  }, []);

  return (
    <div className={`min-h-screen ${themeClasses.bodyText} ${themeClasses.bg} ${themeClasses.text}`}>
      <ThemeProvider theme={theme}>
        <AppProvider
          navigation={NAVIGATION}
          router={router}
          theme={theme}
          window={windowObj}
        >
          <CssBaseline />
          <DashboardLayout customHeader={<Header />}>
            {children}
          </DashboardLayout>
        </AppProvider>
      </ThemeProvider>
    </div>
  );
};

export default DashboardLayoutWrapper;