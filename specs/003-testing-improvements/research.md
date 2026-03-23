# Research: Testing Improvements

**Branch**: `003-testing-improvements` | **Date**: 2026-03-23

## Resolved Questions

### Q1: How does the current Vitest configuration handle SCSS imports?

**Decision**: No additional setup needed. The existing `vitest.config.ts` inherits from `vite.config.ts` which already loads `@vitejs/plugin-vue`. Vite processes `.scss` imports transparently in the test environment. Evidence: `NyxEditor.spec.ts` imports `NyxEditor.vue` (which does `import './NyxEditor.scss'`) and passes today.

### Q2: How are `<Teleport>` elements accessed in jsdom tests?

**Decision**: Mount with `attachTo: document.body`. `@vue/test-utils` renders Teleport targets into the real DOM when `attachTo` is set. After mount, access teleported content via `document.body.querySelector('.nyx-modal')`. Always call `wrapper.unmount()` in `afterEach` to clean up DOM nodes.

**Code pattern**:
```ts
const wrapper = mount(NyxModal, {
  attachTo: document.body,
  props: { modelValue: true }
})
const dialog = document.body.querySelector('[role="dialog"]')
expect(dialog).not.toBeNull()
wrapper.unmount()
```

### Q3: How are pointer events simulated in jsdom?

**Decision**: Use `wrapper.trigger('pointerdown', { clientX: 10, clientY: 0 })` etc. `getBoundingClientRect` must be mocked via `vi.spyOn` since jsdom has no layout engine.

**Code pattern**:
```ts
const track = wrapper.find('.nyx-slider__track')
vi.spyOn(track.element, 'getBoundingClientRect').mockReturnValue({
  left: 0, top: 0, width: 200, height: 20, right: 200, bottom: 20,
  x: 0, y: 0, toJSON: () => {}
})
await track.trigger('pointerdown', { clientX: 100, clientY: 10 })
```

### Q4: Is `@vue/test-utils` already installed?

**Decision**: Yes. `NyxEditor.spec.ts` uses `mount` from `@vue/test-utils` and the tests currently pass. No installation needed.

### Q5: What is the Playwright dev server URL?

**Decision**: `http://localhost:5173` for local dev, `http://localhost:4173` for CI preview (`pnpm build && pnpm preview`). The `playwright.config.ts` already has this wired. E2E tests need the dev server or a storybook instance running. Current `e2e/vue.spec.ts` hits the Vite dev server root — the placeholder test visits `/` and checks for `<h1>You did it!</h1>`.

**Implication**: E2E tests should test against a real running instance of the library's dev app or Storybook. Since the dev app (main `src/main.ts`) is used for development, we should add test pages/routes there, or update the existing playground page. Alternatively, E2E tests can target Storybook (`http://localhost:6006`). The simpler approach: update `e2e/vue.spec.ts` to remove the scaffolding test; write new E2E tests as Storybook-targeting specs once a CI story server is available. For this iteration, **prioritise unit/component tests** (Vitest) and leave E2E as an improvement layer.

### Q6: Does `useNyxProps` need a Vue app context (provide/inject)?

**Decision**: Yes, for the fallback chain. `useNyxProps` uses `inject(NYX_KIT_KEY)` internally. Without a plugin install, it falls back to library defaults gracefully. Tests can mount components standalone and class assertions will reflect library defaults — this is acceptable for smoke/render tests. Tests specifically verifying global default inheritance should provide a plugin context via `mount({ global: { plugins: [[NyxKit, options]] } })`.

### Q7: How to handle `generateRandomString` in NyxModal (non-deterministic IDs)?

**Decision**: Don't assert exact ID values. Assert that `aria-labelledby` is set (non-empty attribute) and that the `id` on `<h1>` matches the `aria-labelledby` value. Use `getAttribute` to cross-reference.

## Technology Decisions

| Area | Decision | Rationale |
|------|----------|-----------|
| Test runner | Vitest (existing) | Already configured, fast, jsdom built-in |
| Component mounting | `@vue/test-utils` `mount` | Already in use; `shallowMount` for isolated units |
| Pointer events | `wrapper.trigger` + `vi.spyOn(getBoundingClientRect)` | jsdom limitation; established pattern |
| Teleport testing | `attachTo: document.body` | Official @vue/test-utils recommendation |
| E2E | Playwright (existing) — deferred to follow-up | Focus this iteration on Vitest component tests |
| SCSS | No changes needed | Vite plugin handles this |
| `useNyxProps` context | Mount standalone; inject plugin for global-default tests | Minimal setup, tested in useNyxProps.spec.ts already |
