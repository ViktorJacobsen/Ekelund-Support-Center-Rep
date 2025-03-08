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
  onChange?: (id: string) => void;
}

/**
 * Tabnavigation-komponent med tematiska färger
 */
export default function TabNavigation({ 
  tabs, 
  defaultTab, 
  onChange 
}: TabNavigationProps) {
  const { themeClasses } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  // Om defaultTab ändras, uppdatera activeTab
  useEffect(() => {
    if (defaultTab && defaultTab !== activeTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab, activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
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
              activeTab === tab.id
                ? `${themeClasses.primaryText} border-[hsl(var(--primary))]`
                : `${themeClasses.mutedText} border-transparent hover:${themeClasses.text} hover:border-[hsl(var(--border))]`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}