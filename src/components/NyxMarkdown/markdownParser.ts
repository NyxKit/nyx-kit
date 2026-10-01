import MarkdownIt from 'markdown-it'
import link from 'markdown-it/lib/rules_inline/link.mjs'
import image from 'markdown-it/lib/rules_inline/image.mjs'
import text from 'markdown-it/lib/rules_inline/text.mjs'
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.mjs'
import type { NyxMarkdownInlineRule, NyxMarkdownInlineSlotProps } from './NyxMarkdown.types'

/** No parser instances or mutable rule configuration are shared between renders. */
export function parseMarkdown<T>(source: string, rules: readonly NyxMarkdownInlineRule<T>[]) {
  const parser = new MarkdownIt('commonmark', { html: false, linkify: false, typographer: false })
    .enable(['table', 'strikethrough'])
  // Parse all destinations so unsupported links still render their labels. The
  // Vue renderer alone decides which URLs are allowed to become href attributes.
  parser.validateLink = () => true
  if (!rules.length) return parser.parse(source, {})

  let protectedDepth = 0
  for (const [name, original] of [['link', link], ['image', image]] as const) {
    parser.inline.ruler.at(name, (state, silent) => {
      protectedDepth++
      try { return original(state, silent) } finally { protectedDepth-- }
    })
  }
  const matchAt = (state: StateInline, offset: number): NyxMarkdownInlineSlotProps<T> & { length: number } | null => {
    if (protectedDepth) return null
    // Markdown syntax owns code and escapes, even if a recognizer is broad.
    if ('`\\'.includes(state.src[offset])) return null
    for (const rule of rules) {
      const match = rule.match(state.src, offset)
      if (!match || !Number.isInteger(match.length) || match.length <= 0 || offset + match.length > state.posMax) continue
      return { name: rule.name, value: match.value, raw: state.src.slice(offset, offset + match.length), length: match.length }
    }
    return null
  }
  // Standard syntax gets first refusal for links/images/code. Custom markers
  // (including markers beginning with ordinary letters) are then recognized.
  parser.inline.ruler.push('nyx_inline', (state, silent) => {
    const match = matchAt(state, state.pos)
    if (!match) return false
    if (!silent) state.push('nyx_inline', '', 0).meta = match
    state.pos += match.length
    return true
  })
  parser.inline.ruler.at('text', (state, silent) => {
    if (protectedDepth) return text(state, silent)
    const start = state.pos
    const pending = state.pending
    if (!text(state, true)) return false
    const end = state.pos
    for (let offset = start; offset < end; offset++) {
      if (!matchAt(state, offset)) continue
      state.pos = offset
      state.pending = pending
      if (offset === start) return false
      if (!silent) state.pending += state.src.slice(start, offset)
      return true
    }
    if (!silent) state.pending += state.src.slice(start, end)
    return true
  })
  return parser.parse(source, {})
}
