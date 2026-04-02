# Quickstart: NyxBreadcrumbs Routing and Visual Enhancements

**Branch**: `010-breadcrumbs-router-icons` | **Date**: 2026-04-02

## URL-backed breadcrumbs

Use the component with simple text items or structured items that provide destination URLs.

```vue
<NyxBreadcrumbs
  :items="[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Breadcrumbs' }
  ]"
/>
```

Expected behavior:
- URL-backed items render as links
- label-only items remain readable
- the final item has no trailing separator

## Route-aware breadcrumbs with per-item icons

Use structured breadcrumb items to mix Vue Router navigation and URL-driven navigation, and attach icons only where needed.

```vue
<NyxBreadcrumbs
  :items="[
    { label: 'Home', icon: 'house', route: '/' },
    { label: 'Library', icon: 'books', route: { name: 'library' } },
    { label: 'Current page' }
  ]"
/>
```

Expected behavior:
- only items with `icon` display an icon
- route-backed items use Vue Router navigation
- if an item provides both `route` and `href`, the route target wins
- label-only items remain non-broken

## Custom breadcrumb item slot

Use the `item` slot when the full breadcrumb item content needs custom rendering.

```vue
<NyxBreadcrumbs :items="items">
  <template #item="{ item }">
    <span class="my-item">
      <NyxIcon v-if="item.icon" :name="item.icon" />
      {{ item.label.toUpperCase() }}
    </span>
  </template>
</NyxBreadcrumbs>
```

Expected behavior:
- the slot receives the normalized breadcrumb item
- the item wrapper still follows `route` then `href` then static rendering rules
- consumers control the inner item markup

## Custom separator from prop

Use one separator prop value for the full breadcrumb trail.

```vue
<NyxBreadcrumbs
  :items="items"
  :separator="{ icon: 'chevron-right' }"
/>
```

Expected behavior:
- the same icon separator appears between every adjacent breadcrumb pair
- no separator appears after the final breadcrumb item

## Custom separator slot

Use one shared slot when the separator needs custom markup.

```vue
<NyxBreadcrumbs :items="items">
  <template #separator>
    <span class="my-separator">/</span>
  </template>
</NyxBreadcrumbs>
```

Expected behavior:
- the same slot content is reused for every separator position
- the slot overrides any separator prop value
- the final breadcrumb item still renders without a trailing separator

## Validation scenarios

1. Render a mixed trail with string items, URL-backed items, and route-backed items and verify each item uses the expected navigation mode.
2. Render a trail where only some items define `icon` and verify icons appear only for those items.
3. Render the trail with a text separator prop, then with an icon separator prop, then with a separator slot and verify precedence and trailing-separator behavior.
4. Trigger breadcrumb clicks and verify the component continues to emit the associated structured breadcrumb item.
