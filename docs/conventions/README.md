# Conventions

## File and Folder Naming

| Thing | Convention | Example |
|---|---|---|
| Component folder | PascalCase | `NyxButton/` |
| Component file | PascalCase | `NyxButton.vue` |
| Story file | PascalCase + `.stories.ts` | `NyxButton.stories.ts` |
| Unit test file | PascalCase + `.spec.ts` | `NyxButton.spec.ts` |
| Composable file | camelCase, `use` prefix | `useNyxProps.ts` |
| Directive file | camelCase, `v` prefix | `vClickOutside.ts` |
| Utility file | camelCase, by domain | `number.ts`, `string.ts` |
| Class file | PascalCase | `NyxLog.ts` |
| Type file | camelCase, by domain | `common.ts`, `input.ts` |
| CSS/SCSS file | kebab-case | `design-system.scss` |
| Docs file | kebab-case | `component-model.md` |

## Import conventions

Export components from `src/components/index.ts` using direct imports:
```typescript
import NyxFoo from './NyxFoo/NyxFoo.vue'
export { NyxFoo }
```
Never use the `{}` syntax or funnel through an index.ts file unless in a subdomain folder (components, composables, classes, ...).

## Naming

### Components
- All components are prefixed with `Nyx`.
- Sub-components of a parent use the parent prefix: `NyxTableCell`, `NyxFormField`, `NyxTreeNode`.

### Types and Enums
- Enums are prefixed with `Nyx`: `NyxTheme`, `NyxSize`, `NyxVariant`.
- Interfaces describing component props are suffixed with `Props`: `NyxComponentProps`.
- Enum members use PascalCase: `NyxTheme.Primary`, `NyxVariant.Outline`.

### CSS Classes
- Component root class: `nyx-{component-name}` in kebab-case, e.g. `nyx-button`, `nyx-select`.
- Modifier classes: `nyx--{modifier}`, e.g. `nyx--theme-primary`, `nyx--size-lg`, `nyx--disabled`.
- Internal element classes: `nyx-{component}__{element}`, e.g. `nyx-select__dropdown`.

### CSS Custom Properties
- All tokens use `--nyx-` prefix: `--nyx-c-primary`, `--nyx-gap-md`.
- Component-scoped properties use `--nyx-{component}-`: `--nyx-button-bg`, `--nyx-slider-thumb`.

## TypeScript

- Strict mode is on. No `any` unless wrapping a third-party boundary.
- Prefer `enum` for fixed sets of values that appear in props (enables `useNyxProps` class generation).
- Use template literal types for constrained strings: `HexCode`, `DurationSpeed`, `CssVariableKey`.
- Generic components use `generic="T extends object"` on `<script setup>`.
- Export all public-facing types from `src/types/index.ts`.

## Vue / Component Style

- Use `<script setup lang="ts">` exclusively. No Options API.
- Use `defineModel` (Vue 3.4+) for v-model bindings.
- Use `defineProps<PropsInterface>()` with a standalone interface — do not inline the type.
- Prop defaults via `withDefaults(defineProps<...>(), { ... })`.
- Do not use `defineComponent` wrapper.
- Computed properties over methods for derived reactive values.
- Keep template logic minimal — move expressions into `computed`.

## Styles

- Each component has a co-located `.scss` file imported at the bottom of the SFC.
- Use `src/styles/mixins.scss` mixins for pixel mode — do not duplicate the box-shadow logic.
- Scope all component styles: either `<style scoped>` or BEM class namespacing.
- Do not hard-code colours, spacing, or font sizes. Always reference a CSS custom property.
- Dark mode is handled by overriding `--nyx-c-*` tokens at the `:root[data-theme="dark"]` level in `variables.css` — components do not need separate dark-mode blocks.

## Git

- Commit messages: imperative mood, short subject line (`add NyxToast component`, `fix slider range crossover`).
- Branch names: kebab-case, prefixed by type (`feat/nyx-toast`, `fix/slider-range`, `docs/component-model`).
- One logical change per commit. Do not bundle unrelated changes.
- Do not commit generated files (`dist/`, `storybook-static/`).

## AI Workflow

- GitHub spec-kit is the default workflow for new features and new exported symbols.
- Keep Spec Kit slash commands available in both `.claude/commands/` and `.opencode/commands/`.
- `.claude/commands/` is the authoring source; `.opencode/commands/` is the OpenCode mirror.
- When a Spec Kit command changes, run `.specify/scripts/bash/sync-opencode-commands.sh` and commit the regenerated OpenCode command files in the same change.

## Storybook Stories

- Every component must have a story file.
- The default export defines component metadata (`title`, `component`, `argTypes`).
- Always include a `Default` story that renders the component with minimal props.
- Additional stories cover key variants: sizes, themes, disabled state, pixel mode (where applicable).
- Story args must use the actual enum values, not raw strings/numbers.
