# Administrator Authentication Guide

Hi Amanda!

I've set up a dedicated Administrator Authentication system just for you. This allows you to securely manage PinkWire OS (like moderating guestbook entries, writing journal posts, and managing files) while keeping the site completely public and accessible for your visitors.

Here is everything you need to know about how it works, how to configure it, and how to use it.

## 1. How Authentication Works

PinkWire OS does not have a database of users, and it doesn't need one. You are the only administrator.

The authentication system uses a single master password. When you log in with this password, the server generates a secure session token that tells the frontend you are authenticated. This unlocks "maintenance mode" across the entire operating system, revealing hidden buttons like "Delete" on guestbook entries or "New Entry" in the Journal.

## 2. Setting Your Master Password

Your password is an environment variable. 

### Local Development
In your project folder, you'll see a file named \`.env.example\`. If you haven't already, copy this to a new file named \`.env\`.
Add the following line to your \`.env\` file:
\`\`\`
ADMIN_SECRET=your_super_secret_password_here
\`\`\`
Restart your development server, and that password will be active.

### Cloudflare / Production Deployment
Since you're deploying this, you need to tell your hosting provider what your password is. **Never commit the \`.env\` file to GitHub.**
Instead, you will add the \`ADMIN_SECRET\` as a secure Environment Variable in your Cloudflare dashboard.

1. Go to your Cloudflare dashboard.
2. Select **Pages** or **Workers & Pages**.
3. Select your PinkWire OS project.
4. Go to **Settings** > **Environment variables**.
5. Add a new variable:
   - **Variable name:** \`ADMIN_SECRET\`
   - **Value:** (Type your chosen password)
   - Click **Save** (and make sure to encrypt it if Cloudflare offers the option).
6. **Redeploy** your project so it picks up the new secret.

## 3. How to Log In

Visitors will never see a login screen. It's completely hidden.
To log in as the administrator:

1. Open the **Settings** app.
2. Go to the **About** section.
3. Look for "Developer: Amanda Danielle" at the bottom of the right panel.
4. Hover over that line. A tiny **Lock icon** will appear.
5. Click the Lock icon. The Administrator Login window will open.
6. Enter your \`ADMIN_SECRET\` password.
7. Click Unlock.

Once logged in, the system will remember you (even if you refresh the page) until you log out.

## 4. Protected Features

When you are logged in, you will notice new options appear naturally throughout the OS:
- **Guestbook:** A red trash can icon will appear next to the star icon, allowing you to delete unwanted entries.
- **Journal:** A "New Entry" button will appear in the toolbar.
- **Taskbar:** A small notification or toast will confirm you are in Admin mode.

*(More features can easily be added using the \`useAuthStore\` state!)*

## 5. Security & Architecture

For future reference (or if you want to expand this):
- **Frontend State:** Stored in \`src/store/useAuthStore.ts\`. It uses Zustand to persist your token in the browser's local storage.
- **Backend API:** Managed in \`server.ts\`. The routes \`/api/auth/login\`, \`/api/auth/logout\`, and \`/api/auth/verify\` handle the token generation and validation.
- **Token Generation:** The server uses Node's built-in \`crypto\` module to create a secure, stateless HMAC token based on your \`ADMIN_SECRET\`.
- **Protected Routes:** Use the \`requireAuth\` middleware in \`server.ts\` for any new API routes you want to keep secure (like uploading files or deleting data).

You're the only one who holds the keys to this kingdom, Pookie. Stay safe and happy coding!
