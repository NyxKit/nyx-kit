export type CssVariableKey = `--${string}`
export type CssVariablesDict = {
  [key: CssVariableKey]: string|number
}

export enum NyxPosition {
  TopLeft = 'top-left',
  TopCenter = 'top-center',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomCenter = 'bottom-center',
  BottomRight = 'bottom-right',
  // LeftTop = 'left-top',
  LeftMiddle = 'left-middle',
  // LeftBottom = 'left-bottom',
  // RightTop = 'right-top',
  RightMiddle = 'right-middle',
  // RightBottom = 'right-bottom'
}
