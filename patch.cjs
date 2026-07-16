const fs = require('fs');
const path = 'src/applications/journal/components/Editor/Editor.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(
  `      {showMediaPicker && (
        <MediaPickerModal 
          onClose={() => setShowMediaPicker(false)}
          onSelect={(url) => {
            if (mediaPickerMode === 'cover') {
              setCoverImage(url);
            } else {
              insertFormatting(\`![alt](\${url})\`, '');
            }
            setShowMediaPicker(false);
          }}
        />
      )}
    </div>
  );
}`,
  `      {/* Editor Footer / Stats */}
      <div className="h-8 shrink-0 border-t border-os-window-border bg-os-titlebar-bg/80 px-4 flex items-center justify-between text-xs text-os-text-muted">
        <div className="flex items-center gap-4">
          <span>{words} words</span>
          <span>{chars} characters</span>
          <span>{readingTime} min read</span>
        </div>
      </div>

      {showMediaPicker && (
        <MediaPickerModal 
          onClose={() => setShowMediaPicker(false)}
          onSelect={(url) => {
            if (mediaPickerMode === 'cover') {
              setCoverImage(url);
            } else {
              insertFormatting(\`![alt](\${url})\`, '');
            }
            setShowMediaPicker(false);
          }}
        />
      )}
    </div>
  );
}`
);
fs.writeFileSync(path, content);
