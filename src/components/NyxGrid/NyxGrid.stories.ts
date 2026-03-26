import { defineComponent, h, ref } from 'vue'
import { X as LucideX } from 'lucide-vue-next'
import { NyxSize, NyxTheme, NyxVariant, NyxGridMode } from '@/types'
import NyxButton from '../NyxButton/NyxButton.vue'
import NyxCard from '../NyxCard/NyxCard.vue'
import NyxGrid from './NyxGrid.vue'

type NyxGridStoryArgs = {
  title?: string
  mode?: NyxGridMode
  columns?: number
  gap?: NyxSize | number
}

const modeOptions = {
  'NyxGridMode.Grid': NyxGridMode.Grid,
  'NyxGridMode.Masonry': NyxGridMode.Masonry,
}

type StoryCard = {
  id: string
  title: string
  lines: string[]
}

const gapOptions = {
  'NyxSize.XSmall': NyxSize.XSmall,
  'NyxSize.Small': NyxSize.Small,
  'NyxSize.Medium': NyxSize.Medium,
  'NyxSize.Large': NyxSize.Large,
  'NyxSize.XLarge': NyxSize.XLarge,
}

const baseCards: StoryCard[] = [
  { id: 'alpha', title: 'Alpha', lines: ['Short summary block.', 'Useful for compact cards.'] },
  { id: 'beta', title: 'Beta', lines: ['A slightly longer card.', 'This one gives the layout more height.', 'Good for masonry demos.'] },
  { id: 'gamma', title: 'Gamma', lines: ['Medium sized content.', 'Balanced placeholder copy.'] },
  { id: 'delta', title: 'Delta', lines: ['Tall card example.', 'Adds visible stagger to the column flow.', 'Useful for checking reflow.', 'Keeps the demo lively.'] },
  { id: 'epsilon', title: 'Epsilon', lines: ['Another compact block.', 'Works well in tighter rows.'] },
]

function renderCard(card: StoryCard, footer?: () => ReturnType<typeof h>) {
  return h(
    NyxCard,
    {
      key: card.id,
      title: card.title,
      variant: NyxVariant.Soft,
    },
    {
      default: () => h(
        'div',
        { style: 'display:flex;flex-direction:column;gap:0.5rem;' },
        card.lines.map((line, index) => h(
          'p',
          {
            key: `${card.id}-${index}`,
            style: 'margin:0;color:var(--nyx-c-text-2);',
          },
          line,
        ))
      ),
      footer,
    }
  )
}

function renderCards(cards: StoryCard[]) {
  return cards.map(card => renderCard(card))
}

function createGridStory(options?: {
  footerText?: string
  headerSlot?: () => ReturnType<typeof h>
  cards?: StoryCard[]
}) {
  return (args: NyxGridStoryArgs) => defineComponent({
    setup() {
      return () => h(
        NyxGrid,
        args,
        {
          header: options?.headerSlot,
          default: () => renderCards(options?.cards ?? baseCards),
          footer: options?.footerText
            ? () => h('small', { style: 'color:var(--nyx-c-text-2);' }, options.footerText)
            : undefined,
        }
      )
    },
  })
}

export default {
  title: 'Components/NyxGrid',
  component: NyxGrid,
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: Object.keys(modeOptions),
      mapping: modeOptions,
    },
    columns: {
      control: { type: 'number' },
    },
    gap: {
      control: { type: 'select' },
      options: Object.keys(gapOptions),
      mapping: gapOptions,
    },
  },
}

export const Default = {
  render: createGridStory(),
  args: {
    title: 'Overview',
    columns: 3,
    gap: NyxSize.Medium,
  },
}

export const Footer = {
  render: createGridStory({ footerText: `${baseCards.length} placeholder cards` }),
  args: {
    title: 'Overview',
    columns: 3,
    gap: NyxSize.Medium,
  },
}

export const CustomHeader = {
  render: createGridStory({
    headerSlot: () => h(
      'div',
      { style: 'display:flex;justify-content:space-between;gap:1rem;align-items:center;' },
      [
        h('div', [
          h('h2', { style: 'margin:0;' }, 'Gallery'),
          h('p', { style: 'margin:0;color:var(--nyx-c-text-2);' }, 'Header slot overrides the title prop.'),
        ]),
        h(NyxButton, { theme: NyxTheme.Primary }, { default: () => 'Refresh' }),
      ]
    ),
    footerText: 'Custom footer content',
  }),
  args: {
    title: 'Fallback title',
    columns: 2,
    gap: NyxSize.Large,
  },
}

export const ContentOnly = {
  render: createGridStory({ cards: baseCards.slice(0, 3) }),
  args: {
    columns: 2,
    gap: NyxSize.Small,
  },
}

export const Masonry = {
  render: createGridStory(),
  args: {
    title: 'Masonry Layout',
    mode: NyxGridMode.Masonry,
    columns: 3,
    gap: NyxSize.Medium,
  },
}

export const DynamicReflow = {
  render: () => defineComponent({
    setup() {
      const cards = ref([...baseCards])
      const columns = ref(3)
      const nextId = ref(baseCards.length + 1)

      const addCard = () => {
        const index = nextId.value
        cards.value = [
          ...cards.value,
          {
            id: `stub-${index}`,
            title: `Stub ${index}`,
            lines: [
              'Newly added placeholder card.',
              index % 2 === 0 ? 'Compact body copy.' : 'A little extra content to vary the height.',
              ...(index % 3 === 0 ? ['Additional line to exaggerate masonry movement.'] : []),
            ],
          },
        ]
        nextId.value += 1
      }

      const removeCard = (id: string) => {
        cards.value = cards.value.filter(card => card.id !== id)
      }

      return () => h(NyxGrid, {
        title: 'Dynamic Reflow',
        mode: NyxGridMode.Masonry,
        columns: columns.value,
        gap: NyxSize.Medium,
      }, {
        header: () => h(
          'div',
          { style: 'display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;' },
          [
            h('div', [
              h('h2', { style: 'margin:0;' }, 'Dynamic Reflow'),
              h('p', { style: 'margin:0;color:var(--nyx-c-text-2);' }, 'Add and remove NyxCard placeholders to observe animated realignment.'),
            ]),
            h('div', { style: 'display:flex;gap:0.5rem;flex-wrap:wrap;' }, [
              h(NyxButton, { theme: NyxTheme.Success, onClick: addCard }, { default: () => 'Add card' }),
              h(NyxButton, {
                theme: NyxTheme.Info,
                variant: NyxVariant.Outline,
                onClick: () => { columns.value = columns.value === 3 ? 2 : 3 },
              }, { default: () => 'Toggle columns' }),
            ]),
          ]
        ),
        default: () => cards.value.map(card => renderCard(card, () => h(
          'div',
          { style: 'display:flex;justify-content:flex-end;' },
          [
            h(NyxButton, {
              theme: NyxTheme.Danger,
              variant: NyxVariant.Ghost,
              onClick: () => removeCard(card.id),
            }, {
              default: () => h(LucideX, { size: 16 }),
            }),
          ]
        ))),
        footer: () => h('small', { style: 'color:var(--nyx-c-text-2);' }, `${cards.value.length} cards in the grid`),
      })
    },
  }),
}

export const ZeroGap = {
  render: createGridStory(),
  args: {
    title: 'Zero Gap',
    columns: 3,
    gap: 0,
  },
}
