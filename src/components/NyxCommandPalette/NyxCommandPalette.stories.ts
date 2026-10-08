import type { ConcreteComponent } from 'vue'
import type { NyxCommandPaletteProps, NyxCommandPaletteSelectEvent } from './NyxCommandPalette.types'
type StoryProps = NyxCommandPaletteProps & { open?: boolean, onSelect?: (event: NyxCommandPaletteSelectEvent) => void, onClose?: () => void }
import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within, waitFor } from 'storybook/test'
import { NyxSize, NyxTheme } from '@/types/common'
import NyxCommandPalette from './NyxCommandPalette.vue'
import NyxCommandPaletteDemo from './NyxCommandPaletteDemo.vue'
import NyxCommandPaletteRemoteDemo from './NyxCommandPaletteRemoteDemo.vue'

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
  args: { groups, inline: false, open: false, closeable: true },
  parameters: { docs: { description: { component: 'Standalone native-dialog command palette, or inline with `inline`. `v-model` is the last activated ID, `v-model:search-term` controls discovery, and `v-model:open` controls the overlay. `select` supplies { item, group, originalEvent }; selection never closes automatically. `close` reports user dismissal. Item content slots retain option semantics; do not add interactive descendants. Slots: item, item-leading, item-label, item-trailing, group-label, empty, loading, footer. Public focus() focuses visible enabled search. No global shortcuts or network requests are installed by the component.' } } },
  argTypes: {
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
export const Default: Story = {}
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Search commands (Ctrl / ⌘ K)' })
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
