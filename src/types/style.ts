export type CssVariableKey = `--${string}`
export type CssVariablesDict = {
  [key: CssVariableKey]: string
}

export enum NyxPosition {
  TopLeft = 'top-left',
  TopCenter = 'top-center',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomCenter = 'bottom-center',
  BottomRight = 'bottom-right',
  LeftTop = 'left-top',
  LeftCenter = 'left-center',
  LeftBottom = 'left-bottom',
  RightTop = 'right-top',
  RightCenter = 'right-center',
  RightBottom = 'right-bottom'
}
