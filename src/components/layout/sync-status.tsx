'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/styles/theme/theme-context';

interface SyncStatusProps {
  expanded?: boolean;
}

const SyncStatus: React.FC<SyncStatusProps> = ({ expanded = false }) => {
  const { themeClasses } = useTheme();
  const [syncStatus, setSyncStatus] = useState({
    isOnline: navigator.onLine,
    isSyncing: false,
    lastSyncTime: new Date()
  });

  useEffect(() => {
    // Lyssna på online/offline-händelser
    const handleOnline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: true }));
    };
    
    const handleOffline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: false }));
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Simulera synkronisering för demo
    const interval = setInterval(() => {
      if (navigator.onLine) {
        setSyncStatus(prev => ({
          ...prev,
          isSyncing: true
        }));
        
        // Simulera synkronisering
        setTimeout(() => {
          setSyncStatus(prev => ({
            ...prev,
            isSyncing: false,
            lastSyncTime: new Date()
          }));
        }, 1500);
      }
    }, 60000); // Synkronisera varje minut
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  // Formatera tid till snyggt format
  const formatSyncTime = () => {
    return syncStatus.lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (expanded) {
    return (
      <div className={`rounded-lg ${themeClasses.bg} border ${themeClasses.border} group transition-all duration-300 ${themeClasses.hoverBorder} hover:shadow-md overflow-hidden`}>
        {/* Compact view (always visible) */}
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full ${syncStatus.isOnline ? (syncStatus.isSyncing ? 'bg-blue-500' : 'bg-green-500') : 'bg-orange-500'} ${syncStatus.isSyncing ? 'animate-pulse' : ''}`}></span>
          </div>
          <span className={`text-xs ${themeClasses.primaryText} ml-2`}>
            {syncStatus.isOnline ? (syncStatus.isSyncing ? 'Synkar...' : 'Synk') : 'Offline'}
          </span>
          
          {/* "Expand" icon */}
          <svg className={`h-4 w-4 ${themeClasses.mutedText} ml-auto group-hover:opacity-0 transition-opacity duration-200`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Expanded information (visible on hover) */}
        <div className="max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
          <div className={`px-3 pb-3 pt-1 border-t ${themeClasses.border}/50`}>
            <div className="flex items-center">
              <span className={`text-xs ${themeClasses.mutedText}`}>
                Status: {syncStatus.isOnline ? (syncStatus.isSyncing ? 'Synkroniserar' : 'Online') : 'Offline'}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs ${themeClasses.mutedText}`}>Senaste synk:</span>
              <span className={`text-xs ${themeClasses.text}`}>{formatSyncTime()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative group" style={{ isolation: 'isolate' }}>
        {/* Minimized circle */}
        <div className={`w-8 h-8 rounded-full ${themeClasses.bg} border ${themeClasses.border} flex items-center justify-center transition-all duration-300 ${themeClasses.hoverBorder} hover:shadow-md`}>
          <span className={`w-3 h-3 rounded-full ${syncStatus.isOnline ? (syncStatus.isSyncing ? 'bg-blue-500' : 'bg-green-500') : 'bg-orange-500'} ${syncStatus.isSyncing ? 'animate-pulse' : ''}`}></span>
        </div>
        
        {/* Popup on hover - with extreme z-index to ensure it's above everything */}
        <div className="fixed ml-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-32" 
          style={{ 
            zIndex: 9999, 
            left: '4rem', 
            bottom: '1rem'
          }}>
          <div className={`rounded-lg ${themeClasses.bg} border ${themeClasses.border} shadow-lg p-3`}>
            <div className="flex items-center justify-center mb-2">
              <span className={`w-2 h-2 rounded-full ${syncStatus.isOnline ? (syncStatus.isSyncing ? 'bg-blue-500' : 'bg-green-500') : 'bg-orange-500'} mr-2 ${syncStatus.isSyncing ? 'animate-pulse' : ''}`}></span>
              <span className={`text-xs ${themeClasses.mutedText}`}>
                Status: {syncStatus.isOnline ? (syncStatus.isSyncing ? 'Synkroniserar' : 'Online') : 'Offline'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs ${themeClasses.mutedText}`}>Senaste:</span>
              <span className={`text-xs ${themeClasses.text}`}>{formatSyncTime()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SyncStatus;