# Data Model: NyxBreadcrumbs Routing and Visual Enhancements

**Branch**: `010-breadcrumbs-router-icons` | **Date**: 2026-04-02

## Entities

### Breadcrumb Item

One item in the breadcrumb trail after input normalization.

**Fields**:
- `label`: visible text for the breadcrumb item
- `href`: optional standard navigation target
- `route`: optional route-driven navigation target
- `icon`: optional icon identifier for item-level decoration

**Validation rules**:
- `label` is always required after normalization
- `href` remains optional for backward compatibility
- `route` is optional and may coexist with `href`
- when both `route` and `href` exist, `route` becomes the active navigation target
- `icon` is optional and must not be required for any item shape

### Route Target

Consumer-provided route metadata attached to a breadcrumb item.

**Fields**:
- `value`: either a direct route string or a structured route descriptor

**Validation rules**:
- must be pass-through safe for route-driven applications
- must not require non-router consumers to provide router-specific packages
- must only affect items that explicitly define it

### Separator Definition

The shared separator presentation reused between adjacent breadcrumb items.

**Fields**:
- `text`: optional plain-text separator value
- `icon`: optional icon identifier separator value
- `slotContent`: optional custom separator slot content

**Validation rules**:
- separator is rendered only between adjacent breadcrumb items
- slot content, when present, overrides prop-based separator rendering
- prop-based separator supports text and icon modes
- no separator is rendered after the final breadcrumb item

### Breadcrumb Trail

The complete normalized breadcrumb structure consumed by the component.

**Fields**:
- `items`: ordered breadcrumb items
- `separator`: shared separator definition

**Validation rules**:
- supports mixed label-only, URL-backed, and route-backed items in the same ordered trail
- preserves input order after normalization
- remains renderable when the trail has zero or one item

## Relationships

| From | Relationship | To |
|------|--------------|----|
| `Breadcrumb Trail` | contains many | `Breadcrumb Item` |
| `Breadcrumb Trail` | contains one | `Separator Definition` |
| `Breadcrumb Item` | may contain one | `Route Target` |

## State Transitions

### Breadcrumb rendering flow

```text
Consumer input items
-> normalize string items into breadcrumb objects
-> determine item render mode (route, href, or static label)
-> determine separator render mode (slot, icon prop, or text prop)
-> render trail without a trailing separator
```

## Edge Rules

| Case | Expected model behavior |
|------|-------------------------|
| String breadcrumb item | Normalizes to a label-only breadcrumb item |
| Item with `icon` only | Renders as a readable static breadcrumb item with icon |
| Item with `href` only | Renders as a standard link breadcrumb item |
| Item with `route` only | Renders as a route-driven breadcrumb item |
| Item with both `route` and `href` | Uses `route` as the active navigation target |
| One-item trail | Renders the item with no separator |
| Separator slot and prop both provided | Uses slot content for every separator position |
