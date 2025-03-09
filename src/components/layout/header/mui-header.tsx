'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '@/styles/theme/theme-context';
import Tooltip from '@mui/material/Tooltip';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function MuiHeader({ onMenuClick }: HeaderProps) {
  const muiTheme = useMuiTheme();
  const { darkMode, toggleTheme } = useTheme();
  
  // Hide header on scroll down
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar 
        position="fixed" 
        color="inherit" 
        elevation={0}
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'background.default',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {/* Menu button (only show if onMenuClick is provided) */}
          {onMenuClick && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* Logo & Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ekelund Support Center
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Ekelund Styr
            </Typography>
          </Typography>
          
          {/* Notifications */}
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Badge color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          {/* Theme Toggle */}
          <Tooltip title={`Byt till ${darkMode ? "ljust" : "mörkt"} tema`}>
            <IconButton 
              onClick={toggleTheme} 
              color="inherit"
              sx={{ 
                mr: 2,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          
          {/* User Avatar */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36,
                bgcolor: 'primary.main',
                fontWeight: 'medium',
              }}
            >
              VJ
            </Avatar>
            <Typography 
              variant="body2" 
              sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}
            >
              Viktor Jacobsen
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}