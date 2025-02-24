export type CssVariableKey = `--${string}`
export type CssVariablesDict = {}|{
  [key: CssVariableKey]: string|number
}

export enum NyxPosition {
  Top = 'top',
  TopLeft = 'top-left',
  TopRight = 'top-right',
  Bottom = 'bottom',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  // LeftTop = 'left-top',
  Left = 'left',
  // LeftBottom = 'left-bottom',
  // RightTop = 'right-top',
  Right = 'right',
  // RightBottom = 'right-bottom'
}
