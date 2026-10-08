# NyxCommandPalette

> A searchable, keyboard-accessible list of grouped commands for application actions and navigation.

**Status:** Implemented for release `2.3.0` on `018-nyx-command-palette`.

Feature scenarios: [018-nyx-command-palette](../../../specs/018-nyx-command-palette/spec.md). This living document defines the API; implementation must keep it and the stories consistent.

## Purpose and scope

Use for finding and executing commands, jumping to application destinations, or choosing a search result. By default, the palette opens as its own horizontally centered overlay with a dedicated layout and styling. It must not wrap, import, or depend on NyxModal or its styles. An optional `inline` mode embeds the same search/results surface in page content. For a persistent form choice or multiple selection, use [NyxSelect](./NyxSelect.spec.md).

The reference is [Nuxt UI CommandPalette](https://ui.nuxt.com/docs/components/command-palette), consulted 2026-10-08. Adopt grouped results, fuzzy discovery, a separately controlled query, item decoration, customization slots, and consumer-supplied remote results. This is a Nyx API, not a compatibility wrapper.

First-version scope is single-command activation and a standalone overlay. The palette owns its overlay lifecycle, backdrop, dismissal, and focus handling; the application controls visibility through `v-model:open`. An optional `shortcut` prop registers an overlay toggle; routing, network requests, debounce, and action execution belong to the consuming application. Nested command pages, multiple selection, virtualization, recents persistence, typo correction, and Fuse.js configuration are deferred. No new package is required by this contract.

## Internal architecture

Location: `src/components/NyxCommandPalette/`, with `NyxCommandPalette.vue`, `NyxCommandPalette.types.ts`, `NyxCommandPalette.scss`, `NyxCommandPalette.stories.ts`, and `NyxCommandPalette.spec.ts`.

- Use `<script setup lang="ts" generic="T extends NyxCommandPaletteItem">`, a standalone props interface, and typed emits/slots. Preserve consumers' additional item fields in selection events and slot scopes without `any`.
- Private `commandPalette.ts` handles descriptor validation and ranking; `useCommandPaletteOverlay.ts` owns dialog, focus, backdrop gestures, and shared scroll-lock accounting, and cancellable surface motion. A private motion helper animates the surface from its current rendered state so rapid reversals do not jump.
- Keep the `.vue` file within 300 lines. Extract filtering/navigation into private helpers or a component-local composable as needed; no new public composable is required.
- Maintain separate states for the search term, last activated ID, and highlighted option. Highlighting alone never executes a command or writes the selection model.
- Render a native text input, a grouped listbox, status text, and optional footer. Own the input and option semantics; slots customize content rather than replace the interactive shell.
- In overlay mode, teleport a palette-owned native `<dialog>` to `body` after mounting and use `showModal()` / `close()` for browser top-layer behavior. Its backdrop, surface, sizing, and layout belong to this component. Inline mode renders the search/results surface in place without a dialog, teleport, backdrop, or focus trap. Local keyboard and dialog-cancel handlers affect only this instance. A private `useCommandPaletteShortcut` helper registers a client-only, opt-in toggle shortcut and arbitrates multiple instances. Inline palettes never register opening shortcuts.
- Reuse `NyxIcon` for icons. Reuse other primitives only if they preserve the required input attributes, element access, focus behavior, and listbox semantics.
- Generate stable instance-scoped DOM IDs using `useId()`. Map item/group IDs safely without raw selector interpolation or collisions between multiple instances. Do not access browser globals during setup or server rendering.
- Resolve theme and size through `useNyxProps`, without modifying the shared prop pipeline.

Follow [component conventions](../../architecture/component-model.md), [file conventions](../../conventions/README.md), and [testing guidance](../../testing/README.md). The actual root export file is `src/main.ts`, as already recorded in [AGENTS.md](../../../AGENTS.md).

## Public types

```ts
export enum NyxCommandPaletteViewportMode {
  Always = 'always',
  WhileSearching = 'while-searching',
  AfterInteraction = 'after-interaction',
}

interface NyxCommandPaletteItem {
  id: string
  label: string
  description?: string
  icon?: string
  keywords?: readonly string[]
  shortcuts?: readonly string[]
  disabled?: boolean
}

interface NyxCommandPaletteGroup<T extends NyxCommandPaletteItem = NyxCommandPaletteItem> {
  id: string
  label?: string
  items: readonly T[]
  ignoreFilter?: boolean
}

interface NyxCommandPaletteSelectEvent<T extends NyxCommandPaletteItem = NyxCommandPaletteItem> {
  item: T
  group: NyxCommandPaletteGroup<T>
  originalEvent: MouseEvent | KeyboardEvent
}

interface NyxCommandPaletteItemSlotProps<T extends NyxCommandPaletteItem = NyxCommandPaletteItem> {
  item: T
  group: NyxCommandPaletteGroup<T>
  index: number
  active: boolean
  selected: boolean
  disabled: boolean
  searchTerm: string
}
```

Group IDs must be unique and nonblank; item IDs must be unique across all accepted groups and nonblank. Item labels must contain meaningful text. Preserve valid IDs verbatim. Skip invalid descriptors; the first valid occurrence of an ID wins. Skip an entire duplicate/invalid group before validating its items. Report rejected descriptors in development. Never modify supplied groups, items, or nested arrays.

`icon` uses NyxIcon names such as `search` or `settings`, not Nuxt's `i-lucide-*` namespace. `shortcuts` contains presentation strings such as `['Ctrl', 'K']`, rendered as decorative `<kbd>` hints. They do not register shortcuts. Consumers choose platform labels explicitly, avoiding platform-dependent SSR output.

Export the component via direct `.vue` imports in `src/components/index.ts` and `src/main.ts`. Export all public props, event, item, group, and slot types through `src/types/index.ts` and the root entry. Imports must work from `nyx-kit` / `nyx-kit/components` and `nyx-kit` / `nyx-kit/types`, respectively. Do not introduce a router import into the palette; navigation is handled in `select` listeners.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `groups` | `readonly NyxCommandPaletteGroup<T>[]` | Required | Ordered command groups; immutable input |
| `inline` | `boolean` | `false` | Render in place without overlay behavior; ignores the open model |
| `shortcut` | `string` | Omitted | Opt-in overlay toggle chord, e.g. `SUPER+K` or `Ctrl+Enter`; blank disables registration |
| `viewportMode` | `NyxCommandPaletteViewportMode` | `AfterInteraction` | `Always`, `WhileSearching`, or `AfterInteraction`; controls result disclosure |
| `showResultsLabel` | `string` | `Show results` | Accessible label and tooltip for the footer reveal button |
| `placeholder` | `string` | `'Search commands...'` | Input hint, independent of its accessible name |
| `label` | `string` | `'Search commands'` | Accessible name for the input and results |
| `loading` | `boolean` | `false` | Search remains editable; announce loading and block result activation |
| `loadingText` | `string` | `'Loading commands...'` | Default loading announcement/content |
| `emptyText` | `string` | `'No commands found.'` | Default empty announcement/content |
| `disabled` | `boolean` | `false` | Disable the search input and all command activation |
| `autofocus` | `boolean` | `false` | Opt-in mount focus in inline mode; overlay opening always places focus inside |
| `loop` | `boolean` | `true` | Wrap arrow navigation at the first/last enabled result |
| `closeable` | `boolean` | `false` | Show a close button; hiding it does not disable Escape or backdrop dismissal |
| `closeLabel` | `string` | `'Close command palette'` | Accessible close-button label |
| `theme` | `NyxTheme` | Omitted | Resolve through `useNyxProps`; final fallback `Primary` |
| `size` | `NyxSize` | Omitted | Resolve through `useNyxProps`; final fallback `Medium` |

Expose theme and size only in the first version. Omitted props inherit shared defaults. Avoid inert variant, pixel, gradient, or shape props. Ordinary `class` and `style` apply to the palette surface in both modes; root attributes apply to the dialog in overlay mode and the container inline. `label` names the input, listbox, and overlay dialog independently of placeholder text.

## v-model

| Binding | Type | Empty value | Meaning |
|---|---|---|---|
| `v-model:open` | `boolean` | `false` | Visibility of the standalone overlay; ignored in inline mode |
| `v-model` | `string \| undefined` | `undefined` | Last activated item ID, independent of highlight |
| `v-model:search-term` | `string \| undefined` | Effective `''` | Current input text |

Use `const model = defineModel<string>()` and a named `searchTerm` model. Normalize an undefined search term to `''` for display without emitting on mount. Both bindings are optional and work with local state when omitted.

Use a named boolean `open` model with a false default. The default overlay starts closed; consumers open it by changing this model. User dismissal writes false and emits one `close` immediately; native dialog and focus/scroll cleanup follow the exit animation. Shortcut opening writes true without emitting `close`. Parent-driven visibility changes do not echo `update:open` or emit `close`. Inline mode is always visible and neither reads nor rewrites the open model. Closing preserves query and selection but resets viewport reveal history. Reopening with an empty query hides results in both interaction-driven modes; a retained nonblank query reveals its matches. `Always` continues to show results immediately. Consumers can reset query explicitly when opening.

Activation writes the selected ID before emitting `select`. Selecting the same ID again still emits `select` exactly once, enabling repeatable commands; it does not require a duplicate model update. Model changes from the parent never execute a command. Selection does not clear the query or close anything automatically.

Search edits emit the exact input string, including whitespace; normalization is internal to filtering. Programmatic search updates refilter without echoing an update event. No debounce is applied internally.

Unknown or removed selection IDs have no selected row and are not rewritten into the parent. Unbound selection discards a removed ID silently. Filtering a selected row out does not discard its selection. Disabled items may remain selected but cannot activate. External selection updates can highlight that item if it is visible and enabled, without moving DOM focus.

## Overlay placement

Anchor the overlay top at `15dvh`, centered horizontally, with its existing `min(70dvh, 40rem)` height limit. Results expand and contract downward without re-centering the dialog or moving the search input. Use a top-center transform origin for surface motion so changing result height does not shift the search during entry/exit. Inline layout remains in normal flow. The overlay is relative to its owning document: Storybook centers it within the preview iframe, while a consuming application receives the overlay in its own document body.

## Search and result state

Export the runtime enum `NyxCommandPaletteViewportMode` from the root and types entries:

- `Always = 'always'`: results are always shown.
- `WhileSearching = 'while-searching'`: nonblank queries reveal results; clearing hides them. Explicit reveal via Enter, ArrowDown, or the footer button shows results for the current empty query until the query next changes.
- `AfterInteraction = 'after-interaction'` (default): a nonblank query or explicit reveal shows results for the current open session, including after clearing. Closing the overlay (user dismissal or parent-driven closure) resets manual and persistent reveal history; reopening with an empty query starts hidden. Retained nonblank queries still show results. Inline instances retain reveal history until unmounted or their mode changes. Programmatic nonblank queries count. Merely focusing the input does not reveal results. Changing mode resets the reveal history and derives visibility from the current query.

The unreleased `showResultsOnEmpty` boolean is replaced by `viewportMode`. Hidden results remain mounted but inert, suppress announcements and active options, and report footer `resultCount` zero. A component-owned icon button sits after footer slot content at the right edge, using `NyxSize.XSmall` (12px) with no hover rotation or press scaling whenever results are hidden, including when no footer slot is supplied. With no footer slot, the footer disappears once results are shown. The reveal button uses `showResultsLabel`, `aria-controls`, and `aria-expanded`; disabled palettes disable the button. Revealing returns focus to search before the button disappears. Hide it whenever results are visible.

Empty-search Enter or ArrowDown reveals hidden results without selecting; ArrowDown leaves the first enabled result highlighted, with subsequent presses navigating normally; repeated keydown events and IME composition must not reveal or activate. Once visible, a separate Enter can activate normally. Loading does not prevent reveal.


1. Validate descriptors before filtering. Preserve caller group order and hide groups with no visible results.
2. Normalize query and searchable text using Unicode NFD, remove combining marks, and lowercase. Trim/split the query on whitespace. Search `label`, `description`, and individual `keywords`; exclude group labels and shortcut hints.
3. An empty query shows every valid item in caller order. Otherwise each query token must match at least one searchable field by ordered character subsequence. Tokens may match different fields; a single token must match within one field. This supports `opst` matching `Open settings`, but does not implement typo/edit-distance correction.
4. Rank within each group: normalized full-label equality first, full-label prefix second, every query token matching a contiguous substring of some field third, and other subsequence matches last. Break ties using original item order. Never reorder groups by score.
5. `ignoreFilter: true` bypasses matching and ranking for that group, retaining supplied order. Use it for server-ranked or consumer-filtered results, including groups mixed with local commands.
6. A changed effective query highlights the first enabled visible item. When result data changes, preserve the highlighted ID if still visible/enabled, otherwise use the first enabled item. Initial highlight prefers a visible enabled selected item, then the first enabled item. All-disabled or empty results have no active option.
7. Disabled results remain visible and count as results, but keyboard and pointer interaction skip them. Groups and headings are never selectable.
8. While loading, retain supplied results visually, mark the results busy, clear the active option, and prevent activation of potentially stale results. Keep query editing and closing available. Loading content takes precedence over the empty state. When loading finishes, select the first enabled result for highlight without executing it.

Remote requests, cancellation, debounce, and rejection of stale responses belong to the parent. A remote-search story must demonstrate that a slow old response cannot overwrite the latest query's results. Error content can be supplied through `empty` after the parent clears results and loading; the palette has no fetch/error lifecycle of its own.

## Emits

| Event | Payload | When |
|---|---|---|
| `update:modelValue` | `string` | Activation changes the last selected ID |
| `update:searchTerm` | `string` | User edits the search input |
| `update:open` | `boolean` | Shortcut opens/toggles the overlay or the user dismisses it |
| `select` | `NyxCommandPaletteSelectEvent<T>` | A visible enabled command is activated by click or Enter |
| `close` | None | One user dismissal via shortcut, close button, Escape, or backdrop; inline Escape/button emits a request only |

Ignored/disabled/loading interactions emit no selection events. Each successful activation emits one `select`, with the original accepted item and group. Pointer and keyboard activation share the same path. Consumer handlers own side effects and errors; no item callback or navigation field duplicates this event contract.

## Slots

| Slot | Scope | Purpose / fallback |
|---|---|---|
| `item` | `NyxCommandPaletteItemSlotProps<T>` | Entire option content; overrides all item content slots |
| `item-leading` | Same item scope | Leading decoration; defaults to the optional icon |
| `item-label` | Same item scope | Label and optional description |
| `item-trailing` | Same item scope | Trailing content; defaults to shortcut hints |
| `group-label` | `{ group, searchTerm }` | Group heading; defaults to `group.label` |
| `empty` | `{ searchTerm }` | No results while not loading; defaults to `emptyText` |
| `loading` | `{ searchTerm }` | Busy content; defaults to an indicator and `loadingText` |
| `footer` | `{ searchTerm, resultCount }` | Optional help/actions preceding the component-owned reveal button when hidden |

`index` is the zero-based index within the rendered group; `resultCount` counts all visible valid results, including disabled ones. `active` is highlight and `selected` is committed model state. Slot `disabled` includes item, component, loading, hidden-results, and exiting-overlay state.

Render optional wrappers only when there is content. A supplied slot takes precedence even if it renders nothing. The component retains each option's ID, roles, selected/disabled state, and label-derived accessible name. Item slots must not contain interactive descendants. Group-label slots must provide meaningful noninteractive text; omit unnamed group headings and their `aria-labelledby` reference. A footer may contain controls and participates in normal Tab order. Result counts and reset-search actions are consumer-owned footer slot content, never built-in defaults. Standard Storybook examples show only keyboard hints in their footer slot, without a result count or reset button. Consumers can use the scoped `resultCount` and their `v-model:search-term` binding to add these explicitly.

## Keyboard behaviour

DOM focus remains on the input during result navigation, using `aria-activedescendant`. Pointer movement over an enabled option changes highlight; clicking activates without losing input focus unless the consumer moves it or dismisses the host.

| Key | Behaviour |
|---|---|
| ArrowDown in the input | If hidden, reveal and highlight the first enabled result without selecting or skipping it; ignore repeats during reveal. If visible, move to the next enabled result; wrap when `loop`, otherwise clamp |
| ArrowUp in the input | Previous enabled result across groups; wrap when `loop`, otherwise clamp; does not reveal a hidden viewport |
| Alt+Home / Alt+End in the input | First/last enabled result; unmodified Home/End keep native text editing |
| Enter in the input | Reveal hidden results without activation; otherwise activate the highlighted result. Prevent parent form submission; ignore repeats |
| Escape within the palette | Close the overlay or request dismissal inline; emit one `close`, prevent default, and stop propagation; leave query and selection unchanged |
| Tab / Shift+Tab | Keep focus within an open overlay; normal page focus order inline; never activate commands |
| Text editing keys, Space, Left/Right | Native input editing |

When no option is highlighted, ArrowDown starts at the first enabled result and ArrowUp at the last. Consume navigation keys only from the input, not footer controls. During IME composition, do not intercept Enter, Escape, or navigation keys. Multiple palette instances must never react to each other's input events.

Expose `focus(): void` to focus the input when enabled and visible; it does not open a closed palette. Focus is a client-only action. Inline `autofocus` does not steal focus on subsequent query/result updates.

## Accessibility

- Use an editable combobox with `aria-autocomplete="list"`, `aria-controls`, and `aria-expanded` reflecting visible, enabled results content. Keep the controlled listbox mounted, including during empty/loading states; omit `aria-activedescendant` when there is no active option.
- Use labelled groups, `role="option"` rows, `aria-selected` for committed selection, and `aria-disabled` for disabled options. Options are not separate Tab stops; use native button shells with `type="button"`, `role="option"`, and `tabindex="-1"`.
- Name both input and listbox from `label`; placeholder text is insufficient. Option accessible names come from the required item labels. Link default descriptions with `aria-describedby`.
- Use a polite status region for `loadingText` and `emptyText`; custom visual slots do not suppress these announcements. Keep status content outside the listbox's option/group structure. Avoid announcing every arrow move twice.
- The close button has `closeLabel` and remains usable while loading or disabled. Icons and shortcut hints are decorative, with no implied registered `aria-keyshortcuts`.
- Keep input focus, active result, selected result, and disabled state visually distinguishable in both colour modes. Search uses one focus-within underline on the search area rather than an input outline plus underline; close/footer controls retain visible keyboard focus. Scrolling the active row into view must not scroll the entire page unnecessarily.

## Standalone overlay lifecycle

The overlay is a first-class part of NyxCommandPalette. Use a palette-owned dialog with `aria-modal="true"` and its accessible name from `label`. Center the surface horizontally with the stable `15dvh` top anchor, keeping viewport gutters and a bounded scrollable results region. No NyxModal header, body/footer wrappers, confirm/cancel actions, size presets, or CSS are reused.

- On opening, remember the previously focused element, show the dialog, and focus search after rendering. If search is disabled, focus the close button when present, otherwise a programmatically focusable surface. This applies on every opening regardless of inline `autofocus`.
- While open, keep Tab/Shift+Tab inside, make background content noninteractive using native modal semantics, and prevent background scrolling. Preserve existing scroll-lock state and restore only what this instance owns on close/unmount.
- Escape, native dialog cancel, close-button click, and a click whose press and release both occur on the backdrop share one dismissal path. Do not dismiss for clicks inside the surface or a drag starting inside it. Handle Escape/cancel without duplicate events; only the topmost dialog dismisses. Composition keys must not dismiss the overlay.
- User dismissal writes `open = false` before emitting one `close`. Parent-driven closure still performs dialog, scroll, and focus cleanup without emitting a user dismissal. Restore focus after closing if the remembered element is still connected and focusable; avoid focusing removed elements or stealing focus from a newer overlay.
- While exiting, block activation and keep Tab within the still-modal surface until native closure; repeated dismissal does not emit again. Reopening cancels exit; unmount/mode changes cancel motion and clean up immediately. Reduced motion skips the delay.
- Hidden/closed content cannot receive focus or appear as active content to assistive technology. Teardown while open cleans up native dialog and scroll state. Switching to inline mode performs the same cleanup without rewriting the ignored open model; switching back uses its current value.
- Server rendering emits no active/open dialog or browser side effects. Activate teleport and an initially true open model only after mounting, with stable IDs and matching initial hydration markup. Verify initially open hydration as well as the closed default.

Selecting a command does not automatically dismiss the palette. The parent can set `open = false` in its `select` handler, as the Default and Overlay stories demonstrate. This keeps repeated commands and asynchronous application decisions possible.

### Toggle shortcut

Set `shortcut="SUPER+K"` for Ctrl+K / Meta+K. Registration is opt-in; no shortcut is captured by default. Chords are case-insensitive, with one key and optional `Ctrl`/`Control`, `Meta`/`Cmd`/`Command`, `Alt`/`Option`, and `Shift` modifiers. `Super`/`Mod` means either Ctrl or Meta, not both. Named keys such as `Space`, `Escape`, `F2`, and `Plus` are supported. A configured chord takes precedence over input result-navigation keys (for example, `Ctrl+Enter` toggles without activating a result). Extra modifiers do not match; invalid chords are ignored with a development warning.

Use current event modifier flags rather than held-key history, so focus changes never leave stale keys. Ignore repeat, composition, already-handled events, and editable targets outside this palette. Inside the open palette its shortcut can close it even while search is focused. Disabled/inline palettes do not handle shortcuts. Prevent browser defaults only for a matching, eligible toggle. Changes to the shortcut take effect reactively and listeners are removed on unmount.

Shortcuts only receive keyboard events from the component’s document. In Storybook, focus the preview canvas (or open the story in a new tab); sidebar and Controls events do not reach its iframe. Browser/OS-reserved shortcuts may be intercepted before the page can cancel them, so custom chords cannot guarantee overriding browser actions. The CustomShortcut story uses `Ctrl+Enter`, avoiding Firefox’s `Ctrl+Shift+P` private-window binding. Automated page keyboard events verify component handling, not real browser-chrome shortcut interception.

With duplicate registrations, the focused/open palette has precedence, otherwise the most recently mounted matching eligible palette wins. A palette cannot open behind another native modal. Shortcut closing shares the dismissal path and emits one `close`; reopening during exit cancels pending cleanup without losing the original opener. Provide a Storybook example demonstrating both Ctrl+K and Meta+K and custom combinations.


Any reuse is limited to existing unstyled behavior utilities where they meet this contract. Do not introduce a public overlay abstraction solely for this component. NyxModal remains independent; its existing implementation limitations do not define palette behavior.

## Conversation search

Results need not be executable commands. A conversation can extend `NyxCommandPaletteItem` with a `to` field or other domain data. Bind `searchTerm` for a remote query, supply a conversation group with `ignoreFilter: true`, pass `loading`, and handle `select` with application navigation (`router.push(item.to)`) followed by `open = false`. Use `viewportMode: NyxCommandPaletteViewportMode.WhileSearching` for a search-only viewport. Item-label/trailing slots can show snippets, participants or dates while retaining the option shell. `ConversationSearch` demonstrates consumer-owned navigation and mocked asynchronous results.

## Usage example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NyxCommandPalette } from 'nyx-kit'
import type { NyxCommandPaletteGroup, NyxCommandPaletteSelectEvent } from 'nyx-kit'

const query = ref('')
const open = ref(false)
const selected = ref<string>()
const lastCommand = ref('')
const groups: NyxCommandPaletteGroup[] = [{
  id: 'actions',
  label: 'Actions',
  items: [
    { id: 'settings', label: 'Open settings', icon: 'settings', keywords: ['preferences'] },
    { id: 'new-file', label: 'Create file', icon: 'file-plus', shortcuts: ['Ctrl', 'N'] },
  ],
}]

function select({ item }: NyxCommandPaletteSelectEvent) {
  lastCommand.value = item.label
  open.value = false
}
</script>

<template>
  <button type="button" @click="open = true">Search commands</button>
  <NyxCommandPalette
    v-model:open="open"
    v-model="selected"
    v-model:search-term="query"
    :groups="groups"
    @select="select"
  />
  <p aria-live="polite">{{ lastCommand }}</p>
</template>
```

The complete Storybook overlay example must also demonstrate the opening shortcut and tested focus restoration. Set `inline` and omit the open binding for an embedded palette.

## Styling

Follow [DESIGN.md](../../../DESIGN.md) and [design-system.md](../../architecture/design-system.md). Use existing semantic colour, type, spacing, radius, and motion tokens via component-local variables. No shared token changes are required. Namespace styles under `.nyx-command-palette` with BEM descendants.

Keep the input and footer outside the scrolling result viewport. Fit the available width, preserve a visible label with long content, and avoid horizontal page overflow at 320 CSS pixels. Consumers can constrain height through root styles. Respect reduced motion and both light/dark modes; focus indication must not rely solely on hover or a subtle colour change.

Use a dedicated search-first surface: search field at the top, dense grouped results immediately below, and optional compact keyboard help in the footer. Overlay width, maximum height, backdrop treatment, and opening/closing motion are palette-specific. Use a small scale/translation and fade on entry, a faster exit, and a matching backdrop fade. The viewport uses a bounded grid reveal with opacity/translation; grouped results animate insertion, removal, and reordering. Removed rows become inert/hidden to assistive technology immediately. Hover, active, disabled, input focus, icons, and the close button transition with restrained, slightly playful motion. Durations inherit existing Nyx speed tokens, and reduced motion disables animation/transition and delay. Sharing semantic tokens with NyxModal does not imply sharing its structure or visual treatment.

## Storybook integration and validation

Storybook is a required implementation deliverable, not a placeholder. Use `title: 'Components/Navigation/NyxCommandPalette'` following the [taxonomy](../../architecture/storybook.md), a typed `Meta` with `satisfies`, typed `StoryObj` exports, and the repository's autodocs convention. Display the public props, defaults, slots, models, and events accurately in generated/custom docs.

The current installation is Storybook 10 with `@storybook/vue3-vite`; the older stack summary in AGENTS.md says 8. The existing `.storybook/main.ts` glob already discovers co-located stories, and `.storybook/preview.ts` supplies global autodocs, Nyx CSS, and Navigation ordering. Use this setup and the typed NyxAccordion story pattern; do not add a parallel Storybook configuration or an older addon stack. Light/dark checks must set Nyx's actual `data-nyx-mode` on the preview document rather than only switching Storybook's manager theme.

Provide meaningful controls for open, inline, shortcut, viewportMode, showResultsLabel, theme, size, placeholder, label, loading, disabled, loop, autofocus, and closeable. Wire models in Vue wrappers, and log `select`, `close`, and model updates in Actions. Each example must show an observable action outcome or selected ID. Reset mutable fixture data per mount and cancel pending mock requests/timers on teardown. Use deterministic local fixtures and mock promises; no external network, router, or Nuxt setup is required. Overlay stories start closed with an explicit trigger so a Docs page containing several stories does not open competing dialogs; state-gallery stories may use inline mode.

| Story | Required demonstration / interaction |
|---|---|
| `AlwaysShown` / `RevealAndKeepOpen` | Always-visible mode and persistent reveal via footer button, typing and clearing |
| `Default` | Standalone overlay opened by a trigger, grouped actions, icons, and visible activation feedback |
| `Inline` | Embedded surface with no backdrop, teleport, focus trap, or open-state dependency |
| `Controlled` | Parent-driven selected ID and search term; clearing query and repeated activation |
| `Search` | Label, description, keyword, case/diacritic, and abbreviated matches; stable group ordering |
| `KeyboardNavigation` | Cross-group arrows, wrapping, disabled skipping, Enter, Escape, and local focus |
| `CustomSlots` | Group headings, item content/leading/label/trailing, empty/loading, and footer; show item-slot precedence separately |
| `Empty` / `Loading` / `Disabled` | Empty groups, unmatched query, delayed results, all-disabled options, and whole-component disabled state |
| `RemoteSearch` | Controlled query, mock debounce, `ignoreFilter`, loading, no matches, and stale-response protection |
| `Overlay` | Direct palette usage without NyxModal; trigger and Ctrl/Meta+K, centered custom surface, focus containment, dismissal, reopened state, and focus restoration |
| `Themes` / `Sizes` | All supported enum values and inherited defaults; narrow width and long labels |
| `SearchOnly` / `CustomShortcut` | Query-only viewport reveal/clear, custom toggle chord, and animated transitions |
| `ConversationSearch` | Remote conversation titles/snippets, custom metadata, and consumer-owned navigation |
| `MultipleInstances` | Independent queries, focus, IDs, and keyboard events |

Add interaction assertions to the meaningful stories using the project's existing Storybook interaction tooling: searching changes results, disabled commands do not activate, Enter activates once, controlled query changes are reflected, and slot content preserves operability. Storybook rendering alone is not evidence for native dialog focus behavior: cover the standalone overlay in Playwright too.

Implementation acceptance requires:

- Unit tests for matching/ranking, ID validation, models, repeated activation, disabled/loading states, dynamic data, slot precedence, and typed payload preservation.
- Browser tests for keyboard/pointer parity, IME guards, multiple instances, result scrolling, Tab order, overlay open/close/focus containment and restoration, background scroll cleanup, backdrop gestures, unmount while open, mode switching, and remote-result replacement.
- Storybook build and live review of every story in both colour modes, including a 320px container and keyboard-only operation. Confirm the new sidebar entry and usable Docs page.
- `yarn type-check`, `yarn test:unit`, `yarn test:e2e`, `yarn storybook:build`, and `yarn build`, plus an SSR render/hydration check for stable IDs and no setup-time DOM access. Report unrelated baseline failures separately.
- Root/subpath export and declaration validation; update README from planned to implemented only when implementation exists. The component is included in the architecture inventory.

Validation results: [implementation validation](../../../specs/018-nyx-command-palette/validation.md).

## Known limitations

- This is a single-selection command surface, not a Nuxt UI API clone or a form multi-select.
- Fuzzy matching means ordered subsequences, not typo tolerance or locale-specific collation. Consumers can supply their own ordered results with `ignoreFilter`.
- No virtualization, nested history, persisted recents, automatic navigation, global command registry, or asynchronous action management is included.
- Custom option content is noninteractive. Applications needing multiple independent controls per row should use another list pattern.
- Overlay opening requires the browser's native dialog support; verify inline rendering and closed/initially-open overlay hydration separately. No NyxModal dependency or fallback is part of this contract.
