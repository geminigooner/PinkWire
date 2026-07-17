const fs = require('fs');
let content = fs.readFileSync('src/applications/settings/components/ProfileSettings.tsx', 'utf8');

if (!content.includes('handlePictureEdit')) {
  content = content.replace(
    `const handleLogin = () => {`,
    `const handlePictureEdit = () => {
    const newUrl = prompt("Enter new profile picture URL:", profile.profilePicture);
    if (newUrl) {
      updateProfile({ profilePicture: newUrl });
    }
  };

  const handleLogin = () => {`
  );
  
  content = content.replace(
    `<div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">`,
    `<div onClick={handlePictureEdit} className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">`
  );
  
  fs.writeFileSync('src/applications/settings/components/ProfileSettings.tsx', content);
}
