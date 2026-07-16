const fs = require('fs');
const path = 'src/applications/journal/components/Editor/Editor.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `const [summary, setSummary] = useState(draftArticle?.summary || '');
  const [coverImage, setCoverImage] = useState(draftArticle?.coverImage || '');`,
  `const [summary, setSummary] = useState(draftArticle?.summary || '');
  const [coverImage, setCoverImage] = useState(draftArticle?.coverImage || '');
  const [tagsInput, setTagsInput] = useState(draftArticle?.tags?.join(', ') || '');
  const [category, setCategory] = useState(draftArticle?.category || 'research');
  const { categories } = useJournalStore();`
);

content = content.replace(
  `updateDraft({ content, title, summary, coverImage });`,
  `updateDraft({ 
          content, title, summary, coverImage, 
          category, 
          tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
        });`
);

content = content.replace(
  `<textarea
            placeholder="A short excerpt or summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="w-full bg-transparent border-none outline-none text-lg text-os-text-muted placeholder-os-text-muted/30 resize-none font-serif"
          />
          <div className="w-16 h-1 bg-os-accent/30 rounded-full my-2" />`,
  `<textarea
            placeholder="A short excerpt or summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="w-full bg-transparent border-none outline-none text-lg text-os-text-muted placeholder-os-text-muted/30 resize-none font-serif"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 border-y border-os-window-border py-4 my-2">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wider text-os-text-muted font-medium">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-black/30 border border-os-window-border rounded-lg px-3 py-2 text-sm text-os-text outline-none focus:border-os-accent/50"
              >
                {categories.filter(c => c.id !== 'all' && c.id !== 'favorites').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-[2] flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wider text-os-text-muted font-medium">Tags (comma separated)</label>
              <input 
                type="text"
                placeholder="e.g. design, react, os"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-black/30 border border-os-window-border rounded-lg px-3 py-2 text-sm text-os-text outline-none focus:border-os-accent/50"
              />
            </div>
          </div>
          
          <div className="w-16 h-1 bg-os-accent/30 rounded-full my-2" />`
);

fs.writeFileSync(path, content);
