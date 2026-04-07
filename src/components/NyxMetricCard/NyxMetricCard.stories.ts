import { defineComponent } from 'vue'
import NyxMetricCard from './NyxMetricCard.vue'
import { NyxTheme, NyxVariant, type KeyDict } from '@/types'
import type { NyxMetricCardProps } from './NyxMetricCard.types'
import { getKeyDictKeyByValue } from '@/utils'

export default {
  title: 'Components/NyxMetricCard',
  component: NyxMetricCard,
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    unit: { control: 'text' },
    suffix: { control: 'text' },
    icon: { control: 'text' },
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(NyxVariant),
    },
  },
}

// Single-card stories — args flow from Storybook controls
const Template = (args: NyxMetricCardProps) => ({
  components: { NyxMetricCard },
  setup () { return { args } },
  template: `<nyx-metric-card v-bind="args" style="width: 220px" />`,
})

// Multi-card showcase stories
const TemplateAllProp = (prop: string, dict: KeyDict<string>, baseProps: NyxMetricCardProps) => () => defineComponent({
  components: { NyxMetricCard },
  setup () {
    const values = Object.values(dict)
    const getLabel = (value: string) => getKeyDictKeyByValue(dict, value)
    return { prop, values, getLabel, baseProps }
  },
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
      <div v-for="value of values" :key="value" style="display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start;">
        <span style="font-size: 0.7rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.05em;">{{ getLabel(value) }}</span>
        <nyx-metric-card
          v-bind="{ ...baseProps, [prop]: value }"
          style="width: 200px"
        />
      </div>
    </div>
  `,
})

export const Default = Object.assign(Template.bind({}), { args: {
  title: 'ACTIVE NODES',
  value: '12/12',
} as NyxMetricCardProps })

export const WithUnit = Object.assign(Template.bind({}), { args: {
  title: 'SYSTEM UPTIME',
  value: '182',
  unit: 'h',
  theme: NyxTheme.Secondary,
  variant: NyxVariant.Soft,
} as NyxMetricCardProps })

export const WithSuffix = Object.assign(Template.bind({}), { args: {
  title: 'ACTIVE NODES',
  value: '12/12',
  suffix: 'STABLE',
  theme: NyxTheme.Success,
  variant: NyxVariant.Soft,
} as NyxMetricCardProps })

export const WithIcon = Object.assign(Template.bind({}), { args: {
  title: 'NETWORK LATENCY',
  value: '24',
  unit: 'ms',
  icon: 'wifi',
  theme: NyxTheme.Primary,
  variant: NyxVariant.Soft,
} as NyxMetricCardProps })

export const WithAll = Object.assign(Template.bind({}), { args: {
  title: 'AVG. HUMIDITY',
  value: '64',
  unit: '%',
  suffix: 'RISING',
  icon: 'trending-up',
  theme: NyxTheme.Warning,
  variant: NyxVariant.Soft,
} as NyxMetricCardProps })

export const AllVariants = TemplateAllProp('variant', NyxVariant, {
  title: 'ACTIVE NODES',
  value: '12/12',
  suffix: 'STABLE',
  theme: NyxTheme.Success,
})

export const AllThemes = TemplateAllProp('theme', NyxTheme, {
  title: 'METRIC',
  value: '42',
  unit: '%',
  icon: 'activity',
  variant: NyxVariant.Soft,
})

export const FilledVariants = TemplateAllProp('theme', NyxTheme, {
  title: 'CPU LOAD',
  value: '42',
  unit: '%',
  icon: 'cpu',
  variant: NyxVariant.Filled,
})
