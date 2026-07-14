import React from 'react';

export type WindowInstancePolicy = 'single' | 'multiple' | 'keyed';

export interface AppDefinition {
  id: string;
  name: string;
  icon: React.ElementType; // Lucide icon component
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
  draggable?: boolean;
  instancePolicy?: WindowInstancePolicy;
  component: React.FC<{ appData?: unknown; windowId: string }>;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  appData?: unknown;
  instanceKey?: string;
}

export interface DesktopIconState {
  id: string;
  appId: string;
  x: number;
  y: number;
}
