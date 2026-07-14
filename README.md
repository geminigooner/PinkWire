# PinkWire OS

PinkWire OS is a creative, client-side personal website styled as a desktop operating system. It features a window manager, customized applications, persistent state, and high visual polish.

## Applications

- **PinkWire**: The conversational core.
- **Journal**: Personal blog entries.
- **Disposable**: Photo viewer.
- **File Explorer**: A simulated file system.
- **Internet ExplAmanda**: An embedded web browser.
- **Control Panel**: Personalization and settings.

## Architecture

PinkWire OS is fully client-side and relies heavily on Zustand stores for persistent state management.
It utilizes Tailwind CSS for styling and Framer Motion for smooth, interruptible animations.
Wallpapers uploaded by the user are stored via IndexedDB to prevent `localStorage` limits.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Storage Management

To fully reset the operating system without clearing other site data, use the "Reset Desktop Layout" feature in Control Panel, or click "Restart Application" if a global error occurs. PinkWire OS carefully prefixes its storage keys (`pinkwire-`) to be good citizens of `localStorage`.
