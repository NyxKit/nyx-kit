# Research: NyxDropdown Components

## Decision 1: Public component family
- Decision: Expose a wrapper component plus separate menu and item components.
- Rationale: This gives consumers a simple default path while still allowing advanced composition.
- Alternatives considered: A single monolithic dropdown component; rejected because it would make custom content harder to compose cleanly.

## Decision 2: Default option model
- Decision: Build the default dropdown menu from the existing select option shape.
- Rationale: Reusing the same option vocabulary keeps the API consistent across related components and lowers consumer learning cost.
- Alternatives considered: A new dropdown-specific option schema; rejected because it would duplicate concepts already present in the library.

## Decision 3: Custom dropdown content precedence
- Decision: If custom dropdown content is supplied, it replaces the default option-rendered panel.
- Rationale: Consumers need a predictable override path for advanced panels, commands, or mixed content.
- Alternatives considered: Merging custom content with the default menu; rejected because it is harder to reason about and test.

## Decision 4: Shared positioning behavior
- Decision: Use the shared teleport-position behavior for the floating panel.
- Rationale: The dropdown should behave like other floating UI in the library and stay anchored to its trigger as the viewport changes.
- Alternatives considered: Inline positioning logic inside the component; rejected because it would duplicate existing library behavior.

## Decision 5: Trigger-driven open state
- Decision: Keep open/close behavior local to the dropdown wrapper and let the trigger control visibility.
- Rationale: This matches the component’s role as a self-contained interaction pattern and keeps consumer usage simple.
- Alternatives considered: Requiring external open-state control; rejected because it would make the common case more verbose.
