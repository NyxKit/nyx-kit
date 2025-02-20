import { defineComponent } from 'vue'
import NyxCarousel from './NyxCarousel.vue'
import type { NyxCarouselProps } from './NyxCarousel.types'
import { NyxTheme } from '@/types'

const slides = [
  'https://images.unsplash.com/photo-1739382120665-fa6bcf8b7833?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1739560116855-23a8c43afb5c?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1739372680568-fb0a5c4ed053?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1739382122868-841cb1e669df?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

export default {
  title: 'Components/NyxCarousel',
  component: NyxCarousel,
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: Object.values(NyxTheme),
    },
  },
  args: {
    slides
  }
}

const Template = (args: NyxCarouselProps<string>) => defineComponent({
  components: { NyxCarousel },
  setup () {
    return { args }
  },
  template: `
    <nyx-carousel v-bind="args"></nyx-carousel>
  `,
})

export const Default = Template({ slides })
