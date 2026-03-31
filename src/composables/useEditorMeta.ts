import { ref, type Ref } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import type {
  NyxEditorMeta,
  NyxEditorMetaPathSegment,
  NyxEditorMetaSelection,
} from '@/types/editor'

type MetaNodeLike = {
  type: { name: string }
  attrs?: Record<string, unknown>
  textContent?: string
  nodeSize: number
  childCount?: number
  child?: (index: number) => MetaNodeLike
}

type MetaDocLike = MetaNodeLike & {
  content: { size: number }
  textBetween: (from: number, to: number, blockSeparator?: string, leafText?: string) => string
  descendants: (callback: (node: MetaNodeLike, pos: number, parent: MetaNodeLike | null, index: number) => boolean | void) => void
}

type MetaSelectionLike = {
  from: number
  to: number
  empty: boolean
}

type MetaStateLike = {
  doc: MetaDocLike
  selection: MetaSelectionLike
}

const EMPTY_SELECTION: NyxEditorMetaSelection = {
  from: 0,
  to: 0,
  empty: true,
}

export const createEmptyMeta = (): NyxEditorMeta => ({
  segments: [],
  pathText: 'Document',
  wordCount: 0,
  selection: { ...EMPTY_SELECTION },
})

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim()

const _countIndexedSiblings = (parent: MetaNodeLike | null, typeName: string, currentIndex: number) => {
  if (!parent?.child || typeof parent.childCount !== 'number') return currentIndex + 1

  let count = 0
  for (let index = 0; index <= currentIndex; index += 1) {
    if (parent.child(index)?.type.name === typeName) count += 1
  }

  return Math.max(count, 1)
}

const getListType = (typeName: string) => {
  if (typeName === 'orderedList') return 'ordered'
  if (typeName === 'taskList') return 'task'
  return 'bullet'
}

const getListLabel = (_typeName: string) => 'list'

const containsPosition = (node: MetaNodeLike, pos: number, selectionPos: number) => {
  return selectionPos >= pos && selectionPos <= pos + node.nodeSize
}

export const createEditorMeta = (state: MetaStateLike | null | undefined): NyxEditorMeta => {
  if (!state?.doc || typeof state.doc.textBetween !== 'function') return createEmptyMeta()

  const selection = state.selection ?? EMPTY_SELECTION
  const contentSize = state.doc.content?.size ?? 0
  const text = normalizeWhitespace(state.doc.textBetween(0, contentSize, ' ', ' '))
  const wordCount = text ? text.split(/\s+/).length : 0
  const headingStack: NyxEditorMetaPathSegment[] = []
  const paragraphCountsBySection = new Map<string, number>()
  const selectionPos = selection.from

  let activeSegments: NyxEditorMetaPathSegment[] = []
  let activeScore = 0

  state.doc.descendants?.((node, pos, parent, index) => {
    if (node.type.name === 'heading') {
      const level = Number(node.attrs?.level ?? 1)
      const label = normalizeWhitespace(node.textContent ?? '') || 'untitled'

      while (headingStack.length && (headingStack[headingStack.length - 1].level ?? 1) >= level) {
        headingStack.pop()
      }

      const segment: NyxEditorMetaPathSegment = {
        type: 'heading',
        label,
        level,
      }

      headingStack.push(segment)

      if (containsPosition(node, pos, selectionPos) && activeScore < 1) {
        activeSegments = [...headingStack]
        activeScore = 1
      }
    }

    if (node.type.name === 'paragraph') {
      const sectionKey = headingStack.map((segment) => segment.label).join('>') || 'root'
      const paragraphIndex = (paragraphCountsBySection.get(sectionKey) ?? 0) + 1

      paragraphCountsBySection.set(sectionKey, paragraphIndex)

      if (!containsPosition(node, pos, selectionPos) || activeScore >= 2) return

      activeSegments = [
        ...headingStack,
        {
          type: 'paragraph',
          label: `paragraph ${paragraphIndex}`,
          index: paragraphIndex,
        },
      ]
      activeScore = 2
    }

    if ((node.type.name === 'listItem' || node.type.name === 'taskItem') && containsPosition(node, pos, selectionPos) && activeScore <= 3) {
      const listTypeName = parent?.type.name ?? 'bulletList'
      const listType = getListType(listTypeName)
      const itemIndex = index + 1

      activeSegments = [
        ...headingStack,
        {
          type: 'list',
          label: getListLabel(listTypeName),
          listType,
        },
        {
          type: 'list-item',
          label: `item ${itemIndex}`,
          index: itemIndex,
          listType,
        },
      ]
      activeScore = 3
    }
  })

  return {
    segments: activeSegments,
    pathText: activeSegments.length ? activeSegments.map((segment) => segment.label).join(' / ') : 'Document',
    wordCount,
    selection: {
      from: selection.from,
      to: selection.to,
      empty: selection.empty,
    },
  }
}

const useEditorMeta = (editor: Ref<Editor | null | undefined>) => {
  const meta = ref<NyxEditorMeta>(createEmptyMeta())

  const refreshMeta = () => {
    meta.value = createEditorMeta(editor.value?.state as MetaStateLike | undefined)
  }

  return {
    meta,
    refreshMeta,
  }
}

export default useEditorMeta
