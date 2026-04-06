# Implementation Plan: Programmatic Confirmation Dialog

**Branch**: `013-programmatic-confirm` | **Date**: 2026-04-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/013-programmatic-confirm/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add a programmatic `Nyx.confirm()` method to the library that spawns a modal dialog using the existing NyxModal component. The method accepts an options object (theme, title, message, confirmText, cancelText) and returns a Promise that resolves with a NyxResult indicating user confirmation or cancellation.

## Technical Context

**Language/Version**: TypeScript (Vue 3)  
**Primary Dependencies**: Vue 3, NyxModal component, NyxResult class  
**Storage**: N/A (in-memory state)  
**Testing**: Vitest (unit), Playwright (E2E if needed)  
**Target Platform**: Web browsers (Vue 3 applications)  
**Project Type**: Vue 3 Component Library (`nyx-kit` npm package)  
**Performance Goals**: Modal appears within 100ms of call  
**Constraints**: Must reuse existing NyxModal - no duplicate modal implementation  
**Scale/Scope**: Single API method addition

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **II. Spec Before Code**: Spec file exists at `specs/013-programmatic-confirm/spec.md`
- **IV. Consumer-Library Contract**: Adding new public API (`Nyx.confirm()`) - must export properly
- **VII. Consistency Over Local Optimisation**: Must follow existing component patterns (useNyxProps, etc.)

## Project Structure

### Documentation (this feature)

```text
specs/013-programmatic-confirm/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── main.ts              # Add Nyx.confirm() export
├── classes/
│   └── NyxResult.ts     # Already exists - use for return type
├── components/
│   └── NyxModal/        # Already exists - reuse internally
├── composables/        # May need new composable for modal state management
└── index.ts            # Re-export Nyx object

# No additional projects needed - simple library extension
```

**Structure Decision**: Single library extension. No new projects or packages required. The `Nyx` object will be a new export alongside existing `NyxKit` plugin.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
