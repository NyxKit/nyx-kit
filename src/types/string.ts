export type HexCode = `#${string & { length: 6 }}` | `#${string & { length: 8 }}`
export type DurationSpeed = `${number}s` | `${number}ms`
