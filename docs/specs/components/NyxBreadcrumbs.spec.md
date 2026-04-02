# NyxBreadcrumbs

> Navigation breadcrumb trail with optional per-item icons, URL links, Vue Router links, shared separator customization, and full item-slot replacement.

## Purpose and scope

`NyxBreadcrumbs` displays an ordered path of locations or hierarchy steps.

Use it when consumers need:
- simple label-only breadcrumb items
- URL-backed breadcrumb links
- Vue Router breadcrumb links in router-enabled applications
- optional icon decoration on selected breadcrumb items
- one shared separator presentation across the full trail

Do not use it for:
- nested navigation menus
- stepper or wizard state that requires progression logic
- per-separator custom behavior

## Internal architecture

- Accepts `items` as either plain strings or structured breadcrumb objects.
- Normalizes string items into label-only breadcrumb objects before rendering.
- Renders each breadcrumb item through an internal `NyxBreadcrumbItem` subcomponent inside the `NyxBreadcrumbs` folder.
- Resolves each breadcrumb item into one of three wrappers around `NyxBreadcrumbItem`:
  - `<RouterLink>` when `item.route` is present
  - `<a>` when `item.href` is present and `item.route` is absent
  - `<span>` when neither navigation target is present
- Reuses one shared separator definition between adjacent breadcrumb items.
- Uses `useNyxProps` for theme, size, and variant class resolution.
- Uses `NyxIcon` for both item icons and icon-based separators.
- Exposes an `item` scoped slot so consumers can fully replace breadcrumb item content while still receiving the normalized item payload.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `string[] \| NyxBreadcrumb[]` | — | Ordered breadcrumb trail. |
| `separator` | `string \| { icon: string }` | `'/'` | Shared separator rendered between adjacent breadcrumb items unless the `separator` slot is provided. |
| `theme` | `NyxTheme` | resolved by `useNyxProps` | Visual theme. |
| `size` | `NyxSize` | resolved by `useNyxProps` | Visual size scale. |
| `variant` | `NyxVariant.Filled \| NyxVariant.Text` | resolved by `useNyxProps` | Breadcrumb container variant. |

## Item contract

Each structured `NyxBreadcrumb` item supports:

| Field | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | Yes | Visible breadcrumb text. |
| `href` | `string` | No | Standard URL target. |
| `route` | `RouteLocationRaw` | No | Vue Router navigation target. |
| `icon` | `string` | No | Optional icon name rendered before the label. |

Precedence rules:
- `route` takes precedence over `href` when both are present.
- Items with neither `route` nor `href` render as readable static breadcrumb items.
- String items normalize into label-only static breadcrumb items.

## Emits

| Event | Payload | When |
|---|---|---|
| `click` | `NyxBreadcrumb` | A breadcrumb item is activated. |

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `separator` | — | Overrides the separator prop with one shared custom separator reused between all adjacent breadcrumb items. |
| `item` | `{ item: NyxBreadcrumb }` | Replaces the rendered breadcrumb item content for each normalized item. |

Separator precedence:
- `separator` slot wins over the `separator` prop.
- Icon separators render through `NyxIcon` using the supplied icon name.

## Accessibility

- Root element uses `<nav>` for breadcrumb semantics.
- Linkable items render as semantic links.
- Static items render as non-link text instead of broken anchors.
- The current or trailing item must not render a trailing separator.
- Decorative icons and separators should be hidden from assistive technology.

## Known limitations

- Separator customization is global to the trail, not configurable per item.
- Vue Router integration depends on `vue-router` being available to the consuming application.
