import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

// Add crypto
if (!content.includes("import crypto")) {
  content = content.replace('import path from "path";', 'import path from "path";\nimport crypto from "crypto";');
}

// Add Auth routes
const authRoutes = `
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
    const token = req.headers.authorization?.split(' ')[1];
    if (token === getAdminToken()) {
      res.json({ authenticated: true });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  });

  const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token === getAdminToken()) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };
`;

content = content.replace('// Guestbook Moderation API', authRoutes + '\n  // Guestbook Moderation API');

fs.writeFileSync('server.ts', content);
