import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchStore } from '../store/useSearchStore';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

export function StartMenuSearch({ onClose }: { onClose: () => void }) {
  const query = useSearchStore(state => state.query);
  const setQuery = useSearchStore(state => state.setQuery);
  const results = useSearchStore(state => state.results);
  const isSearching = useSearchStore(state => state.isSearching);
  const clearSearch = useSearchStore(state => state.clearSearch);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount (desktop only, to avoid mobile keyboard pop up immediately)
    if (window.innerWidth > 640) {
      inputRef.current?.focus();
    }
    return () => clearSearch();
  }, [clearSearch]);

  const handleResultClick = (action: () => void) => {
    action();
    clearSearch();
    onClose();
  };

  return (
    <div className="flex flex-col gap-4 shrink-0 max-h-full">
      <div className="relative shrink-0">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-os-text-muted" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search apps, files, guests..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 bg-black/30 border border-white/10 rounded-2xl pl-12 pr-12 text-os-text placeholder:text-os-text-muted/70 focus:outline-none focus:border-os-accent/50 focus:ring-1 focus:ring-os-accent/50 transition-all shadow-inner"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-os-text-muted hover:text-os-text p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {query.trim().length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2 pb-4 h-full"
          >
            {results.length === 0 ? (
              <div className="text-center text-os-text-muted py-8 text-sm">
                No results found for "{query}"
              </div>
            ) : (
              <div className="space-y-6">
                {/* Group by type */}
                {(['app', 'journal', 'guestbook', 'file', 'setting', 'media'] as const).map(type => {
                  const typeResults = results.filter(r => r.type === type);
                  if (typeResults.length === 0) return null;
                  
                  return (
                    <div key={type} className="space-y-2">
                      <h3 className="text-xs font-semibold text-os-text-muted px-2 uppercase tracking-wider">
                        {type === 'guestbook' ? 'Guestbook' : type + 's'}
                      </h3>
                      <div className="flex flex-col gap-1">
                        {typeResults.map(result => (
                          <button
                            key={result.id}
                            onClick={() => handleResultClick(result.action)}
                            className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors text-left group border border-transparent hover:border-white/5"
                          >
                            <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-os-accent/50 transition-colors shadow-inner">
                              {result.icon && React.createElement(result.icon, { size: 18, className: "text-os-accent" })}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-os-text text-sm truncate">{result.title}</div>
                              {result.subtitle && (
                                <div className="text-xs text-os-text-muted truncate mt-0.5">{result.subtitle}</div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
