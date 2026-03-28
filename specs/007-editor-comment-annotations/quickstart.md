# Quickstart: NyxEditor Comment Annotations

**Branch**: `007-editor-comment-annotations` | **Date**: 2026-03-27

---

## Create a comment from a selection

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NyxEditor } from 'nyx-kit/components'
import {
  NyxAnnotationAttachment,
  NyxAnnotationInteraction,
  NyxAnnotationStatus,
  NyxTheme,
  type NyxAnnotation,
  type NyxAnnotationAnchor,
} from 'nyx-kit/types'

const content = ref('# Review notes\n\nSelect text to create a comment.')
const annotations = ref<NyxAnnotation[]>([])

function addComment(anchor: NyxAnnotationAnchor) {
  const id = `comment-${Date.now()}`

  annotations.value.push({
    id,
    anchor,
    interaction: NyxAnnotationInteraction.Default,
    status: NyxAnnotationStatus.Draft,
    attachment: NyxAnnotationAttachment.Attached,
  })
}
</script>

<template>
  <NyxEditor
    v-model="content"
    v-model:annotations="annotations"
    :annotation-status-theme="{ unresolved: NyxTheme.Warning, resolved: NyxTheme.Success }"
    @annotation:create="addComment"
  />
</template>
```

---

## Render annotations with explicit states

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NyxEditor } from 'nyx-kit/components'
import {
  NyxAnnotationAttachment,
  NyxAnnotationInteraction,
  NyxAnnotationStatus,
  type NyxAnnotation,
} from 'nyx-kit/types'

const content = ref('Paragraph one.\n\nParagraph two.')

const annotations = ref<NyxAnnotation[]>([
  {
    id: 'comment-1',
    anchor: {
      text: 'Paragraph one',
      context: {
        prefix: '',
        suffix: 'Paragraph two.',
      },
      range: {
        from: 1,
        to: 13,
      },
    },
    interaction: NyxAnnotationInteraction.Default,
    status: NyxAnnotationStatus.Resolved,
    attachment: NyxAnnotationAttachment.Attached,
  },
  {
    id: 'comment-2',
    anchor: {
      text: 'Paragraph two',
      context: {
        prefix: 'Paragraph one.',
        suffix: '',
      },
      range: {
        from: 16,
        to: 28,
      },
    },
    interaction: NyxAnnotationInteraction.Focus,
    status: NyxAnnotationStatus.InReview,
    attachment: NyxAnnotationAttachment.Attached,
  },
])
</script>

<template>
  <NyxEditor
    v-model="content"
    v-model:annotations="annotations"
  />
</template>
```

---

## Listen for annotation focus

```vue
<NyxEditor
  v-model="content"
  v-model:annotations="annotations"
  @annotation:focus="(id) => console.log('Focused annotation:', id)"
  @annotation:blur="(id) => console.log('Blurred annotation:', id)"
/>
```

- `annotation:focus` and `annotation:blur` emit only the annotation id.
- The consuming project decides what thread, panel, or detail view to open.

---

## Styling contract

- Annotation styling is driven by the editor's classes and `data-nyx-annotation-*` attributes.
- Consumers do not replace annotation DOM rendering or selection mapping logic.
- `resolved` and `unresolved` can both render; visual differences come from the status styling surface.
- `attached` and `detached` can both render; visual differences come from the attachment styling surface.

---

## Initial limitations

- `annotationStatusTheme` is partial; any missing or custom status falls back to `NyxTheme.Primary`.
- Consumers can extend the built-in status set by creating their own const object and union on top of `NyxAnnotationStatus` values.
- Comment-thread storage and author metadata remain fully consumer-owned.
- Annotation hover events are not part of the current public emit surface.
