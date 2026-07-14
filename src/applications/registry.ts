import { Zap, Book, Image as ImageIcon, Globe, Music, Download, Flame } from 'lucide-react';
import { AppDefinition } from '../types/os';
import { PlaceholderApp } from './PlaceholderApp';
import { PinkWireApp } from './pinkwire/PinkWireApp';
import { DisposableApp } from './disposable/DisposableApp';
import { JournalApp } from './journal/JournalApp';
import React from 'react';

const createPlaceholder = (name: string) => () => React.createElement(PlaceholderApp, { name });

export const AppRegistry: Record<string, AppDefinition> = {
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
    component: PinkWireApp
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
    component: JournalApp
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
    component: DisposableApp
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
    component: createPlaceholder('Browser')
  },
  music: {
    id: 'music',
    name: 'Music',
    icon: Music,
    defaultWidth: 400,
    defaultHeight: 600,
    minWidth: 300,
    minHeight: 500,
    resizable: true,
    draggable: true,
    component: createPlaceholder('Music')
  },
  downloads: {
    id: 'downloads',
    name: 'Downloads',
    icon: Download,
    defaultWidth: 600,
    defaultHeight: 400,
    minWidth: 400,
    minHeight: 300,
    resizable: true,
    draggable: true,
    component: createPlaceholder('Downloads')
  },
  bad_takes: {
    id: 'bad_takes',
    name: 'Bad Takes',
    icon: Flame,
    defaultWidth: 500,
    defaultHeight: 500,
    minWidth: 300,
    minHeight: 400,
    resizable: true,
    draggable: true,
    component: createPlaceholder('Bad Takes')
  }
};
