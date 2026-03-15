# Testing

## Strategy

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest + `@vue/test-utils` | Component logic, composables, utilities, classes |
| E2E | Playwright | Interactive flows in the browser |
| Visual | Storybook | Manual and snapshot review of all variants |

## Unit Tests (Vitest)

Entry: `vitest.config.ts`. Environment: `jsdom`.

### What to unit test

- **Composables** — test in isolation by calling them inside a minimal component wrapper.
- **Utilities** — pure functions; test all branches and edge cases.
- **Classes** (`NyxLog`, `NyxLoader`) — test all static methods, including error paths.
- **Components** — test non-trivial logic: computed outputs, event emissions, v-model updates, slot rendering conditions. Do not test styling or CSS class names exhaustively.

### What not to unit test

- Trivial pass-through props (e.g. a prop that becomes an attribute directly).
- CSS output or visual appearance — covered by Storybook.
- Storybook stories themselves.

### File location

Co-located with the source file:
```
src/composables/useNyxProps.spec.ts
src/utils/number.spec.ts
src/components/NyxButton/NyxButton.spec.ts
```

### Running

```bash
yarn test:unit          # run once
yarn test:unit --watch  # watch mode
```

## E2E Tests (Playwright)

Config: `playwright.config.ts`. Tests live in `e2e/`.

### What to E2E test

- Keyboard interactions: ESC closes modal, arrow keys move slider thumb, tab order.
- Teleported elements: dropdown opens at correct position, closes on outside click.
- Complex user flows: multi-select, range slider drag, form submission.

### What not to E2E test

- Things already covered by unit tests (computed values, pure logic).
- Static rendering — Storybook covers this.

### Running

```bash
yarn test:e2e
```

Playwright uses the Vite dev server. Make sure nothing else occupies port `9000`.

## Storybook

Storybook is the visual test surface. Every component variant must be reachable from a story.

Before shipping a change:
- Open the affected story and verify it renders as expected in both light and dark mode.
- Check the pixel mode story if the component supports it.
- Check the disabled state story.

```bash
yarn storybook         # dev
yarn storybook:build   # static build for review
```

## Type Checking

Type checking is separate from the test suite:

```bash
yarn type-check   # vue-tsc --build
```

This must pass before any merge. It is run as part of `yarn build`.

## CI Checklist

Before considering a change complete:

- [ ] `yarn type-check` passes
- [ ] `yarn test:unit` passes
- [ ] `yarn test:e2e` passes (if interactive behaviour changed)
- [ ] Storybook story renders correctly for all affected variants
- [ ] `yarn build` succeeds (no broken exports or type errors in rollup)
