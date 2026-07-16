import React from 'react';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { ToggleLeft, ToggleRight, MousePointer2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function AccessibilitySettings() {
  const { 
    reducedMotion, setReducedMotion, 
    highContrast, setHighContrast, 
    largerText, setLargerText,
    cursorSize, setCursorSize,
    animationSpeed, setAnimationSpeed,
    clockFormat, setClockFormat,
    cursor, setCursor,
    cursorTrails, setCursorTrails
  } = useSettingsStore();

  const cursors = [
    { id: 'classic', name: 'Classic' },
    { id: 'sparkles', name: 'Sparkles' },
    { id: 'hearts', name: 'Hearts' },
    { id: 'stars', name: 'Stars' },
    { id: 'minimal', name: 'Minimal' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8 sm:space-y-12">
      <div>
        <h2 className="text-2xl font-light mb-6">Accessibility & Display</h2>
        
        <div className="space-y-8">
          
          <section>
            <h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider">Vision & Motion</h3>
            <div className="bg-black/20 border border-os-window-border rounded-os p-4 space-y-2">
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className="w-full flex items-center justify-between text-sm text-os-text hover:bg-white/5 p-3 rounded-os transition-colors"
              >
                <div className="text-left">
                  <div className="font-medium">Reduced Motion</div>
                  <div className="text-os-text-muted text-xs mt-0.5">Minimize animations and transition effects</div>
                </div>
                {reducedMotion ? <ToggleRight size={24} className="text-os-accent" /> : <ToggleLeft size={24} className="text-os-text-muted" />}
              </button>
              
              <button
                onClick={() => setHighContrast(!highContrast)}
                className="w-full flex items-center justify-between text-sm text-os-text hover:bg-white/5 p-3 rounded-os transition-colors"
              >
                <div className="text-left">
                  <div className="font-medium">High Contrast</div>
                  <div className="text-os-text-muted text-xs mt-0.5">Increase border opacity and text contrast</div>
                </div>
                {highContrast ? <ToggleRight size={24} className="text-os-accent" /> : <ToggleLeft size={24} className="text-os-text-muted" />}
              </button>
              
              <button
                onClick={() => setLargerText(!largerText)}
                className="w-full flex items-center justify-between text-sm text-os-text hover:bg-white/5 p-3 rounded-os transition-colors"
              >
                <div className="text-left">
                  <div className="font-medium">Larger Text</div>
                  <div className="text-os-text-muted text-xs mt-0.5">Increase font sizes across the OS</div>
                </div>
                {largerText ? <ToggleRight size={24} className="text-os-accent" /> : <ToggleLeft size={24} className="text-os-text-muted" />}
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 gap-3">
                <div className="text-left">
                  <div className="font-medium text-sm">Animation Speed</div>
                  <div className="text-os-text-muted text-xs mt-0.5">Adjust the speed of OS transitions</div>
                </div>
                <div className="flex items-center bg-black/40 border border-os-window-border rounded-os p-1 w-full sm:w-auto overflow-x-auto">
                  {(['slow', 'normal', 'fast'] as const).map(speed => (
                    <button
                      key={speed}
                      onClick={() => setAnimationSpeed(speed)}
                      className={cn(
                        "px-3 py-1 text-xs rounded-os transition-colors capitalize",
                        animationSpeed === speed ? "bg-os-accent text-white" : "text-os-text-muted hover:text-os-text"
                      )}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider">Mouse & Cursor</h3>
            <div className="bg-black/20 border border-os-window-border rounded-os p-6">
              <div className="mb-6">
                <div className="font-medium text-sm mb-3">Cursor Style</div>
                <div className="flex flex-wrap gap-3">
                  {cursors.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setCursor(c.id)}
                      className={cn(
                        "px-4 py-2 rounded-os text-sm transition-all border",
                        cursor === c.id 
                          ? "bg-os-accent/20 border-os-accent text-os-accent shadow-os" 
                          : "bg-black/40 border-transparent text-os-text-muted hover:text-os-text"
                      )}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="font-medium text-sm mb-3">Cursor Size</div>
                <div className="flex items-center bg-black/40 border border-os-window-border rounded-os p-1 w-max">
                  {(['normal', 'large', 'huge'] as const).map(size => (
                    <button
                      key={size}
                      onClick={() => setCursorSize(size)}
                      className={cn(
                        "px-4 py-1.5 text-xs rounded-os transition-colors capitalize",
                        cursorSize === size ? "bg-os-accent text-white" : "text-os-text-muted hover:text-os-text"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-os-window-border">
                <button
                  onClick={() => setCursorTrails(!cursorTrails)}
                  className="w-full flex items-center justify-between text-sm text-os-text hover:bg-white/5 p-2 -mx-2 rounded-os transition-colors"
                >
                  <span className="flex items-center gap-2"><MousePointer2 size={16} className="text-os-accent" /> Animated Cursor Trails</span>
                  {cursorTrails ? <ToggleRight size={20} className="text-os-accent" /> : <ToggleLeft size={20} className="text-os-text-muted" />}
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-medium text-os-text-muted mb-4 uppercase tracking-wider">Clock</h3>
            <div className="bg-black/20 border border-os-window-border rounded-os p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="font-medium text-sm">Time Format</div>
                <div className="text-xs text-os-text-muted mt-0.5">Change taskbar clock display</div>
              </div>
              <div className="flex items-center bg-black/40 border border-os-window-border rounded-os p-1 w-full sm:w-auto overflow-x-auto">
                {[12, 24].map(format => (
                  <button
                    key={format}
                    onClick={() => setClockFormat(format as 12 | 24)}
                    className={cn(
                      "px-4 py-1 text-xs rounded-os transition-colors",
                      clockFormat === format ? "bg-os-accent text-white" : "text-os-text-muted hover:text-os-text"
                    )}
                  >
                    {format}-hour
                  </button>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
