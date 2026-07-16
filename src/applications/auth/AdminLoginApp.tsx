import React, { useState } from 'react';
import { Lock, Unlock, Key, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useWindowStore } from '../../store/useWindowStore';
import { cn } from '../../utils/cn';

export function AdminLoginApp({ windowId }: { windowId: string }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const setAuth = useAuthStore(state => state.setAuth);
  const logout = useAuthStore(state => state.logout);
  const closeWindow = useWindowStore(state => state.closeWindow);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        const data = await res.json();
        setAuth(true, data.token);
        setTimeout(() => {
          closeWindow(windowId);
        }, 1500);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-os-os-os">
        <div className="w-20 h-20 rounded-full bg-os-accent/20 flex items-center justify-center mb-6">
          <Unlock size={40} className="text-os-accent" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">Authenticated</h2>
        <p className="text-os-text-muted mb-8">Administrator mode is currently active.</p>
        <button
          onClick={() => {
            logout();
            closeWindow(windowId);
          }}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-os transition-colors border border-white/10"
        >
          Lock System
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-8 bg-black/40 backdrop-blur-os-os-os">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
        <div className="w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-6 shadow-os">
          <Lock size={32} className="text-os-text-muted" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">Authentication Required</h2>
        <p className="text-os-text-muted text-center mb-8">
          This area is restricted to the system administrator.
        </p>
        
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <div className="relative">
              <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-os-text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full h-12 bg-black/50 border border-white/10 rounded-os pl-12 pr-4 text-os-text placeholder:text-os-text-muted/70 focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50 transition-all"
                autoFocus
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-2 ml-1 animate-in fade-in slide-in-from-top-1">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="w-full h-12 bg-os-accent hover:bg-os-accent/80 disabled:opacity-50 disabled:hover:bg-os-accent text-white font-medium rounded-os transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}
