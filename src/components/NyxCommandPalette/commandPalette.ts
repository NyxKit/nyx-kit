import type { NyxCommandPaletteGroup, NyxCommandPaletteItem } from './NyxCommandPalette.types'

export const normalize = (text: string) => text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
export const queryKey = (text: string) => normalize(text).trim().split(/\s+/u).filter(Boolean).join(' ')
const subsequence = (needle: string, field: string) => {
  const chars = Array.from(needle)
  let index = 0
  for (const char of field) if (char === chars[index]) index++
  return index === chars.length
}
const validText = (value: unknown): value is string => typeof value === 'string' && !!value.trim()

export function acceptGroups<T extends NyxCommandPaletteItem>(groups: readonly NyxCommandPaletteGroup<T>[]) {
  const groupIds = new Set<string>()
  const itemIds = new Set<string>()
  const rejected = (kind: string) => {
    if (import.meta.env.DEV) console.warn(`[NyxCommandPalette] Skipping invalid or duplicate ${kind}`)
  }
  return groups.flatMap(group => {
    if (!group || !validText(group.id) || groupIds.has(group.id) || !Array.isArray(group.items)) {
      rejected('group'); return []
    }
    groupIds.add(group.id)
    const items = group.items.filter(item => {
      if (!item || !validText(item.id) || !validText(item.label) || itemIds.has(item.id)) {
        rejected('item'); return false
      }
      itemIds.add(item.id)
      return true
    })
    return [{ group, items }]
  })
}

export function filterGroups<T extends NyxCommandPaletteItem>(accepted: ReturnType<typeof acceptGroups<T>>, query: string) {
  const normalized = queryKey(query)
  const tokens = normalized.split(' ')
  return accepted.flatMap(({ group, items }) => {
    const ranked = !normalized || group.ignoreFilter ? items : items.map((item, index) => {
      const label = normalize(item.label)
      const fields = [label, normalize(item.description ?? ''), ...(item.keywords ?? []).map(normalize)]
      const matches = tokens.every(token => fields.some(field => subsequence(token, field)))
      const rank = label === normalized ? 0 : label.startsWith(normalized) ? 1
        : tokens.every(token => fields.some(field => field.includes(token))) ? 2 : 3
      return { item, index, rank, matches }
    }).filter(row => row.matches).sort((a, b) => a.rank - b.rank || a.index - b.index).map(row => row.item)
    return ranked.length ? [{ group, items: ranked }] : []
  })
}
