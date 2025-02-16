export type KeyDict<T> = { [key: string]: T }

export enum NyxSize {
  XSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  XLarge = 'xl'
}

export enum NyxTheme {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info'
}

export enum NyxButtonVariant {
  Solid = 'solid',
  Outline = 'outline',
  Ghost = 'ghost',
  Text = 'text'
}
