const fs = require('fs');

// Patch metadata
let metadata = fs.readFileSync('src/applications/metadata.ts', 'utf8');
if (!metadata.includes('theme: {')) {
  metadata = metadata.replace(
    `export const APP_METADATA: Record<string, AppMetadata> = {`,
    `export const APP_METADATA: Record<string, AppMetadata> = {
  theme: {
    title: 'Theme Studio',
    icon: 'Palette',
    defaultWidth: 1000,
    defaultHeight: 700,
    minWidth: 800,
    minHeight: 600,
    maximizable: true,
    singleton: true,
    adminOnly: false
  },`
  );
  fs.writeFileSync('src/applications/metadata.ts', metadata);
}

// Patch registry
let registry = fs.readFileSync('src/applications/registry.ts', 'utf8');
if (!registry.includes('ThemeApp')) {
  registry = registry.replace(
    `export const AppRegistry`,
    `import { ThemeApp } from './theme/ThemeApp';\n\nexport const AppRegistry`
  );
  registry = registry.replace(
    `export const AppRegistry = {`,
    `export const AppRegistry = {\n  theme: ThemeApp,`
  );
  fs.writeFileSync('src/applications/registry.ts', registry);
}

// Patch DesktopStore icons
let desktop = fs.readFileSync('src/store/useDesktopStore.ts', 'utf8');
if (!desktop.includes('appId: \'theme\'')) {
  desktop = desktop.replace(
    `{ id: 'wallpaper', appId: 'wallpaper', x: 24, y: 120 },`,
    `{ id: 'wallpaper', appId: 'wallpaper', x: 24, y: 120 },\n      { id: 'theme', appId: 'theme', x: 24, y: 216 },`
  );
  fs.writeFileSync('src/store/useDesktopStore.ts', desktop);
}

