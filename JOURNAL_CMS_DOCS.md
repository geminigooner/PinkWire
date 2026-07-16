# PinkWire OS — Journal CMS Documentation

Welcome to the new Journal CMS, Amanda. Here is everything you need to know about managing your long-form writing space directly within PinkWire.

## Where Journal Posts Are Stored
All journal entries (including drafts, published, and archived posts) are persisted securely in the local browser database (`IndexedDB`) via `zustand/middleware` under the `pinkwire-journal` storage key. This means your data remains safely stored in your browser across sessions. In the future, this can be synced to a remote database (like Firestore or Postgres).

## How Drafts Work
When you click "New Entry" or edit an existing post, the Journal automatically enters Edit mode and creates a draft instance in memory. 
- **Autosave**: As you type, the CMS will automatically save your draft every 2 seconds. You will see a "Saving..." and "Saved" indicator in the editor footer.
- **Accidental Refresh**: Because drafts are saved automatically to your store, if you accidentally refresh the page, you can find your draft again in the "Drafts" folder on the sidebar and pick up exactly where you left off.
- **Draft Status**: Drafts are completely invisible to regular visitors. Only authenticated administrators (you) can see them in the list.

## How Publishing Works
The publishing workflow is designed to be deliberate:
1. **Write**: Compose your thoughts in the Rich Editor.
2. **Preview**: At any time, you can click the "Back" button or "Save Draft" to exit the editor. You can click on your draft in the library to view a pixel-perfect preview of how it will look.
3. **Publish**: Click the "Publish" button in the Editor toolbar. This changes the status from `draft` to `published`, generates a clean URL slug, calculates the reading time, and immediately makes it visible to all visitors.

## How Media is Attached
The Journal is deeply integrated with the PinkWire Media Library.
- You no longer need to type out image URLs manually. 
- To add a cover image or insert an image into the text, click the **Image Icon** in the toolbar or click **Add Cover Image**.
- This will open the **Media Picker Modal**. You can search for any file you've uploaded to the Media app.
- Clicking an image will automatically insert it into your post at the current cursor position as a Markdown image tag `![alt](url)`.

## Creating Your First Article
1. Make sure you are authenticated as the administrator.
2. Open the **Journal** application.
3. Click **New Entry** in the top toolbar.
4. Set a beautiful cover image using the Media Picker.
5. Write a title, select a category, and add some tags (comma separated).
6. Compose your entry. Use the toolbar buttons for Bold, Italic, Headings, Quotes, and Links.
7. Click **Publish** when you're ready to share it with the world.

Enjoy your new writing environment.
