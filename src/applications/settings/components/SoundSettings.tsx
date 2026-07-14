import React from 'react';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { Volume2, VolumeX, ToggleLeft, ToggleRight, Play } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function SoundSettings() {
  const { soundEnabled, setSoundEnabled, volume, setVolume, sounds, toggleSound } = useSettingsStore();

  const soundOptions = [
    { id: 'startup', label: 'Startup' },
    { id: 'shutdown', label: 'Shutdown' },
    { id: 'notification', label: 'Notification' },
    { id: 'windowOpen', label: 'Window Open' },
    { id: 'windowClose', label: 'Window Close' },
    { id: 'error', label: 'Error' },
    { id: 'success', label: 'Success' },
    { id: 'drag', label: 'Drag' },
    { id: 'drop', label: 'Drop' },
  ] as const;

  const playPreview = (type: string) => {
    if (!soundEnabled || !sounds[type as keyof typeof sounds]) return;
    
    // Simulate sound preview
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    
    if (type === 'error') oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
    else if (type === 'success') oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
    else oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime((volume / 100) * 0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div>
        <h2 className="text-2xl font-light mb-6">Sound</h2>
        
        <div className="bg-black/20 border border-os-window-border rounded-xl p-6 space-y-8">
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-os-text font-medium mb-1">System Sounds</h3>
              <p className="text-sm text-os-text-muted">Enable or disable global OS sound effects.</p>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-os-text-muted hover:text-os-text transition-colors"
            >
              {soundEnabled ? <ToggleRight size={32} className="text-os-accent" /> : <ToggleLeft size={32} />}
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-os-text font-medium flex items-center gap-2">
              {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              Master Volume
            </h3>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-os-accent"
                disabled={!soundEnabled}
              />
              <span className="text-sm text-os-text-muted w-8 text-right">{volume}%</span>
            </div>
          </div>

        </div>

        <div className="mt-8 bg-black/20 border border-os-window-border rounded-xl p-6">
          <h3 className="text-os-text font-medium mb-4">Individual Sounds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {soundOptions.map((option) => {
              const isEnabled = sounds[option.id];
              return (
                <div 
                  key={option.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-all",
                    !soundEnabled ? "opacity-50 pointer-events-none" : "",
                    isEnabled ? "bg-os-accent/10 border-os-accent/30" : "bg-black/40 border-transparent"
                  )}
                >
                  <span className="text-sm text-os-text">{option.label}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => playPreview(option.id)}
                      className="p-1 rounded-full text-os-text-muted hover:text-os-accent hover:bg-white/10 transition-colors"
                      title="Preview Sound"
                    >
                      <Play size={14} fill="currentColor" />
                    </button>
                    <button
                      onClick={() => toggleSound(option.id)}
                      className="text-os-text-muted hover:text-os-text transition-colors"
                    >
                      {isEnabled ? <ToggleRight size={20} className="text-os-accent" /> : <ToggleLeft size={20} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
