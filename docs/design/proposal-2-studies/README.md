# Proposal 2: weight, space and shadow

A second moodboard develops the approved [proposal 2](../logo-proposals/proposal-2.svg).
The original seven proposals remain the first comparison set.

D1 was selected for the [final logo refinement](../logo/README.md). All study
artwork and this moodboard are retained as originally presented.

## Design brief

- Preserve the aligned, overlapping N/Y/X construction and rounded finish.
- Use no structural stroke narrower than the approved 16 units.
- Explore heavier weights, dimensional surfaces and different shadow distances.
- Keep primary purple dominant, using the documented purple shades for lighting
  and secondary teal for selected side faces or cast shadows.
- Take dimensional inspiration from the folded bands and contrasting faces of
  the [official VS Code logo](https://code.visualstudio.com/brand).

The [design system](../../architecture/design-system.md) and
[DESIGN.md](../../../DESIGN.md) provide all palette values. SVG assets embed the
resolved values for portability. Gradient face lighting and SVG shadow filters
are specific to these explorations, not changes to the library's design tokens.

## Geometry

Every asset has a transparent `512 × 512` viewBox. Flat studies retain the N's
corner coordinates and the diagonal slope `336 / 304`. Thicker versions widen
the offset Y branch and crossing break to preserve the approved clear gap of
approximately 19.6 units. The Y fork and lower gap endpoint remain mirrored
around `(256, 256)`. Spatial variants transform this aligned construction as a
whole, preserving collinearity while projecting it into a different plane.

Rounded face strokes remain editable. Extrusion uses tightly spaced offset
vector layers. Faces use opaque palette colours or gradients; shadow studies
use self-contained SVG filters with explicit bounds. A stroke width listed
below is measured before any perspective transform.

## Studies

| ID | File | Treatment |
|---|---|---|
| W1 | [w1-original.svg](w1-original.svg) | Approved 16-unit reference, flat primary. |
| W2 | [w2-medium.svg](w2-medium.svg) | 24-unit weight, flat primary. |
| W3 | [w3-bold.svg](w3-bold.svg) | 32-unit weight, flat primary. |
| D1 | [d1-folded.svg](d1-folded.svg) | 40-unit folded bands, contrasting lit faces and shallow depth. |
| D2 | [d2-extruded.svg](d2-extruded.svg) | 32-unit solid extrusion, purple sidewalls and front-face lighting. |
| D3 | [d3-perspective.svg](d3-perspective.svg) | 32-unit tilted plane, teal sidewalls and soft depth shadow. |
| S1 | [s1-contact.svg](s1-contact.svg) | 24-unit face with tight contact and diffuse ambient shadows. |
| S2 | [s2-offset.svg](s2-offset.svg) | 32-unit face with a crisp teal offset shadow. |
| S3 | [s3-floating.svg](s3-floating.svg) | 32-unit softly lit face floating over a broad, displaced shadow. |

Open [moodboard.svg](moodboard.svg) to compare all nine studies at matched scale,
with a smaller dark-background sample for each. [moodboard.png](moodboard.png)
is a raster preview for easy sharing. Individual SVGs contain no background,
fonts or external images. Shadow filters require an SVG renderer that supports
filter primitives; the flat variants are the simplest options for small marks.
