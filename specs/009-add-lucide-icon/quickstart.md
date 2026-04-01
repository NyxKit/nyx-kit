# Quickstart: NyxIcon

## Installation

NyxIcon is included in `nyx-kit`. Ensure you have `lucide-vue-next` installed (it's a dependency of nyx-kit).

## Basic Usage

```vue
<template>
  <!-- Render an icon by name -->
  <NyxIcon name="arrow-right" />
</template>
```

## Icon Variants

```vue
<template>
  <!-- Line icons (default) -->
  <NyxIcon name="check-circle" variant="line" />
  
  <!-- Filled icons -->
  <NyxIcon name="check-circle" variant="filled" />
</template>
```

## Theme Colors

```vue
<template>
  <!-- Use theme color -->
  <NyxIcon name="warning" theme="warning" />
  
  <!-- Default text color (no theme) -->
  <NyxIcon name="info" />
</template>
```

## Sizes

```vue
<template>
  <NyxIcon name="home" size="xs" />
  <NyxIcon name="home" size="sm" />
  <NyxIcon name="home" size="md" />
  <NyxIcon name="home" size="lg" />
  <NyxIcon name="home" size="xl" />
</template>
```

## Available Icons

Lucide provides 1500+ icons. Use any icon name from the [Lucide icons gallery](https://lucide.dev/icons/) in kebab-case.

```vue
<template>
  <NyxIcon name="user-plus" />
  <NyxIcon name="settings" />
  <NyxIcon name="download" />
  <NyxIcon name="share-2" />
</template>
```

## Storybook Story

The NyxIcon component includes a Storybook story with a curated subset of icons showcasing different categories:

- **Navigation**: arrow-right, arrow-left, chevron-down, menu, x
- **Actions**: plus, minus, edit, trash, copy, download, upload
- **Status**: check-circle, x-circle, alert-circle, info
- **Communication**: mail, message-circle, phone, user

View the full story in Storybook for interactive icon previews. The story includes:

- Variant showcase (line vs filled)
- Theme color showcase
- Size showcase
- Interactive icon grid

**Link**: [Lucide Icons](https://lucide.dev/icons/) - Browse all available icons

## Using in Other Components

```vue
<template>
  <NyxButton>
    <NyxIcon name="plus" />
    Add Item
  </NyxButton>
</template>
```
