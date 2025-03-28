export type KeyDict<T> = { [key: string]: T }

export interface NyxComponentProps {
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant
  shape?: NyxShape
  pixel?: boolean
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

export enum NyxSize {
  XSmall = 'xs',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  XLarge = 'xl'
}

export enum NyxVariant {
  Solid = 'solid',
  Outline = 'outline',
  Ghost = 'ghost',
  Text = 'text'
}

export enum NyxShape {
  Rectangle = 'rectangle',
  Square = 'square',
  Circle = 'circle',
}

export enum NyxMediaType {
  Image = 'image',
  Video = 'video',
  Audio = 'audio'
}

export interface NyxBreadcrumb {
  label: string,
  href?: string
}

export enum NyxTabsVariant {
  Classic = 'classic',
  Modern = 'modern'
}

export enum NyxProgressVariant {
  Line = 'line',
  Dots = 'dots'
}
