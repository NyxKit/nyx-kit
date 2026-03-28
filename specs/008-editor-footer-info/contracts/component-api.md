# Component API Contract: NyxEditor Footer Info

**Branch**: `008-editor-footer-info` | **Date**: 2026-03-28

This document captures the public NyxEditor contract additions for footer information.

## NyxEditor Footer Behavior

### Default footer

| Area | Contract |
|------|----------|
| Left side | Shows the current structural path from heading context to the active block |
| Right side | Shows the current document word count |
| Visibility | Footer renders by default |

### Footer slot

| Slot | Scope | Purpose |
|------|-------|---------|
| `footer` | `{ meta: NyxEditorMeta }` | Allows consumers to customize footer presentation using editor-provided meta data |

### Footer payload

| Field | Type | Purpose |
|-------|------|---------|
| `segments` | `NyxEditorMetaPathSegment[]` | Structured caret path data for custom rendering |
| `pathText` | `string` | Display-ready structural path string using concise labels |
| `wordCount` | `number` | Current editable document word count |
| `selection` | `NyxEditorMetaSelection` | Current caret/selection metadata relevant to footer updates |

### Scope boundaries

| In scope | Out of scope |
|----------|--------------|
| Default footer path display | Consumer-side recomputation of editor structure |
| Default footer word count | External analytics or document-metadata systems |
| Scoped footer slot payload | Arbitrary editor-layout customization outside the footer region |
