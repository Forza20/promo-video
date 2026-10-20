# Promo video: data modelling in Power BI

A 10-second video (1920×1080, 30 fps) made entirely in code with [Remotion](https://www.remotion.dev/), React and TypeScript. It is shown on [forza20.github.io](https://forza20.github.io/#video).

## Scenes

| Frames | Scene | File |
| --- | --- | --- |
| 0–90 | Slow push-in on the illustration with the title "From raw data to value" | `src/scenes/IntroScene.tsx` |
| 90–210 | A star schema (Sales, Customer, Product, Calendar) is drawn up in Power BI model-view style | `src/scenes/ModelScene.tsx` |
| 210–300 | The five steps to a strong data model, ending on a glowing tagline | `src/scenes/StepsScene.tsx` |

All motion uses Remotion's `interpolate`, `spring`, `useCurrentFrame` and `useVideoConfig`, so every frame is deterministic. `src/ImageCamera.tsx` pans and zooms across the illustration in `public/datamodelling.png`. Colours live in `src/theme.ts`; scene lengths are set in `src/PromoVideo.tsx`.

## Usage

Requires [Node.js](https://nodejs.org/) (LTS).

```bash
npm install
npm run dev         # open Remotion Studio to preview
npm run typecheck   # TypeScript check
npm run render      # render to out/promo.mp4
```

For a smaller file, as used on the website: `npx remotion render PromoVideo out/promo.mp4 --crf=28`.

To update the website, copy `out/promo.mp4` to `assets/promo.mp4` in the [Forza20.github.io](https://github.com/Forza20/Forza20.github.io) repo and push.
