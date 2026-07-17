# PinkWire OS Architecture & Engineering Guide

## Engineering Overview

### Project Vision
PinkWire OS is designed as a personal, digital home—a web-based operating system tailored for privacy, creativity, and calm. It is built to serve as a secure, local-first environment where data ownership belongs entirely to the user.

### Design Philosophy
The design philosophy is centered around creating a "cohesive mood." Rather than feeling like a chaotic collection of web apps, PinkWire feels like a unified, professional workspace. It leverages glassmorphism, subtle borders, and intentional typography to create a calm, distraction-free environment.

### Technical Goals
- **Decoupled Architecture:** Build an OS where applications are isolated from the core window manager, allowing for safe and predictable extensions.
- **Resilient State Management:** Ensure state is persisted reliably across sessions without requiring a constant network connection.
- **Maintainability:** Prioritize readable, modular code over complex abstractions.

### User Experience & Mobile-First Philosophy
PinkWire OS is strictly mobile-first. The OS paradigm (windows, taskbars, menus) is traditionally desktop-heavy, but PinkWire reimagines this for touch. Window dragging is disabled on small screens in favor of full-screen modals. Touch targets are large, and navigation is swipe-friendly.

### Local-First Philosophy
User data is sacred. PinkWire operates entirely in the browser using local storage and IndexedDB. Cloud synchronization is strictly an opt-in feature, acting as a bridge between devices rather than a central source of truth.

---

## System Architecture

The PinkWire architecture is divided into the Core OS (infrastructure) and Applications (user space).

### Window Manager
Responsible for rendering the Desktop, Taskbar, and active application windows. It orchestrates Z-indexes, active focus, and responsive sizing, completely agnostic to the applications running inside it.

### Application Registry
A centralized mapping (`registry.ts` and `metadata.ts`) defining available applications, their icons, default window sizes, and instantiation policies (e.g., single instance vs. multi-instance).

### State Stores
Domain-specific stores managed via Zustand. By separating concerns (e.g., `useWindowStore`, `useThemeStore`, `useAuthStore`), the system prevents global render cascading.

### Event Bus
A lightweight, type-safe Pub/Sub system (`osEvents`). This allows decoupled communication. For example, the Media app can publish a `WallpaperChanged` event without knowing how the Desktop store applies it.

### Core Services
- **Backup Service:** Orchestrates taking snapshots of the entire OS state, serializing it, and storing it safely via IndexedDB.
- **Sync Service:** An adapter-based service (currently targeting Cloudflare) that syncs local state to the cloud when the user is authenticated.
- **Notification Service:** Listens to the Event Bus to render non-blocking toasts and system alerts.
- **Release Manager:** A specialized service that evaluates system health and prepares deployment manifests.

---

## Application Documentation

### PinkWire (About/Welcome)
- **Purpose:** The system introduction and greeting.
- **Major Components:** Greeting screen, quick links.
- **Future Extension:** Interactive system tours.

### Journal
- **Purpose:** A markdown-based CMS for personal writing.
- **Major Components:** Editor, Reader, Tagging system.
- **Services Used:** Local storage, Sync Service.

### Media Library
- **Purpose:** Asset management for images, sounds, and wallpapers.
- **Major Components:** Grid view, uploader, metadata editor.
- **Future Extension:** Image cropping and folder hierarchies.

### Settings / Control Panel
- **Purpose:** Global OS configuration.
- **Major Components:** Theme Studio, Profile, Desktop layout, Accessibility.
- **State Used:** `useSettingsStore`, `useThemeStore`.

### Guestbook
- **Purpose:** A public interaction layer for visitors.
- **Major Components:** Sign-in form, entry list, admin moderation.
- **Responsibilities:** Differentiating between the admin (Amanda) and visitors.

### Browser (Explorer)
- **Purpose:** File system and web navigation simulation.
- **Future Extension:** Deep linking into external services.

### Release Manager
- **Purpose:** Pre-deployment checklists and system health monitoring.
- **Major Components:** Dashboard, Preflight Checklist, Release History.
- **Responsibilities:** Validating data integrity before major updates.

---

## Engineering Decisions

### Why Zustand?
- **Problem:** React Context causes cascading re-renders. Redux is too boilerplate-heavy for rapid iteration.
- **Decision:** Use Zustand for global state.
- **Benefits:** Granular selector updates, easy local storage persistence middleware, minimal boilerplate.

### Why an Event Bus?
- **Problem:** Tightly coupling applications (e.g., the Theme app triggering a Toast notification) leads to spaghetti code.
- **Decision:** Implement a lightweight Pub/Sub `EventBus`.
- **Benefits:** Applications fire-and-forget events. The OS shell listens and handles notifications or cross-app side effects independently.

### Why Local-First Storage?
- **Problem:** Relying purely on a cloud database makes the OS slow and unusable offline.
- **Decision:** All data is written locally first (LocalStorage/IndexedDB). Cloud sync acts as a background progressive enhancement.
- **Benefits:** Instant UI updates, perfect offline support, maximum privacy.

### Why Adapter Patterns for Sync?
- **Problem:** Tying the OS directly to a specific backend (like Firebase or Cloudflare) makes future migrations difficult.
- **Decision:** Create a generic `SyncAdapter` interface.
- **Benefits:** Swapping Cloudflare for an S3 bucket or local network drive requires zero changes to the application code.

### Why Tailwind CSS?
- **Problem:** Managing separate CSS files or CSS-in-JS libraries adds overhead and context switching.
- **Decision:** Use Tailwind utility classes with centralized OS design tokens (CSS variables).
- **Benefits:** Rapid UI iteration, guaranteed consistency, and easy dynamic theming.

---

## Data Flow Documentation

### Opening an Application
1. User taps an icon on the Taskbar or Start Menu.
2. The component calls `openWindow(appId)` on the `useWindowStore`.
3. The Store checks `AppRegistry` for the instance policy (e.g., if 'single', it focuses the existing window; if not, it spawns a new one).
4. The Window Manager observes the store change and renders a new `<OsWindow>` wrapping the application component.

### Synchronizing Data
1. A user modifies state (e.g., creates a Journal entry).
2. Zustand persists the state to LocalStorage via a custom `createSyncStorage` middleware.
3. The middleware intercepts the write, saves locally, and checks `useAuthStore`.
4. If authenticated, it queues a payload in `useSyncStore`.
5. The Sync Service debounces the queue and dispatches the payload to the Cloudflare Adapter.

### Restoring a Backup
1. User selects a backup in the Backup Service.
2. The service reads the serialized payload from IndexedDB.
3. It iterates through the payload, overriding specific keys in LocalStorage.
4. The system forces a hard reload (`window.location.reload()`) to ensure all Zustand stores rehydrate with the new underlying data.

---

## Folder Structure Guide

- `/src/applications/`: Contains the isolated user-space applications. Each folder (e.g., `/journal`) is self-contained with its own components, stores, and assets.
- `/src/components/`: Shared UI primitives (buttons, modals) used across multiple apps.
- `/src/core/`: The foundational OS layer (Boot sequence, Authentication).
- `/src/desktop/`: Components responsible for rendering the wallpaper, stickers, and desktop icons.
- `/src/services/`: Centralized business logic (Backup, Sync, Notifications, Audio) that operates outside of the React render cycle.
- `/src/store/`: Global OS-level state managers (Windows, Desktop, Settings).
- `/src/taskbar/`: The bottom navigation, start menu, and system tray components.
- `/src/types/`: Global TypeScript definitions defining the boundaries between apps and the OS.
