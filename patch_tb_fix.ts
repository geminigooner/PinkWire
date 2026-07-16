import fs from 'fs';

let content = fs.readFileSync('src/taskbar/Taskbar.tsx', 'utf8');

content = content.replace(
  "onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}\n          onClick={() => useWindowStore.getState().openWindow('admin')} onDoubleClick={() => {",
  "onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}\n          onDoubleClick={() => {"
);

content = content.replace(
  'className="px-3 h-9 flex items-center text-sm font-medium text-os-text hover:bg-white/10 rounded-lg transition-colors cursor-default" onDoubleClick={() => {',
  'className="px-3 h-9 flex items-center text-sm font-medium text-os-text hover:bg-white/10 rounded-lg transition-colors cursor-default" onClick={() => useWindowStore.getState().openWindow(\'admin\')} onDoubleClick={() => {'
);

fs.writeFileSync('src/taskbar/Taskbar.tsx', content);
