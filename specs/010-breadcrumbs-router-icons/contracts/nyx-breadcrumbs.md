# Contract: NyxBreadcrumbs Public Consumer Surface

**Branch**: `010-breadcrumbs-router-icons` | **Date**: 2026-04-02

## Purpose

Define the public consumer-facing contract for the `NyxBreadcrumbs` component after adding per-item icons, route-aware items, and shared separator customization.

## Component Inputs

### Items

`items` accepts an ordered list containing either:
- plain text breadcrumb entries
- structured breadcrumb items with label and optional metadata

Structured breadcrumb items support:
- `label` as the required visible breadcrumb text
- `href` as an optional URL target
- `route` as an optional route-driven target
- `icon` as an optional item icon identifier

## Navigation Contract

1. Plain text items remain valid and render as label-only breadcrumb items.
2. Items with `href` render as standard links.
3. Items with `route` render as route-driven links.
4. If both `route` and `href` are supplied, `route` takes precedence.
5. Items with neither `href` nor `route` remain readable and non-broken.

## Separator Contract

The component exposes one reusable `separator` customization point.

Supported forms:
- default separator behavior
- `separator` prop as plain text
- `separator` prop as icon-by-name
- `separator` slot for custom content

Precedence:
1. `separator` slot
2. `separator` prop
3. built-in default

The same separator presentation is reused between every adjacent breadcrumb pair, and no separator appears after the final item.

## Events

`click` continues to emit the structured breadcrumb item associated with the activated breadcrumb entry.

## Compatibility Notes

- Existing string-only and `href`-based breadcrumb data remains supported.
- The new item icon and route target fields are additive.
- Consumers who do not use route-driven navigation are not required to adopt any router dependency.
