# Portfolio Design System

Status: approved specification for PORT-14
Scope: English-only launch, translation-ready architecture
Visual character: precise, technical, confident, and approachable

## Principles

- Use the warm beige environment as the dominant surface.
- Use charcoal for readable content, deep blue for technical emphasis, orange
  for actions, and cyan only as a restrained immersive highlight.
- Preserve the reference site's compact labels, strong display type, rounded
  surfaces, and generous negative space without copying its identity.
- Keep the complete experience usable in the 2D fallback and at every
  supported viewport.

## Color tokens

The canonical values below come from the approved reference-inspired palette.
Semantic aliases describe how the values may be used; components must not pick
raw colors independently.

| Token | Value | Semantic use |
| --- | --- | --- |
| `--color-text-400` | `#2d2a24` | Primary text, icons, text on orange |
| `--color-text-300` | `#5f5646` | Secondary text |
| `--color-grayscale-500` | `#dfd2bf` | Strong separators |
| `--color-grayscale-400` | `#e9ded0` | Subtle separators and disabled surfaces |
| `--color-beige-700` | `#dfd1bc` | Pressed neutral surface |
| `--color-beige-600` | `#e9ded0` | Raised neutral surface |
| `--color-beige-500` | `#f1e5d5` | Card surface |
| `--color-beige-400` | `#f5efe6` | Page background |
| `--color-orange-400` | `#ff8400` | Primary action background and small accents |
| `--color-dark-blue-500` | `#052e87` | Links, focus rings, technical labels |
| `--color-dark-blue-400` | `#002474` | Strong blue state |
| `--color-cyan-400` | `#34bfff` | Restrained scene highlight |
| `--color-text-cyan-400` | `#e1f5ff` | Light cyan surface |
| `--color-white-400` | `#ffffff` | Text on deep blue only |

Recommended semantic aliases:

```css
--color-background: var(--color-beige-400);
--color-surface: var(--color-beige-500);
--color-surface-strong: var(--color-beige-600);
--color-text: var(--color-text-400);
--color-text-muted: var(--color-text-300);
--color-border: var(--color-grayscale-500);
--color-action: var(--color-orange-400);
--color-action-text: var(--color-text-400);
--color-link: var(--color-dark-blue-500);
--color-focus: var(--color-dark-blue-500);
```

### Approved contrast pairs

Ratios are calculated with the WCAG relative-luminance formula.

| Foreground | Background | Ratio | Approved use |
| --- | --- | ---: | --- |
| `#2d2a24` | `#f5efe6` | 12.51:1 | Any text |
| `#5f5646` | `#f5efe6` | 6.32:1 | Any text |
| `#052e87` | `#f5efe6` | 10.52:1 | Links, labels, icons |
| `#ffffff` | `#052e87` | 12.02:1 | Any text |
| `#2d2a24` | `#ff8400` | 5.83:1 | Action labels |
| `#002474` | `#e1f5ff` | 12.43:1 | Cyan information surfaces |
| `#2d2a24` | `#e9ded0` | 10.78:1 | Any text |
| `#5f5646` | `#e9ded0` | 5.45:1 | Any text |

Do not use white text on orange: `#ffffff` on `#ff8400` is only 2.46:1.
Color must never be the only way an interactive state or status is conveyed.

## Typography

The primary family is Urbanist, matching the supplied style direction.
The production font stack must remain readable before the web font loads:

```css
font-family:
  "Urbanist",
  "Segoe UI",
  Arial,
  sans-serif;
```

The launch language is English, so every required glyph is covered by all
families in the stack. If Arabic is enabled later, use `"Noto Sans Arabic"`
before the system Arabic sans-serif fallback and do not apply Latin display
tracking to Arabic text.

### Type roles

| Role | Mobile | Desktop | Weight | Line height | Tracking |
| --- | --- | --- | ---: | ---: | ---: |
| Display XL | 44px | 88px | 900 | 0.96 | -0.04em |
| Display L | 36px | 72px | 900 | 0.98 | -0.04em |
| Heading M | 28px | 44px | 800 | 1.10 | -0.03em |
| Heading S | 22px | 28px | 800 | 1.15 | -0.02em |
| Lead | 18px | 20px | 600 | 1.45 | 0 |
| Body | 16px | 18px | 500 | 1.50 | 0.02em |
| Small | 14px | 14px | 600 | 1.40 | 0.02em |
| Label | 12px | 12px | 800 | 1.20 | 0.08em |

Fluid display sizes may interpolate with `clamp()` between the mobile and
desktop endpoints. Body text must never render below 16px for primary reading
content. Labels may use uppercase English; sentences and navigation do not.

## Spacing and layout

Use the supplied non-linear spacing scale:

| Token | Value |
| --- | ---: |
| `--space-xxs` | 4px |
| `--space-xs` | 8px |
| `--space-sm` | 12px |
| `--space-md` | 18px |
| `--space-lg` | 28px |
| `--space-xl` | 36px |
| `--space-xxl` | 48px |
| `--space-xxxl` | 64px |

Outer page padding is responsive:

- Mobile, below 840px: 16px.
- Tablet, 840px and above: 28px.
- Desktop, 1280px and above: 44px.

Content width is capped at 1240px. Readable prose is capped around 68
characters. Touch targets are at least 44 by 44px even when the visible control
is smaller.

## Shape, stroke, and elevation

| Token | Value |
| --- | ---: |
| `--radius-sm` | 6px |
| `--radius-md` | 12px |
| `--radius-lg` | 16px |
| `--radius-xl` | 24px |
| `--radius-xxl` | 48px |
| `--stroke-sm` | 1px |
| `--stroke-md` | 2px |
| `--stroke-lg` | 4px |

Cards use `--radius-lg`; media uses `--radius-md`; large scene panels use
`--radius-xl` or `--radius-xxl`. Pill controls alone use `999px`. Prefer a
border and surface-color shift over heavy shadows. If elevation is necessary,
use a soft charcoal shadow at no more than 12% opacity.

## Responsive and interaction tokens

Canonical breakpoints:

```css
--breakpoint-sm: 480px;
--breakpoint-md: 840px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-xxl: 1600px;
--breakpoint-xxxl: 1920px;
```

CSS custom properties cannot currently drive standard media queries directly,
so implementations must mirror these exact values in each query.

Focus rings use a 3px deep-blue outline with a 3px offset. Interactive
transitions use `cubic-bezier(.6, 0, .25, 1)` and must not be required to
understand state. Reduced-motion mode removes non-essential translation,
parallax, and smooth scrolling.

## Implementation contract

- PORT-20 will convert this specification into global CSS tokens.
- Components consume semantic aliases, not duplicated raw values.
- Orange buttons always use charcoal labels.
- Text and controls retain their approved contrast in hover, focus, active,
  disabled, and immersive-overlay states.
- The English launch remains correct without Urbanist or JavaScript.
- Future RTL support uses logical properties and language-specific typography
  without changing these semantic color roles.
