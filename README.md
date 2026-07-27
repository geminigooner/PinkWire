# PinkWire OS

Welcome to PinkWire OS — a personal, web-based operating system experience built with React, TypeScript, and Tailwind CSS.

Designed with nostalgia, curiosity, and a deep appreciation for digital personal spaces, PinkWire OS reimagines the concept of a portfolio and personal website as a fully functional, mobile-first operating system.

## Features

- **Window Management:** Drag, resize, minimize, and maximize windows smoothly.
- **File Explorer:** Navigate a virtual file system complete with hidden folders and easter eggs.
- **Customization:** Change wallpapers, switch themes (Classic Pink, Bubblegum, Midnight, etc.), adjust cursor styles, and toggle system sounds.
- **Journal:** A beautiful, markdown-supported reading experience.
- **Spun (Music Player):** Listen to ambient tracks and control playback.
- **Guestbook:** Leave a mark and see who else has visited.
- **Mobile-First Design:** Fully responsive and optimized for touch devices.
- **Achievements:** Digital lore and secrets hidden throughout the system to reward curiosity.

## Development

PinkWire OS is built with Vite, React, and Zustand for state management.

### Setup

\`\`\`bash
npm install
npm run dev
\`\`\`

### Architecture

- \`src/core/\`: Boot sequence and OS-level providers.
- \`src/desktop/\`: Desktop icons, wallpaper management, and sticky notes.
- \`src/windows/\`: Window state management and rendering.
- \`src/taskbar/\`: Taskbar, Start Menu, System Tray, and Notification Center.
- \`src/applications/\`: Individual app implementations (Explorer, Journal, Settings, etc.).
- \`src/store/\`: Zustand stores for global state (windows, settings, audio, achievements).
- \`src/services/\`: Event bus and audio synthesis.

## Deployment

The project can be built for production using:

\`\`\`bash
npm run build
\`\`\`

This outputs optimized, minified static files to the \`dist/\` directory, ready to be served by any static hosting provider.

## Accessibility

PinkWire OS respects reduced motion preferences, offers high-contrast modes, and includes adjustable text sizes to ensure a comfortable experience for all visitors.

## Credits

Designed and developed by Amanda Danielle.
Built with curiosity, humor, late nights, and entirely too much pink.
