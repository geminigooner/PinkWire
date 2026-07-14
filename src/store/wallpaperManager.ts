import { saveWallpaperToDB, getWallpaperFromDB } from './wallpaperDB';

export const handleWallpaperUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Invalid file type. Please upload an image.'));
    }

    if (file.size > 5 * 1024 * 1024) {
      // Compress if larger than 5MB
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Max dimensions
        const MAX_WIDTH = 2560;
        const MAX_HEIGHT = 1440;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const id = `custom-wallpaper-${Date.now()}`;
        saveWallpaperToDB(id, dataUrl).then(() => resolve(id)).catch(reject);
      };
      
      img.onerror = () => reject(new Error('Failed to load image.'));
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const id = `custom-wallpaper-${Date.now()}`;
        saveWallpaperToDB(id, dataUrl).then(() => resolve(id)).catch(reject);
      };
      reader.onerror = () => reject(new Error('Failed to read file.'));
      reader.readAsDataURL(file);
    }
  });
};

export const resolveWallpaperUrl = async (wallpaper: string): Promise<string> => {
  if (wallpaper.startsWith('custom-wallpaper-')) {
    const dataUrl = await getWallpaperFromDB(wallpaper);
    return dataUrl || '';
  }
  return wallpaper;
};
