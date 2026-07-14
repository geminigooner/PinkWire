#!/bin/bash

# BrowserApp
sed -i 's/appData?: unknown/appData?: unknown/g' src/applications/browser/BrowserApp.tsx
sed -i 's/appData?\.url/(appData as any)?\.url/g' src/applications/browser/BrowserApp.tsx

# DisposableApp
sed -i 's/appData?\.imageUrl/(appData as any)?\.imageUrl/g' src/applications/disposable/DisposableApp.tsx

# ExplorerApp
sed -i 's/appData?\.path/(appData as any)?\.path/g' src/applications/explorer/ExplorerApp.tsx

# JournalApp
sed -i 's/appData?\.articleId/(appData as any)?\.articleId/g' src/applications/journal/JournalApp.tsx

# MainView.tsx
sed -i 's/content\.articleId/(content as any).articleId/g' src/applications/explorer/components/MainView/MainView.tsx
sed -i 's/content\.imageUrl/(content as any).imageUrl/g' src/applications/explorer/components/MainView/MainView.tsx
sed -i 's/content\.appId/(content as any).appId/g' src/applications/explorer/components/MainView/MainView.tsx
