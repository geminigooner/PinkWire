import fs from 'fs';
let content = fs.readFileSync('src/services/notifications/EventBus.ts', 'utf8');

content = content.replace(
  "  | { type: 'FileMoved'; payload: { filename: string } };",
  "  | { type: 'FileMoved'; payload: { filename: string } }\n  | { type: 'AchievementUnlocked'; payload: { title: string; message: string; icon?: string } }\n  | { type: 'Toast'; payload: { message: string } }\n  | { type: 'AppError'; payload: { message: string } }\n  | { type: 'SystemMessage'; payload: { title: string; message: string; icon?: string } };"
);
fs.writeFileSync('src/services/notifications/EventBus.ts', content);

let taskbar = fs.readFileSync('src/taskbar/Taskbar.tsx', 'utf8');
taskbar = taskbar.replace(
  "              useAchievementStore.getState().unlockAchievement('secret_shortcut_logo');",
  "              useAchievementStore.getState().unlockAchievement('secret_shortcut_logo' as any);"
);
taskbar = taskbar.replace(
  "              useAchievementStore.getState().unlockAchievement('secret_shortcut_clock');",
  "              useAchievementStore.getState().unlockAchievement('secret_shortcut_clock' as any);"
);
fs.writeFileSync('src/taskbar/Taskbar.tsx', taskbar);

let settings = fs.readFileSync('src/applications/settings/components/AchievementSettings.tsx', 'utf8');
settings = settings.replace(
  "  const { unlockedIds } = useAchievementStore();",
  "  const { achievements } = useAchievementStore();\n  const unlockedIds = Object.values(achievements).filter(a => a.unlockedAt).map(a => a.id);"
);
fs.writeFileSync('src/applications/settings/components/AchievementSettings.tsx', settings);
