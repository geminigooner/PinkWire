import React, { useState } from 'react';
import { useReleaseStore } from '../store/useReleaseStore';
import { useDesktopStore } from '../../../store/useDesktopStore';
import { useJournalStore } from '../../journal/store/useJournalStore';
import { useThemeStore } from '../../theme/store/useThemeStore';
import { useMediaStore } from '../../media/store/useMediaStore';
import { Rocket, Edit3, Plus, Package, Clock, LayoutDashboard, Database, Activity, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { ReleaseTab } from './ReleaseSidebar';

export function ReleaseDashboard({ setActiveTab }: { setActiveTab: (tab: ReleaseTab) => void }) {
  const { currentVersion, draftRelease, createDraft, updateDraft, publishRelease, deleteDraft } = useReleaseStore();
  
  // Health Metrics
  const wallpaperCount = useDesktopStore(s => s.favoriteWallpapers.length);
  const journalCount = useJournalStore(s => s.articles.length);
  const themeCount = useThemeStore(s => s.themes.length);
  const mediaCount = useMediaStore(s => s.items.length);

  const [showNewDraft, setShowNewDraft] = useState(false);
  const [newVersion, setNewVersion] = useState('');
  const [newType, setNewType] = useState<'major' | 'minor' | 'patch' | 'pre-release'>('minor');

  const handleCreateDraft = () => {
    if (newVersion) {
      createDraft(newType, newVersion);
      setShowNewDraft(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-20">
      <div>
        <h2 className="text-xl sm:text-2xl font-light mb-1 text-os-text tracking-tight flex items-center gap-2">
          Dashboard
        </h2>
        <p className="text-sm text-os-text-muted">Prepare, review, and release new versions of PinkWire OS.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black/20 p-4 rounded-os border border-white/5 flex flex-col items-center justify-center text-center">
          <Activity className="text-green-400 mb-2" size={24} />
          <div className="text-sm text-os-text-muted">System Status</div>
          <div className="text-lg font-medium text-green-400">Stable</div>
        </div>
        <div className="bg-black/20 p-4 rounded-os border border-white/5 flex flex-col items-center justify-center text-center">
          <Database className="text-os-accent mb-2" size={24} />
          <div className="text-sm text-os-text-muted">Current Version</div>
          <div className="text-lg font-medium text-os-text">v{currentVersion}</div>
        </div>
        <div className="bg-black/20 p-4 rounded-os border border-white/5 flex flex-col items-center justify-center text-center">
          <Package className="text-blue-400 mb-2" size={24} />
          <div className="text-sm text-os-text-muted">Total Content</div>
          <div className="text-lg font-medium text-os-text">{journalCount + mediaCount + themeCount} Items</div>
        </div>
        <div className="bg-black/20 p-4 rounded-os border border-white/5 flex flex-col items-center justify-center text-center">
          <LayoutDashboard className="text-yellow-400 mb-2" size={24} />
          <div className="text-sm text-os-text-muted">Draft Status</div>
          <div className="text-lg font-medium text-os-text">{draftRelease ? 'Prepared' : 'None'}</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-os-text border-b border-white/10 pb-2">Active Release</h3>
        
        {draftRelease ? (
          <div className="bg-black/20 p-5 sm:p-6 rounded-os border border-os-accent/30 shadow-[0_0_15px_rgba(236,72,153,0.1)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-xl font-medium text-os-accent">v{draftRelease.version}</h4>
                  <span className="text-[10px] uppercase tracking-wider bg-os-accent/20 text-os-accent px-1.5 py-0.5 rounded border border-os-accent/30">
                    {draftRelease.type}
                  </span>
                </div>
                <div className="text-sm text-os-text-muted flex items-center gap-1.5">
                  <Clock size={14} /> Created {format(new Date(draftRelease.date!), 'MMM d, h:mm a')}
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => deleteDraft()}
                  className="px-3 py-1.5 rounded-os hover:bg-white/10 text-os-text-muted hover:text-red-400 transition-colors text-sm"
                >
                  Discard
                </button>
                <button 
                  onClick={() => publishRelease()}
                  className="px-4 py-1.5 rounded-os bg-os-accent text-white hover:bg-os-accent/90 transition-colors shadow-os text-sm font-medium flex items-center gap-2"
                >
                  <Rocket size={16} /> Publish
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div>
                <label className="block text-xs font-medium text-os-text-muted mb-1">Release Summary</label>
                <input 
                  type="text" 
                  placeholder="E.g., The Winter Update"
                  value={draftRelease.summary || ''}
                  onChange={(e) => updateDraft({ summary: e.target.value })}
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm outline-none focus:border-os-accent text-os-text"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-os-text-muted mb-1">Release Notes</label>
                <textarea 
                  placeholder="Describe what changed in this version..."
                  value={draftRelease.notes || ''}
                  onChange={(e) => updateDraft({ notes: e.target.value })}
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-sm outline-none focus:border-os-accent text-os-text min-h-[120px] resize-y"
                />
              </div>
            </div>
            
            <div className="bg-yellow-500/10 p-3 rounded-os border border-yellow-500/20 text-xs text-yellow-200 flex items-start gap-2">
              <CheckCircle2 size={16} className="text-yellow-500 shrink-0" />
              <span>Before publishing, please ensure you have completed the <button onClick={() => setActiveTab('preflight')} className="underline hover:text-yellow-100">Preflight Checklist</button> to verify system integrity.</span>
            </div>
          </div>
        ) : (
          <div className="bg-black/10 p-6 rounded-os border border-white/5 text-center space-y-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 text-os-text-muted">
              <Package size={24} />
            </div>
            <p className="text-os-text-muted text-sm">No active draft release.</p>
            
            {showNewDraft ? (
              <div className="max-w-xs mx-auto bg-black/20 p-4 rounded-os border border-white/10 space-y-3 text-left">
                <div>
                  <label className="block text-xs text-os-text-muted mb-1">Version Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 1.1.0"
                    value={newVersion}
                    onChange={(e) => setNewVersion(e.target.value)}
                    className="w-full bg-black/30 border border-os-window-border rounded px-2 py-1.5 text-sm outline-none focus:border-os-accent text-os-text"
                  />
                </div>
                <div>
                  <label className="block text-xs text-os-text-muted mb-1">Update Type</label>
                  <select 
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-black/30 border border-os-window-border rounded px-2 py-1.5 text-sm outline-none focus:border-os-accent text-os-text"
                  >
                    <option value="major">Major (Breaking changes, massive features)</option>
                    <option value="minor">Minor (New features, non-breaking)</option>
                    <option value="patch">Patch (Bug fixes, tweaks)</option>
                    <option value="pre-release">Pre-release (Beta, RC)</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => setShowNewDraft(false)} className="flex-1 py-1.5 hover:bg-white/10 rounded text-sm transition-colors text-os-text-muted">Cancel</button>
                  <button onClick={handleCreateDraft} disabled={!newVersion} className="flex-1 py-1.5 bg-os-accent hover:bg-os-accent/90 text-white rounded text-sm transition-colors disabled:opacity-50">Create</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowNewDraft(true)}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-os-text px-4 py-2 rounded-os transition-colors font-medium text-sm"
              >
                <Plus size={16} /> Prepare New Release
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-black/10 p-5 rounded-os border border-white/5">
          <h4 className="font-medium text-os-text mb-3">System Health Overview</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-os-text-muted">Journal Entries</span>
              <span className="font-mono text-os-text">{journalCount}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-os-text-muted">Media Assets</span>
              <span className="font-mono text-os-text">{mediaCount}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-os-text-muted">Installed Themes</span>
              <span className="font-mono text-os-text">{themeCount}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-os-text-muted">Favorite Wallpapers</span>
              <span className="font-mono text-os-text">{wallpaperCount}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-black/10 p-5 rounded-os border border-white/5 flex flex-col justify-center">
          <h4 className="font-medium text-os-text mb-3">Rollback Readiness</h4>
          <div className="bg-green-500/10 p-3 rounded border border-green-500/20 flex items-start gap-3">
            <Database className="text-green-400 shrink-0 mt-0.5" size={18} />
            <div>
              <div className="text-sm font-medium text-green-400">Architecture Prepared</div>
              <div className="text-xs text-green-400/70 mt-1">
                The Backup Service is available. It is highly recommended to create a system snapshot via Control Panel before publishing a Major release.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
