import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, shallowRef } from 'vue'
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
import { createEditorMeta } from '@/composables/useEditorMeta'

const createMockEditorDoc = () => ({
  textBetween: vi.fn(() => ''),
})

const mockEditor = {
  state: {
    selection: { empty: true, from: 1, to: 1 },
    doc: createMockEditorDoc(),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let editorOptions: Record<string, any> = {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTestNode = (typeName: string, options: { text?: string, attrs?: Record<string, unknown>, children?: any[] } = {}) => {
 
  const children = options.children ?? []
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textContent = options.text ?? children.map((child: any) => child.textContent).join(' ')

  return {
    type: { name: typeName },
    attrs: options.attrs ?? {},
    textContent,
 
    childCount: children.length,
 
    child: (index: number) => children[index],
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    nodeSize: Math.max(textContent.length + 2, 2 + children.reduce((sum: number, child: any) => sum + child.nodeSize, 0)),
    children,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTestDoc = (children: any[]) => {
  const doc = createTestNode('doc', { children, text: children.map((child) => child.textContent).join(' ') })

  return {
    ...doc,
    content: { size: doc.nodeSize },
    textBetween: (from: number, to: number) => doc.textContent.slice(Math.max(0, from), Math.max(from, to)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descendants: (callback: (node: any, pos: number, parent: any, index: number) => void) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const walk = (nodes: any[], parent: any, startPos: number) => {
        let pos = startPos
        nodes.forEach((node, index) => {
          callback(node, pos, parent, index)
          if (node.children?.length) {
            walk(node.children, node, pos + 1)
          }
          pos += node.nodeSize
        })
      }

      walk(children, doc, 0)
    },
  }
}

// Tiptap relies on browser APIs not available in jsdom; mock the integration layer
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    emits: ['mousedown', 'annotation:create'],
    template: '<button class="nyx-editor__bubble-comment" @click="$emit(\'annotation:create\')" />',
  },
}))

describe('NyxEditor', () => {
  beforeEach(() => {
    editorOptions = {}
    mockEditor.state.selection = { empty: true, from: 1, to: 1 }
    mockEditor.state.doc = createMockEditorDoc()
    mockEditor.state.doc.textBetween.mockReturnValue('')
    mockEditor.state.tr.setMeta.mockClear()
    mockEditor.view.dispatch.mockClear()
  })

  it('builds meta for paragraphs beneath nested headings', () => {
    const doc = createTestDoc([
      createTestNode('heading', { text: 'Main Title', attrs: { level: 1 } }),
      createTestNode('heading', { text: 'Section Title', attrs: { level: 2 } }),
      createTestNode('paragraph', { text: 'First paragraph body' }),
      createTestNode('paragraph', { text: 'Second paragraph body' }),
    ])

    const meta = createEditorMeta({
      doc,
      selection: { from: 35, to: 35, empty: true },
    } as never)

    expect(meta.pathText).toBe('Main Title / Section Title / paragraph 1')
    expect(meta.wordCount).toBe(10)
  })

  it('resets paragraph numbering per heading section', () => {
    const doc = createTestDoc([
      createTestNode('heading', { text: 'Main Title', attrs: { level: 1 } }),
      createTestNode('heading', { text: 'Section One', attrs: { level: 2 } }),
      createTestNode('paragraph', { text: 'First section paragraph one' }),
      createTestNode('paragraph', { text: 'First section paragraph two' }),
      createTestNode('heading', { text: 'Section Two', attrs: { level: 2 } }),
      createTestNode('paragraph', { text: 'Second section paragraph one' }),
    ])

    const meta = createEditorMeta({
      doc,
      selection: { from: 105, to: 105, empty: true },
    } as never)

    expect(meta.pathText).toBe('Main Title / Section Two / paragraph 1')
  })

  it('builds meta for list items beneath nested headings', () => {
    const doc = createTestDoc([
      createTestNode('heading', { text: 'Main Title', attrs: { level: 1 } }),
      createTestNode('heading', { text: 'Section Title', attrs: { level: 2 } }),
      createTestNode('bulletList', {
        children: [
          createTestNode('listItem', { text: 'First item' }),
          createTestNode('listItem', { text: 'Second item' }),
        ],
      }),
    ])

    const meta = createEditorMeta({
      doc,
      selection: { from: 42, to: 42, empty: true },
    } as never)

    expect(meta.pathText).toBe('Main Title / Section Title / list / item 2')
  })

  it('treats task items as list entries in meta', () => {
    const doc = createTestDoc([
      createTestNode('heading', { text: 'Main Title', attrs: { level: 1 } }),
      createTestNode('taskList', {
        children: [
          createTestNode('taskItem', { text: 'First task' }),
          createTestNode('taskItem', { text: 'Second task' }),
        ],
      }),
    ])

    const meta = createEditorMeta({
      doc,
      selection: { from: 25, to: 25, empty: true },
    } as never)

    expect(meta.pathText).toBe('Main Title / list / item 2')
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

  it('passes meta through the footer slot', async () => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    mockEditor.state.doc = createTestDoc([
      createTestNode('heading', { text: 'Main Title', attrs: { level: 1 } }),
      createTestNode('paragraph', { text: 'Paragraph body words' }),
    ]) as any
    /* eslint-enable @typescript-eslint/no-explicit-any */
    mockEditor.state.selection = { empty: true, from: 18, to: 18 }

    const wrapper = mount(NyxEditor, {
      props: {
        hasFooter: true,
      },
      slots: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        footer: ({ meta }: any) => h('div', { class: 'custom-footer' }, `${meta.pathText} :: ${meta.wordCount}`),
      },
    })

    editorOptions.onCreate?.()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.custom-footer').text()).toBe('Main Title / paragraph 1 :: 5')
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
      [NyxAnnotationStatus.Draft]: NyxTheme.Warning,
      legal: NyxTheme.Danger,
    }

    const wrapper = mount(NyxEditor, { props: { annotationStatusTheme } })

    expect(wrapper.props('annotationStatusTheme')).toEqual(annotationStatusTheme)
  })

  it('supports custom statuses that are not present in the theme map', async () => {
    const wrapper = mount(NyxEditor, {
      props: {
        annotations: [{
          id: 'annotation-1',
          anchor: {
            text: 'picked',
            context: { prefix: '', suffix: '' },
            range: { from: 2, to: 8 },
          },
          interaction: NyxAnnotationInteraction.Default,
          status: 'legal',
          attachment: NyxAnnotationAttachment.Attached,
        }],
        annotationStatusTheme: {
          [NyxAnnotationStatus.Resolved]: NyxTheme.Success,
        },
      },
    })

    await wrapper.setProps({
      annotations: [{
        id: 'annotation-1',
        anchor: {
          text: 'picked',
          context: { prefix: 'a', suffix: 'b' },
          range: { from: 3, to: 9 },
        },
        interaction: NyxAnnotationInteraction.Default,
        status: 'legal',
        attachment: NyxAnnotationAttachment.Attached,
      }],
    })

    expect(mockEditor.view.dispatch).toHaveBeenCalled()
    expect(wrapper.props('annotationStatusTheme')).toEqual({
      [NyxAnnotationStatus.Resolved]: NyxTheme.Success,
    })
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

  it('emits updated annotations when document edits remap annotation ranges', async () => {
    const wrapper = mount(NyxEditor, {
      props: {
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
          interaction: NyxAnnotationInteraction.Default,
          status: NyxAnnotationStatus.Resolved,
          attachment: NyxAnnotationAttachment.Attached,
          tone: 'info',
        }],
      },
    })

    editorOptions.onTransaction?.({
      transaction: {
        docChanged: true,
        mapping: {
          map: (value: number) => value + 1,
        },
        doc: {
          content: { size: 40 },
          textBetween: (from: number, to: number) => {
            if (from === 1 && to === 3) return 'be'
            if (from === 9 && to === 41) return 'after'
            return ''
          },
        },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:annotations')).toEqual([[
      [
      {
        id: 'annotation-1',
        anchor: {
          text: 'picked',
          context: {
            prefix: 'be',
            suffix: 'after',
          },
          range: {
            from: 3,
            to: 9,
          },
        },
        interaction: NyxAnnotationInteraction.Default,
        status: NyxAnnotationStatus.Resolved,
        attachment: NyxAnnotationAttachment.Attached,
        tone: 'info',
      },
      ],
    ]])
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
    const outsideTarget = document.createElement('div')

    target.dataset.nyxAnnotationId = 'annotation-1'

    plugin.props.handleClick(null, 0, { target })
    plugin.props.handleDOMEvents.mousedown(null, { target: outsideTarget })

    expect(wrapper.emitted('annotation:blur')).toEqual([['annotation-1']])
  })
})
