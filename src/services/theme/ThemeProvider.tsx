import React, { useEffect } from 'react';
import { useThemeStore } from '../../applications/theme/store/useThemeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { themes, activeThemeId } = useThemeStore();
  
  useEffect(() => {
    const theme = themes.find(t => t.id === activeThemeId) || themes[0];
    if (!theme) return;
    
    const root = document.documentElement;
    
    // Core colors
    root.style.setProperty('--os-bg', theme.primaryColor);
    root.style.setProperty('--os-window-bg', theme.secondaryColor);
    root.style.setProperty('--os-accent', theme.accentColor);
    root.style.setProperty('--os-accent-hover', theme.accentHoverColor);
    root.style.setProperty('--os-titlebar-bg', theme.titlebarColor);
    root.style.setProperty('--os-taskbar-bg', theme.taskbarColor);
    root.style.setProperty('--os-text', theme.textColor);
    root.style.setProperty('--os-text-muted', theme.textMutedColor);
    root.style.setProperty('--os-window-border', theme.borderColor);
    
    // Tokens
    root.style.setProperty('--os-radius', theme.radius);
    root.style.setProperty('--os-shadow', theme.shadow);
    root.style.setProperty('--os-blur', theme.blur);
    root.style.setProperty('--os-font', theme.fontFamily);
    
    // Clean up old classes if we were using CSS classes instead
    // (We apply font family via CSS var, so let's make sure tailwind uses it)
    root.setAttribute('data-cursor', theme.cursorStyle);
    root.setAttribute('data-icons', theme.iconStyle);
    
  }, [activeThemeId, themes]);

  return <>{children}</>;
}
