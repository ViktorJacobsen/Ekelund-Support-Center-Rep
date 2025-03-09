'use client';

import React, { useState } from 'react';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '@/styles/theme/theme-context';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Navigation type definitions
export type NavigationItem = {
  segment: string;
  title: string;
  icon: React.ReactNode;
  children?: NavigationItem[];
};

export type NavigationDivider = {
  kind: 'divider';
};

export type NavigationHeader = {
  kind: 'header';
  title: string;
};

export type NavigationItems = (NavigationItem | NavigationDivider | NavigationHeader)[];

interface DashboardLayoutProps {
  children: React.ReactNode;
  navigation: NavigationItems;
}

const drawerWidth = 240;

export default function MuiDashboardLayout({ children, navigation }: DashboardLayoutProps) {
  const muiTheme = useMuiTheme();
  const { toggleTheme, darkMode } = useTheme();
  const [open, setOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  // Toggle drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  // Handle active path
  const isActive = (path: string) => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith(`/${path}`);
    }
    return false;
  };
  
  // Toggle expanded state for navigation items with children
  const toggleExpanded = (segment: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [segment]: !prev[segment]
    }));
  };
  
  // Render navigation item
  const renderItem = (item: NavigationItem) => {
    const active = isActive(item.segment);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.segment] || false;
    
    return (
      <React.Fragment key={item.segment}>
        <ListItem disablePadding>
          <ListItemButton
            selected={active}
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.segment);
              } else {
                window.location.href = `/${item.segment}`;
              }
            }}
            sx={{
              minHeight: 48,
              px: 2.5,
              '&.Mui-selected': {
                bgcolor: theme => 
                  theme.palette.mode === 'dark' 
                    ? 'rgba(100, 181, 246, 0.1)'
                    : 'rgba(30, 69, 117, 0.1)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: active ? 'primary.main' : 'text.secondary',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.title} 
              primaryTypographyProps={{
                fontWeight: active ? 600 : 400,
              }}
            />
            {hasChildren && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
        
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map(child => (
                <ListItemButton
                  key={`${item.segment}-${child.segment}`}
                  selected={isActive(`${item.segment}/${child.segment}`)}
                  onClick={() => window.location.href = `/${item.segment}/${child.segment}`}
                  sx={{
                    pl: 4,
                    minHeight: 40,
                    '&.Mui-selected': {
                      bgcolor: theme => 
                        theme.palette.mode === 'dark' 
                          ? 'rgba(100, 181, 246, 0.1)'
                          : 'rgba(30, 69, 117, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive(`${item.segment}/${child.segment}`) 
                        ? 'primary.main' 
                        : 'text.secondary',
                    }}
                  >
                    {child.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={child.title}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive(`${item.segment}/${child.segment}`) ? 600 : 400,
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
  
  // Render navigation
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
            color="text.secondary"
            sx={{
              mt: 2,
              mb: 1,
              ml: 2,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            {item.title}
          </Typography>
        );
      }
      
      // Render navigation item
      return renderItem(item as NavigationItem);
    });
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { sm: open ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { sm: open ? `${drawerWidth}px` : 0 },
          transition: muiTheme.transitions.create(['margin', 'width'], {
            easing: muiTheme.transitions.easing.sharp,
            duration: muiTheme.transitions.duration.leavingScreen,
          }),
          borderBottom: 1,
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2, ...(open && { display: { sm: 'none' } }) }}
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
          
          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          {/* Theme toggle */}
          <Tooltip title={`Byt till ${darkMode ? "ljust" : "mörkt"} tema`}>
            <IconButton 
              onClick={toggleTheme}
              color="inherit"
              sx={{ mx: 1 }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          
          {/* User avatar */}
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 36,
              height: 36,
              ml: 1,
              fontWeight: 600,
            }}
          >
            VJ
          </Avatar>
        </Toolbar>
      </AppBar>
      
      {/* Navigation drawer */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 1,
            borderColor: 'divider',
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'primary.main',
                fontWeight: 'bold',
              }}
            >
              E
            </Avatar>
            <Typography variant="subtitle1" sx={{ ml: 1.5, fontWeight: 600 }}>
              Ekelund
            </Typography>
          </Box>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        
        <Divider />
        
        {/* Navigation */}
        <List
          sx={{
            pt: 0,
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {renderNavigation()}
        </List>
        
        <Divider />
        
        {/* Bottom navigation */}
        <List>
          <ListItemButton>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Hjälp" />
          </ListItemButton>
          
          <ListItemButton>
            <ListItemIcon sx={{ color: 'error.main' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logga ut" 
              primaryTypographyProps={{
                color: 'error.main',
              }}
            />
          </ListItemButton>
        </List>
      </Drawer>
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: open ? `${drawerWidth}px` : 0 },
          transition: muiTheme.transitions.create(['margin', 'width'], {
            easing: muiTheme.transitions.easing.sharp,
            duration: muiTheme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar /> {/* This adds space for the AppBar */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}