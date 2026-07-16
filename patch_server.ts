import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

// Add imports
content = content.replace(
  'import crypto from "crypto";',
  'import crypto from "crypto";\nimport fs_ext from "fs";\nimport multer from "multer";'
);

// Add upload setup before Vite middleware
const uploadSetup = `
  // Media Upload (Cloudflare R2 Ready)
  // For local development, we store in public/uploads or data/uploads.
  // In production, this would be replaced with AWS SDK for R2.
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs_ext.existsSync(uploadDir)) {
    fs_ext.mkdirSync(uploadDir, { recursive: true });
  }
  
  app.use('/uploads', express.static(uploadDir));
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = crypto.randomBytes(8).toString('hex');
      cb(null, \`media-\${uniqueSuffix}\${ext}\`);
    }
  });
  
  const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Please upload a valid image.'));
    }
  };
  
  const upload = multer({ 
    storage, 
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter 
  });

  app.post("/api/upload", requireAuth, (req, res) => {
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
      
      res.json({
        url: \`/uploads/\${req.file.filename}\`,
        filename: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size
      });
    });
  });
  
  app.delete("/api/upload/:filename", requireAuth, (req, res) => {
    const { filename } = req.params;
    // Basic path traversal prevention
    if (filename.includes('..') || filename.includes('/')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }
    
    const filePath = path.join(uploadDir, filename);
    if (fs_ext.existsSync(filePath)) {
      fs_ext.unlinkSync(filePath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  });
`;

content = content.replace(
  '  // Vite middleware for development',
  uploadSetup + '\n  // Vite middleware for development'
);

fs.writeFileSync('server.ts', content);
