# Nyx-kit Audit — 20260330

---

## 1. Executive Summary

Nyx-kit has made significant progress since the March 23 audit. The most critical issues have been addressed: `useNyxProps` adoption is now nearly universal, the NyxProgress math bug is fixed, NyxSlider vertical direction works, and accessibility has improved substantially with NyxModal using `<dialog>` and NyxTabs/NyxSelect having proper ARIA roles.

**Biggest remaining pain themes:**
1. `KeyboardKey` enum still incomplete — only has Escape, despite being flagged in the previous audit
2. NyxSelect keyboard navigation (arrow keys, Enter) — flagged as "not yet implemented" in the spec but needed for a11y
3. Global CSS reset pollution remains a design decision, but its severity hasn't been re-evaluated for production readiness
4. Test coverage still thin on component rendering and interaction behavior
5. Inconsistent naming in some places (`colWhitelist`/`colBlacklist` vs modern conventions)

**Overall impression:** The codebase has matured significantly. The architecture is sound, the token system is excellent, and most critical bugs from the previous audit are fixed. What remains is refinement: completing partial implementations, adding missing tests, and addressing the few remaining API inconsistencies.

**Top 3 priorities:**
1. Complete NyxSelect keyboard navigation (arrow keys, Enter to select)
2. Expand `KeyboardKey` enum or remove it
3. Add component render/interaction tests

---

## 2. Scorecard

| Dimension | Score | Justification |
|---|---|---|
| **Architecture** | 8/10 | Clean layering, good composable patterns; `useNyxProps` now consistently adopted |
| **API design** | 7/10 | Consistent core props; NyxSelect `type` vs `multiple` resolved; minor inconsistencies remain |
| **Type safety** | 7/10 | Good component types; `KeyboardKey` incomplete; plugin types now exported from `./types` |
| **Accessibility** | 7/10 | NyxModal, NyxTabs, NyxSelect, NyxProgress all have proper ARIA; NyxSelect keyboard nav missing |
| **Testing** | 5/10 | Composable tests solid; still no component render tests; E2E placeholder resolved |
| **Styling/Theming** | 7/10 | Token system excellent; global CSS pollution by design acknowledged |
| **Maintainability** | 8/10 | Good file structure; consistent conventions; major issues addressed |
| **Consumer DX** | 7/10 | Clean exports; plugin types now accessible from `./types` |
| **Release readiness** | 6/10 | Functional for most use cases; remaining a11y gaps are non-critical |

---

## 3. Findings

### [Medium] NyxSelect keyboard navigation not implemented

**Category:** Accessibility / Edge-case resilience

**Time horizon:** 1–3 months

**Blast radius:** Local (NyxSelect component)

**What's annoying:** The spec file (`docs/specs/components/NyxSelect.spec.md:89`) explicitly states "Keyboard navigation (arrow keys, Enter to select) is not yet implemented." The component has ARIA roles but lacks keyboard handling. Users cannot navigate options with arrow keys or select with Enter.

**Why it matters later:** A select component without keyboard navigation is only partially usable. Power users and accessibility-dependent users expect arrow key browsing. This gap will draw complaints and force consumers to implement workarounds.

**Evidence:** 
- `NyxSelect.vue` has no keyboard event handlers on the dropdown options
- Spec file explicitly defers this feature
- `NyxSelect.types.ts` has no keyboard-related props

**What’s really going on:** ARIA roles were added (combobox, listbox, option) but the keyboard behavior that makes those roles functional was deferred. The component has the skeleton but not the nervous system.

**Suggested fix:** Add `@keydown` handler to options or the container that:
- Arrow Up/Down: move focus between options
- Enter: select the focused option
- Home/End: jump to first/last option
- Consider `aria-activedescendant` for focus management

**Roast line:** The component got the ARIA clothes but forgot to teach it how to walk.

---

### [Medium] `KeyboardKey` enum is a false promise

**Category:** Type safety / AI smells

**Time horizon:** 1–3 months

**Blast radius:** Local (useKeyPress composable)

**What's annoying:** `src/types/keyboard.ts` defines `enum KeyboardKey { Esc = 'Escape' }`. The `useKeyPress` composable accepts this type. Consumers who want to listen for Arrow keys, Enter, Space — anything other than Escape — must pass raw strings, bypassing the type system entirely.

**Why it matters later:** The enum creates false confidence. Someone reading `useKeyPress(KeyboardKey.ArrowDown)` will get a compile error. The "type safety" is an illusion that misleads callers about what's supported.

**Evidence:** 
- `src/types/keyboard.ts:1-3` — single-value enum
- `useKeyPress.ts` signature accepts `KeyboardKey` but implementation accepts any string
- Previous audit flagged this; still not fixed

**What’s really going on:** The enum was added as a minimal viable type but never expanded. It's now technical debt that suggests completeness where none exists.

**Suggested fix:** Either expand the enum to 10-15 common keys (ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Enter, Space, Tab, Escape, Home, End, PageUp, PageDown) OR remove the enum entirely and accept `string`. The latter is cleaner and matches how `useKeyboardShortcuts` already works.

**Roast line:** This enum is like a restaurant with a single item on the menu called "Food."

---

### [Low] NyxTable `colWhitelist`/`colBlacklist` naming inconsistency

**Category:** Consistency / API design

**Time horizon:** 3–6 months

**Blast radius:** Local (NyxTable)

**What's annoying:** NyxTable uses `colWhitelist` and `colBlacklist` as prop names. Modern convention prefers `colInclude`/`colExclude` or `visibleColumns`/`hiddenColumns`. The current naming is verbose and uses loaded terminology.

**Why it matters later:** Consumers coming from modern UI libraries will find this naming awkward. It's a minor friction point but contributes to API feeling dated.

**Evidence:** 
- `NyxTable.types.ts` and `NyxTable.vue` use whitelist/blacklist
- Previous audit noted this; still not changed

**What’s really going on:** The naming was never updated after the initial implementation. Low priority but worth fixing in a breaking-change window.

**Suggested fix:** Add new props `includeColumns` / `excludeColumns` as aliases, deprecate the old ones, remove in next major.

**Roast line:** These prop names were named by someone who thought "allowlist" was too modern.

---

### [Low] `generateRandomString` uses unsafe `Math.random`

**Category:** Security / Rot risk

**Time horizon:** 6–12 months

**Blast radius:** Cross-cutting (used for ID generation)

**What's annoying:** `src/utils/string.ts:1-11` uses `Math.random()` to generate IDs. `Math.random()` is not cryptographically secure and is predictable. IDs generated here are used for element IDs (e.g., `NyxInput.vue:19` uses it for `normalizedId`).

**Why it matters later:** If IDs are used in ways that could be exploited (e.g., as token values, in URLs that are shared), predictability is a security issue. For simple DOM IDs, it's acceptable but still not ideal.

**Evidence:** 
- `src/utils/string.ts` imports nothing, uses `Math.random()`
- Called from `NyxInput.vue`, `NyxCheckbox.vue`, `NyxModal.vue` for ID generation

**What’s really going on:** This is a convenience utility that was written without security consideration. It works for its current purpose but doesn't scale to security-sensitive uses.

**Suggested fix:** Either:
1. Use `crypto.getRandomValues()` for secure random, or
2. Document that this is for non-security-sensitive IDs only, or
3. Create a separate `generateSecureId()` that uses crypto APIs

**Roast line:** This function generates randomness the way I generate motivation on a Monday.

---

### [Low] `isObject` still in `keydict.ts`

**Category:** Maintainability / Consistency

**Time horizon:** Longer-term

**Blast radius:** Local (file location)

**What's annoying:** `src/utils/keydict.ts` exports both `KeyDict<T>` type and `isObject` runtime function. These have no thematic relationship. `isObject` should live in `object.ts`.

**Evidence:**
- `keydict.ts` line 5+ has `isObject` function
- Previous audit noted this; still not moved

**Suggested fix:** Move `isObject` to `src/utils/object.ts` (create if needed) and update imports.

**Roast line:** Finding `isObject` in `keydict.ts` is like finding a spatula in the cutlery drawer — not wrong, just surprising.

---

## 4. Systemic Patterns

### Partial Implementation Pattern

Several components have "80% complete" energy — they have ARIA roles but not keyboard handling (NyxSelect), or they have the enum but not the full set (KeyboardKey). This suggests components are being built in feature slices without completing all the complementary functionality.

**Fix:** Before merging a component, require: props defined + ARIA implemented + keyboard behavior implemented + tests written. No partial merges.

### Utility Location Drift

`NyxLoader` moved to utils, but `isObject` still in keydict. Some utilities are well-organized, others are in odd homes. The codebase has a "things settled where they landed" feel rather than "designed from scratch."

**Fix:** Do a one-pass utilities audit — move outliers, rename for discoverability.

### Test Coverage Gap

Despite the previous audit flagging zero component tests, the situation hasn't substantially improved. The composable tests are excellent. But for components, there's still:
- No render tests
- No v-model binding tests  
- No slot rendering tests

**Fix:** Add at least smoke tests for the 5 core components: NyxButton, NyxInput, NyxModal, NyxSelect, NyxSlider.

---

## 5. Fix Order

### Fix Now (This Sprint)
1. Complete NyxSelect keyboard navigation — biggest user-facing gap
2. Either expand `KeyboardKey` enum or remove it — it's actively misleading

### Fix Next (Next 2 Sprints)
3. Add component render smoke tests for 5 core components

### Fix Opportunistically
4. Rename NyxTable whitelist/blacklist props (when doing other NyxTable work)
5. Move `isObject` to object.ts
6. Consider using `crypto.getRandomValues()` for ID generation (low priority)

### Monitor Only
- Global CSS reset — acknowledged as design decision
- The remaining `KeyboardKey` gap is minor now that we know about it

---

## 6. What Not to Waste Time On

- **Pixel mode**: It's a fun feature, works fine, don't overthink it
- **SCSS variable duplication**: The variables are defined in both CSS and SCSS mixins. It's a known pattern limitation, not worth refactoring.
- **Storybook docs quality**: Stories exist and work, that's sufficient for now
- **The `NyxLoader` re-export**: It now lives in utils, with a re-export for backward-compat. This is fine.

---

## 7. Final Verdict

Nyx-kit is a solid Vue 3 component library with good architectural bones, an excellent token system, and most of the critical issues from the previous audit now resolved. The remaining issues are polish rather than structural problems: incomplete keyboard behavior, a misleading enum, and thin test coverage.

In a year, if the current trajectory continues, this will be a production-ready library. The main risk is that partial implementations (ARIA without keyboard, enum without full coverage) accumulate and become technical debt that feels "almost done" but never quite arrives. Address the NyxSelect keyboard gap and the KeyboardKey enum, and the library crosses from "promising prototype" to "real library" territory.

The codebase is AI-assisted but well-curated — you can tell someone has been actively maintaining and improving it. That's more than most projects can say.

---
