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
- Extensions loaded: `StarterKit` always; `Markdown` (from `tiptap-markdown`) when `format` is `markdown`
- **Zen mode**: uses `BubbleMenu` from `@tiptap/vue-3` — a floating toolbar that appears on text selection
- **Toolbar mode**: renders a fixed `<div class="nyx-editor__toolbar">` above the editor content
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

`defineModel<string>()` — binds to the serialized content string. Format depends on the `format` prop:
- `markdown`: a Markdown string (e.g. `# Hello\n\n**world**`)
- `html`: an HTML string (e.g. `<h1>Hello</h1><p><strong>world</strong></p>`)

## Keyboard behaviour

Inherited from Tiptap/ProseMirror defaults:
- `Mod+B` — Toggle bold
- `Mod+I` — Toggle italic
- `Mod+Z` / `Mod+Shift+Z` — Undo / Redo
- Standard browser text-editing shortcuts

No custom key bindings added at the NyxEditor level.

## Accessibility

- The editor root element is a `<div>` with `role="textbox"` and `aria-multiline="true"` applied by Tiptap
- Toolbar buttons include `aria-label` attributes
- `disabled` prop maps to Tiptap's `editable: false`, which prevents all input

## Mode names

| Mode | Value | Description |
|---|---|---|
| Zen | `zen` | Clean surface; a floating `BubbleMenu` appears on text selection with common formatting controls. No persistent UI chrome. |
| Toolbar | `toolbar` | A persistent toolbar above the editor surface, styled after word processors (Google Docs / Word). Contains buttons for all supported formatting operations. |

## Toolbar actions

Both the bubble menu (zen) and the toolbar (toolbar) expose the same formatting actions:

| Action | Icon label | Tiptap command |
|---|---|---|
| Bold | **B** | `toggleBold` |
| Italic | *I* | `toggleItalic` |
| Strike | ~~S~~ | `toggleStrike` |
| Inline code | `<>` | `toggleCode` |
| Heading 1 | `H1` | `toggleHeading({ level: 1 })` |
| Heading 2 | `H2` | `toggleHeading({ level: 2 })` |
| Heading 3 | `H3` | `toggleHeading({ level: 3 })` |
| Bullet list | `• List` | `toggleBulletList` |
| Ordered list | `1. List` | `toggleOrderedList` |
| Blockquote | `"` | `toggleBlockquote` |
| Code block | `{ }` | `toggleCodeBlock` |
| Undo | `←` | `undo` (toolbar only) |
| Redo | `→` | `redo` (toolbar only) |

The bubble menu omits Undo/Redo and list/blockquote/code-block actions to keep the floating UI compact.

## Known limitations

- HTML output format is implemented but HTML → editor round-tripping depends on Tiptap's built-in HTML parser. Custom HTML produced outside Tiptap may not parse correctly.
- No image upload support.
- No collaborative editing support.
- Tiptap extensions beyond `StarterKit` and `tiptap-markdown` are not exposed — consumers who need them must integrate Tiptap directly.
