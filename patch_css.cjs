const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');

// Add new tokens to @theme
if (!content.includes('--radius-os')) {
  content = content.replace(
    `  --color-os-accent-hover: var(--os-accent-hover);`,
    `  --color-os-accent-hover: var(--os-accent-hover);
  --radius-os: var(--os-radius);
  --shadow-os: var(--os-shadow);
  --blur-os: var(--os-blur);
  --font-os: var(--os-font);`
  );
}

// Add default values to :root
if (!content.includes('--os-radius')) {
  content = content.replace(
    `  --os-accent-hover: #db2777;`,
    `  --os-accent-hover: #db2777;
  --os-radius: 0.75rem;
  --os-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --os-blur: 12px;
  --os-font: 'Inter', sans-serif;`
  );
}

fs.writeFileSync('src/index.css', content);
