import React from 'react';

export const PlaceholderApp = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-full opacity-50 bg-os-bg text-os-text">
    <div className="text-xl font-semibold mb-2">{name}</div>
    <div className="text-sm text-center max-w-xs text-os-text-muted px-4">
      This is a placeholder application for PinkWire OS Phase 2.
    </div>
  </div>
);
