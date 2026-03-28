# Quickstart: NyxEditor Footer Info

**Branch**: `008-editor-footer-info` | **Date**: 2026-03-28

## Default footer

Render `NyxEditor` normally and the footer appears automatically.

```vue
<NyxEditor v-model="content" />
```

Expected behavior:
- the left side shows the current structural path for the caret location using heading titles, `list`, `item N`, and `paragraph N`
- the right side shows the current document word count

## Custom footer slot

Consumers can override the footer content while using the same editor-provided footer data.

```vue
<NyxEditor v-model="content">
  <template #footer="{ meta }">
    <div class="my-editor-footer">
      <span>{{ meta.pathText }}</span>
      <strong>{{ meta.wordCount }} words</strong>
    </div>
  </template>
</NyxEditor>
```

Expected behavior:
- the slot receives the same footer data used by the default footer
- footer content updates when the caret moves or document text changes

## Validation scenarios

1. Place the caret inside a paragraph beneath nested headings and verify the footer path updates
2. Place the caret inside a list item and verify the footer path includes list type and item index
3. Add or remove text and verify the word count updates
4. Render a custom footer slot and verify `meta.pathText` and `meta.wordCount` stay in sync with editor state
