import fs from 'fs';

let content = fs.readFileSync('src/core/BootSequence.tsx', 'utf8');

// Optionally initialize auth state from the server on boot
content = content.replace(
  "import { useDesktopStore } from '../store/useDesktopStore';",
  "import { useDesktopStore } from '../store/useDesktopStore';\nimport { useAuthStore } from '../store/useAuthStore';"
);

content = content.replace(
  "const completeBoot = useDesktopStore(state => state.completeBoot);",
  "const completeBoot = useDesktopStore(state => state.completeBoot);\n  const { token, setAuth } = useAuthStore();"
);

content = content.replace(
  "// Check if device is mobile",
  `// Verify auth token if exists
    if (token) {
      fetch('/api/auth/verify', {
        headers: { 'Authorization': \`Bearer \${token}\` }
      })
      .then(res => {
        if (!res.ok) setAuth(false, null);
      })
      .catch(() => setAuth(false, null));
    }
    
    // Check if device is mobile`
);
fs.writeFileSync('src/core/BootSequence.tsx', content);

