export interface NyxStepsProps {
  steps: number|string[]
  completedColor?: string
  activeColor?: string
  defaultColor?: string,
  readonly?: boolean,
  direction?: 'row'|'column'
}
