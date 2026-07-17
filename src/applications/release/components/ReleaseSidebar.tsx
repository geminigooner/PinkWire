import React from 'react';
import { Activity, CheckSquare, History, Rocket } from 'lucide-react';
import { cn } from '../../../utils/cn';

export type ReleaseTab = 'dashboard' | 'preflight' | 'history';

interface ReleaseSidebarProps {
  activeTab: ReleaseTab;
  setActiveTab: (tab: ReleaseTab) => void;
}

export function ReleaseSidebar({ activeTab, setActiveTab }: ReleaseSidebarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'preflight', label: 'Preflight', icon: CheckSquare },
    { id: 'history', label: 'History', icon: History },
  ] as const;

  return (
    <div className="w-16 sm:w-64 shrink-0 border-r border-os-window-border bg-os-window-bg/80 flex flex-col h-full overflow-y-auto scrollbar-hide p-2 sm:p-4">
      <h2 className="hidden sm:flex items-center gap-2 text-xl font-light mb-6 text-os-text tracking-tight px-2">
        <Rocket className="text-os-accent" />
        Release Manager
      </h2>
      <h2 className="sm:hidden flex items-center justify-center mb-4 text-os-accent">
        <Rocket size={20} />
      </h2>
      <div className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ReleaseTab)}
              className={cn(
                "w-full flex items-center justify-center sm:justify-start gap-3 p-3 sm:px-3 sm:py-2.5 rounded-os text-sm transition-all text-left",
                isActive 
                  ? "bg-os-accent text-white shadow-os" 
                  : "text-os-text-muted hover:bg-white/5 hover:text-os-text"
              )}
              title={tab.label}
            >
              <Icon size={18} className={cn("shrink-0", isActive ? "text-white" : "text-os-accent/70")} />
              <span className="font-medium hidden sm:block">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
