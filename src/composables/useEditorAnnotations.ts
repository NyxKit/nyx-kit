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
import { NyxAnnotationAttachment, NyxTheme } from '@/types'

interface UseEditorAnnotationsOptions {
  editor: Ref<Editor | null | undefined>
  annotations: Ref<NyxAnnotation[]> | ComputedRef<NyxAnnotation[]>
  annotationStatusTheme: Ref<NyxAnnotationStatusTheme> | ComputedRef<NyxAnnotationStatusTheme>
  updateAnnotations: (annotations: NyxAnnotation[]) => void
  onCreate: (anchor: NyxAnnotationAnchor) => void
  onFocus: (id: string) => void
  onBlur: (id: string) => void
}

const ANNOTATION_CONTEXT_WINDOW = 32

const useEditorAnnotations = (options: UseEditorAnnotationsOptions) => {
  const annotationPluginKey = new PluginKey('nyx-editor-annotations')
  let focusedAnnotationId: string | null = null

  const getThemeRgbVariable = (theme: NyxTheme) => `var(--nyx-rgb-${theme})`

  const getAnnotationStyles = (annotation: NyxAnnotation) => {
    const statusTheme = options.annotationStatusTheme.value[annotation.status] ?? NyxTheme.Primary

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

  const buildAnchorFromRange = (doc: { textBetween: (from: number, to: number) => string }, from: number, to: number, text: string) => {
    const prefixStart = Math.max(1, from - ANNOTATION_CONTEXT_WINDOW)
    const suffixEnd = to + ANNOTATION_CONTEXT_WINDOW

    return {
      text,
      context: {
        prefix: doc.textBetween(prefixStart, from),
        suffix: doc.textBetween(to, suffixEnd),
      },
      range: { from, to },
    }
  }

  const remapAnnotations = (transaction: Transaction) => {
    if (!options.annotations.value.length) return

    const maxOffset = Math.max(transaction.doc.content.size, 1)
    let changed = false

    const nextAnnotations: NyxAnnotation[] = options.annotations.value.map((annotation) => {
      const mappedFrom = Math.max(1, Math.min(transaction.mapping.map(annotation.anchor.range.from, -1), maxOffset))
      const mappedTo = Math.max(1, Math.min(transaction.mapping.map(annotation.anchor.range.to, 1), maxOffset))
      const isAttached = mappedFrom < mappedTo
      const nextAttachment = isAttached ? NyxAnnotationAttachment.Attached : NyxAnnotationAttachment.Detached

      if (!isAttached) {
        if (annotation.attachment !== 'detached' || annotation.anchor.range.from !== mappedFrom || annotation.anchor.range.to !== mappedTo) {
          changed = true
        }

        return {
          ...annotation,
          attachment: NyxAnnotationAttachment.Detached,
          anchor: {
            ...annotation.anchor,
            range: {
              from: mappedFrom,
              to: mappedTo,
            },
          },
        }
      }

      const nextAnchor = buildAnchorFromRange(transaction.doc, mappedFrom, mappedTo, annotation.anchor.text)

      if (
        annotation.anchor.range.from !== nextAnchor.range.from ||
        annotation.anchor.range.to !== nextAnchor.range.to ||
        annotation.anchor.context.prefix !== nextAnchor.context.prefix ||
        annotation.anchor.context.suffix !== nextAnchor.context.suffix ||
        annotation.attachment !== nextAttachment
      ) {
        changed = true
      }

      return {
        ...annotation,
        attachment: nextAttachment,
        anchor: nextAnchor,
      }
    })

    if (changed) options.updateAnnotations(nextAnnotations)
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

    if (focusedAnnotationId && focusedAnnotationId !== id) {
      options.onBlur(focusedAnnotationId)
    }

    focusedAnnotationId = id

    options.onFocus(id)
    return true
  }

  const clearFocusedAnnotation = () => {
    if (!focusedAnnotationId) return false

    options.onBlur(focusedAnnotationId)
    focusedAnnotationId = null
    return true
  }

  const _emitAnnotationBlur = (target: EventTarget | null) => {
    const id = getAnnotationIdFromTarget(target)
    if (!id || focusedAnnotationId !== id) return false

    return clearFocusedAnnotation()
  }

  const annotationExtension = Extension.create({
    name: 'nyxAnnotations',

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: annotationPluginKey,
          state: {
            init: (_: unknown, state: EditorState) => createAnnotationDecorations(state.doc, options.annotations.value),
            apply: (transaction: Transaction, oldDecorationState: DecorationSet, _oldEditorState: EditorState, newState: EditorState) => {
              if (transaction.getMeta(annotationPluginKey)) {
                return createAnnotationDecorations(newState.doc, options.annotations.value)
              }

              if (transaction.docChanged) {
                return oldDecorationState.map(transaction.mapping, newState.doc)
              }

              return oldDecorationState
            },
          },
          props: {
            decorations(state: EditorState) {
              return annotationPluginKey.getState(state) as DecorationSet | null
            },
            handleClick: (_view: EditorView, _pos: number, event: MouseEvent) => {
              const didFocus = emitAnnotationFocus(event.target)
              if (!didFocus) {
                clearFocusedAnnotation()
              }

              return didFocus
            },
            handleDOMEvents: {
              mousedown: (_view: EditorView, event: MouseEvent) => {
                if (!getAnnotationIdFromTarget(event.target)) {
                  clearFocusedAnnotation()
                }

                return false
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

    return buildAnchorFromRange(editor.state.doc, startOffset, endOffset, text)
  }

  const syncAnnotationDecorations = () => {
    const editor = options.editor.value
    if (!editor?.view) return

    editor.view.dispatch(editor.state.tr.setMeta(annotationPluginKey, true))
  }

  const onCreateAnnotation = () => {
    const anchor = getCurrentSelectionAnchor()
    if (!anchor) return

    options.onCreate(anchor)
  }

  const syncAnnotations = () => {
    syncAnnotationDecorations()
  }

  return {
    annotationExtension,
    getCurrentSelectionAnchor,
    onCreateAnnotation,
    clearFocusedAnnotation,
    remapAnnotations,
    syncAnnotationDecorations,
    syncAnnotations,
  }
}

export default useEditorAnnotations
