import React, { useEffect, useState } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';

export function OSProvider({ children }: { children: React.ReactNode }) {
  const { theme, cursor, highContrast, largerText, atmosphere, cursorSize, animationSpeed, reducedMotion } = useSettingsStore();
  const [isNightTime, setIsNightTime] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      if (atmosphere === 'night') {
        setIsNightTime(true);
      } else if (atmosphere === 'day') {
        setIsNightTime(false);
      } else {
        const hour = new Date().getHours();
        setIsNightTime(hour < 6 || hour >= 18);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [atmosphere]);

  useEffect(() => {
    // Apply theme
    document.documentElement.className = '';
    if (theme !== 'pink') {
      document.documentElement.classList.add(`theme-${theme}`);
    }
    
    // Accessibility
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    }
    if (largerText) {
      document.documentElement.classList.add('larger-text');
    }
    
    // Atmosphere
    if (isNightTime) {
      document.documentElement.classList.add('atmosphere-night');
    }

    // Cursor size
    if (cursorSize !== 'normal') {
      document.documentElement.classList.add(`cursor-${cursorSize}`);
    }

    // Animation Speed
    if (reducedMotion) {
      document.documentElement.style.setProperty('--transition-duration', '0ms');
    } else if (animationSpeed === 'slow') {
      document.documentElement.style.setProperty('--transition-duration', '500ms');
    } else if (animationSpeed === 'fast') {
      document.documentElement.style.setProperty('--transition-duration', '100ms');
    } else {
      document.documentElement.style.removeProperty('--transition-duration');
    }

    if (cursor !== 'classic') {
      document.documentElement.setAttribute('data-cursor', cursor);
    } else {
      document.documentElement.removeAttribute('data-cursor');
    }
  }, [theme, highContrast, largerText, cursor, isNightTime, cursorSize, animationSpeed, reducedMotion]);

  return (
    <>
      <div 
        className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-1000 ${
          isNightTime ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,20,0.1), rgba(0,0,40,0.3))',
          mixBlendMode: 'multiply'
        }}
      />
      {children}
    </>
  );
}
