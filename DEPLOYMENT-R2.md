# PinkWire OS — Media Library Deployment Guide (Cloudflare R2)

Hey Amanda,

This guide explains how your new Media Library works and how to set it up for production using Cloudflare R2. Right now, in your local development environment, all uploaded images are being saved to a temporary folder called `uploads` inside the project. If you deploy PinkWire OS to the internet without changing this, those uploads will disappear every time the server restarts. 

To fix this, we are going to use **Cloudflare R2**. It's exactly like Amazon S3 (a giant bucket in the sky where you can store files permanently), but much cheaper and easier to use. 

Follow these steps exactly to set it up.

## 1. Where Uploaded Files Are Stored
- **Currently:** In a local folder named `uploads/` on your computer.
- **Future (Production):** Inside a Cloudflare R2 Bucket, completely separate from the PinkWire OS code.

## 2. How Cloudflare R2 is Configured
R2 works by giving you a secure URL and a set of keys. PinkWire's backend will take the file you drop into the Media Library, securely authenticate with Cloudflare using your keys, and push the file directly into your bucket. Cloudflare will then give us a permanent URL to access the image.

## 3. Which Environment Variables Are Required
To make this connection, PinkWire OS will need these three secret variables added to your `.env` file (or your hosting provider's secret settings):

- `R2_ACCOUNT_ID`: Your unique Cloudflare Account ID.
- `R2_ACCESS_KEY_ID`: Your secret username for the bucket.
- `R2_SECRET_ACCESS_KEY`: Your secret password for the bucket.
- `R2_BUCKET_NAME`: The name you give your bucket (e.g., "pinkwire-media").
- `R2_PUBLIC_URL`: The custom domain you set up to serve the images (e.g., "https://media.yourdomain.com").

## 4. How to Create an R2 Bucket
Don't worry, you don't need any server knowledge to do this:
1. Log into your Cloudflare Dashboard (dash.cloudflare.com).
2. On the left sidebar, click on **R2**. (You may need to add a credit card, but R2 gives you 10 gigabytes free every month).
3. Click the blue **Create bucket** button.
4. Name it something simple like `pinkwire-media`. Leave the location on Automatic.
5. Click **Create bucket**.

Now, make the bucket public so your OS can see the images:
1. Inside your new bucket, click the **Settings** tab.
2. Scroll down to **Public Access**.
3. Under **Custom Domains**, click **Connect Domain** (if you have your domain on Cloudflare) or enable **R2.dev subdomain** for a quick testing URL.
4. Copy the URL it gives you — this is your `R2_PUBLIC_URL`.

## 5. How to Connect PinkWire to R2
Now you need the keys to let PinkWire upload files:
1. Go back to the main R2 dashboard page (click R2 in the sidebar).
2. On the right side, look for **Manage R2 API Tokens** and click it.
3. Click **Create API token**.
4. Give it a name like "PinkWire Uploads".
5. Change the **Permissions** dropdown to **Object Read & Write**.
6. Click **Create API Token**.

Cloudflare will show you your keys **exactly once**. Keep this tab open!
Copy the **Access Key ID**, **Secret Access Key**, and **Account ID** into your `.env` file (or hosting provider secrets).

## 6. How Future Uploads Work
Once these environment variables are set in production, the PinkWire OS backend (`server.ts`) will detect them. The exact same drag-and-drop upload window you use right now will seamlessly intercept the file, bypass the local folder, and stream it securely into your Cloudflare R2 bucket.

The Media Library will then save the Cloudflare URL to its database, ensuring that Memes, Wallpapers, and Guestbook pictures always load instantly around the world, completely independent of the PinkWire app server.
