import React, { useState } from 'react';
import { ReleaseSidebar, ReleaseTab } from './components/ReleaseSidebar';
import { ReleaseDashboard } from './components/ReleaseDashboard';
import { PreflightChecklist } from './components/PreflightChecklist';
import { ReleaseHistory } from './components/ReleaseHistory';
import { useAuthStore } from '../../store/useAuthStore';
import { Rocket, LogIn } from 'lucide-react';

export function ReleaseManagerApp() {
  const [activeTab, setActiveTab] = useState<ReleaseTab>('dashboard');
  const { isAuthenticated, setAuth } = useAuthStore();

  const handleLogin = () => {
    const password = prompt("Enter Administrator Password:");
    if (password === 'amanda') {
      setAuth(true, 'mock-jwt-token');
    } else {
      alert("Invalid password.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex w-full h-full bg-os-window-bg text-os-text overflow-hidden font-sans items-center justify-center p-6 text-center">
        <div className="max-w-sm">
          <div className="w-24 h-24 mx-auto rounded-full bg-os-window-border/50 flex items-center justify-center mb-6">
            <Rocket size={48} className="text-os-text-muted" />
          </div>
          <h2 className="text-2xl font-light mb-2 text-os-text">Restricted Access</h2>
          <p className="text-os-text-muted mb-8">
            The Deployment Center is restricted to the system administrator. You must sign in to prepare or publish releases.
          </p>
          <button 
            onClick={handleLogin}
            className="flex mx-auto items-center gap-2 bg-os-accent text-white px-6 py-3 rounded-os hover:bg-os-accent/90 transition-colors shadow-os font-medium"
          >
            <LogIn size={18} />
            Sign in as Administrator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full bg-os-window-bg text-os-text overflow-hidden font-sans">
      <ReleaseSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto bg-black/10">
        {activeTab === 'dashboard' && <ReleaseDashboard setActiveTab={setActiveTab} />}
        {activeTab === 'preflight' && <PreflightChecklist />}
        {activeTab === 'history' && <ReleaseHistory />}
      </div>
    </div>
  );
}
