# NyxAccordion implementation plan

Approved 2026-09-12. Contract: [living spec](../../docs/specs/components/NyxAccordion.spec.md).

1. Implement local item validation and scalar/array normalization, keeping silent normalization separate from user emissions. Use optional `defineModel`, with local state for unbound operation.
2. Keep panel markup local: sharing a wrapper with NyxTabs would not remove meaningful behavior. Render native heading/button pairs, mounted hidden bodies, typed scoped slots, and safe instance-scoped IDs.
3. Add keyboard navigation and focus recovery before/after external DOM changes. Scope all key handlers to owned headers.
4. Apply existing theme/size tokens and shared defaults, without changing global styles or adding dependencies.
5. Add the requested CSS grid open/close motion, body reveal, and horizontal-axis (`rotateX`) indicator flip. Keep collapsing panels inert immediately and disable motion for reduced-motion preferences.
6. Export from the existing component and root (`src/main.ts`) entries and export public types. Add the eight contract stories.
7. Validate meaningful state/slot cases with unit tests and browser focus behavior with an isolated Vite fixture. Repair the existing E2E port mismatch. Run type checking, unit/E2E suites, library and Storybook builds, and inspect stories in both colour modes.

The approved specification commit has been pushed. The user authorized committing and pushing the completed implementation and `2.1.0` version bump for pull-request review.
