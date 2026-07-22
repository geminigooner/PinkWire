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
      initialize(token).then(async () => {
        try {
          const res = await fetch('/api/sync', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            let shouldReload = false;
            for (const [storeName, payload] of Object.entries<any>(data)) {
              const currentLocal = localStorage.getItem(storeName);
              // The backend stores the SyncPayload which has { storeName, data, timestamp }
              // We need to write the `payload.data` to localStorage
              const newLocal = typeof payload.data === 'string' ? payload.data : JSON.stringify(payload.data);
              if (currentLocal !== newLocal && newLocal) {
                localStorage.setItem(storeName, newLocal);
                shouldReload = true;
              }
            }
            if (shouldReload) {
              window.location.reload();
              return;
            }
          }
        } catch(e) {
          console.error('Failed to pull sync data on login:', e);
        }

        osEvents.publish({ 
          type: 'Toast', 
          payload: { 
            message: 'Cloud Sync connected & synchronized.'
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
