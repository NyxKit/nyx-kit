# Component API Contract: NyxEditor Comment Annotations

**Branch**: `007-editor-comment-annotations` | **Date**: 2026-03-27

This document defines the public-facing annotation API currently reflected in `NyxEditor` and `src/types/editor.ts`.

---

## NyxEditor

### Existing bindings retained

| Binding | Type | Notes |
|---------|------|-------|
| `v-model` | `string` | Serialized editor content remains unchanged |
| `v-model:source` | `boolean` | Source-mode toggle remains unchanged |

### Additive props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `annotations` | `NyxAnnotation[]` | no | Consumer-supplied annotations rendered as editor decorations |
| `annotationStatusTheme` | `NyxAnnotationStatusTheme` | no | Maps `resolved` and `unresolved` statuses to Nyx theme tokens for annotation styling |

### Emits

| Event | Payload | When |
|-------|---------|------|
| `selection` | `NyxEditorSelection` | Fired when the current editor selection changes to a non-empty valid range |
| `annotation:create` | `NyxAnnotationAnchor` | Fired when the annotation action successfully creates an annotation anchor with `content`, context, and offsets from the current selection |
| `annotation:focus` | `string` | Fired when a rendered annotation is focused via click or supported keyboard interaction; payload is the annotation id |
| `annotation:blur` | `string` | Fired when a rendered annotation loses focus; payload is the annotation id |

### Annotation enums

| Enum | Values | Notes |
|------|--------|-------|
| `NyxAnnotationInteraction` | `default`, `hover`, `focus` | Consumer-supplied interaction state exposed on rendered annotations |
| `NyxAnnotationStatus` | `resolved`, `unresolved` | Consumer-supplied status state exposed on rendered annotations |
| `NyxAnnotationAttachment` | `attached`, `detached` | Consumer-supplied attachment state exposed on rendered annotations |

### Annotation rendering behavior

| Behavior | Contract |
|----------|----------|
| Rendering source | All annotations come from the `annotations` prop |
| Decoration identity | Each rendered decoration includes the annotation id in DOM metadata |
| State exposure | Interaction, status, and attachment are exposed through classes and `data-nyx-annotation-*` attributes |
| Focus reporting | Focus and blur emit the annotation id only |

### Styling surface

| Surface | Contract |
|---------|----------|
| Highlight appearance | Driven by NyxEditor theme/token styling plus annotation classes and data attributes |
| State differentiation | Consumers can style by `interaction`, `status`, and `attachment` hooks |
| Theme helper type | `annotationStatusTheme` applies `NyxAnnotationStatusTheme` to rendered annotations |
| Consumer responsibility | Consumers must not replace editor annotation mapping logic to brand highlights |

### Scope boundaries

| In scope | Out of scope |
|----------|--------------|
| Emitting annotation anchors from live selections | Storing comment threads |
| Rendering consumer-supplied annotations | Author metadata |
| Emitting annotation focus ids | Moderation workflows |
| Exposing current enum-backed metadata | Hover/blur annotation emits |

---

## Shared editor types

The following types are public and exported from `src/types/editor.ts` and `src/types/index.ts`:

- `NyxEditorSelection`
- `NyxAnnotationInteraction`
- `NyxAnnotationStatus`
- `NyxAnnotationAttachment`
- `NyxAnnotationStatusTheme`
- `NyxAnnotationAnchor`
- `NyxAnnotation`

These current exports are the source contract for the next round of implementation and doc alignment.
