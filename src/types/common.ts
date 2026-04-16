import type { RouteLocationRaw } from 'vue-router'

export type KeyDict<T> = { [key: string]: T }

export interface NyxComponentProps {
  theme?: NyxTheme
  size?: NyxSize
  variant?: NyxVariant
  trigger?: NyxTrigger
  shape?: NyxShape
  pixel?: boolean
}

export enum NyxTheme {
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
  XLarge = 'xl',
  XXLarge = '2xl'
}

export enum NyxVariant {
  Filled = 'filled',
  Soft = 'soft',
  Subtle = 'subtle',
  Outline = 'outline',
  Ghost = 'ghost',
  Text = 'text',
}

export enum NyxAnimationState {
  Playing = 'playing',
  Paused = 'paused',
}

export enum NyxTrigger {
  Hover = 'hover',
  Click = 'click',
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
  icon?: string,
  route?: RouteLocationRaw,
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

export enum NyxEditorMode {
  Zen = 'zen',
  Toolbar = 'toolbar'
}

export enum NyxEditorFormat {
  Markdown = 'markdown',
  Html = 'html'
}

export enum NyxEditorToolbar {
  None = 'none',
  Default = 'default',
  CommentOnly = 'comment-only',
  Full = 'full' // default + comment-only
}

export enum NyxGridMode {
  Grid = 'grid',
  Masonry = 'masonry',
}

export enum NyxSort {
  None = 'none',
  Asc = 'asc',
  Desc = 'desc',
}

export enum NyxDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}
