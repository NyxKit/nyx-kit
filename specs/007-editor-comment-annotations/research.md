# Research: NyxEditor Comment Annotations

**Branch**: `007-editor-comment-annotations` | **Date**: 2026-03-27

---

## Finding 1: Public annotation types belong in shared editor types

**Decision**: Define the annotation target payload, persisted annotation input, and render-state enum in `src/types/editor.ts` and re-export them from `src/types/index.ts`.

**Rationale**: The feature changes the published consumer contract of `NyxEditor`. Repo conventions require public-facing types to live in the shared type barrel rather than only in component-local files.

**Alternatives considered**: Keeping annotation types only in `src/components/NyxEditor/NyxEditor.types.ts` was rejected because it would hide consumer-facing contracts in a component-internal file.

---

## Finding 2: Selection and creation should share one anchor contract

**Decision**: Use `NyxAnnotationAnchor` for both `selection` and `annotation:create`.

**Rationale**: A single payload shape is easier for consumers to reason about and avoids parallel selection models with overlapping meaning.

**Alternatives considered**: Keeping a lighter `selection` payload was rejected because it creates two similar but different contracts for the same user selection.

---

## Finding 3: Render-state design is enum-first, but runtime scope is intentionally narrow

**Decision**: Use an enum with `resolved`, `unresolved`, and reserved `shifted`, while implementing only `resolved` and `unresolved` behavior in the first release.

**Rationale**: The spec already fixed `shifted` as a forward-compatibility state. Shipping the enum now stabilizes the public contract without forcing premature remapping logic.

**Alternatives considered**: Omitting `shifted` from the enum was rejected because it would likely force a later public contract change. Implementing full shifted behavior now was rejected because it expands scope before unresolved/resolved behavior is proven.

---

## Finding 4: Unresolved annotations should surface as state only

**Decision**: Expose unresolved annotations as a single render state with no editor-supplied reason code or message.

**Rationale**: The feature clarification explicitly assigns unresolved-case interpretation and messaging to the consuming application, keeping the editor contract lean.

**Alternatives considered**: Returning unresolved reason codes or human-readable explanations was rejected because it pushes product-specific interpretation into the library contract.

---

## Finding 5: Highlight styling must use component-scoped design tokens only

**Decision**: Implement comment highlight appearance through NyxEditor-scoped CSS custom properties layered onto the existing theme token system.

**Rationale**: The constitution and design-system docs explicitly forbid hard-coded colors and prefer token-driven styling surfaces. Consumers should brand highlights without taking control of editor-internal mapping or DOM wrappers.

**Alternatives considered**: Raw CSS class styling contracts and consumer-provided DOM render hooks were rejected because they either expose implementation details or over-transfer rendering responsibility to consumers.

---

## Finding 6: The right contract artifact is a per-feature component API document

**Decision**: Document the public feature contract in `specs/007-editor-comment-annotations/contracts/component-api.md`.

**Rationale**: Existing component features in this repo use per-feature markdown contracts to capture props, emits, render states, classes, and ARIA expectations alongside the plan.

**Alternatives considered**: Skipping a contract file was rejected because this feature changes a public component API. Using only a TypeScript contract file was rejected because the behavior is broader than type signatures alone.

---

## Finding 7: Tests should stay at the Tiptap boundary

**Decision**: Extend the existing NyxEditor unit-test strategy by mocking Tiptap and asserting payload generation, render-state mapping, and active highlight behavior at the component boundary.

**Rationale**: Current NyxEditor tests already isolate browser-dependent editor internals through mocks. This keeps the test surface focused on NyxEditor behavior rather than third-party editor mechanics.

**Alternatives considered**: Heavy browser-first testing for all annotation cases was rejected because most contract behavior can be validated faster and more deterministically in unit tests.

---

## Finding 8: Active annotation behavior should follow existing active-state patterns

**Decision**: Model active comment emphasis as a consumer-controlled state, similar to active-item handling in components like `NyxTree` and `NyxTabs`.

**Rationale**: The repo already favors explicit active-state semantics over inferred styling magic. This keeps comment highlight emphasis predictable and externally controllable.

**Alternatives considered**: Letting the editor derive active annotation purely from internal focus state was rejected because consuming applications need explicit control when syncing comments with side panels or thread lists.
