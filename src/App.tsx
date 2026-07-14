/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Desktop } from './desktop/Desktop';
import { BootSequence } from './core/BootSequence';
import { useDesktopStore } from './store/useDesktopStore';
import { useState } from 'react';

export default function App() {
  const hasBooted = useDesktopStore(state => state.hasBooted);
  const [booting, setBooting] = useState(!hasBooted);

  if (booting) {
    return <BootSequence onComplete={() => setBooting(false)} />;
  }

  return (
    <Desktop />
  );
}
