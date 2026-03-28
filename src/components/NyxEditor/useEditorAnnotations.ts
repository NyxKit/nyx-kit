import type { ComputedRef, Ref } from 'vue'
import { Extension } from '@tiptap/core'
import type { Editor } from '@tiptap/vue-3'
import { Plugin, PluginKey, type EditorState, type Transaction } from 'prosemirror-state'
import { Decoration, DecorationSet, type EditorView } from 'prosemirror-view'
import type {
  NyxAnnotation,
  NyxAnnotationAnchor,
  NyxAnnotationStatusTheme,
} from '@/types/editor'
import { NyxTheme } from '@/types'

interface UseEditorAnnotationsOptions {
  editor: Ref<Editor | null | undefined>
  annotations: Ref<NyxAnnotation[]> | ComputedRef<NyxAnnotation[]>
  annotationStatusTheme: Ref<NyxAnnotationStatusTheme> | ComputedRef<NyxAnnotationStatusTheme>
  emitCreate: (anchor: NyxAnnotationAnchor) => void
  emitFocus: (id: string) => void
  emitBlur: (id: string) => void
}

const ANNOTATION_CONTEXT_WINDOW = 32

export default function useEditorAnnotations(options: UseEditorAnnotationsOptions) {
  const annotationPluginKey = new PluginKey('nyx-editor-annotations')

  const getThemeRgbVariable = (theme: NyxTheme) => `var(--nyx-rgb-${theme})`

  const getAnnotationStyles = (annotation: NyxAnnotation) => {
    const statusTheme = options.annotationStatusTheme.value[annotation.status]

    return [
      `--nyx-annotation-rgb: ${getThemeRgbVariable(statusTheme)}`,
      `--nyx-annotation-attachment-rgb: ${getThemeRgbVariable(NyxTheme.Warning)}`,
    ].join('; ')
  }

  const clampAnnotationRange = (annotation: NyxAnnotation, maxOffset: number) => {
    const from = Math.max(1, Math.min(annotation.anchor.range.from, maxOffset))
    const to = Math.max(1, Math.min(annotation.anchor.range.to, maxOffset))

    if (from >= to) return null

    return { from, to }
  }

  const getAnnotationClasses = (annotation: NyxAnnotation) => {
    return [
      'nyx-editor__annotation',
      `is-interaction-${annotation.interaction}`,
      `is-status-${annotation.status}`,
      `is-attachment-${annotation.attachment}`,
    ].join(' ')
  }

  const createAnnotationDecorations = (doc: { content: { size: number } }, annotations: NyxAnnotation[]) => {
    const maxOffset = Math.max(doc.content.size, 1)
    const decorations = annotations.flatMap((annotation) => {
      const range = clampAnnotationRange(annotation, maxOffset)
      if (!range) return []

      return Decoration.inline(range.from, range.to, {
        class: getAnnotationClasses(annotation),
        style: getAnnotationStyles(annotation),
        'data-nyx-annotation-id': annotation.id,
        'data-nyx-annotation-interaction': annotation.interaction,
        'data-nyx-annotation-status': annotation.status,
        'data-nyx-annotation-attachment': annotation.attachment,
        tabindex: '0',
        role: 'button',
        'aria-label': `Annotation ${annotation.id}`,
      })
    })

    return DecorationSet.create(doc as never, decorations)
  }

  const getAnnotationIdFromTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return null

    return target.closest<HTMLElement>('[data-nyx-annotation-id]')?.dataset.nyxAnnotationId ?? null
  }

  const emitAnnotationFocus = (target: EventTarget | null) => {
    const id = getAnnotationIdFromTarget(target)
    if (!id) return false

    options.emitFocus(id)
    return true
  }

  const emitAnnotationBlur = (target: EventTarget | null) => {
    const id = getAnnotationIdFromTarget(target)
    if (!id) return false

    options.emitBlur(id)
    return true
  }

  const annotationExtension = Extension.create({
    name: 'nyxAnnotations',

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: annotationPluginKey,
          state: {
            init: (_: unknown, state: EditorState) => createAnnotationDecorations(state.doc, options.annotations.value),
            apply: (transaction: Transaction, _oldState: DecorationSet, _oldEditorState: EditorState, newState: EditorState) => {
              if (transaction.docChanged || transaction.getMeta(annotationPluginKey)) {
                return createAnnotationDecorations(newState.doc, options.annotations.value)
              }

              return createAnnotationDecorations(newState.doc, options.annotations.value)
            },
          },
          props: {
            decorations(state: EditorState) {
              return annotationPluginKey.getState(state) as DecorationSet | null
            },
            handleClick: (_view: EditorView, _pos: number, event: MouseEvent) => emitAnnotationFocus(event.target),
            handleDOMEvents: {
              focusin: (_view: EditorView, event: FocusEvent) => emitAnnotationFocus(event.target),
              focusout: (_view: EditorView, event: FocusEvent) => emitAnnotationBlur(event.target),
              keydown: (_view: EditorView, event: KeyboardEvent) => {
                if (event.key !== 'Enter' && event.key !== ' ') return false

                const didEmit = emitAnnotationFocus(event.target)
                if (didEmit) event.preventDefault()
                return didEmit
              },
            },
          },
        }),
      ]
    },
  })

  const getCurrentSelectionAnchor = (): NyxAnnotationAnchor | null => {
    const editor = options.editor.value
    if (!editor || editor.state.selection.empty) return null

    const startOffset = editor.state.selection.from
    const endOffset = editor.state.selection.to
    const text = editor.state.doc.textBetween(startOffset, endOffset)

    if (!text.trim()) return null
    if (startOffset >= endOffset) return null

    const prefixStart = Math.max(1, startOffset - ANNOTATION_CONTEXT_WINDOW)
    const suffixEnd = endOffset + ANNOTATION_CONTEXT_WINDOW

    return {
      text,
      context: {
        prefix: editor.state.doc.textBetween(prefixStart, startOffset),
        suffix: editor.state.doc.textBetween(endOffset, suffixEnd),
      },
      range: {
        from: startOffset,
        to: endOffset,
      },
    }
  }

  const syncAnnotationDecorations = () => {
    const editor = options.editor.value
    if (!editor?.view) return

    editor.view.dispatch(editor.state.tr.setMeta(annotationPluginKey, true))
  }

  const onCreateAnnotation = () => {
    const anchor = getCurrentSelectionAnchor()
    if (!anchor) return

    options.emitCreate(anchor)
  }

  const syncAnnotations = () => {
    syncAnnotationDecorations()
  }

  return {
    annotationExtension,
    getCurrentSelectionAnchor,
    onCreateAnnotation,
    syncAnnotationDecorations,
    syncAnnotations,
  }
}
