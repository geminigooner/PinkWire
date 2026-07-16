export interface Theme {
  id: string;
  name: string;
  description: string;
  author: string;
  
  primaryColor: string; // --os-bg
  secondaryColor: string; // --os-window-bg
  accentColor: string; // --os-accent
  accentHoverColor: string; // --os-accent-hover
  titlebarColor: string; // --os-titlebar-bg
  taskbarColor: string; // --os-taskbar-bg
  textColor: string; // --os-text
  textMutedColor: string; // --os-text-muted
  borderColor: string; // --os-window-border
  
  radius: string; // e.g. 0.75rem
  shadow: string; // e.g. 0 25px 50px -12px rgba(0, 0, 0, 0.25)
  blur: string; // e.g. 12px
  fontFamily: string;
  
  iconStyle: string;
  cursorStyle: string;
  
  wallpaper: string;
  buttonStyle: string;
  animationStyle: string;
  
  createdDate: string;
  favorite: boolean;
  featured: boolean;
  category: string;
}
