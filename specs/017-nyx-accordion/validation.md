# NyxAccordion validation

Validated 2026-09-12 with Node 24 and the repository's pnpm dependencies.

| Check | Result |
|---|---|
| `pnpm type-check` | Passed, including stories and component tests |
| ESLint on new component, stories, tests, and touched exports | Passed |
| Accordion unit tests | 21 passed after adding panel transitions, including silent-normalization emission regression and disjoint slot namespaces |
| Existing NyxTabs tests | 16 passed; source and API unchanged |
| Full unit suite | 502 passed, 1 existing NyxStatusDot failure (39 files) |
| Chromium / Firefox E2E | 18 passed, including motion, rapid reversals, and reduced motion |
| WebKit E2E | 9 passed with temporary host compatibility libraries |
| `pnpm build` / library build | Passed when run separately from Storybook |
| Storybook build | Passed |
| Built story browser review | All eight stories in desktop dark and mobile light modes; no page errors, horizontal overflow, or incorrectly visible hidden bodies |
| Package consumer type check | Root/component imports and public item/model/props/slot types resolve using TypeScript bundler module resolution |
| Package runtime imports | Root and component entry points export the same NyxAccordion component |

## Motion behavior

Panels use intrinsic CSS grid expansion (300ms) and collapse (200ms), a subtle body reveal, and a horizontal-axis chevron flip (`rotateX`). Collapsing panels become inert and aria-hidden immediately; `v-show` removes them from layout after the exit. Reduced motion disables all component transitions. Browser checks pause transitions mid-flight to verify real intermediate panel heights, test interrupted transitions, and check accessibility exclusion before exit completion.

## BoundSingle composition review

The story directly imports and locally registers `NyxForm`, `NyxFormField`, `NyxInput`, and `NyxActionItem`. A browser check confirmed the rendered form/field/input classes, scoped label-to-input ID association, input retention after panel switches, the profile-visibility action, and no mobile horizontal overflow or page errors. Type checking, lint, Storybook, and the library build also pass at version `2.1.0`.

## Existing failure

`src/components/NyxStatusDot/NyxStatusDot.spec.ts:25` expects `size-xs`; the unchanged component explicitly defaults to `NyxSize.Medium`, rendering `size-md`. Neither file was modified. This discrepancy is recorded in AGENTS.md and was not folded into the accordion feature.

## Environment notes

The host is Arch-based; Playwright's Ubuntu WebKit build required ICU 74, libxml2, and flite compatibility libraries. These were downloaded and extracted under `/tmp/nyx-webkit-libs`, with a temporary launch wrapper and Playwright config. No system packages or project dependencies were added. The normal checked-in E2E config uses Playwright's standard browser launch settings; compatible browser dependencies are required on CI or other machines.

The E2E server now explicitly uses port 5197, avoiding the existing development services. Both local and CI browser tests load the fixture through Vite because library production builds do not include test fixtures.

Build the library and Storybook sequentially for validation. Both use the repository's Vite configuration; a concurrent run failed, while the final separate builds passed.

The specification commit `455cd73` was pushed before implementation. The user authorized committing and pushing the completed implementation, updated examples, and `2.1.0` minor version bump for pull-request review.
