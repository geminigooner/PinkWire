import fs from 'fs';
let tb = fs.readFileSync('src/taskbar/Taskbar.tsx', 'utf8');

tb = tb.replace(
  'onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}',
  'aria-label="Start Menu"\n          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}'
);
fs.writeFileSync('src/taskbar/Taskbar.tsx', tb);
