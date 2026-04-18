export enum NyxSelectType {
  Single = 'single',
  Multiple = 'multiple'
}

export interface NyxSelectOptionGroup<T = string> {
  label: string,
  options: NyxSelectOption<T>[]
}

export interface NyxSelectOption<T = string> {
  label: string,
  value: T,
  disabled?: boolean
  icon?: string
}
