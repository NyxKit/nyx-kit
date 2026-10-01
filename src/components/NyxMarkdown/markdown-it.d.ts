// markdown-it 14 exposes these ESM rule modules; @types covers the shared
// RuleInline signature but does not declare the individual rule entry points.
declare module 'markdown-it/lib/rules_inline/link.mjs' {
  import type { RuleInline } from 'markdown-it/lib/parser_inline.mjs'
  const rule: RuleInline
  export default rule
}
declare module 'markdown-it/lib/rules_inline/image.mjs' {
  import type { RuleInline } from 'markdown-it/lib/parser_inline.mjs'
  const rule: RuleInline
  export default rule
}
declare module 'markdown-it/lib/rules_inline/text.mjs' {
  import type { RuleInline } from 'markdown-it/lib/parser_inline.mjs'
  const rule: RuleInline
  export default rule
}
