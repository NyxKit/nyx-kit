# NyxMarkdown

> Read-only Markdown rendering with Nyx typography and Vue-rendered inline extensions.

**Status:** Implemented for 2.2.0; release validation and publishing remain separate. Consumer requirements supplied by Echo on 2026-10-01. This document is an implementation handoff; publishing and integration are separate tasks.

## Purpose and scope

Echo's Ask Echo feature displays streamed assistant responses beside a conversation. Its current answer renderer displays plain text and replaces validated source references with message-jump buttons. It needs Markdown formatting without losing those interactive citations.

Provide a reusable presentation component for assistant responses, documentation excerpts, and other untrusted Markdown strings. Consumers should not need to maintain their own Markdown parser, HTML sanitizer pipeline, or basic prose stylesheet.

NyxMarkdown owns parsing, semantic rendering, safe default URL handling, and typography. Echo owns message-reference validation, labels, navigation, response transport, conversation state, context selection, and transcript scrolling. NyxMarkdown must not know about Instagram, ChatGPT, source archives, message indexes, or authentication.

NyxEditor remains the editable rich-text surface. Do not instantiate a disabled editor or load Tiptap/ProseMirror to display Markdown.

## Required Markdown behavior

Use an established parser rather than regular-expression replacements for Markdown structure. `markdown-it` is the recommended starting point because its parser rules can support custom inline syntax; select and document the actual dependency/version during implementation. Declare any runtime parser as a direct dependency, even if currently available transitively through editor dependencies.

The first release must support:

- Paragraphs and CommonMark soft/hard line breaks. A normal single newline behaves as a soft break; two trailing spaces or a backslash before a newline produce a hard break.
- Strong emphasis, emphasis, nested inline formatting, and strikethrough.
- Ordered and unordered lists, nesting, continuation paragraphs, and ordered-list starting numbers.
- ATX/setext headings, block quotes, and thematic breaks.
- Inline code, fenced code blocks, and indented code blocks. Preserve whitespace in code; display language hints without interpreting them as executable markup.
- Links, reference-style links, escaped punctuation, and entity decoding as text.
- Pipe tables with semantic headers and alignment, as an explicitly enabled extension.
- Unicode, emoji, empty strings, incomplete Markdown, and arbitrary replacement of the entire content string.

Use semantic HTML for prose. Do not force native headings, paragraphs, lists, or every table cell through an interactive Nyx primitive. Reuse Nyx components where their behavior is applicable, including consumer-provided citation buttons.

## Implementation decisions

- Direct runtime dependency: `markdown-it` 14.1.1 (`^14.1.1`), with `@types/markdown-it` 14.1.2 for development. This uses the existing 14.x parser line rather than introducing a major upgrade to the editor’s transitive parser.
- CommonMark preset with table and strikethrough enabled; HTML, linkification, and typographer disabled.
- Private parsing and Vue-rendering helpers live alongside the component. Parsing runs in a computed value, so Vue batches synchronous updates and tracks reactive reads inside recognizers. There are no timers, persistence, or document caches.
- Structural token paths key Vue nodes; appending unrelated blocks preserves existing controls and overflow containers. Arbitrary edits before a block can replace its nodes.
- Code blocks and table wrappers are named, focusable scroll regions. Code language hints are escaped text.

## Internal architecture

1. Parse the complete Markdown document into a token tree. Do not split around citations first and render each fragment as a separate document; that breaks lists and formatting across references.
2. Render supported tokens as Vue nodes with an explicit element/attribute allowlist. Ordinary text is escaped by Vue.
3. Render consumer inline extensions through a scoped slot at their actual position in the document. Slot components retain Vue event handlers and lifecycle behavior.
4. Keep parser-specific tokens and rule internals private. Applications should not depend on a particular parser's token interfaces.
5. Isolate parser configuration per configuration/instance. Extensions on one instance must not affect another. Keep caches bounded and in memory; do not persist content or emit it to logs.
6. Use SCSS/BEM under `.nyx-markdown`, existing design tokens, and `useNyxProps` for supported visual props. Extract parsing and rendering helpers if needed to respect the repository's component-size convention.

Do not build generated HTML strings containing Vue directives, compile Markdown as Vue templates, or perform DOM replacement after rendering. No `v-html` path for untrusted content is required in the first release.

## Public API

The following contract is the implementation target. Follow the [component model](../../architecture/component-model.md).

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | `''` | Complete current Markdown source; read-only input that may grow during streaming or be replaced |
| `inlineRules` | `readonly NyxMarkdownInlineRule<T>[]` | Empty array | Trusted application-supplied inline recognizers; never rules supplied by Markdown itself |
| `headingOffset` | `number` | `0` | Shift rendered heading levels for the embedding page; clamp the resulting level to 1–6 |
| `theme` | `NyxTheme` | Omitted | Inherit Nyx theme resolution for meaningful accents such as links |
| `size` | `NyxSize` | Omitted | Resolve prose typography and spacing through Nyx sizing conventions |

Do not expose nonfunctional visual props. The component is a bare prose surface, without a card background, toolbar, fixed height, or built-in transcript scrolling. Forward ordinary root attributes such as `class`, `id`, `aria-label`, and `lang`.

### Generic inline extension contract

```ts
interface NyxMarkdownInlineMatch<T> {
  length: number
  value: T
}

interface NyxMarkdownInlineRule<T> {
  name: string
  match: (source: string, offset: number) => NyxMarkdownInlineMatch<T> | null
}
```

- `source` is the current inline parsing input; `offset` is a UTF-16 index into that string. It is not a stable document or message identifier.
- A match starts exactly at `offset`, consumes a positive integer `length` within the remaining input, and provides application-defined typed `value`. `raw` is the exact consumed substring, retained by the renderer.
- Rules run in array order; the first valid match wins. Invalid lengths must not cause loops or drop content. Ignore invalid results and render ordinary text.
- Rules apply to eligible inline prose, including prose nested in emphasis, lists, quotes, headings, and table cells.
- Do not apply rules inside inline/fenced/indented code, link destinations or labels, or image syntax. This prevents citation buttons nested inside links and preserves literal code examples.
- Honor Markdown escapes; an escaped marker remains text. An incomplete marker remains text until enough content arrives to form a valid match.
- Recognizers may be called repeatedly during parsing. They must be synchronous, deterministic, side-effect free, and bounded. They must never fetch resources or mutate consumer state.
- Applications validate references before returning a match. Unknown references can return `null` and remain literal text. A change to `inlineRules` or referenced reactive data must update the rendering even when `content` is unchanged.
- The component must not interpret returned values as tag names, arbitrary HTML, URLs, or event-handler source.

### Slots

| Slot | Scope | Purpose |
|---|---|---|
| `inline` | `{ name: string; value: T; raw: string }` | Render a recognized inline extension as real Vue content; if the slot is absent, display `raw` as escaped text |

A consumer-supplied slot owns its output and accessible behavior. Require phrasing content suitable for insertion into a paragraph. No full-document override, header/footer chrome, or editor controls are needed for the first release.

### Emits and v-model

No v-model and no update events: the component never edits `content`. Events from citation buttons belong to the consumer's slot. Streaming status, cancellation, copy actions, and response completion belong to the enclosing application.

## Echo integration contract

Echo's source references use the application-specific syntax `[[p1:m2]]`. This syntax is illustrative input to a consumer rule, not a built-in NyxMarkdown feature.

Echo will provide a rule that recognizes only references present in its active conversation's lookup. Its inline slot will render a `NyxButton` with a human-readable message label and accessible jump label. Activation emits Echo's existing message-jump event. Never derive a valid reference merely from assistant-written display text such as `Message 2`.

Illustrative usage, with consumer-owned rules and handlers:

```vue
<NyxMarkdown
  :content="answer"
  :inline-rules="citationRules"
  :heading-offset="2"
>
  <template #inline="{ value, raw }">
    <NyxButton
      v-if="value.kind === 'citation'"
      type="button"
      :aria-label="value.accessibleLabel"
      @click="jumpToMessage(value.reference)"
    >{{ value.label }}</NyxButton>
    <template v-else>{{ raw }}</template>
  </template>
</NyxMarkdown>
```

The final stories must demonstrate a complete typed matcher and lookup using entirely synthetic references. Consumers must not need to import parser internals or inject HTML to achieve this integration.

## Untrusted content and resource policy

- Raw HTML is disabled. HTML-looking content remains literal text and never creates DOM elements, styles, event handlers, scripts, SVG, iframes, or embedded objects.
- Do not enable arbitrary parser plugins from content. Application-provided recognizers and Vue slots are trusted code; document that consumers remain responsible for their own slot behavior.
- Validate destinations after Markdown entity/escape processing. For the initial API, permit absolute HTTP(S) links and document fragments; render unsupported destinations as noninteractive text. Block JavaScript, data, file, blob, protocol-relative, and other unsupported schemes, including disguised variants.
- External links use explicit user activation and appropriate new-tab protections (`noopener noreferrer`). Do not fetch previews or prefetch their destinations. Fragment identifiers are consumer-owned; automatic heading anchors are deferred.
- Markdown images do not create `img` elements or trigger requests. Display their alt text, with a plain fallback such as “Image omitted” if empty. Preserve ordinary surrounding formatting. Enabling media fetching can be considered separately; Echo requires it disabled.
- Rendering, mounting, updates, and parser errors must not transmit or persist content. Avoid content-bearing console logs and diagnostics.
- Rendering failures must fail locally to escaped text instead of unsafe HTML or a blank transcript. Do not throw a whole response view away for incomplete Markdown.

## Streaming behavior

The consumer passes the complete accumulated response as `content`; NyxMarkdown does not own a network connection or accept transport events.

- Update as chunks arrive, including text that completes previously unfinished formatting, a code fence, table, link, or citation.
- Final output must match rendering the same completed source in one update. Do not invent closers or mutate the stored source to make partial output look complete.
- Coalesce rapid updates when useful and always render the latest value. Full-document reparsing is acceptable initially; do not introduce a separate incremental parser without measured need.
- Keep already stable blocks and custom controls mounted where practical. Appending unrelated text must not routinely replace the entire root, steal keyboard focus, or reset a horizontally scrolled code block/table.
- Content replacement, clearing, switching responses, multiple instances, and unmounting with a pending update must work. Cancel scheduled work on unmount.
- Parent applications retain control of follow-output scrolling and loading/error indicators. No automatic scroll-to-bottom and no live region announcing the entire answer on every chunk.

## Styling and accessibility

- Preserve Nyx default colors and support both color modes. Use existing typography, spacing, divider, surface, and focus tokens; no parallel theme system or global prose reset.
- Scope all prose rules beneath `.nyx-markdown`. Restore visible bullets, ordered-list numbering, indentation, and spacing even when the application reset removes browser defaults.
- Give headings a readable hierarchy; distinguish paragraphs and list items without excessive vertical spacing. Emphasis must render visibly. Hard breaks remain within the same paragraph/list item.
- Render thematic breaks as subtle dividers and block quotes with the library's restrained surface/typography conventions.
- Style inline code separately from fenced blocks. Code blocks and wide tables scroll horizontally within the available width; they must not widen the containing shelf or create page-level horizontal scrolling.
- Long URLs and prose wrap. Preserve code whitespace. Work in flex/grid children with `min-width: 0` where appropriate.
- Use native headings, lists, block quotes, `pre`/`code`, links, and table semantics. The root is not an editor, textbox, or focus trap.
- Links and custom buttons support normal keyboard navigation and visible focus. Overflow regions must be usable with a keyboard without making every prose element a tab stop.
- Do not animate token arrival. Do not move focus on content updates. Consumers may provide completion announcements outside the renderer.
- Support more than one renderer on a page without duplicate generated IDs or cross-instance configuration changes.

## Synthetic acceptance example

The following invented content exercises the main consumer use case. It must render as bold text, a list with hard breaks and emphasis, interactive consumer citations, and a divider. Never replace it with a real chat export or an assistant response derived from one.

```markdown
**A short explanation**

- **“The rehearsal starts at noon.”**  
  The speaker is giving a start time.  
  *There is no location in this sentence.* [[p1:m2]]

- **“Please bring the blue notebook.”**  
  This is a request to bring an item. [[p1:m3]]

___

What would you like to clarify?
```

## Validation and release requirements

Provide Storybook examples for BasicProse, ListsAndBreaks, HeadingsAndQuotes, TablesAndCode, InlineExtensions, Streaming, UntrustedContent, and NarrowContainer. Include both color modes and multiple independent instances. Examples and fixtures must be wholly synthetic.

Required automated coverage:

1. Correct semantic output for the supported syntax, nesting, escapes, hard breaks, and ordered-list numbering.
2. Citations inside formatted prose and lists without breaking their structure; unknown/incomplete/escaped references and code examples remain literal.
3. Real slot event handlers fire once on activation; no nested interactive elements inside Markdown links; typed slots compile in a consumer example.
4. Raw HTML and executable/obfuscated destinations cannot become active markup or unsafe links. Markdown images and rendering updates cause no resource requests.
5. Streamed chunk sequences end with the same output as one-shot rendering, including chunks split inside Markdown markers and citations.
6. Replacing/clearing content, changing rules without changing text, multiple instances, and unmounting during scheduled updates work without stale output.
7. Keyboard navigation, focus retention in stable content, narrow layouts, table/code scrolling, and both color modes pass browser checks.
8. Exercise a synthetic long answer and repeated updates, record fixture size and timings, and check that typing/scrolling remain responsive. Document supported practical limits rather than claiming unlimited streaming performance.

Before publishing, register the component in the actual root and component entry points (`src/main.ts` and `src/components/index.ts`) and export its public types through the established type entry. Verify imports from both `nyx-kit` and `nyx-kit/components`, declaration generation, the existing stylesheet entry, and the installed package in a small Vue consumer. Update the README/component index and stories to describe the released API; this spec remains the authoritative behavior contract.

Run the repository's type check, unit tests, build, Storybook validation, and relevant browser tests. Inspect bundle impact and confirm the Markdown renderer does not introduce an editor dependency path. Select release numbering and publish only through the maintainer's normal workflow.

## Validation results (2026-10-01)

- All 16 component unit cases pass, including supported syntax, URL policy, typed slot events, reactive lookups, character-by-character streaming, and stable nodes on append.
- Full unit suite: 518 pass; the existing NyxStatusDot `size-xs` expectation fails against its unchanged `size-md` default (already recorded in AGENTS.md).
- Chromium and Firefox: all 24 repository browser checks pass, including six Markdown checks across both color modes. WebKit cannot launch on this machine because `libicu74`, `libxml2`, and `libflite1` are unavailable; validation there remains pending.
- Synthetic performance fixture: 200 sections, 19,290 UTF-16 characters, 200 citation buttons, 20 complete-document updates. In a local development build, render/patch mean/max were 8.6/31.5 ms in Chromium and 13.2/48 ms in Firefox. Typing remained responsive. These are local measurements, not performance guarantees; roughly 20 KB answers are the measured initial envelope. Larger answers, expensive recognizers, and low-powered devices need application-specific profiling and update batching.
- Built Storybook examples were opened in Chromium, including live citation activation and visual inspection of both modes. Library type checking and declaration generation pass. After chunk isolation, the built editor showcase still mounts and accepts keyboard input without page errors.
- An installed `2.2.0` tarball compiles in a separate Vue consumer using root and component imports plus public generic types. Both typed inline slots render and activate in the production build. Consumer output is 192.51 KB JavaScript / 80.62 KB gzip (including Vue and parser); the source map contains no editor chunk. The full shared stylesheet remains 138.01 KB / 21.10 KB gzip in this consumer.

## Known limitations and deferred scope

The first version does not require Markdown editing, HTML input, MDX, executable code, math/LaTeX, Mermaid, syntax highlighting, automatic heading anchors, remote images, link previews, copy toolbars, or AI-provider integration. Read-only task-list extensions and additional formatting plugins can be added later without blocking Echo's use case.

The existing `nyx-kit/components` barrel requires Vue Router to resolve in the tested Vite consumer even though the package labels that peer optional. Install the peer when using that entry; correcting the package-wide optional-peer contract is separate work.

No production conversations, account credentials, assistant responses based on private exports, or private screenshots belong in this spec, its stories, or its tests.

## References

- [Nyx component conventions](../../architecture/component-model.md)
- [Nyx design system](../../architecture/design-system.md)
- [NyxEditor](NyxEditor.spec.md), the separate editing component
- [markdown-it documentation](https://markdown-it.github.io/markdown-it/), recommended parser starting point
