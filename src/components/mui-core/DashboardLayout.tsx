'use client';

import * as React from 'react';
import { styled, useTheme as useMuiTheme } from '@mui/material/styles'; // Remove unused Theme
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Import the app context
import { useAppContext } from './MuiAppProvider';
import { PageContainer } from './PageContainer';

const drawerWidth = 240;

// Styled header komponent
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Props for the dashboard layout
interface DashboardLayoutProps {
  children: React.ReactNode;
  customHeader?: React.ReactNode;
}

// Main dashboard layout
export function DashboardLayout({ 
  children, 
  customHeader
}: DashboardLayoutProps) {
  const muiTheme = useMuiTheme();
  const darkMode = muiTheme.palette.mode === 'dark';
  const { toggleTheme } = useAppContext();
  const { navigation, router } = useAppContext();
  const [open, setOpen] = React.useState(true);
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});

  // Handle drawer open/close
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Define mixins as functions
  const getOpenedMixin = () => ({
    width: drawerWidth,
    transition: muiTheme.transitions.create('width', {
      easing: muiTheme.transitions.easing.sharp,
      duration: muiTheme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const getClosedMixin = () => ({
    transition: muiTheme.transitions.create('width', {
      easing: muiTheme.transitions.easing.sharp,
      duration: muiTheme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${muiTheme.spacing(7)} + 1px)`,
    [muiTheme.breakpoints.up('sm')]: {
      width: `calc(${muiTheme.spacing(8)} + 1px)`,
    },
  });

  // Handle expanding/collapsing navigation items
  const toggleExpanded = (segment: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [segment]: !prev[segment],
    }));
  };

  // Check if an item is active based on current path
  const isItemActive = (segment: string) => {
    return router.pathname.startsWith(`/${segment}`);
  };

  // Render navigation item
  const renderNavigationItem = (item: NavigationItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isItemActive(item.segment);
    const isExpanded = expandedItems[item.segment] || false;

    return (
      <React.Fragment key={item.segment}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            selected={isActive}
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.segment);
              } else {
                router.navigate(`/${item.segment}`);
              }
            }}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(65, 145, 255, 0.15)', // Bright blue with opacity for dark mode
              },
              '&.Mui-selected:hover': {
                backgroundColor: 'rgba(65, 145, 255, 0.25)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: isActive ? muiTheme.palette.primary.main : undefined,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.title} 
              sx={{ 
                opacity: open ? 1 : 0,
                fontWeight: isActive ? 600 : 400,
              }} 
            />
            {hasChildren && open && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>

        {/* Render children if any */}
        {hasChildren && item.children && (
          <Collapse in={open && isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItemButton
                  key={`${item.segment}-${child.segment}`}
                  selected={isItemActive(`${item.segment}/${child.segment}`)}
                  onClick={() => router.navigate(`/${item.segment}/${child.segment}`)}
                  sx={{
                    pl: 4,
                    py: 0.5,
                    minHeight: 40,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(65, 145, 255, 0.15)', // Bright blue with opacity for dark mode
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(65, 145, 255, 0.25)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                      color: isItemActive(`${item.segment}/${child.segment}`) 
                        ? muiTheme.palette.primary.main 
                        : undefined,
                    }}
                  >
                    {child.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={child.title} 
                    sx={{ 
                      '& .MuiTypography-root': {
                        fontSize: '0.875rem',
                      }
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  // Render navigation items
  const renderNavigation = () => {
    return navigation.map((item, index) => {
      // Render divider
      if ('kind' in item && item.kind === 'divider') {
        return <Divider key={`divider-${index}`} sx={{ my: 1 }} />;
      }

      // Render header
      if ('kind' in item && item.kind === 'header') {
        return (
          <Typography
            key={`header-${index}`}
            variant="overline"
            sx={{
              mt: 2,
              mb: 1,
              ml: open ? 2 : 'auto',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              color: muiTheme.palette.text.secondary,
              display: open ? 'block' : 'none',
            }}
          >
            {item.title}
          </Typography>
        );
      }

      // Render navigation item
      return renderNavigationItem(item as NavigationItem);
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {customHeader ? (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginLeft: open ? drawerWidth : 0,
          width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
          transition: muiTheme.transitions.create(['width', 'margin'], {
            easing: muiTheme.transitions.easing.sharp,
            duration: muiTheme.transitions.duration.enteringScreen,
          }),
        }}>
          {customHeader}
        </Box>
      ) : (
        <AppBar 
          position="fixed" 
          elevation={0} 
          color="inherit"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            transition: muiTheme.transitions.create(['width', 'margin'], {
              easing: muiTheme.transitions.easing.sharp,
              duration: muiTheme.transitions.duration.leavingScreen,
            }),
            ...(open && {
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
              transition: muiTheme.transitions.create(['width', 'margin'], {
                easing: muiTheme.transitions.easing.sharp,
                duration: muiTheme.transitions.duration.enteringScreen,
              }),
            }),
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, fontWeight: 600 }}
            >
              Ekelund Support Center
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            {/* Tema-switchen */}
            <Tooltip title={`Byt till ${darkMode ? "ljust" : "mörkt"} tema`}>
              <IconButton 
                onClick={toggleTheme} 
                color="inherit"
                sx={{ mx: 1 }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            
            <Avatar 
              sx={{ 
                ml: 2, 
                bgcolor: muiTheme.palette.primary.main,
                width: 36,
                height: 36,
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              VJ
            </Avatar>
          </Toolbar>
        </AppBar>
      )}
      
      {/* Ersätt styled Drawer med vanlig Drawer + sx-props */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          ...(open && {
            ...getOpenedMixin(),
            '& .MuiDrawer-paper': getOpenedMixin(),
          }),
          ...(!open && {
            ...getClosedMixin(),
            '& .MuiDrawer-paper': getClosedMixin(),
          }),
        }}
      >
        <DrawerHeader>
          <Box sx={{ 
            display: 'flex', 
            width: '100%', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            px: 1
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              visibility: open ? 'visible' : 'hidden',
            }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  background: darkMode 
                    ? 'linear-gradient(135deg, #1565C0, #64B5F6)' // Mörkare blå gradient
                    : 'linear-gradient(135deg, #1e4575, #3671b9)', // Ljusare blå gradient
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                }}
              >
                E
              </Box>
              <Typography variant="subtitle1" sx={{ ml: 1.5, fontWeight: 600 }}>
                Ekelund
              </Typography>
            </Box>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {renderNavigation()}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Hjälp" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: muiTheme.palette.error.main,
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logga ut" 
                sx={{ 
                  opacity: open ? 1 : 0,
                  color: muiTheme.palette.error.main,
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        // Lägg till marginalen beroende på om du använder custom header
        mt: customHeader ? { xs: 7, sm: 8 } : 0 
      }}>
        {!customHeader && <DrawerHeader />}
        {customHeader && <Box sx={{ height: { xs: 56, sm: 64 } }} />}
        <PageContainer>
          {children}
        </PageContainer>
      </Box>
    </Box>
  );
}