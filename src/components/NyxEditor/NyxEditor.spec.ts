import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { shallowRef } from 'vue'
import {
  NyxAnnotationAttachment,
  NyxAnnotationInteraction,
  NyxAnnotationStatus,
  NyxTheme,
  NyxEditorMode,
  NyxEditorFormat,
  NyxVariant,
  NyxSize,
} from '@/types'
import NyxEditor from './NyxEditor.vue'

const mockEditor = {
  state: {
    selection: { empty: true, from: 1, to: 1 },
    doc: {
      textBetween: vi.fn(() => ''),
    },
    tr: {
      setMeta: vi.fn(() => ({ type: 'annotation-meta-transaction' })),
    },
  },
  view: {
    dispatch: vi.fn(),
  },
  storage: {
    markdown: {
      getMarkdown: vi.fn(() => ''),
    },
  },
  getHTML: vi.fn(() => ''),
  commands: {
    setContent: vi.fn(),
  },
  setEditable: vi.fn(),
  isActive: vi.fn(() => false),
  chain: vi.fn(() => ({
    focus: () => ({
      toggleBold: () => ({ run: vi.fn() }),
      toggleItalic: () => ({ run: vi.fn() }),
      toggleUnderline: () => ({ run: vi.fn() }),
      toggleStrike: () => ({ run: vi.fn() }),
      toggleCode: () => ({ run: vi.fn() }),
      toggleBulletList: () => ({ run: vi.fn() }),
      toggleOrderedList: () => ({ run: vi.fn() }),
      toggleTaskList: () => ({ run: vi.fn() }),
      toggleHeading: () => ({ run: vi.fn() }),
      setParagraph: () => ({ run: vi.fn() }),
      undo: () => ({ run: vi.fn() }),
      redo: () => ({ run: vi.fn() }),
    }),
  })),
  can: vi.fn(() => ({ undo: () => true, redo: () => true })),
}

let editorOptions: Record<string, any> = {}

// Tiptap relies on browser APIs not available in jsdom; mock the integration layer
vi.mock('@tiptap/vue-3', () => ({
  useEditor: (options: Record<string, any>) => {
    editorOptions = options
    return shallowRef(mockEditor)
  },
  EditorContent: { template: '<div class="tiptap" />' },
}))

vi.mock('@tiptap/starter-kit', () => ({ default: {} }))
vi.mock('tiptap-markdown', () => ({ Markdown: {} }))
vi.mock('./NyxEditorBubbleMenu/NyxEditorBubbleMenu.vue', () => ({
  default: {
    name: 'NyxEditorBubbleMenu',
    emits: ['mousedown', 'create'],
    template: '<button class="nyx-editor__bubble-comment" @click="$emit(\'create\')" />',
  },
}))

describe('NyxEditor', () => {
  beforeEach(() => {
    editorOptions = {}
    mockEditor.state.selection = { empty: true, from: 1, to: 1 }
    mockEditor.state.doc.textBetween.mockReset()
    mockEditor.state.doc.textBetween.mockReturnValue('')
    mockEditor.state.tr.setMeta.mockClear()
    mockEditor.view.dispatch.mockClear()
  })

  it('emits selection when the editor selection changes', () => {
    const textBetweenMock = mockEditor.state.doc.textBetween as unknown as {
      mockImplementation: (fn: (from: number, to: number) => string) => void
    }
    const getSelection = vi.spyOn(window, 'getSelection').mockReturnValue({
      rangeCount: 1,
      getRangeAt: () => ({
        getBoundingClientRect: () => ({ width: 10, height: 10 }),
      }),
    } as unknown as Selection)

    mockEditor.state.selection = { empty: false, from: 2, to: 8 }
    textBetweenMock.mockImplementation((from: number, to: number) => {
      if (from === 2 && to === 8) return 'picked'
      return ''
    })

    const wrapper = mount(NyxEditor)

    editorOptions.onSelectionUpdate?.()

    expect(wrapper.emitted('selection')).toEqual([[{
      text: 'picked',
      context: {
        prefix: '',
        suffix: '',
      },
      range: { from: 2, to: 8 },
    }]])

    getSelection.mockRestore()
  })

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

  it('accepts consumer-provided annotations', () => {
    const annotations = [{
      id: 'annotation-1',
      anchor: {
        text: 'picked',
        context: {
          prefix: 'before',
          suffix: 'after',
        },
        range: {
          from: 2,
          to: 8,
        },
      },
      interaction: NyxAnnotationInteraction.Default,
      status: NyxAnnotationStatus.Unresolved,
      attachment: NyxAnnotationAttachment.Attached,
    }]

    const wrapper = mount(NyxEditor, { props: { annotations } })

    expect(wrapper.props('annotations')).toEqual(annotations)
  })

  it('accepts annotation status theme mapping', () => {
    const annotationStatusTheme = {
      [NyxAnnotationStatus.Unresolved]: NyxTheme.Warning,
      [NyxAnnotationStatus.Resolved]: NyxTheme.Success,
    }

    const wrapper = mount(NyxEditor, { props: { annotationStatusTheme } })

    expect(wrapper.props('annotationStatusTheme')).toEqual(annotationStatusTheme)
  })

  it('emits annotation:create with text, context, and range fields', async () => {
    const textBetweenMock = mockEditor.state.doc.textBetween as unknown as {
      mockImplementation: (fn: (from: number, to: number) => string) => void
    }

    mockEditor.state.selection = { empty: false, from: 2, to: 8 }

    textBetweenMock.mockImplementation((from: number, to: number) => {
      if (from === 2 && to === 8) return 'picked'
      if (from === 1 && to === 2) return 'prefix'
      if (from === 8 && to === 40) return 'suffix'
      return ''
    })

    const wrapper = mount(NyxEditor)

    await wrapper.find('.nyx-editor__bubble-comment').trigger('click')

    expect(wrapper.emitted('annotation:create')).toEqual([[
      {
        text: 'picked',
        context: {
          prefix: 'prefix',
          suffix: 'suffix',
        },
        range: {
          from: 2,
          to: 8,
        },
      },
    ]])
  })

  it('syncs annotation decorations when annotations change', async () => {
    const wrapper = mount(NyxEditor)

    mockEditor.view.dispatch.mockClear()

    await wrapper.setProps({
      annotations: [{
        id: 'annotation-1',
        anchor: {
          text: 'picked',
          context: {
            prefix: 'before',
            suffix: 'after',
          },
          range: {
            from: 2,
            to: 8,
          },
        },
        interaction: NyxAnnotationInteraction.Focus,
        status: NyxAnnotationStatus.Resolved,
        attachment: NyxAnnotationAttachment.Detached,
      }],
    })

    expect(mockEditor.state.tr.setMeta).toHaveBeenCalled()
    expect(mockEditor.view.dispatch).toHaveBeenCalled()
  })

  it('exposes annotation focus handling through the annotation plugin', () => {
    const wrapper = mount(NyxEditor)
    const annotationExtension = editorOptions.extensions.find((extension: { name?: string }) => extension.name === 'nyxAnnotations')
    const [plugin] = annotationExtension.config.addProseMirrorPlugins()
    const target = document.createElement('span')

    target.dataset.nyxAnnotationId = 'annotation-1'

    plugin.props.handleClick(null, 0, { target })

    expect(wrapper.emitted('annotation:focus')).toEqual([['annotation-1']])
  })

  it('exposes annotation blur handling through the annotation plugin', () => {
    const wrapper = mount(NyxEditor)
    const annotationExtension = editorOptions.extensions.find((extension: { name?: string }) => extension.name === 'nyxAnnotations')
    const [plugin] = annotationExtension.config.addProseMirrorPlugins()
    const target = document.createElement('span')

    target.dataset.nyxAnnotationId = 'annotation-1'

    plugin.props.handleDOMEvents.focusout(null, { target })

    expect(wrapper.emitted('annotation:blur')).toEqual([['annotation-1']])
  })
})
