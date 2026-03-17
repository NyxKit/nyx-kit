---
name: package manager preference
description: Use pnpm (not yarn) for running scripts in this project
type: feedback
---

Use `pnpm` to run scripts in nyx-kit, not `yarn`.

**Why:** User explicitly rejected a `yarn test:unit` call and said to use pnpm or npm instead. Both `pnpm-lock.yaml` and `package-lock.json` exist in the repo, but pnpm is preferred.

**How to apply:** Always use `pnpm <script>` (e.g. `pnpm test:unit`, `pnpm build`) when running package scripts in this project.
