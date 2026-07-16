import React, { useState, useEffect } from 'react';
import { ExternalLink, Copy, AlertTriangle } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface ExternalIframeProps {
  url: string;
  onLoad: () => void;
}

export function ExternalIframe({ url, onLoad }: ExternalIframeProps) {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 2500); // Show fallback after 2.5s
    return () => clearTimeout(timer);
  }, [url]);

  const copyAddress = () => {
    navigator.clipboard.writeText(url);
  };

  const openInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      <iframe
        src={url}
        className="absolute inset-0 w-full h-full border-none z-10"
        onLoad={onLoad}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        title="External Browser Content"
      />
      
      {showFallback && (
        <div className="absolute inset-0 z-20 pointer-events-none p-4 flex items-end justify-start">
          <div className="pointer-events-auto bg-os-window-bg border border-os-window-border shadow-os rounded-os max-w-sm p-4 backdrop-blur-os-os-os opacity-90 hover:opacity-100 transition-opacity">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-os-text text-sm font-medium mb-1">Embedding Restricted?</h4>
                <p className="text-os-text-muted text-xs mb-3">
                  Many external websites block iframe embedding via security headers. If this page is blank or refused to connect, you can open it externally.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={openInNewTab}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-os-accent text-white text-xs rounded hover:bg-os-accent/90 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Open in New Tab
                  </button>
                  <button
                    onClick={copyAddress}
                    className="flex items-center justify-center p-1.5 bg-black/20 text-os-text-muted hover:text-os-text rounded hover:bg-black/40 transition-colors border border-os-window-border"
                    title="Copy Address"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
