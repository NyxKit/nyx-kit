# Storybook Taxonomy

## Purpose

Storybook is the visual browser for Nyx Kit components. As the catalog grows, stories should be grouped by user-facing domain so the sidebar stays navigable.

## Domain groups

Use these top-level groups for story titles:

- `Basic`
- `Form`
- `Data`
- `Navigation`
- `Feedback`

## Title format

Use `Components/<Domain>/<ComponentName>` for each story export.

Examples:

- `Components/Basic/NyxButton`
- `Components/Form/NyxInput`
- `Components/Data/NyxTable`

## Guidance

- Prefer the most obvious domain for a component rather than forcing a perfect taxonomy.
- Keep related subcomponents in the same domain as their parent component.

## Files and demo helpers

The story entry remains at `src/components/Nyx<Name>/Nyx<Name>.stories.ts`. Extracted demos and supporting story fixtures belong under `src/components/Nyx<Name>/storybook/`, keeping the component root focused on library source and its test/story entry points. This convention applies to new helpers and touched existing demos.

Storybook's existing recursive story glob discovers the entries without configuration changes. Helpers are internal development files: never export them from the library or import them into production code. E2E fixtures may reuse a demo explicitly. See [the folder example and import rules](../conventions/README.md#storybook-stories).
