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
- **Zen mode**: custom bubble menu — listens to `onSelectionUpdate`, reads `window.getSelection().getRangeAt(0).getBoundingClientRect()` to position a `<Teleport>`-ed `div` above the selection. `@mousedown` on the bubble sets a `suppressNextHide` flag (cleared with `requestAnimationFrame`) so that clicking a formatting button does not collapse the bubble before the command fires.
- **Toolbar mode**: renders a fixed `<div class="nyx-editor__toolbar">` above the editor content. _(See Known Limitations — not yet rendering in Storybook.)_
- v-model syncs bi-directionally via `onUpdate` (editor → model) and a `watch` (model → editor)
- `useNyxProps` is used for visual prop integration (theme, size, variant, pixel)

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `NyxEditorMode` | `NyxEditorMode.Zen` | UI mode: `zen` (bubble menu) or `toolbar` (top bar) |
| `format` | `NyxEditorFormat` | `NyxEditorFormat.Markdown` | Output format: `markdown` or `html` |
| `theme` | `NyxTheme` | `NyxTheme.Default` | Colour theme |
| `size` | `NyxSize` | `NyxSize.Medium` | Size scale |
| `variant` | `NyxVariant` | `NyxVariant.Outline` | Fill style |
| `pixel` | `boolean` | `false` | Pixel-art mode |
| `disabled` | `boolean` | `false` | Makes the editor read-only |
| `placeholder` | `string` | `''` | Placeholder shown when editor is empty |

## Emits

| Event | Payload | When |
|---|---|---|
| `change` | `string` | Fired on every editor content update, payload is the serialized content (MD or HTML) |
| `focus` | `FocusEvent` | Editor receives focus |
| `blur` | `FocusEvent` | Editor loses focus |

## v-model

| Binding | Type | Default | Description |
|---|---|---|---|
| `v-model` | `string` | `''` | Serialized content — Markdown or HTML depending on `format` |
| `v-model:source` | `boolean` | `false` | When `true`, shows a raw source `<textarea>` instead of the formatted editor |

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
- HTML output format is implemented but HTML → editor round-tripping depends on Tiptap's built-in HTML parser. Custom HTML produced outside Tiptap may not parse correctly.
- No image upload support.
- No collaborative editing support.
- Tiptap extensions beyond those bundled (`StarterKit`, `Underline`, `TaskList`, `TaskItem`, `tiptap-markdown`) are not exposed — consumers who need them must integrate Tiptap directly.
