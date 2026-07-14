export interface AppDefinition {
  id: string;
  name: string;
  icon: any; // Lucide icon component
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
  draggable?: boolean;
  component: React.FC<any>;
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
  appData?: any;
}

export interface DesktopIconState {
  id: string;
  appId: string;
  x: number;
  y: number;
}
