# NyxEditor

> A WYSIWYG rich-text editor built on Tiptap, supporting Markdown and HTML output in two distinct UI modes.

## Purpose and scope

NyxEditor provides an opinionated but flexible rich-text editing experience. It is designed for use cases where consumers need a first-class editing surface without managing Tiptap directly.

**Use when:**
- You need an embeddable editor that produces Markdown or HTML content
- You want a clean, distraction-free writing experience (`zen` mode)
- You want a full toolbar surface reminiscent of word processors (`toolbar` mode)

**Do not use when:**
- You need a plain `<textarea>` — use `NyxTextarea` instead
- You need custom Tiptap extensions not provided by NyxEditor

## Internal architecture

- Uses `useEditor` and `EditorContent` from `@tiptap/vue-3`
- Extensions loaded: `StarterKit`, `Underline`, `TaskList`, `TaskItem` always; `Markdown` (from `tiptap-markdown`) when `format` is `markdown`
- Annotation-specific logic is extracted into the internal `useEditorAnnotations` composition so anchor generation, decoration mapping, and annotation focus/blur events do not live directly in the component body.
- Formatting controls are centralized in an internal `NyxEditorToolbarContent` sub-component that renders the shared button groups for both toolbar mode and the zen bubble menu.
- **Toolbar mode** uses an internal `NyxEditorToolbar` wrapper component so `NyxEditor` does not own the toolbar shell markup directly.
- **Zen mode**: custom bubble menu — listens to `onSelectionUpdate`, reads `window.getSelection().getRangeAt(0).getBoundingClientRect()` to position a `<Teleport>`-ed `div` above the selection, and renders `NyxEditorToolbarContent` inside the teleported shell. It emits `selection` as a `NyxAnnotationAnchor` whenever a non-empty selection exists. The annotation action emits the same anchor shape through `annotation:create`. `@mousedown` on the bubble sets a `suppressNextHide` flag (cleared with `requestAnimationFrame`) so that clicking a formatting button does not collapse the bubble before the command fires.
- Annotation rendering is implemented as a Tiptap/ProseMirror decoration plugin that reads the two-way `annotations` model and decorates matching ranges with annotation classes and `data-nyx-annotation-*` attributes.
- **Toolbar mode**: renders an internal `NyxEditorToolbar` wrapper above the editor content; that wrapper hosts the shared `NyxEditorToolbarContent` controls. _(See Known Limitations — not yet rendering in Storybook.)_
- v-model syncs bi-directionally via `onUpdate` (editor → model) and a `watch` (model → editor)
- `useNyxProps` is used for visual prop integration (theme, size, variant, pixel)

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `NyxEditorMode` | `NyxEditorMode.Zen` | UI mode: `zen` (bubble menu) or `toolbar` (top bar) |
| `format` | `NyxEditorFormat` | `NyxEditorFormat.Markdown` | Output format: `markdown` or `html` |
| `theme` | `NyxTheme` | resolved via `NyxKitOptions.defaults` | Colour theme |
| `size` | `NyxSize` | resolved via `NyxKitOptions.defaults` | Size scale |
| `variant` | `NyxVariant` | resolved via `NyxKitOptions.defaults` | Fill style |
| `pixel` | `boolean` | `false` | Pixel-art mode |
| `disabled` | `boolean` | `false` | Makes the editor read-only |
| `placeholder` | `string` | `''` | Placeholder shown when editor is empty |
| `annotationStatusTheme` | `NyxAnnotationStatusTheme` | partial map with built-in defaults | Maps annotation status values to the theme tokens used for highlight styling; missing keys fall back to `NyxTheme.Primary` |

## Emits

| Event | Payload | When |
|---|---|---|
| `change` | `string` | Fired on every editor content update, payload is the serialized content (MD or HTML) |
| `focus` | `FocusEvent` | Editor receives focus |
| `blur` | `FocusEvent` | Editor loses focus |
| `selection` | `{ text: string, context: { prefix: string, suffix: string }, range: { from: number, to: number } }` | Fired when the current editor selection changes to a non-empty range |
| `annotation:create` | `{ text: string, context: { prefix: string, suffix: string }, range: { from: number, to: number } }` | Fired when the annotation action successfully derives an annotation anchor from the current selection |
| `annotation:focus` | `string` | Fired when a rendered annotation decoration is clicked or focused through the supported keyboard interaction; payload is the annotation id |
| `annotation:blur` | `string` | Fired when a rendered annotation decoration loses focus after having been focused; payload is the annotation id |

## v-model

| Binding | Type | Default | Description |
|---|---|---|---|
| `v-model` | `string` | `''` | Serialized content — Markdown or HTML depending on `format` |
| `v-model:source` | `boolean` | `false` | When `true`, shows a raw source `<textarea>` instead of the formatted editor |
| `v-model:annotations` | `NyxAnnotation[]` | `[]` | Two-way annotation model; `NyxEditor` may remap annotation positions and emit updated annotations as the document changes |

The source toggle button (top-right corner of the editor) also drives `v-model:source`.

## Keyboard behaviour

Inherited from Tiptap/ProseMirror defaults:
- `Mod+B` — Toggle bold
- `Mod+I` — Toggle italic
- `Mod+U` — Toggle underline
- `Mod+Z` / `Mod+Shift+Z` — Undo / Redo
- Standard browser text-editing shortcuts

No custom key bindings added at the NyxEditor level.

## Accessibility

- The editor root element is a `<div>` with `role="textbox"` and `aria-multiline="true"` applied by Tiptap
- All bubble and toolbar buttons include `aria-label` attributes
- `disabled` prop maps to Tiptap's `editable: false`, which prevents all input
- Rendered annotations expose annotation identity through `data-nyx-annotation-*` attributes; annotation focus/blur events are driven by editor click/blur handling rather than making inline decorated text itself tabbable.

## Annotation model

Shared editor types currently define the annotation contract:

- `NyxAnnotationInteraction`: `default | hover | focus`
- `NyxAnnotationStatus`: built-in values `Unresolved`, `Draft`, `InReview`, `Approved`, `Resolved`, `Archived`, while still allowing consumer-defined string derivatives
- `NyxAnnotationAttachment`: `attached | detached`
- `NyxAnnotationStatusTheme`: partial status-to-theme map; missing keys fall back to `NyxTheme.Primary`
- `NyxAnnotationAnchor`: `{ text, context: { prefix, suffix }, range: { from, to } }`
- `NyxAnnotation`: `{ id, anchor, interaction, status, attachment, tone? }`

`NyxEditor` currently renders all supplied annotations and exposes their metadata through BEM/state classes plus `data-nyx-annotation-id`, `data-nyx-annotation-interaction`, `data-nyx-annotation-status`, and `data-nyx-annotation-attachment` attributes.

Ownership split:

- Consumer-owned: `id`, `tone`, and external comment/thread metadata stored outside the editor
- Editor-managed: live `anchor.range` and `anchor.context` values when document edits remap annotation positions
- Preserved as original selection text: `anchor.text` unless the contract is intentionally revised later

## Mode names

| Mode | Value | Description |
|---|---|---|
| Zen | `zen` | Clean surface; a custom floating bubble menu appears on text selection with common formatting controls. No persistent UI chrome. |
| Toolbar | `toolbar` | A persistent toolbar above the editor surface, styled after word processors (Google Docs / Word). Contains buttons for all supported formatting operations. |

## Bubble menu actions (zen mode)

Order: **B** **I** **U** ~~S~~ `<>` | UL OL ☐ | H1 H2 H3 P

| Action | Label | Tiptap command |
|---|---|---|
| Bold | `B` | `toggleBold` |
| Italic | `I` | `toggleItalic` |
| Underline | `U` | `toggleUnderline` |
| Strikethrough | `S` | `toggleStrike` |
| Inline code | `<>` | `toggleCode` |
| Bullet list | `UL` | `toggleBulletList` |
| Ordered list | `OL` | `toggleOrderedList` |
| Task list | `☐` | `toggleTaskList` |
| Heading 1 | `H1` | `toggleHeading({ level: 1 })` |
| Heading 2 | `H2` | `toggleHeading({ level: 2 })` |
| Heading 3 | `H3` | `toggleHeading({ level: 3 })` |
| Paragraph | `P` | `setParagraph` |

## Toolbar actions (toolbar mode)

Same set as the bubble menu, plus Undo / Redo at the trailing edge.

> **TODO**: Toolbar mode is not currently rendering in Storybook. The `v-if="props.mode === 'toolbar'"` condition and the toolbar markup are implemented but require investigation. Deferred — not needed short-term.

## Known limitations

- **Toolbar mode not rendering** — see TODO above.
- **Caret jump while editing inside annotations** — current annotation decorations can disrupt inline text insertion. Reproduction example: content is `lorem ipsum dolor sit amet`, an annotation covers `lorem ipsum`, the caret is placed between `lorem ` and `ipsum`, and the user types `test`. The current broken result is `lorem tipsum dolor sit ametest` because the caret jumps toward the line end after the first key. Expected behavior is stable inline insertion at the caret position without moving text outside the intended edit location.
- Annotation hover emits are not part of the current public API.
- HTML output format is implemented but HTML → editor round-tripping depends on Tiptap's built-in HTML parser. Custom HTML produced outside Tiptap may not parse correctly.
- No image upload support.
- No collaborative editing support.
- Tiptap extensions beyond those bundled (`StarterKit`, `Underline`, `TaskList`, `TaskItem`, `tiptap-markdown`) are not exposed — consumers who need them must integrate Tiptap directly.
