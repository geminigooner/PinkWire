import React from 'react';
import { useWindowStore } from '../store/useWindowStore';
import { WindowNode } from './WindowNode';

export function WindowManager() {
  const windows = useWindowStore(state => state.windows);

  return (
    <div className="absolute inset-0 pointer-events-none z-10" style={{ bottom: '48px' }}>
      {windows.map(w => (
        <WindowNode key={w.id} id={w.id} />
      ))}
    </div>
  );
}
