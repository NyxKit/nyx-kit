# Research: NyxBreadcrumbs Routing and Visual Enhancements

**Branch**: `010-breadcrumbs-router-icons` | **Date**: 2026-04-02

## Decision 1: Own the route-target contract inside Nyx Kit

**Decision**: Add an optional `route` field to the public breadcrumb item contract, but model it as a Nyx Kit-owned route target type rather than importing `vue-router` types directly into the library's public surface.

**Rationale**: The library is published for general Vue consumers and currently does not include `vue-router` as a runtime dependency. A library-owned structural type preserves router support without forcing router packages or router type imports on every consumer.

**Alternatives considered**:
- Use `vue-router`'s route target type directly: rejected because it leaks router types into the published API and creates unnecessary package coupling.
- Add `vue-router` as a peer dependency: rejected because it makes a simple breadcrumb enhancement heavier than necessary for non-router consumers.
- Accept `unknown` or `any` for `route`: rejected because it weakens consumer guidance and testability.

## Decision 2: Route target wins over href

**Decision**: When both `route` and `href` are present on the same breadcrumb item, treat `route` as the active navigation target.

**Rationale**: The feature request explicitly asks for rendering route-driven navigation when a route is specified. Making `route` higher precedence yields deterministic behavior and keeps the API additive instead of mutually exclusive.

**Alternatives considered**:
- Throw or warn when both values are provided: rejected because it adds friction to an otherwise straightforward precedence rule.
- Prefer `href`: rejected because it conflicts with the requested router-first behavior.

## Decision 3: Keep separator customization minimal and layered

**Decision**: Keep one shared `separator` slot and expand the `separator` prop from text-only to a minimal union that supports either plain text or an icon-by-name object.

**Rationale**: This preserves the current API for existing consumers, adds the requested icon case without inventing parallel props, and keeps the slot as the escape hatch for custom markup. The behavior remains easy to describe and test.

**Alternatives considered**:
- Add a second prop such as `separatorIcon`: rejected because it creates overlapping APIs and new precedence rules.
- Support arbitrary component values in the prop: rejected because it complicates the public contract more than this feature needs.
- Slot-only customization: rejected because the request explicitly asks for icon-name support through the prop as well.

## Decision 4: Verification stays at docs, unit, and story level

**Decision**: Verify this feature through docs-first updates, targeted Vitest coverage, and explicit Storybook examples. Only add Playwright coverage if implementation ends up depending on browser-level router behavior rather than simple render branching.

**Rationale**: The change adds non-trivial rendering and event logic, which belongs in unit tests, while Storybook remains the visual API contract. Breadcrumb rendering does not otherwise justify E2E coverage by default.

**Alternatives considered**:
- Add Playwright by default: rejected because it would over-scope a largely render-level feature.
- Rely on Storybook only: rejected because route precedence and emission behavior need automated assertions.
