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
