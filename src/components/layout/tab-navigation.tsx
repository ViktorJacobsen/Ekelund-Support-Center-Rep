'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/styles/theme/theme-context';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string; // Add this prop to support controlled mode
  onChange?: (id: string) => void;
}

/**
 * Tabnavigation-komponent med tematiska färger
 */
export default function TabNavigation({ 
  tabs, 
  defaultTab, 
  activeTab, // New prop for controlled mode
  onChange 
}: TabNavigationProps) {
  const { themeClasses } = useTheme();
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs[0]?.id || ''
  );
  
  // Use activeTab if provided (controlled mode), otherwise use internal state (uncontrolled mode)
  const currentTab = activeTab !== undefined ? activeTab : internalActiveTab;

  // Update internal state if activeTab changes
  useEffect(() => {
    if (activeTab !== undefined) {
      setInternalActiveTab(activeTab);
    } else if (defaultTab && defaultTab !== internalActiveTab) {
      setInternalActiveTab(defaultTab);
    }
  }, [activeTab, defaultTab, internalActiveTab]);

  const handleTabChange = (tabId: string) => {
    setInternalActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  return (
    <div className={`max-w-7xl mx-auto mb-8 border-b ${themeClasses.border}`}>
      <div className="flex space-x-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-5 py-3 text-sm ${themeClasses.uiLabel} transition-all duration-300 border-b-2 -mb-px whitespace-nowrap ${
              currentTab === tab.id
                ? `${themeClasses.primaryText} border-[hsl(var(--primary))]`
                : `${themeClasses.mutedText} border-transparent hover:${themeClasses.text} hover:border-[hsl(var(--border))]`
            }`}
            role="tab"
            aria-selected={currentTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}