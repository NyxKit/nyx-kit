# Data Model: NyxEditor Comment Annotations

**Branch**: `007-editor-comment-annotations` | **Date**: 2026-03-27

---

## Entities

### NyxEditorSelection

The simple selection payload emitted from the `selection` event.

- Contains the user-readable selected text
- Contains a `{ from, to }` range for the selected text
- Represents one continuous selection, even when the selection spans multiple content blocks
- Is emitted only for non-empty valid selections

**Validation rules:**

| Rule | Detail |
|------|--------|
| Selection must be non-empty | Empty selections do not produce a comment target |
| Range must be continuous | One user selection produces one annotation target |
| Range uses editor offsets | The editor emits `from` and `to` positions for the current selection |
| Structured content allowed | Lists, quotes, and code blocks may participate in the same continuous target |

---

### NyxAnnotationAnchor

The richer anchor object emitted through `annotation:create`.

- Contains the selected content
- Contains prefix and suffix context windows
- Contains start and end offsets
- Is used as the consumer-facing anchor shape for creating an external annotation record

---

### NyxAnnotation

The persisted annotation record supplied by the consuming project back into `NyxEditor` for highlight rendering.

- Contains a stable consumer-controlled identifier
- Contains a `NyxAnnotationAnchor`
- Contains consumer-supplied interaction, status, and attachment values
- May contain an optional `tone`
- Is used to correlate editor highlights with external comment threads

**Validation rules:**

| Rule | Detail |
|------|--------|
| Identifier must be stable | Used to correlate rendered highlights and active-comment state |
| Anchor is required | Used to derive rendered decoration ranges |
| State is consumer-supplied | `interaction`, `status`, and `attachment` are passed in rather than derived from hidden editor business logic |
| Consumer owns lifecycle | Storage, authorship, permissions, and thread content are outside editor scope |

---

### NyxAnnotationStatus

Enum-backed status describing the consumer-supplied resolution state of an annotation.

```text
unresolved
resolved
```

- `resolved` and `unresolved` are both valid rendering inputs

---

### NyxAnnotationAttachment

Enum-backed attachment state describing whether an annotation is attached or detached.

```text
attached
detached
```

---

### NyxAnnotationInteraction

Enum-backed interaction state describing the annotation's UI interaction mode.

```text
default
hover
focus
```

---

### Annotation focus/blur payload

String payload emitted when the editor focuses or blurs a rendered annotation.

- Contains only the stable annotation id

---

## Relationships

| From | Relationship | To |
|------|--------------|----|
| `NyxEditorSelection` | can become | `NyxAnnotationAnchor` |
| `NyxAnnotationAnchor` | is contained by | `NyxAnnotation` |
| `NyxAnnotation` | has one | `NyxAnnotationStatus` |
| `NyxAnnotation` | has one | `NyxAnnotationAttachment` |
| `NyxAnnotation` | has one | `NyxAnnotationInteraction` |
| `annotation:focus` / `annotation:blur` | references one | `NyxAnnotation` |

---

## State Transitions

### Comment creation flow

```text
User makes non-empty selection
-> NyxEditor emits NyxEditorSelection
-> NyxEditor emits NyxAnnotationAnchor
-> Consumer persists external annotation record
-> Consumer passes NyxAnnotation back into NyxEditor
```

### Annotation rendering flow

```text
Consumer passes NyxAnnotation[]
-> NyxEditor derives decorations from anchor offsets
-> Each decoration exposes id, interaction, status, and attachment metadata
-> Focused or blurred decoration emits the annotation id
```

---

## Edge Rules

| Case | Expected model behavior |
|------|-------------------------|
| Overlapping annotations | Each annotation keeps its own identifier and state metadata |
| Resolved and unresolved styling | Both can render; visual differences come from status hooks |
| Attached and detached styling | Both can render; visual differences come from attachment hooks |
| Content loads before annotations | Editor renders content first and applies annotations once available |
| Annotations load before content | Editor defers rendering until content is available |
