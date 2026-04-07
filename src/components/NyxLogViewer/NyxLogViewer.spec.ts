import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NyxLogViewer from './NyxLogViewer.vue'
import type { NyxLogEntry } from '@/types'
import { NyxTheme } from '@/types'

const baseLog: NyxLogEntry = {
  timestamp: new Date('2024-01-15T10:23:45Z'),
  value: 'Server started',
}

describe('NyxLogViewer', () => {
  describe('US1 – timestamp and value display', () => {
    it('renders log entry value', () => {
      const wrapper = mount(NyxLogViewer, {
        props: { modelValue: [baseLog] }
      })
      expect(wrapper.find('.nyx-log-viewer__value').text()).toBe('Server started')
    })

    it('formats timestamp using default HH:mm:ss', () => {
      const wrapper = mount(NyxLogViewer, {
        props: { modelValue: [baseLog] }
      })
      expect(wrapper.find('.nyx-log-viewer__timestamp').text()).toMatch(/^\d{2}:\d{2}:\d{2}$/)
    })

    it('formats timestamp with custom format', () => {
      const wrapper = mount(NyxLogViewer, {
        props: { modelValue: [baseLog], timestampFormat: 'DD/MM/YYYY' }
      })
      expect(wrapper.find('.nyx-log-viewer__timestamp').text()).toBe('15/01/2024')
    })

    it('hides origin column when no entries have origin', () => {
      const wrapper = mount(NyxLogViewer, {
        props: { modelValue: [baseLog] }
      })
      expect(wrapper.find('.nyx-log-viewer__origin').exists()).toBe(false)
    })
  })

  describe('US2 – origin column', () => {
    it('shows origin column when at least one entry has origin', () => {
      const logs: NyxLogEntry[] = [
        { ...baseLog, origin: 'server' },
        { timestamp: new Date(), value: 'No origin' },
      ]
      const wrapper = mount(NyxLogViewer, {
        props: { modelValue: logs }
      })
      expect(wrapper.findAll('.nyx-log-viewer__origin')).toHaveLength(2)
    })

    it('displays origin text for entries that have it', () => {
      const logs: NyxLogEntry[] = [
        { ...baseLog, origin: 'api' },
      ]
      const wrapper = mount(NyxLogViewer, {
        props: { modelValue: logs }
      })
      expect(wrapper.find('.nyx-log-viewer__origin').text()).toBe('api')
    })

    it('shows empty origin cell for entries without origin', () => {
      const logs: NyxLogEntry[] = [
        { ...baseLog, origin: 'server' },
        { timestamp: new Date(), value: 'No origin' },
      ]
      const wrapper = mount(NyxLogViewer, {
        props: { modelValue: logs }
      })
      const originCells = wrapper.findAll('.nyx-log-viewer__origin')
      expect(originCells[1].text()).toBe('')
    })
  })

  describe('US3 – theme colouring', () => {
    it('applies theme class to value cell', () => {
      const log: NyxLogEntry = { ...baseLog, theme: NyxTheme.Danger }
      const wrapper = mount(NyxLogViewer, {
        props: { modelValue: [log] }
      })
      expect(wrapper.find('.nyx-log-viewer__value').classes()).toContain('theme-danger')
    })

    it('applies no theme class when theme is not set', () => {
      const wrapper = mount(NyxLogViewer, {
        props: { modelValue: [baseLog] }
      })
      expect(wrapper.find('.nyx-log-viewer__value').classes().some(c => c.startsWith('theme-'))).toBe(false)
    })

    it('supports all NyxTheme values', () => {
      const themes = Object.values(NyxTheme)
      for (const theme of themes) {
        const log: NyxLogEntry = { ...baseLog, theme }
        const wrapper = mount(NyxLogViewer, {
          props: { modelValue: [log] }
        })
        expect(wrapper.find('.nyx-log-viewer__value').classes()).toContain(`theme-${theme}`)
      }
    })
  })
})
