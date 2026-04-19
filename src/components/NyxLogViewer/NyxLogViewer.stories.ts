import { defineComponent, ref } from 'vue'
import NyxLogViewer from './NyxLogViewer.vue'
import { NyxTheme, NyxSort } from '@/types'
import type { NyxLogEntry } from '@/types'
import type { NyxLogViewerProps } from './NyxLogViewer.types'

export default {
  title: 'Components/Data/NyxLogViewer',
  component: NyxLogViewer,
  argTypes: {
    timestampFormat: { control: 'text' },
    sort: { control: { type: 'select' }, options: Object.values(NyxSort) },
    theme: { control: { type: 'select' }, options: [undefined, ...Object.values(NyxTheme)] },
  },
}

const sampleLogs: NyxLogEntry[] = [
  { timestamp: new Date('2024-01-15T10:23:44'), value: 'Initializing services...', origin: 'core' },
  { timestamp: new Date('2024-01-15T10:23:45'), value: 'Server started on port 3000', origin: 'server' },
  { timestamp: new Date('2024-01-15T10:23:46'), value: 'Database connected', origin: 'db', theme: NyxTheme.Success },
  { timestamp: new Date('2024-01-15T10:23:47'), value: 'Cache miss for key "user:123"', origin: 'cache', theme: NyxTheme.Warning },
  { timestamp: new Date('2024-01-15T10:23:48'), value: 'Request failed: connection timeout', origin: 'api', theme: NyxTheme.Danger },
  { timestamp: new Date('2024-01-15T10:23:49'), value: 'Retrying in 5s...', origin: 'api', theme: NyxTheme.Info },
  { timestamp: new Date('2024-01-15T10:23:54'), value: 'Reconnected successfully', origin: 'api', theme: NyxTheme.Success },
]

const logsNoOrigin: NyxLogEntry[] = [
  { timestamp: new Date('2024-01-15T10:23:44'), value: 'Initializing...' },
  { timestamp: new Date('2024-01-15T10:23:45'), value: 'Server started on port 3000' },
  { timestamp: new Date('2024-01-15T10:23:46'), value: 'Database connected', theme: NyxTheme.Success },
  { timestamp: new Date('2024-01-15T10:23:47'), value: 'Cache miss detected', theme: NyxTheme.Warning },
  { timestamp: new Date('2024-01-15T10:23:48'), value: 'Request failed: timeout', theme: NyxTheme.Danger },
]

const Template = (args: NyxLogViewerProps) => ({
  components: { NyxLogViewer },
  setup () {
    const logs = ref(sampleLogs)
    return { args, logs }
  },
  template: `<NyxLogViewer v-model="logs" v-bind="args" />`,
})

export const Default = Object.assign(Template.bind({}), {
  args: {} as NyxLogViewerProps,
})

export const CustomTimestampFormat = Object.assign(Template.bind({}), {
  args: { timestampFormat: 'DD/MM/YYYY HH:mm:ss' } as NyxLogViewerProps,
})

export const WithoutOrigin = Object.assign(
  ((args: NyxLogViewerProps) => ({
    components: { NyxLogViewer },
    setup () {
      const logs = ref(logsNoOrigin)
      return { args, logs }
    },
    template: `<NyxLogViewer v-model="logs" v-bind="args" />`,
  })).bind({}),
  { args: {} as NyxLogViewerProps }
)

export const AllThemes = () => defineComponent({
  components: { NyxLogViewer },
  setup () {
    const themes = Object.values(NyxTheme)
    const logs = ref<NyxLogEntry[]>(
      themes.map((theme, i) => ({
        timestamp: new Date(Date.now() + i * 1000),
        value: `Log entry with theme: ${theme}`,
        origin: theme,
        theme,
      }))
    )
    return { logs }
  },
  template: `<NyxLogViewer v-model="logs" />`,
})
