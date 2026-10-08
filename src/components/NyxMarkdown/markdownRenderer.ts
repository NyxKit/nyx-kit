import { Fragment, h, type VNodeChild } from 'vue'
import type Token from 'markdown-it/lib/token.mjs'
import type { NyxMarkdownInlineSlotProps } from './NyxMarkdown.types'

const elements = new Set([
  'p',
  'em',
  'strong',
  's',
  'blockquote',
  'ul',
  'ol',
  'li',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
  'a',
])

function safeHref(value: string | null): string | undefined {
  if (!value) return
  for (const character of value) {
    const code = character.charCodeAt(0)
    if (code <= 0x20 || code === 0x7f || character === '\\') return
  }
  if (value.startsWith('#')) return value
  if (!/^https?:\/\//i.test(value)) return
  try {
    const url = new URL(value)
    if (url.hostname && ['http:', 'https:'].includes(url.protocol)) return value
  } catch { /* Unsupported destinations remain text. */ }
}

function imageText(token: Token): string {
  return token.children?.map(child => child.type === 'image' ? imageText(child)
    : child.type === 'softbreak' || child.type === 'hardbreak' ? ' '
      : child.nesting === 0 ? child.content : '').join('') || token.content || 'Image omitted'
}

export function renderMarkdown<T>(
  tokens: Token[],
  headingOffset: number,
  inline?: (scope: NyxMarkdownInlineSlotProps<T>) => VNodeChild,
): VNodeChild[] {
  let cursor = 0
  const render = (path: string): VNodeChild[] => {
    const nodes: VNodeChild[] = []
    while (cursor < tokens.length) {
      const index = cursor++
      const token = tokens[index]
      if (token.nesting === -1) break
      const key = `${path}/${index}`
      if (token.nesting === 1) {
        const children = render(key)
        if (token.hidden || !elements.has(token.tag)) {
          nodes.push(...children)
          continue
        }
        let tag = token.tag
        const attrs: Record<string, unknown> = { key }
        if (/^h[1-6]$/.test(tag)) {
          const offset = Number.isFinite(headingOffset) ? Math.trunc(headingOffset) : 0
          tag = `h${Math.min(6, Math.max(1, Number(tag[1]) + offset))}`
        }
        if (tag === 'a') {
          const href = safeHref(token.attrGet('href'))
          if (!href) {
            nodes.push(h(Fragment, { key }, children))
            continue
          }
          attrs.href = href
          if (!href.startsWith('#')) {
            attrs.target = '_blank'
            attrs.rel = 'noopener noreferrer'
          }
          const title = token.attrGet('title')
          if (title) attrs.title = title
        }
        if (tag === 'ol' && token.attrGet('start')) attrs.start = Number(token.attrGet('start'))
        if (tag === 'th' || tag === 'td') {
          const alignment = token.attrGet('style')?.match(/^text-align:(left|center|right)$/)?.[1]
          if (alignment) attrs.style = { textAlign: alignment }
          if (tag === 'th') attrs.scope = 'col'
        }
        const node = h(tag, attrs, children)
        nodes.push(
          tag === 'table'
            ? h(
                'div',
                {
                  key,
                  class: 'nyx-markdown__table',
                  tabindex: 0,
                  role: 'region',
                  'aria-label': 'Markdown table',
                },
                [node],
              )
            : node,
        )
      } else if (token.type === 'inline') {
        nodes.push(...renderMarkdown(token.children ?? [], headingOffset, inline))
      } else if (token.type === 'nyx_inline') {
        const scope = token.meta as NyxMarkdownInlineSlotProps<T>
        nodes.push(h(Fragment, { key }, [inline ? inline(scope) : scope.raw]))
      } else if (token.type === 'code_inline') {
        nodes.push(h('code', { key }, token.content))
      } else if (token.type === 'fence' || token.type === 'code_block') {
        const language = token.info.trim().split(/\s+/)[0]
        nodes.push(
          h('div', { key, class: 'nyx-markdown__code' }, [
            language ? h('div', { class: 'nyx-markdown__language' }, language) : null,
            h(
              'pre',
              {
                tabindex: 0,
                role: 'region',
                'aria-label': language ? `${language} code block` : 'Code block',
              },
              [h('code', token.content)],
            ),
          ]),
        )
      } else if (token.type === 'image') nodes.push(imageText(token))
      else if (token.type === 'softbreak') nodes.push('\n')
      else if (token.type === 'hardbreak' || token.type === 'hr')
        nodes.push(h(token.type === 'hr' ? 'hr' : 'br', { key }))
      else nodes.push(token.content)
    }
    return nodes
  }
  return render('')
}
