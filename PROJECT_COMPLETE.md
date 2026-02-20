# Unsent Web - Product Build Complete

## What Was Fixed

- Repositioned the project as a true web product (Next.js), not Flutter.
- Redesigned the UI and interaction flow for a premium, focused writing experience.
- Fixed missing web-platform assets needed for hosting and installability.
- Replaced inaccurate local documentation with web + Vercel deployment guidance.

## Final Product Decisions

- Single-screen, zero-distraction interface.
- Emotional pacing via intentional state transitions.
- No persistence, no API calls, no user accounts.
- Typography and visual language tuned for calm + emotional weight.
- Mobile and desktop responsive behavior with safe spacing.

## Implemented Experience

1. `empty`: invitation to write.
2. `writing`: free-form text entry.
3. `paused`: after 5 seconds inactivity, `Release` appears.
4. `releasing`: 2.8s character disassembly + layered ambient glow.
5. `released`: closure message + `Write Again`.

## Key Technical Updates

- `src/components/UnsentApp.tsx`
  - Improved timer lifecycle and cleanup.
  - Added keyboard-friendly release shortcut (`Ctrl/Cmd + Enter` in paused state).
  - Better focus handling and state transitions.
  - Stronger visual hierarchy with structured shell, header, and footer message.

- `src/components/TextDisassembly.tsx`
  - Stable per-character animation params via memoization.
  - Preserved organic drift + fade behavior.

- `src/components/GlowBackground.tsx`
  - Refined layered glow composition and positioning.

- `src/components/GlowButton.tsx`
  - Enhanced tactile hover/press feel.

- `src/app/layout.tsx`
  - Correct Next.js metadata + viewport exports.
  - Introduced product typography system.

- `src/app/globals.css`
  - Added design tokens and richer atmospheric background.
  - Kept subtle noise texture.

- `src/app/page.tsx`
  - Added radial warmth layer for mood depth.

- Added PWA/web assets:
  - `public/manifest.json`
  - `public/icon.svg`
  - `src/app/icon.svg`

- Replaced docs:
  - `README.md` now reflects the real web app and Vercel flow.

## Hosting Status (Vercel Ready)

This app is ready to host on Vercel.

Use:

```bash
npm install
npm run build
```

If imported from a monorepo/subfolder, set project root to `Unsent-main/unsent-web`.
