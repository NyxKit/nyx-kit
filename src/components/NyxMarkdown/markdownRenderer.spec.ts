import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Token from 'markdown-it/lib/token.mjs'
import { renderMarkdown } from './markdownRenderer'

function renderLink(href: string | null) {
  const opening = new Token('link_open', 'a', 1)
  if (href !== null) opening.attrSet('href', href)
  const label = new Token('text', '', 0)
  label.content = 'Destination'
  const closing = new Token('link_close', 'a', -1)
  return mount({ render: () => h('div', renderMarkdown([opening, label, closing], 0)) })
}

describe('Markdown link destinations', () => {
  it.each([...Array.from({ length: 33 }, (_, code) => code), 127, 92])(
    'rejects character code %i in external URLs and fragments',
    code => {
      for (const prefix of ['https://example.com/', '#']) {
        const wrapper = renderLink(`${prefix}before${String.fromCharCode(code)}after`)
        expect(wrapper.find('a').exists()).toBe(false)
        expect(wrapper.text()).toBe('Destination')
        wrapper.unmount()
      }
    },
  )

  it.each([null, '', '//example.com', 'javascript:alert(1)', 'https://'])('rejects %s', href => {
    const wrapper = renderLink(href)
    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.text()).toBe('Destination')
    wrapper.unmount()
  })

  it.each(['https://example.com/path!', 'http://example.com/é', '#section', '#😀'])('retains %s', href => {
    const wrapper = renderLink(href)
    expect(wrapper.get('a').attributes('href')).toBe(href)
    if (!href.startsWith('#')) {
      expect(wrapper.get('a').attributes('rel')).toBe('noopener noreferrer')
      expect(wrapper.get('a').attributes('target')).toBe('_blank')
    } else {
      expect(wrapper.get('a').attributes('target')).toBeUndefined()
    }
    wrapper.unmount()
  })
})
