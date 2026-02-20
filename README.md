# Unsent Web

Unsent is a single-purpose emotional release web app.

Write what you need to write, pause, and release it.  
Nothing is stored, shared, or remembered.

## Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Product Flow

1. `empty`: prompt is visible
2. `writing`: user types freely
3. `paused`: 5s inactivity reveals `Release`
4. `releasing`: text disassembles with synchronized glow
5. `released`: closure message and restart action

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run lint
npm run build
npm start
```

## Deploy To Vercel

1. Push repository to GitHub/GitLab/Bitbucket.
2. Import project in Vercel.
3. Set root directory to `Unsent-main/unsent-web` if needed.
4. Deploy with defaults:
   - Build command: `npm run build`
   - Output: `.next`

## Notes

- PWA manifest is in `public/manifest.json`.
- App icon is in `public/icon.svg` and `src/app/icon.svg`.
- There is no backend and no persistence layer.
