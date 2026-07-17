import React from 'react';
import { useSyncStore } from '../../services/sync/useSyncStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Cloud, CloudOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export function SyncIndicator() {
  const { status } = useSyncStore();
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return null; // Visitors don't have cloud sync
  }

  const renderIcon = () => {
    switch (status) {
      case 'syncing':
        return <RefreshCw size={14} className="animate-spin text-os-accent" />;
      case 'synced':
        return <CheckCircle2 size={14} className="text-green-500" />;
      case 'offline':
        return <CloudOff size={14} className="text-os-text-muted" />;
      case 'error':
        return <AlertCircle size={14} className="text-red-500" />;
      case 'waiting':
        return <Cloud size={14} className="text-yellow-500 opacity-80" />;
      default:
        return <Cloud size={14} />;
    }
  };

  const renderTooltip = () => {
    switch (status) {
      case 'syncing': return 'Syncing data to Cloud...';
      case 'synced': return 'All changes saved to Cloud';
      case 'offline': return 'Cloud sync paused (Offline)';
      case 'error': return 'Cloud sync error';
      case 'waiting': return 'Waiting to sync...';
      default: return 'Cloud Sync';
    }
  };

  return (
    <div 
      className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/10 transition-colors"
      title={renderTooltip()}
    >
      {renderIcon()}
    </div>
  );
}
