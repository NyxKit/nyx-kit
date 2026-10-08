import { NyxCommandPaletteViewportMode } from './NyxCommandPalette.types'
import type { ConcreteComponent } from 'vue'
import type { NyxCommandPaletteProps, NyxCommandPaletteSelectEvent } from './NyxCommandPalette.types'
type StoryProps = NyxCommandPaletteProps & { open?: boolean, onSelect?: (event: NyxCommandPaletteSelectEvent) => void, onClose?: () => void }
import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within, waitFor } from 'storybook/test'
import { NyxSize, NyxTheme } from '@/types/common'
import NyxCommandPalette from './NyxCommandPalette.vue'
import NyxCommandPaletteDemo from './storybook/NyxCommandPaletteDemo.vue'
import NyxCommandPaletteRemoteDemo from './storybook/NyxCommandPaletteRemoteDemo.vue'
import NyxCommandPaletteConversationsDemo from './storybook/NyxCommandPaletteConversationsDemo.vue'

const groups = [
  { id: 'actions', label: 'Actions', items: [
    { id: 'settings', label: 'Open settings', description: 'Manage your workspace', icon: 'settings', keywords: ['preferences'], shortcuts: ['Ctrl', ','] },
    { id: 'file', label: 'Create file', icon: 'file-plus', shortcuts: ['Ctrl', 'N'] },
    { id: 'locked', label: 'Delete workspace', description: 'Administrator access required', disabled: true, icon: 'lock' },
  ] },
  { id: 'destinations', label: 'Destinations', items: [
    { id: 'cafe', label: 'Café dashboard', description: 'Project overview', icon: 'layout-dashboard' },
    { id: 'docs', label: 'Documentation', description: 'Read the user guide', icon: 'book-open', keywords: ['help'] },
  ] },
]
const meta = {
  title: 'Components/Navigation/NyxCommandPalette',
  component: NyxCommandPalette as ConcreteComponent<StoryProps>,
  tags: ['autodocs'],
  args: { groups, viewportMode: NyxCommandPaletteViewportMode.Always, inline: false, open: false, closeable: true },
  parameters: { docs: { description: { component: 'Standalone native-dialog command palette, or inline with `inline`. `v-model` is the last activated ID, `v-model:search-term` controls discovery, and `v-model:open` controls the overlay. `select` supplies { item, group, originalEvent }; selection never closes automatically. `close` reports user dismissal. Item content slots retain option semantics; do not add interactive descendants. Slots: item, item-leading, item-label, item-trailing, group-label, empty, loading, footer. Public focus() focuses visible enabled search. Set shortcut="SUPER+K" to opt into Ctrl/Meta+K toggling, or pass a custom chord. viewportMode defaults to AfterInteraction: reveal on typing, footer button, or Enter and keep results visible after clearing. WhileSearching hides on clear; Always shows immediately. Requests and navigation remain consumer-owned.' } } },
  argTypes: {
    shortcut: { control: 'text' }, viewportMode: { control: 'select', options: Object.values(NyxCommandPaletteViewportMode) }, showResultsLabel: { control: 'text' },
    open: { control: 'boolean' }, inline: { control: 'boolean' },
    theme: { control: 'select', options: [undefined, ...Object.values(NyxTheme)] },
    size: { control: 'select', options: [undefined, ...Object.values(NyxSize)] },
    placeholder: { control: 'text' }, label: { control: 'text' },
    loading: { control: 'boolean' }, disabled: { control: 'boolean' }, loop: { control: 'boolean' },
    autofocus: { control: 'boolean' }, closeable: { control: 'boolean' },
    onSelect: { action: 'select' }, onClose: { action: 'close' },
  },
  render: args => ({ components: { NyxCommandPaletteDemo }, setup: () => ({ args }), template: '<NyxCommandPaletteDemo :args="args" />' }),
} satisfies Meta<StoryProps>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: { viewportMode: NyxCommandPaletteViewportMode.AfterInteraction } }
export const AlwaysShown: Story = { args: { viewportMode: NyxCommandPaletteViewportMode.Always } }
export const Inline: Story = { args: { inline: true } }
export const Controlled: Story = {
  args: { inline: true },
  render: args => ({ components: { NyxCommandPaletteDemo }, setup: () => ({ args }), template: '<NyxCommandPaletteDemo :args="args" controlled />' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Choose settings externally' }))
    await expect(canvas.getByRole('combobox')).toHaveValue('settings')
    await expect(canvas.getByRole('option', { name: 'Open settings' })).toHaveAttribute('aria-selected', 'true')
    await expect(canvas.getByText(/Activations: 0/)).toBeVisible()
  },
}
export const Search: Story = {
  args: { inline: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox')
    await userEvent.type(input, 'CAFE dashboard')
    await expect(canvas.getAllByRole('option')).toHaveLength(1)
    await expect(canvas.getByRole('option')).toHaveAccessibleName('Café dashboard')
    await userEvent.clear(input)
    await userEvent.type(input, 'opst{Enter}')
    await expect(canvas.getByText(/Activations: 1/)).toBeVisible()
  },
}
export const KeyboardNavigation: Story = {
  args: { inline: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('combobox'))
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}')
    await expect(canvas.getByText(/Last command: Café dashboard/)).toBeVisible()
    await userEvent.click(canvas.getByRole('option', { name: 'Delete workspace' }))
    await expect(canvas.getByText(/Activations: 1/)).toBeVisible()
  },
}
export const CustomSlots: Story = {
  args: { inline: true },
  render: args => ({ components: { NyxCommandPaletteDemo }, setup: () => ({ args }), template: '<NyxCommandPaletteDemo :args="args" custom />' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('option', { name: 'Create file' }))
    await expect(canvas.getByText(/Last command: Create file/)).toBeVisible()
  },
}
export const ItemSlotPrecedence: Story = {
  args: { inline: true },
  render: args => ({ components: { NyxCommandPaletteDemo }, setup: () => ({ args }), template: '<NyxCommandPaletteDemo :args="args" custom full-item />' }),
}
export const Empty: Story = { args: { inline: true, groups: [] } }
export const Loading: Story = { args: { inline: true, loading: true } }
export const Disabled: Story = { args: { inline: true, disabled: true } }
export const AllDisabled: Story = { args: { inline: true, groups: [{ id: 'locked', items: groups[0].items.map(item => ({ ...item, disabled: true })) }] } }
export const RemoteSearch: Story = { render: () => ({ components: { NyxCommandPaletteRemoteDemo }, template: '<NyxCommandPaletteRemoteDemo />' }) }
export const Overlay: Story = {
  args: { shortcut: 'SUPER+K' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Search commands (SUPER+K)' })
    trigger.focus()
    await userEvent.keyboard('{Control>}k{/Control}')
    await waitFor(() => expect(page.getByRole('dialog')).toBeVisible())
    await expect(page.getByRole('combobox')).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(trigger).toHaveFocus())
    await userEvent.keyboard('{Meta>}k{/Meta}')
    await waitFor(() => expect(page.getByRole('dialog')).toBeVisible())
    await userEvent.keyboard('{Enter}')
    await expect(canvas.getByText(/Activations: 1/)).toBeVisible()
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}
export const Themes: Story = {
  render: args => ({ components: { NyxCommandPaletteDemo }, setup: () => ({ args, values: [undefined, ...Object.values(NyxTheme)] }), template: '<div style="display: grid; gap: var(--nyx-gap-xl)"><NyxCommandPaletteDemo v-for="theme in values" :key="theme || \'inherited\'" :args="{ ...args, theme, inline: true }" /></div>' }),
}
export const Sizes: Story = {
  render: args => ({ components: { NyxCommandPaletteDemo }, setup: () => ({ args, values: [undefined, ...Object.values(NyxSize)] }), template: '<div style="display: grid; gap: var(--nyx-gap-xl); width: min(100%, 320px)"><NyxCommandPaletteDemo v-for="size in values" :key="size || \'inherited\'" :args="{ ...args, size, inline: true, groups: [{ id: \'long\', items: [{ id: \'long\', label: \'Open workspace settings and manage notification preferences for your entire team\' }] }] }" /></div>' }),
}
export const MultipleInstances: Story = {
  args: { inline: true },
  render: args => ({ components: { NyxCommandPaletteDemo }, setup: () => ({ args }), template: '<div style="display: grid; gap: var(--nyx-gap-xl)"><NyxCommandPaletteDemo :args="args" /><NyxCommandPaletteDemo :args="args" /></div>' }),
}

export const SearchOnly: Story = {
  args: { inline: true, viewportMode: NyxCommandPaletteViewportMode.WhileSearching },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox')
    await expect(input).toHaveAttribute('aria-expanded', 'false')
    await userEvent.type(input, 'settings')
    await expect(input).toHaveAttribute('aria-expanded', 'true')
    await userEvent.clear(input)
    await expect(input).toHaveAttribute('aria-expanded', 'false')
  },
}
export const CustomShortcut: Story = {
  args: { shortcut: 'Ctrl+Enter', viewportMode: NyxCommandPaletteViewportMode.AfterInteraction },
  render: args => ({
    components: { NyxCommandPaletteDemo },
    setup: () => ({ args }),
    template: '<p>Focus this preview before using the shortcut, or open the story in a new tab. Browser and OS shortcuts may take precedence.</p><NyxCommandPaletteDemo :args="args" />',
  }),
}
export const ConversationSearch: Story = {
  render: () => ({ components: { NyxCommandPaletteConversationsDemo }, template: '<NyxCommandPaletteConversationsDemo />' }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    await userEvent.click(canvas.getByRole('button', { name: 'Find a conversation' }))
    await userEvent.type(page.getByRole('combobox'), 'release')
    const result = await page.findByRole('option', { name: 'Release planning' })
    await userEvent.click(result)
    await waitFor(() => expect(canvas.getByRole('heading', { name: 'Release planning' })).toBeVisible())
    await waitFor(() => expect(canvas.getByText('/conversations/release')).toBeVisible())
  },
}

export const RevealAndKeepOpen: Story = {
  args: { inline: true, viewportMode: NyxCommandPaletteViewportMode.AfterInteraction },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox')
    await expect(input).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(canvas.getByRole('button', { name: 'Show results' }))
    await expect(input).toHaveFocus()
    await expect(input).toHaveAttribute('aria-expanded', 'true')
    await userEvent.type(input, 'settings')
    await userEvent.clear(input)
    await expect(input).toHaveAttribute('aria-expanded', 'true')
  },
}
