# CLAUDE.md

Read `AGENTS.md` before doing anything else.

Persistent memory lives in `.claude/memory/`. Read `MEMORY.md` there for accumulated context and feedback before starting work.

---

## Edit Style

**Plan before editing.**
For any non-trivial change, identify all affected files before touching any of them. State the plan and confirm if the scope is larger than expected.

**Minimize diff size.**
Make the smallest change that achieves the goal. A targeted `Edit` on three lines is better than rewriting a section. Prefer surgical edits over reconstructions.

**Avoid broad rewrites.**
Do not rewrite a file to clean it up unless that is the explicit request. Reformatting, restructuring, or "improving" content beyond the stated task introduces noise and risks losing intent.

**Ask before introducing dependencies.**
Do not add a new Rust crate, npm package, or external service without flagging it first. State what it is, why it is needed, and whether there is a lighter alternative already in scope.

---

## Spec-Driven Development (spec-kit)

This project uses [GitHub spec-kit](https://github.com/github/spec-kit) for spec-driven development. Slash commands are available at `.claude/commands/speckit.*.md` for Claude Code and mirrored at `.opencode/commands/speckit.*.md` for OpenCode.

**Workflow for new features:**

1. `/speckit.specify` — turn a feature description into a structured spec
2. `/speckit.clarify` *(optional)* — de-risk ambiguous areas before planning
3. `/speckit.plan` — generate a technical implementation plan
4. `/speckit.checklist` *(optional)* — validate spec completeness
5. `/speckit.tasks` — derive an ordered task list from the plan
6. `/speckit.analyze` *(optional)* — cross-artifact consistency check
7. `/speckit.implement` — execute all tasks

Spec artifacts live in `.specify/<feature-branch>/` (spec.md, plan.md, tasks.md).

The OpenCode command mirrors are generated from the Claude command files by `.specify/scripts/bash/sync-opencode-commands.sh`. When a Spec Kit command changes, re-run that script so both environments stay aligned.

**Nyx Kit specific rule:** every `/speckit.specify` run must also produce or update the corresponding `docs/specs/<layer>/<Symbol>.spec.md` file. The spec-kit artifact and the docs spec are complementary — keep both in sync.

The project constitution is at `.specify/memory/constitution.md`.

## Design Decisions — Do Not Re-Audit

**Global CSS reset is intentional.** `nyx-kit/style.css` ships a full Meyerweb reset and `body` base styles by design. Consumers build on top of Nyx Kit's baseline. Do not flag the reset as a bug, recommend scoping it, or suggest making it opt-in.

---

## Active Technologies
- TypeScript 5.x / Vue 3 + `@vue/test-utils`, `vitest`, `@playwright/test`, `jsdom` (003-testing-improvements)
- TypeScript 5.x / Vue 3.5+ + Vue `inject`, `ref`, `computed`, `onUnmounted` (all already in use) (004-colour-mode-system)
- Module-level singleton `ref` (no persistence in v1) (004-colour-mode-system)
- TypeScript 5.7 / Vue 3.5 + Vue 3 (ref, computed, defineProps, defineEmits, defineModel), SCSS (005-nyx-tree)
- N/A — all state is local/instance-level (005-nyx-tree)
- TypeScript 5.7 / Vue 3.5 + Vue 3 (`computed`, `ref`, `useSlots`, `watch`, `nextTick`, lifecycle hooks), SCSS (006-add-nyx-grid)
- N/A - layout state is ephemeral DOM measurement only (006-add-nyx-grid)

## Recent Changes
- 003-testing-improvements: Added TypeScript 5.x / Vue 3 + `@vue/test-utils`, `vitest`, `@playwright/test`, `jsdom`
