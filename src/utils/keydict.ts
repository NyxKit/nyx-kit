import type { KeyDict } from "@/types"

export const getKeyDictKeyByValue = <T extends keyof KeyDict<T>>(dict: KeyDict<T>, value: T): string|null => {
  return Object.entries(dict).find(([_key, val]) => val === value)?.[0] ?? null
}
