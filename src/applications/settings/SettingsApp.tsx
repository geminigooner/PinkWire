import React, { useState } from 'react';
import { SettingsSidebar } from './components/SettingsSidebar';
import { AppearanceSettings } from './components/AppearanceSettings';
import { DesktopSettings } from './components/DesktopSettings';
import { SoundSettings } from './components/SoundSettings';
import { AccessibilitySettings } from './components/AccessibilitySettings';
import { AboutSettings } from './components/AboutSettings';

export type SettingsTab = 'appearance' | 'desktop' | 'sound' | 'accessibility' | 'about';

export function SettingsApp() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');

  return (
    <div className="flex w-full h-full bg-os-window-bg text-os-text overflow-hidden font-sans">
      <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto bg-black/10">
        {activeTab === 'appearance' && <AppearanceSettings />}
        {activeTab === 'desktop' && <DesktopSettings />}
        {activeTab === 'sound' && <SoundSettings />}
        {activeTab === 'accessibility' && <AccessibilitySettings />}
        {activeTab === 'about' && <AboutSettings />}
      </div>
    </div>
  );
}
