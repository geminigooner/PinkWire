import express from "express";
import path from "path";
import crypto from "crypto";
import fs_ext from "fs";
import multer from "multer";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  
  // Administrator Authentication
  const getAdminToken = () => {
    const secret = process.env.ADMIN_SECRET || 'dev_secret_do_not_use_in_prod';
    return crypto.createHmac('sha256', secret).update('amanda-admin-session').digest('hex');
  };

  app.post("/api/auth/login", (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_SECRET) {
      res.json({ token: getAdminToken() });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.json({ success: true });
  });

  app.get("/api/auth/verify", (req, res) => {
    const authHeader = req.headers.authorization;
    const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;
    if (token === getAdminToken()) {
      res.json({ authenticated: true });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  });

  const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;
    if (token === getAdminToken()) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  // Guestbook Moderation API
  app.post("/api/moderate", async (req, res) => {
    console.log("Moderation request received:", req.body);
    try {
      const { message, displayName } = req.body;
      
      if (!message) {
        console.log("No message provided");
        return res.status(400).json({ error: "Message is required" });
      }

      console.log("Calling Gemini API with message:", message);
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Moderate the following guestbook entry. 
Name: ${displayName}
Message: ${message}

Rules:
- Optimize for maintaining a psychologically safe, welcoming community.
- Allow swearing, joking, criticism, disagreement, slang, and weirdness.
- Reject or hold for review ONLY if it contains harassment, threats, hate speech, discriminatory insults, doxxing, sexual exploitation, spam, malicious links, or targeted abuse.

Output ONLY a JSON object with two fields:
- "decision": one of "Publish", "Review", "Reject"
- "reason": A short machine-readable explanation of the decision.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              decision: {
                type: Type.STRING,
                description: "The moderation decision: Publish, Review, or Reject"
              },
              reason: {
                type: Type.STRING,
                description: "A short explanation of the decision"
              }
            },
            required: ["decision", "reason"]
          }
        }
      });
      
      const responseText = response.text || "{}";
      const result = JSON.parse(responseText);
      
      // Ensure the decision is one of the allowed values
      const validDecisions = ["Publish", "Review", "Reject"];
      if (!validDecisions.includes(result.decision)) {
        result.decision = "Review"; // Fallback to review on unexpected output
      }
      
      res.json(result);
    } catch (error) {
      console.error("Moderation error:", error);
      res.status(500).json({ error: "Moderation service unavailable", decision: "Review", reason: "Error contacting moderation service" });
    }
  });


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
      cb(null, `media-${uniqueSuffix}${ext}`);
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
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size
      });
    });
  });
  
  app.delete("/api/upload/:filename", requireAuth, (req, res) => {
    const { filename } = req.params;
    // Basic path traversal prevention
    if ((filename as string).includes('..') || (filename as string).includes('/')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }
    
    const filePath = path.join(uploadDir, filename as string);
    if (fs_ext.existsSync(filePath)) {
      fs_ext.unlinkSync(filePath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
