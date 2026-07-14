import React from 'react';
import { useBrowserStore } from '../../store/useBrowserStore';
import { Globe, Terminal, FileText, FolderGit2, BookOpen, Music } from 'lucide-react';
import { cn } from '../../../../utils/cn';

export function Homepage({ tabId }: { tabId: string }) {
  const { navigate, bookmarks } = useBrowserStore();

  const handleLink = (url: string) => {
    navigate(tabId, url);
  };

  const sections = [
    { title: 'Quick Launch', items: [
      { label: 'Journal', url: 'pinkwire://journal', icon: BookOpen, color: 'text-pink-400' },
      { label: 'Desktop', url: 'pinkwire://desktop', icon: Terminal, color: 'text-indigo-400' },
      { label: 'System', url: 'about:system', icon: Terminal, color: 'text-gray-400' },
    ]},
    { title: 'Projects', items: [
      { label: 'The Archive', url: 'pinkwire://archive', icon: FolderGit2, color: 'text-emerald-400' },
      { label: 'The Ledger', url: 'pinkwire://ledger', icon: FileText, color: 'text-amber-400' },
      { label: 'Echo Observatory', url: 'pinkwire://echo', icon: Globe, color: 'text-blue-400' },
    ]},
    { title: 'Recent Downloads', items: [
      { label: 'resume_FINAL.pdf', url: 'pinkwire://downloads', icon: FileText, color: 'text-red-400' },
      { label: 'Untitled.png', url: 'pinkwire://downloads', icon: FileText, color: 'text-purple-400' },
    ]}
  ];

  return (
    <div className="min-h-full p-8 md:p-12 text-os-text font-sans flex flex-col max-w-5xl mx-auto bg-black/20">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-light mb-2 tracking-tight">Internet <span className="font-semibold text-os-accent">ExplAmanda</span></h1>
        <p className="text-os-text-muted">Welcome back. The grid is active.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map(section => (
          <div key={section.title} className="bg-os-window-bg/40 border border-os-window-border rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-lg font-medium mb-4 text-os-text/90 border-b border-os-window-border pb-2">{section.title}</h2>
            <div className="space-y-3">
              {section.items.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleLink(item.url)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left group"
                  >
                    <div className="p-2 bg-black/40 rounded-md group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                      <Icon size={16} className={item.color} />
                    </div>
                    <span className="text-sm font-medium text-os-text-muted group-hover:text-os-text transition-colors">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-os-window-bg/40 border border-os-window-border rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-medium mb-4 text-os-text/90 border-b border-os-window-border pb-2 flex items-center gap-2">
          <Globe size={18} className="text-os-accent" /> External Links
        </h2>
        <div className="flex flex-wrap gap-3">
          {bookmarks.filter(b => b.category === 'external').map(bookmark => (
            <button
              key={bookmark.id}
              onClick={() => handleLink(bookmark.url)}
              className="px-4 py-2 bg-black/40 border border-os-window-border rounded-full text-sm text-os-text-muted hover:text-os-text hover:bg-white/10 hover:border-os-accent/50 transition-all shadow-inner"
            >
              {bookmark.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
