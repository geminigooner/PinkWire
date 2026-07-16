import fs from 'fs';

let content = fs.readFileSync('src/applications/settings/components/AboutSettings.tsx', 'utf8');

content = content.replace(
  "import { AppRegistry } from '../../registry';",
  "import { AppRegistry } from '../../registry';\nimport { useAuthStore } from '../../../store/useAuthStore';\nimport { useWindowStore } from '../../../store/useWindowStore';\nimport { Lock, Unlock } from 'lucide-react';"
);

content = content.replace(
  "const { wallpaper } = useDesktopStore();",
  "const { wallpaper } = useDesktopStore();\n  const { isAuthenticated, logout } = useAuthStore();\n  const { openWindow } = useWindowStore();"
);

content = content.replace(
  '<span className="text-os-text text-sm flex items-center gap-2"><User size={14} className="text-os-accent" /> Amanda Danielle</span>',
  `<span className="text-os-text text-sm flex items-center gap-2">
                <User size={14} className="text-os-accent" /> Amanda Danielle
                {isAuthenticated ? (
                  <button onClick={() => logout()} title="Lock System" className="ml-2 text-os-accent hover:text-red-400 transition-colors">
                    <Unlock size={14} />
                  </button>
                ) : (
                  <button onClick={() => openWindow('admin')} title="Admin Login" className="ml-2 text-os-text-muted hover:text-os-text transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <Lock size={14} />
                  </button>
                )}
              </span>`
);

content = content.replace(
  '<div className="flex justify-between items-center border-b border-os-window-border pb-2">',
  '<div className="flex justify-between items-center border-b border-os-window-border pb-2 group">'
);

// Specifically replace the one containing Developer to have group class
content = content.replace(
  '<div className="flex justify-between items-center border-b border-os-window-border pb-2">\n              <span className="text-os-text-muted text-sm">Developer</span>',
  '<div className="flex justify-between items-center border-b border-os-window-border pb-2 group">\n              <span className="text-os-text-muted text-sm">Developer</span>'
);

fs.writeFileSync('src/applications/settings/components/AboutSettings.tsx', content);

