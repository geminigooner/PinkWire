import { Zap, Book, Image as ImageIcon, Globe, Folder, Settings, Disc, BookHeart } from 'lucide-react';
import { AppDefinition } from '../types/os';

// Exclude component from AppDefinition for metadata
export type AppMetadata = Omit<AppDefinition, 'component'>;

export const AppMetadataRegistry: Record<string, AppMetadata> = {
  settings: {
    id: 'settings',
    name: 'Control Panel',
    icon: Settings,
    defaultWidth: 800,
    defaultHeight: 600,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    draggable: true,
    instancePolicy: 'single'
  },
  explorer: {
    id: 'explorer',
    name: 'File Explorer',
    icon: Folder,
    defaultWidth: 900,
    defaultHeight: 600,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    draggable: true,
    instancePolicy: 'multiple'
  },
  pinkwire: {
    id: 'pinkwire',
    name: 'PinkWire',
    icon: Zap,
    defaultWidth: 900,
    defaultHeight: 600,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    draggable: true,
    instancePolicy: 'single'
  },
  journal: {
    id: 'journal',
    name: 'Journal',
    icon: Book,
    defaultWidth: 900,
    defaultHeight: 650,
    minWidth: 600,
    minHeight: 500,
    resizable: true,
    draggable: true,
    instancePolicy: 'keyed'
  },
  disposable: {
    id: 'disposable',
    name: 'Disposable',
    icon: ImageIcon,
    defaultWidth: 900,
    defaultHeight: 650,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    draggable: true,
    instancePolicy: 'keyed'
  },
  browser: {
    id: 'browser',
    name: 'Browser',
    icon: Globe,
    defaultWidth: 1000,
    defaultHeight: 700,
    minWidth: 400,
    minHeight: 400,
    resizable: true,
    draggable: true,
    instancePolicy: 'single'
  },
  spun: {
    id: 'spun',
    name: 'Spun.exe',
    icon: Disc,
    defaultWidth: 900,
    defaultHeight: 600,
    minWidth: 600,
    minHeight: 400,
    resizable: true,
    draggable: true,
    instancePolicy: 'single'
  },
  guestbook: {
    id: 'guestbook',
    name: 'Guestbook',
    icon: BookHeart,
    defaultWidth: 1000,
    defaultHeight: 700,
    minWidth: 600,
    minHeight: 500,
    resizable: true,
    draggable: true,
    instancePolicy: 'single'
  }
};
