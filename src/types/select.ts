export enum NyxSelectType {
  Single = 'single',
  Multiple = 'multiple'
}

export interface NyxSelectOptionGroup {
  label: string,
  options: NyxSelectOption[]
}

export interface NyxSelectOption {
  label: string,
  value: string,
  disabled?: boolean
}
