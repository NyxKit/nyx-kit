# Research: NyxMetricCard

**Phase**: 0 — Unknowns resolution  
**Date**: 2026-04-07

---

## Decision 1: Component structure

**Decision**: Single SFC in `src/components/NyxMetricCard/` following the standard 5-file layout (`.vue`, `.types.ts`, `.scss`, `.stories.ts`, `.spec.ts`).  
**Rationale**: Every existing component (NyxBadge, NyxActionItem, NyxBreadcrumbs, …) follows this exact layout. Diverging would break discovery patterns.  
**Alternatives considered**: Sub-component for the indicator element — rejected because the indicator is a pure CSS concern (a `::before` pseudo-element or an empty `<span>`), not a component boundary.

---

## Decision 2: Theming — useNyxProps

**Decision**: Call `useNyxProps(props, { origin: 'NyxMetricCard' })` and bind the returned `classList` to the root element. Also destructure `nyxVariant` and `nyxTheme` if conditional template logic needs them.  
**Rationale**: `useNyxProps` is the established theming pipeline; it resolves theme, variant, and size into CSS class strings. All consuming components use it.  
**Alternatives considered**: Manual CSS variable injection — rejected as it bypasses the central theming system and misses fallback resolution.

---

## Decision 3: Variant behaviour — CSS-only vs. JS

**Decision**: Implement all variant indicator and fill behaviours in SCSS only. Use `&.variant-filled`, `&.variant-soft`, etc. nested inside `.nyx-metric-card`.  
**Rationale**: No JS is required — class application is handled by `useNyxProps`, and CSS can express hover states, always-visible borders, and background fills natively.  
**Alternatives considered**: Computed `indicatorVisible` ref — rejected as unnecessary complexity for a pure visual concern.

---

## Decision 4: Filled-variant colour override for icon and suffix

**Decision**: In SCSS, inside `.nyx-metric-card.variant-filled`, add a rule that overrides `color` and `fill` for `.nyx-metric-card__suffix` and `.nyx-metric-card__icon` (the NyxIcon wrapper) to `var(--nyx-c-text-1)`.  
**Rationale**: NyxIcon respects CSS `color` for its stroke; the filled variant's dark background makes the theme colour indistinguishable from background, so default text colour is used instead. This is pure CSS — no prop drilling needed.  
**Alternatives considered**: Conditional `:theme` prop via `nyxVariant === NyxVariant.Filled ? undefined : props.theme` — rejected because it breaks the NyxIcon prop contract and leaks variant logic into the template.

---

## Decision 5: Indicator element

**Decision**: Use a dedicated `<span class="nyx-metric-card__indicator">` as the first child of the root. Its visibility is controlled via CSS on the parent's variant class.  
**Rationale**: A real DOM element gives the indicator a predictable layout context (left-edge of the card, `position: absolute` or flex shrink-0) and makes hover state handling straightforward.  
**Alternatives considered**: `::before` pseudo-element — viable, but makes it harder to test for the indicator's presence in unit tests and Storybook.

---

## Decision 6: CSS variables for colours

**Decision**: Use the following variables:  
- `--nyx-c-text-1` — value (bright, primary text)  
- `--nyx-c-text-2` — title and unit (muted text)  
- `--nyx-c-{theme}` / `--nyx-rgb-{theme}` — indicator border colour, suffix colour, icon colour  
- `--nyx-c-bg-soft` or `rgba(var(--nyx-rgb-badge), 0.12)` — soft/subtle background tint if needed  
**Rationale**: Matches what NyxBadge and NyxActionItem already use. No new variables needed.  
**Alternatives considered**: Hardcoded RGBA values — rejected per Constitution §VI (Design Token Discipline).

---

## Decision 7: Icon sizing

**Decision**: Hard-code `NyxSize.Small` (`sm`) as the icon size inside NyxMetricCard. Do not expose a size prop.  
**Rationale**: The design reference shows a small decorative icon alongside the value; exposing size adds surface area with no current need.  
**Alternatives considered**: Expose an `iconSize` prop — deferred to a future feature if needed.

---

## Decision 8: Layout

**Decision**: CSS Grid for the card body. Title on its own row; value + unit + suffix + icon on a second row, all inline-flex.  
**Rationale**: Matches the design reference screenshot. Allows clean alignment of the large value with smaller inline elements.  
**Alternatives considered**: Flexbox column — equivalent, but Grid makes it easier to add future rows (e.g., a sparkline) without restructuring.

---

## No unresolved unknowns

All NEEDS CLARIFICATION items from the spec were resolved above. Ready for Phase 1.
