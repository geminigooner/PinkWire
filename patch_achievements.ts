import fs from 'fs';
let content = fs.readFileSync('src/store/useAchievementStore.ts', 'utf8');

content = content.replace(
  'const INITIAL_ACHIEVEMENTS: Record<AchievementId, Achievement> = {',
  'export const ACHIEVEMENTS: Record<AchievementId, Achievement> = {'
);
content = content.replace(
  'achievements: INITIAL_ACHIEVEMENTS,',
  'achievements: ACHIEVEMENTS,'
);

fs.writeFileSync('src/store/useAchievementStore.ts', content);

let uiContent = fs.readFileSync('src/applications/settings/components/AchievementSettings.tsx', 'utf8');
uiContent = uiContent.replace(
  'const totalAchievements = ACHIEVEMENTS.length;',
  'const achievementList = Object.values(ACHIEVEMENTS);\n  const totalAchievements = achievementList.length;'
);
uiContent = uiContent.replace(
  'ACHIEVEMENTS.map(achievement => {',
  'achievementList.map(achievement => {'
);
fs.writeFileSync('src/applications/settings/components/AchievementSettings.tsx', uiContent);
