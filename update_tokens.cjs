const fs = require('fs');
const path = require('path');

function findFiles(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, filter, fileList);
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const files = findFiles('src', /\.(tsx|ts)$/);
let replaced = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace radius (except rounded-full which we usually want to keep for avatars)
  content = content.replace(/rounded-(xl|2xl|lg|md|sm)/g, 'rounded-os');
  
  // Replace shadow (except shadow-none which is structural)
  content = content.replace(/shadow-(2xl|xl|lg|md|sm|inner)/g, 'shadow-os');
  
  // Replace backdrop blur (except when it's just backdrop-blur without suffix)
  content = content.replace(/backdrop-blur-(xl|lg|md|sm|2xl)/g, 'backdrop-blur-os');
  content = content.replace(/\bbackdrop-blur\b/g, 'backdrop-blur-os');

  if (content !== original) {
    fs.writeFileSync(file, content);
    replaced++;
  }
});
console.log(`Updated ${replaced} files with tokens`);
