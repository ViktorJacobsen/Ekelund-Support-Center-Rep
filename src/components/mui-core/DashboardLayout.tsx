'use client';

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

// Import the app context
import { useAppContext, NavigationItem } from './AppProvider';
import { PageContainer } from './PageContainer';

const drawerWidth = 240;

// Styled components for the drawer
const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// Main dashboard layout
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
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
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: isActive ? theme.palette.primary.main : undefined,
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
        {hasChildren && (
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
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                      color: isItemActive(`${item.segment}/${child.segment}`) 
                        ? theme.palette.primary.main 
                        : theme.palette.text.secondary,
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
              color: theme.palette.text.secondary,
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
      <AppBar position="fixed" open={open} elevation={0} color="inherit">
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
          <Avatar 
            sx={{ 
              ml: 2, 
              bgcolor: theme.palette.primary.main,
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
      <Drawer variant="permanent" open={open}>
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
                  background: 'linear-gradient(135deg, #1e4575, #3671b9)',
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
                  color: theme.palette.error.main,
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logga ut" 
                sx={{ 
                  opacity: open ? 1 : 0,
                  color: theme.palette.error.main,
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <PageContainer>
          {children}
        </PageContainer>
      </Box>
    </Box>
  );
}