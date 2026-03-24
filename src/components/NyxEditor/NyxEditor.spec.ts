import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { shallowRef } from 'vue'
import { NyxEditorMode, NyxEditorFormat, NyxTheme, NyxVariant, NyxSize } from '@/types'
import NyxEditor from './NyxEditor.vue'

// Tiptap relies on browser APIs not available in jsdom; mock the integration layer
vi.mock('@tiptap/vue-3', () => ({
  useEditor: () => shallowRef(null),
  EditorContent: { template: '<div class="tiptap" />' },
}))

vi.mock('@tiptap/starter-kit', () => ({ default: {} }))
vi.mock('tiptap-markdown', () => ({ Markdown: {} }))

describe('NyxEditor', () => {
  it('renders without errors', () => {
    const wrapper = mount(NyxEditor)
    expect(wrapper.find('.nyx-editor').exists()).toBe(true)
  })

  it('applies mode-zen class by default', () => {
    const wrapper = mount(NyxEditor)
    expect(wrapper.find('.nyx-editor').classes()).toContain('mode-zen')
  })

  it('applies mode-toolbar class when mode is toolbar', () => {
    const wrapper = mount(NyxEditor, { props: { mode: NyxEditorMode.Toolbar } })
    expect(wrapper.find('.nyx-editor').classes()).toContain('mode-toolbar')
  })

  it('renders toolbar in toolbar mode', () => {
    const wrapper = mount(NyxEditor, { props: { mode: NyxEditorMode.Toolbar } })
    expect(wrapper.find('.nyx-editor__toolbar').exists()).toBe(true)
  })

  it('does not render toolbar in zen mode', () => {
    const wrapper = mount(NyxEditor, { props: { mode: NyxEditorMode.Zen } })
    expect(wrapper.find('.nyx-editor__toolbar').exists()).toBe(false)
  })

  it('applies theme class', () => {
    const wrapper = mount(NyxEditor, { props: { theme: NyxTheme.Primary } })
    expect(wrapper.find('.nyx-editor').classes()).toContain('theme-primary')
  })

  it('applies variant class', () => {
    const wrapper = mount(NyxEditor, { props: { variant: NyxVariant.Filled } })
    expect(wrapper.find('.nyx-editor').classes()).toContain('variant-filled')
  })

  it('applies size class', () => {
    const wrapper = mount(NyxEditor, { props: { size: NyxSize.Large } })
    expect(wrapper.find('.nyx-editor').classes()).toContain('size-lg')
  })

  it('defaults to markdown format', () => {
    const wrapper = mount(NyxEditor)
    expect((wrapper.props() as { format: NyxEditorFormat }).format).toBe(NyxEditorFormat.Markdown)
  })

  it('accepts html format prop', () => {
    const wrapper = mount(NyxEditor, { props: { format: NyxEditorFormat.Html } })
    expect((wrapper.props() as { format: NyxEditorFormat }).format).toBe(NyxEditorFormat.Html)
  })

  it('defaults to zen mode', () => {
    const wrapper = mount(NyxEditor)
    expect((wrapper.props() as { mode: NyxEditorMode }).mode).toBe(NyxEditorMode.Zen)
  })

  it('has disabled prop defaulting to false', () => {
    const wrapper = mount(NyxEditor)
    expect((wrapper.props() as { disabled: boolean }).disabled).toBe(false)
  })

  it('renders EditorContent', () => {
    const wrapper = mount(NyxEditor)
    expect(wrapper.find('.nyx-editor__content').exists()).toBe(true)
  })
})
