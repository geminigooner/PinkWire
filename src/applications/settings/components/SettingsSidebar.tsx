import React from 'react';
import { Palette, Monitor, Volume2, Accessibility, Info } from 'lucide-react';
import { SettingsTab } from '../SettingsApp';
import { cn } from '../../../utils/cn';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
}

export function SettingsSidebar({ activeTab, setActiveTab }: SettingsSidebarProps) {
  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'sound', label: 'Sound', icon: Volume2 },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'about', label: 'About', icon: Info },
  ] as const;

  return (
    <div className="w-64 shrink-0 border-r border-os-window-border bg-os-window-bg/80 flex flex-col h-full overflow-y-auto scrollbar-hide p-4">
      <h2 className="text-xl font-light mb-6 text-os-text tracking-tight px-2">Control Panel</h2>
      <div className="space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                isActive 
                  ? "bg-os-accent text-white shadow-sm" 
                  : "text-os-text-muted hover:bg-white/5 hover:text-os-text"
              )}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-os-accent/70"} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
