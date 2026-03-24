# Architecture Overview

## Layer Diagram

```
┌─────────────────────────────────────────────────────┐
│                  Consumer Application               │
│           (imports from nyx-kit bundles)            │
└──────────────┬──────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────┐
│                    src/main.ts                      │
│          NyxKit Vue plugin (install entry)          │
│  - registers v-click-outside directive globally     │
│  - provides NyxKitOptions via inject('libEnv')      │
└──┬──────────┬──────────┬──────────┬─────────────────┘
   │          │          │          │
   ▼          ▼          ▼          ▼
components  composables directives  classes/utils/types
```

## Modules

| Module | Entry | Purpose |
|---|---|---|
| Plugin | `src/main.ts` | Vue plugin, global options, directive registration |
| Components | `src/components/index.ts` | 23 UI components |
| Composables | `src/composables/index.ts` | Reusable logic (props, keyboard, positioning) |
| Directives | `src/directives/index.ts` | Custom Vue directives (`v-click-outside`) |
| Types | `src/types/index.ts` | Shared enums and interfaces |
| Utils | `src/utils/index.ts` | Pure functions (array, number, string, url) |
| Classes | `src/classes/index.ts` | Class-based utilities (NyxLog, NyxLoader) |
| Styles | `src/styles/index.css` | CSS custom properties, reset, flex utilities |

Each module is built as an independent `.mjs` bundle and has its own entry in the `package.json` `exports` map. See [build.md](./build.md).

## Key Design Decisions

### Global options via `provide/inject`
`NyxKit.install` provides a `NyxKitOptions` object under the key `'libEnv'`. Components inject this to read library-level defaults (e.g. `pixel: true` enables pixel mode globally). Per-component props always win over the global option.

### `useNyxProps` as the single prop pipeline
All visual props (`theme`, `size`, `variant`, `shape`, `pixel`, `gradient`, `backlight`) flow through `useNyxProps`. It computes `classList`, `gradient`, and `backlight` CSS variables in one place. No component should compute its own class list from these props independently. See [component-model.md](./component-model.md).

### Teleport for floating elements
Dropdowns, tooltips, and modals are teleported to `<body>` to avoid `overflow: hidden` clipping. Positioning is handled by `useTeleportPosition`, which tracks the trigger element and auto-mirrors when viewport space is insufficient.

### No external runtime dependencies
`vue` is the only runtime peer dependency. No icon library, animation library, or utility framework is bundled. All logic is purpose-written.

### Pixel mode
A first-class alternative visual mode using the `Press Start 2P` font and `box-shadow`-based pixel borders (SCSS mixins in `src/styles/mixins.scss`). Enabled globally via `NyxKitOptions.pixel` or per-component via the `pixel` prop. Only valid with the `Solid` variant.

## Component Inventory

| Component | Description |
|---|---|
| NyxAvatar | Image or initials avatar with optional name display |
| NyxBadge | Status/count badge |
| NyxBreadcrumbs | Navigation breadcrumb trail |
| NyxButton | Button or anchor, all variants, pixel mode |
| NyxCard | Content container card |
| NyxCarousel | Slideshow / image carousel |
| NyxCheckbox | Checkbox input |
| NyxForm / NyxFormField | Form wrapper and field layout |
| NyxInput | Text, password, email, number, date, and other input types |
| NyxMedia | Image/video/audio display |
| NyxModal | Teleported dialog with backdrop, ESC, slots |
| NyxProgress | Line bar or dot-grid progress, indeterminate support |
| NyxSelect | Single/multiple searchable dropdown, teleported |
| NyxSlider | Single value or range slider with keyboard support |
| NyxSpinner | Loading spinner |
| NyxSteps | Step indicator / wizard progress |
| NyxSwitch | Toggle switch |
| NyxTable / NyxTableCell | Generic typed data table with column control |
| NyxTabs | Tabbed content with classic/modern variants |
| NyxTextarea | Multiline text input |
| NyxTooltip | Teleported tooltip |
| NyxTree | Recursive tree from status-driven `NyxTreeNodeBase[]` data |
