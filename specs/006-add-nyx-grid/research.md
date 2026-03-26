# Research: NyxGrid Layout Primitive

**Branch**: `006-add-nyx-grid` | **Date**: 2026-03-26

---

## Finding 1: Public naming

**Decision**: Keep the public component name `NyxGrid`.

**Rationale**: The consumer mental model is still a grid container with a masonry variant, not a general-purpose page layout system. Renaming to `NyxLayout` would imply broader responsibilities that the feature spec explicitly excludes.

**Alternatives considered**: `NyxLayout` was rejected because it suggests flex, split-pane, and shell patterns beyond this feature's scope.

---

## Finding 2: Structural semantics

**Decision**: Use a semantic root `<section>` with optional `<header>` and `<footer>` wrappers plus a dedicated content container.

**Rationale**: This matches the requested structure, aligns with existing slot-wrapper conventions, and keeps the component meaningful without imposing list or table semantics on arbitrary child content.

**Alternatives considered**: A generic `<div>` shell was rejected because the request explicitly centers the component on section-like layout structure.

---

## Finding 3: Layout engine strategy

**Decision**: Use a measurement-driven internal layout engine that computes item positions for both `grid` and `masonry` modes.

**Rationale**: A shared positioning engine makes smooth reflow practical in both modes and avoids a split implementation where standard grid animates cleanly but masonry snaps or cannot preserve order predictably.

**Alternatives considered**: Native CSS Grid alone was rejected because it does not solve masonry packing. CSS columns were rejected because they make deterministic reflow animation and predictable horizontal reading order harder.

---

## Finding 4: Animation approach

**Decision**: Animate item movement with transform-based FLIP-style transitions on internal wrappers.

**Rationale**: Transform transitions are performant, dependency-free, and compatible with insert/remove/reorder updates as long as each slotted child has a stable Vue key.

**Alternatives considered**: Pure opacity fades were rejected because they do not satisfy the re-alignment requirement. External animation libraries were rejected by repository policy.

---

## Finding 5: Slot item contract

**Decision**: Keep the API fully slot-driven and require no item data shape, while documenting that keyed top-level slot children are the supported path for reorder animations.

**Rationale**: The feature is explicitly a layout primitive. Introducing an item array prop would make the component too opinionated and duplicate what consumers already have in template space.

**Alternatives considered**: A `items` prop plus render callback was rejected because it would narrow the component to one rendering style and violate FR-018.

---

## Finding 6: Column sanitization

**Decision**: Accept `columns` as a consumer prop but sanitize to a positive integer with a documented default of `3`.

**Rationale**: A three-column default is a reasonable desktop-oriented starting point for dashboard and gallery layouts, while sanitization fulfills the invalid-value fallback requirement.

**Alternatives considered**: Defaulting to `1` was rejected because it under-delivers on the component's main value as a grid primitive. Defaulting to `auto-fit` was rejected because the feature spec asks for explicit column count control.

---

## Finding 7: Gap mapping

**Decision**: Map `gap: NyxSize` onto existing spacing tokens and default to `NyxSize.Medium`.

**Rationale**: This keeps the API consistent with the library's shared size scale and avoids hard-coded spacing values.

**Alternatives considered**: Accepting raw CSS length strings was rejected because it breaks token discipline and creates a one-off API.

---

## Finding 8: Accessibility and motion fallback

**Decision**: Keep the content region semantically neutral, preserve DOM order, and support reduced-motion behavior by minimizing transform animation duration when motion should be limited.

**Rationale**: The component should not override the semantics of consumer-provided child content, and motion-sensitive users still need a functional, predictable layout.

**Alternatives considered**: Applying `role="list"`/`role="listitem"` was rejected because arbitrary slotted children may already carry their own semantics.
