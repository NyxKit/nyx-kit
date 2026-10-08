import type { NyxMarkdownInlineRule } from './NyxMarkdown.types'

export interface Citation {
  reference: string
  label: string
  accessibleLabel: string
}
const lookup = new Map<string, Citation>([
  ['p1:m2', { reference: 'p1:m2', label: 'Message 2', accessibleLabel: 'Jump to rehearsal message' }],
  ['p1:m3', { reference: 'p1:m3', label: 'Message 3', accessibleLabel: 'Jump to notebook message' }],
])
export const citationRules: readonly NyxMarkdownInlineRule<Citation>[] = [
  {
    name: 'citation',
    match(source, offset) {
      if (!source.startsWith('[[', offset)) return null
      const match = /^\[\[(p\d+:m\d+)\]\]/.exec(source.slice(offset))
      const value = match ? lookup.get(match[1]) : undefined
      return match && value ? { length: match[0].length, value } : null
    },
  },
]

export const acceptance = `**A short explanation**

- **“The rehearsal starts at noon.”**  
  The speaker is giving a start time.  
  *There is no location in this sentence.* [[p1:m2]]

- **“Please bring the blue notebook.”**  
  This is a request to bring an item. [[p1:m3]]

___

What would you like to clarify?`

export const tablesAndCode =
  '| Item | Quantity | Notes |\n| :--- | ---: | :---: |\n| Notebook | 3 | Blue cover ' +
  '|\n| Pencil | 12 | Shared supplies |\n\nInline `code` stays in its ' +
  'paragraph.\n\n```typescript\nconst rehearsal = { location: "Studio", startsAt: ' +
  '"12:00", supplies: ["notebook", "pencil"] }\n```\n\n    Indented code keeps    ' +
  'spaces.\n'
export const untrusted =
  '<script>alert("synthetic")</script>\n\n<img src="https://example.com/unrequested.png" onerror="alert(1)">\n\n![A synthetic landscape](https://example.com/never-fetched.png)\n\n[Unsafe](javascript:alert(1)) [Protocol relative](//example.com) [Safe](https://example.com)\n\n```<svg/onload=alert(1)>\nLiteral code.\n```'
