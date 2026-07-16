import fs from 'fs';

function patch(file: string) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('useWindowStore')) {
    content = content.replace(
      "import { cn } from '../../../utils/cn';",
      "import { cn } from '../../../utils/cn';\nimport { useWindowStore } from '../../../store/useWindowStore';"
    );
  }
  
  if (!content.includes('onDoubleClick={() => useWindowStore')) {
    content = content.replace(
      "onClick={() => setSelectedItem(item)}",
      "onClick={() => setSelectedItem(item)}\n            onDoubleClick={() => useWindowStore.getState().openWindow('disposable', { imageUrl: item.url })}"
    );
    fs.writeFileSync(file, content);
  }
}

patch('src/applications/media/components/MediaGrid.tsx');
patch('src/applications/media/components/MediaList.tsx');
