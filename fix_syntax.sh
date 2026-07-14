sed -i 's/file\.\(content as any\)/\(file\.content as any\)/g' src/applications/explorer/components/MainView/MainView.tsx
sed -i 's/file.content\?\.articleId/(file.content as any)?.articleId/g' src/applications/explorer/components/MainView/MainView.tsx
sed -i 's/file.content\?\.imageUrl/(file.content as any)?.imageUrl/g' src/applications/explorer/components/MainView/MainView.tsx
sed -i 's/file.content\?\.appId/(file.content as any)?.appId/g' src/applications/explorer/components/MainView/MainView.tsx
