'use client';

import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// Stilad Tabs-komponent för att matcha din ursprungliga design
const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(3),
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}));

// Stilad Tab-komponent
const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&:hover': {
    color: theme.palette.text.primary,
    opacity: 1,
  },
}));

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (id: string) => void;
}

export default function MuiTabNavigation({ 
  tabs, 
  defaultTab, 
  activeTab, 
  onChange 
}: TabNavigationProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs[0]?.id || ''
  );
  
  // Använd activeTab om det finns (kontrollerat läge), annars internalActiveTab (okontrollerat läge)
  const currentTabId = activeTab !== undefined ? activeTab : internalActiveTab;
  
  // Hitta index för nuvarande tab
  const currentTabIndex = tabs.findIndex(tab => tab.id === currentTabId);
  
  // Uppdatera intern state om activeTab ändras
  useEffect(() => {
    if (activeTab !== undefined) {
      setInternalActiveTab(activeTab);
    } else if (defaultTab && defaultTab !== internalActiveTab) {
      setInternalActiveTab(defaultTab);
    }
  }, [activeTab, defaultTab, internalActiveTab]);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    const newTabId = tabs[newIndex]?.id;
    if (newTabId) {
      setInternalActiveTab(newTabId);
      if (onChange) {
        onChange(newTabId);
      }
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <StyledTabs
        value={currentTabIndex >= 0 ? currentTabIndex : 0}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="navigation tabs"
      >
        {tabs.map((tab) => (
          <StyledTab key={tab.id} label={tab.label} />
        ))}
      </StyledTabs>
    </Box>
  );
}