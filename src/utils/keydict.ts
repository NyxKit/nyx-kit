import type { KeyDict } from "@/types"

export const getKeyDictKeyByValue = <T extends keyof KeyDict<T>>(dict: KeyDict<T>, value: T): string|null => {
  return Object.entries(dict).find(([_key, val]) => val === value)?.[0] ?? null
}

export const isObject = (val: unknown): val is Object => typeof val === 'object' && !Array.isArray(val) && val !== null
