# Build

## Tool Chain

| Tool | Purpose |
|---|---|
| Vite 6 | Dev server and library build |
| `vite-plugin-dts` | TypeScript declaration generation |
| `vue-tsc` | Type checking (separate from build) |
| SCSS | Styles (Sass modern API) |

## Library Entry Points

Seven independent bundles are produced. Each maps to a key in `package.json` `exports`:

| Bundle | Entry file | Export path |
|---|---|---|
| `index` | `src/main.ts` | `.` |
| `components` | `src/components/index.ts` | `./components` |
| `composables` | `src/composables/index.ts` | `./composables` |
| `directives` | `src/directives/index.ts` | `./directives` |
| `types` | `src/types/index.ts` | `./types` |
| `utils` | `src/utils/index.ts` | `./utils` |
| `classes` | `src/classes/index.ts` | `./classes` |

CSS is a separate asset: `./style.css` → `dist/assets/nyx-kit.css`.

## Output Format

- Format: ES modules (`.mjs`)
- Vue is external — not bundled
- `preserveModules: false` — each bundle is a single file
- Icon chunks are split into `dist/chunks/icons/`
- Other shared chunks go to `dist/chunks/default/`

## `package.json` exports map

```json
{
  ".": {
    "import": "./dist/index.mjs",
    "types": "./dist/types/index.d.ts"
  },
  "./components": {
    "import": "./dist/components.mjs",
    "types": "./dist/types/components.d.ts"
  },
  ...
  "./style.css": {
    "import": "./dist/assets/nyx-kit.css"
  }
}
```

The `exports` map in `package.json` must stay in sync with the `lib.entry` object in `vite.config.ts`. A mismatch breaks type resolution or tree-shaking for consumers.

## Type Declarations

`vite-plugin-dts` generates `.d.ts` files into `dist/types/` with `rollupTypes: true` (single rolled-up declaration file per entry). The `types` field in each `exports` entry points there.

## Dev Server

Port: `9000`. Runs the Storybook-independent demo app (`index.html` / `src/main.ts`).

## Scripts

| Script | Command |
|---|---|
| `dev` | Vite dev server |
| `build` | Type-check + build in parallel |
| `build-only` | Vite build only (no type check) |
| `type-check` | `vue-tsc --build` |
| `storybook` | Storybook dev on port 6006 |
| `storybook:build` | Static Storybook build |
| `storybook:publish` | Build + deploy to GitHub Pages |
| `test:unit` | Vitest |
| `test:e2e` | Playwright |
| `lint` | oxlint + ESLint (run-s) |
| `prepublishOnly` | Runs `build` before `npm publish` |

## SCSS Global Injection

`vite.config.ts` injects global SCSS into every component style block via `additionalData`. This makes mixins from `src/styles/mixins.scss` available in every component without an explicit `@use` import.

## Adding a New Entry Point

1. Add the source file/folder under `src/`.
2. Add it to the `lib.entry` object in `vite.config.ts`.
3. Add the matching entry to the `exports` map in `package.json`.
4. Export it from `src/index.ts` if it belongs in the main bundle too.
