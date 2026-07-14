import React from 'react';
import { useSettingsStore } from '../../../store/useSettingsStore';

export function AppearanceSettings() {
  const { theme, setTheme, atmosphere, setAtmosphere } = useSettingsStore();

  const themes = [
    { id: 'pink', name: 'Classic Pink', color: 'bg-pink-500' },
    { id: 'bubblegum', name: 'Bubblegum', color: 'bg-pink-400' },
    { id: 'cherry', name: 'Cherry', color: 'bg-rose-500' },
    { id: 'pearl', name: 'Pearl', color: 'bg-slate-200' },
    { id: 'lavender', name: 'Lavender', color: 'bg-purple-400' },
    { id: 'midnight', name: 'Midnight', color: 'bg-indigo-900' },
    { id: 'cloud', name: 'Cloud', color: 'bg-sky-300' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div>
        <h2 className="text-2xl font-light mb-6">Appearance</h2>
        
        <div className="space-y-8">
          {/* Theme Selection */}
          <section>
            <h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider">System Theme</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    theme === t.id 
                      ? 'bg-os-accent/10 border-os-accent shadow-[0_0_15px_rgba(var(--os-accent),0.2)]' 
                      : 'bg-black/20 border-os-window-border hover:bg-black/40 hover:border-os-text-muted/50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full shadow-inner border border-white/20 ${t.color}`} />
                  <span className="text-sm font-medium text-os-text">{t.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Time & Atmosphere */}
          <section>
            <h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider">Time & Atmosphere</h3>
            <div className="bg-black/20 border border-os-window-border rounded-xl p-1 inline-flex">
              {(['auto', 'day', 'night'] as const).map(atm => (
                <button
                  key={atm}
                  onClick={() => setAtmosphere(atm)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    atmosphere === atm 
                      ? 'bg-os-accent text-white shadow-md' 
                      : 'text-os-text-muted hover:text-os-text hover:bg-white/5'
                  }`}
                >
                  {atm.charAt(0).toUpperCase() + atm.slice(1)}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-os-text-muted">
              {atmosphere === 'auto' && 'Atmosphere automatically adjusts based on your local time.'}
              {atmosphere === 'day' && 'Atmosphere locked to daytime settings.'}
              {atmosphere === 'night' && 'Atmosphere locked to nighttime settings.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
