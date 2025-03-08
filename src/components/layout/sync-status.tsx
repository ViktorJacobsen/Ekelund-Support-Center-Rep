'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/styles/theme/theme-context';
import { syncManager } from '@/lib/offline/sync-manager';

interface SyncStatusProps {
  expanded?: boolean;
}

const SyncStatus: React.FC<SyncStatusProps> = ({ expanded = false }) => {
  const { themeClasses } = useTheme();
  const [syncStatus, setSyncStatus] = useState({
    isOnline: navigator.onLine,
    isSyncing: false,
    pending: 0,
    lastSyncTime: null as Date | null
  });

  useEffect(() => {
    // Initial status
    updateSyncStats();

    // Registrera händelseslyssnare
    syncManager.on('syncStart', handleSyncStart);
    syncManager.on('syncComplete', handleSyncComplete);
    syncManager.on('statusChange', handleStatusChange);

    // Starta automatisk synkronisering
    syncManager.startAutoSync(30000); // Synka var 30:e sekund

    // Clean-up
    return () => {
      syncManager.off('syncStart', handleSyncStart);
      syncManager.off('syncComplete', handleSyncComplete);
      syncManager.off('statusChange', handleStatusChange);
      syncManager.stopAutoSync();
    };
  }, []);

  // Hämta uppdaterad synkstatistik
  const updateSyncStats = async () => {
    const status = syncManager.getStatus();
    const stats = await syncManager.getSyncStats();
    
    setSyncStatus({
      isOnline: status.isOnline,
      isSyncing: status.isSyncing,
      pending: stats.pending,
      lastSyncTime: stats.lastSyncTime
    });
  };

  // Händelsehanterare
  const handleSyncStart = () => {
    setSyncStatus(prev => ({ ...prev, isSyncing: true }));
  };

  const handleSyncComplete = () => {
    updateSyncStats();
  };

  const handleStatusChange = (data: { isOnline: boolean }) => {
    setSyncStatus(prev => ({ ...prev, isOnline: data.isOnline }));
  };

  // Formatera tiden till en läsbar sträng
  const formatSyncTime = (date: Date | null): string => {
    if (!date) return 'Aldrig';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just nu';
    if (diffMins < 60) return `${diffMins} min sedan`;
    
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Status text baserat på synkstatus
  const getStatusText = (): string => {
    if (!syncStatus.isOnline) return 'Offline';
    if (syncStatus.isSyncing) return 'Synkar...';
    return 'Online';
  };

  // Status color based on sync state
  const getStatusColor = (): string => {
    if (!syncStatus.isOnline) return 'bg-orange-500';
    if (syncStatus.isSyncing) return 'bg-blue-500';
    if (syncStatus.pending > 0) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Trigga manuell synk
  const handleManualSync = () => {
    if (syncStatus.isOnline && !syncStatus.isSyncing) {
      syncManager.syncAll();
    }
  };

  if (expanded) {
    return (
      <div className={`rounded-lg ${themeClasses.bg} border ${themeClasses.border} group transition-all duration-300 ${themeClasses.hoverBorder} hover:shadow-md overflow-hidden`}>
        {/* Compact view (always visible) */}
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full ${getStatusColor()} ${syncStatus.isSyncing ? 'animate-pulse' : ''}`}></span>
          </div>
          <span className={`text-xs ${themeClasses.primaryText} ml-2`}>
            {getStatusText()}
          </span>
          
          {/* "Expand" icon */}
          <svg className={`h-4 w-4 ${themeClasses.mutedText} ml-auto group-hover:opacity-0 transition-opacity duration-200`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Expanded information (visible on hover) */}
        <div className="max-h-0 group-hover:max-h-28 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
          <div className={`px-3 pb-3 pt-1 border-t ${themeClasses.border}/50`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${themeClasses.mutedText}`}>Status:</span>
              <span className={`text-xs ${themeClasses.text}`}>{getStatusText()}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs ${themeClasses.mutedText}`}>Senaste synk:</span>
              <span className={`text-xs ${themeClasses.text}`}>{formatSyncTime(syncStatus.lastSyncTime)}</span>
            </div>
            {syncStatus.pending > 0 && (
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs ${themeClasses.mutedText}`}>Väntande ändringar:</span>
                <span className={`text-xs ${themeClasses.text}`}>{syncStatus.pending}</span>
              </div>
            )}
            <button 
              onClick={handleManualSync} 
              disabled={!syncStatus.isOnline || syncStatus.isSyncing}
              className={`w-full mt-2 rounded text-xs py-1 ${
                !syncStatus.isOnline || syncStatus.isSyncing 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : `${themeClasses.primary} ${themeClasses.primaryFg} hover:opacity-90`
              } transition-all duration-300`}
            >
              {syncStatus.isSyncing ? 'Synkar...' : 'Synka nu'}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative group" style={{ isolation: 'isolate' }}>
        {/* Minimized circle */}
        <div 
          onClick={handleManualSync}
          className={`w-8 h-8 rounded-full ${themeClasses.bg} border ${themeClasses.border} flex items-center justify-center transition-all duration-300 ${themeClasses.hoverBorder} hover:shadow-md cursor-pointer`}
        >
          <span className={`w-3 h-3 rounded-full ${getStatusColor()} ${syncStatus.isSyncing ? 'animate-pulse' : ''}`}></span>
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
              <span className={`w-2 h-2 rounded-full ${getStatusColor()} mr-2 ${syncStatus.isSyncing ? 'animate-pulse' : ''}`}></span>
              <span className={`text-xs ${themeClasses.mutedText}`}>Status: {getStatusText()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs ${themeClasses.mutedText}`}>Senaste:</span>
              <span className={`text-xs ${themeClasses.text}`}>{formatSyncTime(syncStatus.lastSyncTime)}</span>
            </div>
            {syncStatus.pending > 0 && (
              <div className="flex justify-between items-center mt-1">
                <span className={`text-xs ${themeClasses.mutedText}`}>Väntande:</span>
                <span className={`text-xs ${themeClasses.text}`}>{syncStatus.pending}</span>
              </div>
            )}
            <button 
              onClick={handleManualSync} 
              disabled={!syncStatus.isOnline || syncStatus.isSyncing}
              className={`w-full mt-2 rounded text-xs py-1 ${
                !syncStatus.isOnline || syncStatus.isSyncing 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : `${themeClasses.primary} ${themeClasses.primaryFg} hover:opacity-90`
              } transition-all duration-300`}
            >
              {syncStatus.isSyncing ? 'Synkar...' : 'Synka nu'}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SyncStatus;