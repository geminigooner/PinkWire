import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useSyncStore } from '../../services/sync/useSyncStore';
import { useProfileStore } from '../../services/profile/useProfileStore';
import { osEvents } from '../../services/notifications/EventBus';

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, token } = useAuthStore();
  const { initialize, disconnect } = useSyncStore();
  
  useEffect(() => {
    if (isAuthenticated && token) {
      // Connect sync when user logs in
      initialize(token).then(() => {
        osEvents.publish({ 
          type: 'Toast', 
          payload: { 
            message: 'Cloud Sync connected.'
          } 
        });
      });
    } else {
      // Disconnect when logged out
      disconnect();
    }
  }, [isAuthenticated, token, initialize, disconnect]);

  // Subscribe to offline/online events for resilience
  useEffect(() => {
    const handleOnline = () => {
      if (useAuthStore.getState().isAuthenticated) {
        useSyncStore.getState().triggerManualSync();
      }
    };
    
    const handleOffline = () => {
      useSyncStore.getState().setStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <>{children}</>;
}
