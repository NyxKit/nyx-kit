import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick, reactive } from 'vue'
import NyxMarkdown from './NyxMarkdown.vue'
import type { NyxMarkdownInlineRule } from './NyxMarkdown.types'

const rules: NyxMarkdownInlineRule<string>[] = [{
  name: 'citation', match: (source, offset) => source.startsWith('[[p1:m2]]', offset)
    ? { length: 9, value: 'Message 2' } : null,
}]
const options = { global: { provide: { libEnv: {} } } }
const render = (content: string) => mount(NyxMarkdown, { ...options, props: { content } })

describe('NyxMarkdown', () => {
  it('renders semantic CommonMark, tables and strikethrough', () => {
    const wrapper = render('# Heading\n\nSetext\n---\n\nA **bold *nested*** and ~~removed~~ &amp; \\*literal\\*.\nsoft  \nhard\\\nbreak\n\n3. third\n   - nested\n\n   continuation\n\n> quote\n\n___\n\n| Left | Right |\n| :--- | ---: |\n| α | 🙂 |\n\n[reference][r]\n\n[r]: https://example.com')
    expect(wrapper.find('h1').text()).toBe('Heading')
    expect(wrapper.find('h2').text()).toBe('Setext')
    expect(wrapper.find('strong em').text()).toBe('nested')
    expect(wrapper.find('s').text()).toBe('removed')
    expect(wrapper.findAll('br')).toHaveLength(2)
    expect(wrapper.find('ol').attributes('start')).toBe('3')
    expect(wrapper.find('ol ul li').text()).toBe('nested')
    expect(wrapper.find('blockquote p').text()).toBe('quote')
    expect(wrapper.find('hr').exists()).toBe(true)
    expect(wrapper.find('th').attributes('scope')).toBe('col')
    expect(wrapper.findAll('td')[1].attributes('style')).toContain('right')
    expect(wrapper.find('a').attributes('rel')).toBe('noopener noreferrer')
  })

  it('renders real inline slots only in eligible prose', async () => {
    const click = vi.fn()
    const content = '**[[p1:m2]]**\n\n- *[[p1:m2]]*\n\n> [[p1:m2]]\n\n# [[p1:m2]]\n\n| Ref |\n| --- |\n| [[p1:m2]] |\n\n`[[p1:m2]]`\n\n```txt\n[[p1:m2]]\n```\n\n    [[p1:m2]]\n\n[ [[p1:m2]] ](https://example.com) ![ [[p1:m2]] ](https://example.com/image)\n\n\\[[p1:m2]] [[unknown]] [[p1:'
    const wrapper = mount(NyxMarkdown, {
      ...options,
      props: { content, inlineRules: rules },
      slots: { inline: ({ value }) => h('button', { onClick: click }, String(value)) },
    })
    expect(wrapper.findAll('button')).toHaveLength(5)
    expect(wrapper.find('a button').exists()).toBe(false)
    expect(wrapper.find('img').exists()).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(click).toHaveBeenCalledTimes(1)
    expect(wrapper.text()).toContain('[[unknown]]')
    expect(wrapper.text()).toContain('[[p1:')
  })

  it('handles ordinary-letter markers, rule order and invalid lengths', () => {
    const invalid = [0, -1, 1.5, Infinity, 999].map((length) => ({
      name: 'bad',
      match: () => ({ length, value: 'bad' }),
    }))
    const wrapper = mount(NyxMarkdown, {
      ...options,
      props: {
        content: 'before CITE after',
        inlineRules: [
          ...invalid,
          {
            name: 'word',
            match: (source: string, offset: number) =>
              source.startsWith('CITE', offset) ? { length: 4, value: 'good' } : null,
          },
          { name: 'later', match: () => ({ length: 1, value: 'later' }) },
        ],
      },
      slots: { inline: ({ value }) => h('mark', String(value)) },
    })
    expect(wrapper.findAll('mark').some(mark => mark.text() === 'good')).toBe(true)
    expect(wrapper.text()).not.toContain('bad')
    const literal = mount(NyxMarkdown, { ...options, props: { content: '[[p1:m2]]', inlineRules: rules } })
    expect(literal.text()).toBe('[[p1:m2]]')
  })

  it.each(['javascript:alert(1)', 'jav&#x61;script:alert(1)', 'data:text/html,hi', 'file:///tmp/test', 'blob:https://example.com/id', '//example.com', '/relative', 'https:\\evil.test'])('blocks unsupported destination %s', destination => {
    const wrapper = render(`[label](<${destination}>)`)
    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.text()).toContain('label')
  })

  it('never turns raw HTML, language hints or images into markup', () => {
    const wrapper = render('<script>alert(1)</script> <svg onload="alert(1)"></svg>\n\n![**alt**](https://example.com/a.png) ![](data:image/png;base64,abc)\n\n```<img/src=x>\n<img src=x>\n```')
    expect(wrapper.find('script,svg,img,iframe,style').exists()).toBe(false)
    expect(wrapper.text()).toContain('<script>')
    expect(wrapper.text()).toContain('alt Image omitted')
    expect(wrapper.find('pre code').text()).toBe('<img src=x>')
    expect(render('[fragment](#section)').find('a').attributes('href')).toBe('#section')
  })

  it('preserves code whitespace and normalizes heading offsets', async () => {
    const wrapper = render('```js\n  const n = 1\n\n```\n\n# One')
    expect(wrapper.find('pre code').element.textContent).toBe('  const n = 1\n\n')
    await wrapper.setProps({ headingOffset: 99 })
    expect(wrapper.find('h6').text()).toBe('One')
    await wrapper.setProps({ headingOffset: -99 })
    expect(wrapper.find('h1').exists()).toBe(true)
  })

  it('updates reactive lookups, rules and content independently across instances', async () => {
    const lookup = reactive({ valid: false })
    const dynamic: NyxMarkdownInlineRule<string>[] = [
      { name: 'citation', match: (source, offset) => (lookup.valid ? rules[0].match(source, offset) : null) },
    ]
    const wrapper = mount(NyxMarkdown, {
      ...options,
      props: { content: '[[p1:m2]]', inlineRules: dynamic },
      slots: { inline: () => h('button', 'Jump') },
    })
    const other = render('[[p1:m2]]')
    expect(wrapper.find('button').exists()).toBe(false)
    lookup.valid = true
    await nextTick()
    expect(wrapper.find('button').exists()).toBe(true)
    expect(other.find('button').exists()).toBe(false)
    await wrapper.setProps({ inlineRules: [] })
    expect(wrapper.find('button').exists()).toBe(false)
    await wrapper.setProps({ content: 'Replacement' })
    expect(wrapper.text()).toBe('Replacement')
    await wrapper.setProps({ content: '' })
    expect(wrapper.text()).toBe('')
    wrapper.unmount()
  })

  it('matches one-shot output for chunks split inside syntax and keeps stable controls', async () => {
    const source = '**[[p1:m2]]**\n\n| A | B |\n| --- | --- |\n| one | two |\n\n```js\nconst n = 1\n```\n\n[link](https://example.com)'
    const props = { content: '', inlineRules: rules }
    const slots = { inline: () => h('button', 'Jump') }
    const wrapper = mount(NyxMarkdown, { ...options, props, slots })
    for (let end = 1; end <= source.length; end++) await wrapper.setProps({ content: source.slice(0, end) })
    const complete = mount(NyxMarkdown, { ...options, props: { ...props, content: source }, slots })
    expect(wrapper.html()).toBe(complete.html())
    const button = wrapper.find('button').element
    const pre = wrapper.find('pre').element
    await wrapper.setProps({ content: source + '\n\nAnother paragraph.' })
    expect(wrapper.find('button').element).toBe(button)
    expect(wrapper.find('pre').element).toBe(pre)
  })

  it('fails locally to escaped text when a trusted recognizer throws', () => {
    const wrapper = mount(NyxMarkdown, {
      ...options,
      props: {
        content: '<b>raw</b>',
        inlineRules: [
          {
            name: 'broken',
            match: () => {
              throw new Error('failed')
            },
          },
        ],
      },
    })
    expect(wrapper.text()).toBe('<b>raw</b>')
    expect(wrapper.find('b').exists()).toBe(false)
  })
})
