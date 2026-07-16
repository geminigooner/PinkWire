import { AppDefinition } from '../types/os';
import { AppMetadataRegistry } from './metadata';

import { PinkWireApp } from './pinkwire/PinkWireApp';
import { DisposableApp } from './disposable/DisposableApp';
import { JournalApp } from './journal/JournalApp';
import { ExplorerApp } from './explorer/ExplorerApp';
import { BrowserApp } from './browser/BrowserApp';
import { SettingsApp } from './settings/SettingsApp';
import { AdminLoginApp } from './auth/AdminLoginApp';
import { MediaApp } from './media/MediaApp';
import { Lock } from 'lucide-react';
import { SpunApp } from './spun/SpunApp';
import { GuestbookApp } from './guestbook/GuestbookApp';

export const AppRegistry: Record<string, AppDefinition> = {
  settings: {
    ...AppMetadataRegistry.settings,
    component: SettingsApp
  },
  explorer: {
    ...AppMetadataRegistry.explorer,
    component: ExplorerApp
  },
  pinkwire: {
    ...AppMetadataRegistry.pinkwire,
    component: PinkWireApp
  },
  journal: {
    ...AppMetadataRegistry.journal,
    component: JournalApp
  },
  disposable: {
    ...AppMetadataRegistry.disposable,
    component: DisposableApp
  },
  browser: {
    ...AppMetadataRegistry.browser,
    component: BrowserApp
  },
  spun: {
    ...AppMetadataRegistry.spun,
    component: SpunApp
  },
  guestbook: {
    ...AppMetadataRegistry.guestbook,
    component: GuestbookApp
  }
  ,admin: {
    ...AppMetadataRegistry.admin,
    component: AdminLoginApp
  }
  ,media: {
    ...AppMetadataRegistry.media,
    component: MediaApp
  }
};
