# Logo proposals

Seven editable SVG studies develop the four sketches supplied on 14 September
2026. They are candidates for review, not an adopted brand mark.

Proposal 2 was selected for a second round: [weight, space and shadow moodboard](../proposal-2-studies/README.md).

## Letter construction

The concept is **N, Y and X overlapped into one monogram**. Every diagonal uses
one of two mirrored slopes. The N has vertical stems joined by one straight
upper-left to lower-right diagonal. The X has two straight crossing diagonals.
The Y has an upper fork whose right arm continues in a straight line through
the junction into its lower-left stem.

Proposals 1–3 separate the letters with offsets and, in 2–3, deliberate gaps.
Segments on either side of a gap remain exactly collinear. Proposal 1 shares
the N and X diagonals and offsets the Y's left arm. Proposal 2 opens the rising
stroke around the N crossing. Its upper fork is one joined path meeting at
`(280, 229.473684)`, with the lower gap endpoint at `(232, 282.526316)`.
These endpoints mirror each other around `(256, 256)`, so the crossing
clearance matches on both sides and no stroke extends past the Y corner.
Proposal 3 also offsets the Y's rising stroke,
creating a pair of parallel diagonals with independently aligned continuations.
The Y stem and X terminals are inset in proposal 3 to keep them inside the N.
Proposal 3 uses a consistent 16-unit clear gap: its 16-unit parallel strokes
have 32-unit perpendicular centreline spacing. Crossing breaks and lower-left
terminal clearance use the same visible gap, accounting for stroke width and
rounded caps. The Y fork is a joined path so its corner remains clean. Every
additional X/Y stroke stays clear of the N; the upper-right X terminal is
also inset from the N's right vertical by the same 16-unit visible gap.

Proposal 4 merges all three letters onto the same skeleton:

| Segment | Letters | Overlap count |
|---|---|---|
| Upper-left diagonal | N + Y + X | 3 |
| Upper-right diagonal | Y + X | 2 |
| Lower-left diagonal | Y + X | 2 |
| Lower-right diagonal | N + X | 2 |
| Left and right verticals | N | 1 |

Overlap counts describe shared line segments, not the isolated intersection at
which the diagonals cross. The sketch's heavy upper-left arm indicated triple
overlap; it was not a request for a taper or a hand-drawn stroke.

## Colour and geometry

Colours follow [the design system](../../architecture/design-system.md) and
[DESIGN.md](../../../DESIGN.md): primary purple `#9F50F0` and secondary teal
`#0F4C75`. The triple-overlap colour is their equal sRGB blend `#574EB3`
(channel averages rounded to whole bytes). It is an opaque solid colour, so it
looks consistent on any background. Proposals 1–4 and 4b use primary only.
Standalone SVGs embed resolved colours for use outside the library stylesheet.

Every mark uses a transparent `512 × 512` viewBox and editable paths with rounded
caps and joins. This finish softens exposed terminals, the N's outer corners,
the Y forks and the changes in overlap weight without changing the underlying
letter alignment. Cap radii follow half the stroke width; colour and width
remain determined by overlap in proposal 4's derivatives.
The merged construction uses corners `(104, 88)`, `(408, 88)`,
`(104, 424)` and `(408, 424)` with the intersection at `(256, 256)`.
All diagonals have an absolute slope of `336 / 304`.

## Files

| Proposal | SVG | Treatment |
|---|---|---|
| 1 | [proposal-1.svg](proposal-1.svg) | Aligned N and X, offset Y upper-left branch; 16-unit primary strokes, matching proposal 4. |
| 2 | [proposal-2.svg](proposal-2.svg) | Aligned letters with a deliberate break across the N; 16-unit primary strokes, matching proposal 4. |
| 3 | [proposal-3.svg](proposal-3.svg) | Detached X/Y strokes, collinear continuations and consistent 16-unit clear spacing; 16-unit primary strokes, matching proposal 4. |
| 4 | [proposal-4.svg](proposal-4.svg) | Fully merged reference construction; uniform 16-unit primary strokes. |
| 4a | [proposal-4a.svg](proposal-4a.svg) | Uniform 16-unit width. Triple overlap: blend; double: primary; single: secondary. |
| 4b | [proposal-4b.svg](proposal-4b.svg) | Primary throughout. Triple overlap: 36 units; double: 24; single: 12. |
| 4c | [proposal-4c.svg](proposal-4c.svg) | Combines 4a's colours with 4b's 36/24/12-unit widths. |

[Comparison sheet](comparison.svg) shows all seven candidates on light and dark
project backgrounds, plus the overlap key. Individual marks have no background,
labels, font dependency, raster images, external resources or filters. SVG title
and description elements identify each candidate.

Fine strokes and deliberate gaps in proposals 1–3 should be checked at the
intended display size before a final mark is selected.
