# Nyx Kit logo

The final mark develops the selected [D1 folded-ribbon study](../proposal-2-studies/d1-folded.svg).
All earlier [logo proposals](../logo-proposals/README.md) and
[dimensional studies](../proposal-2-studies/README.md) remain available.

## Construction and finish

The mark retains D1's aligned, overlapping N/Y/X construction, 40-unit bands,
rounded terminals and open central crossing. Its purple faces describe a folded
ribbon: the left rail recedes, the upper fork catches light, and the descending
diagonal sits in front. The Y fork's inner corner has a small curved transition
to remove its sharp cusp without disturbing the straight diagonal alignments.

The final artwork uses filled vector outlines rather than stacked stroke
copies. One shallow depth silhouette, offset by `(2, 3)` units, replaces D1's
13 extrusion layers. Gradients use a consistent upper-left light direction and
documented primary-purple shades, with less pale lavender than the study.
There are no blur filters, embedded rasters or font dependencies in the SVGs.

Colours follow [DESIGN.md](../../../DESIGN.md) and the
[design system](../../architecture/design-system.md): primary `#9F50F0`, with
`#B583FF`, `#8A2BE2`, `#6F1AB6` and `#4B0082` for lit and recessed surfaces.
The monochrome asset uses `currentColor`, defaulting to primary purple.

## Deliverables

| File | Use |
|---|---|
| [nyx-kit-logo.svg](../../../branding/nyx-kit-logo.svg) | Main transparent vector mark, with folded surfaces and subtle depth. |
| [nyx-kit-logo-mono.svg](../../../branding/nyx-kit-logo-mono.svg) | Single filled silhouette for small icons, print, masks and single-colour use. |
| [nyx-kit-logo.png](../../../branding/nyx-kit-logo.png) | Transparent 1024-pixel export of the main mark. |
| [preview.svg](preview.svg) | Light/dark presentation and actual-size samples. |
| [preview.png](preview.png) | Shareable raster preview. |

Both SVGs use a `512 × 512` viewBox and include title/description metadata.
Keep the square canvas when placing the mark so its built-in clear space stays
intact. Prefer the full-colour mark from 48 pixels upward and the monochrome
silhouette at 24–32 pixels. At smaller sizes, assess the central gap at the
actual display size before use. Gradients and colours are embedded for reliable
rendering outside the library's stylesheet.

The files in `branding/` are the final asset source. Existing application logo
references are not switched as part of this artwork-only task.
