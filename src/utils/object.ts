import type { DefineComponent } from 'vue'

export const isObject = (val: unknown): val is object => typeof val === 'object' && !Array.isArray(val) && val !== null
export const isHtmlElement = (val: unknown): val is HTMLElement => typeof val === 'object' && val !== null && 'getBoundingClientRect' in val

export const resolveToHtmlElement = (value: HTMLElement | DefineComponent | null): HTMLElement | null => {
  if (!value) return null
  return isHtmlElement(value) ? value : (value as DefineComponent).$el
}
