# Themes

> ⚠ MAINTENANCE: any new token, rename, variant add/remove, palette change, new design axis → update this CLAUDE.md AND cascade to all consumers (basics/, design/, pages/). SAME SESSION.

## meta
- role: single source of truth for design tokens (colors, spacing, radius, iconSize, textVariants)
- typing: `as const satisfies TypeXxx` everywhere (literal inference + compile check)
- consumed_by: @shopify/restyle `createTheme(...)`, basics/, design/, pages/

## structure
```
themes/
  lightTheme.tsx               # createTheme({ colors: flatPaletteLight, spacing, borderRadii, textVariants })
  darkTheme.tsx                # { ...lightTheme, colors: flatPaletteDark } — spacings/radius/iconSize/textVariants identical
  colors/
    palette.tsx                # 25 families × 11 shades (a..k = alpha 1.0 → 0.05)
    colorLight.tsx             # ...palette + {background, text, link} (light semantics)
    colorsDark.tsx             # ...palette + {background, text, link} (dark semantics)
    enum/enumColors.tsx        # EnumColors string-key helper
    type/{typeColors,typePalette}.ts
  spacing/index.tsx            # {null:0, xs:4, s:8, m:16, l:24, xl:32} + EnumGap
  radius/index.tsx             # {xs:4, s:8, m:16, l:24, xl:32, full:9999} + EnumRadius
  iconSize/index.tsx           # {xxs:4, xs:8, s:12, m:16, l:20, xl:28, xxl:36} + EnumIconSize
  enum/typeTheme.tsx           # TypeTheme = typeof lightTheme
  utils/buildFlatPalette.ts    # hierarchical palette → flat dotted keys ("primary.a", "red.j", …)
```

## colors
- families (25): transparent, white, black, primary, secondary, destructive, success, slate, gray, zinc, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
- shades: a (1.0 alpha) → k (0.05 alpha); letter = decreasing alpha
- brand: primary=teal #164951, secondary=light gray #e8eded, destructive=red #fc4a54, success=green #3ed37d
- semantic overrides:
  - light: background=rgba(250,250,248,1), text=palette.primary.a, link.text=palette.blue.a
  - dark: background=rgba(31,31,34,1), text=palette.white.a, link.text=palette.sky.a
- `buildFlatPalette`: hierarchical → flat keys for Restyle (`"primary.a"`, `"red.j"`)

## spacing
| key | px |
|---|---|
| null | 0 |
| xs | 4 |
| s | 8 |
| m | 16 |
| l | 24 |
| xl | 32 |

## radius
| key | px |
|---|---|
| xs | 4 |
| s | 8 |
| m | 16 |
| l | 24 |
| xl | 32 |
| full | 9999 (circle) |

## iconSize
| key | px |
|---|---|
| xxs | 4 |
| xs | 8 |
| s | 12 |
| m | 16 |
| l | 20 |
| xl | 28 |
| xxl | 36 |

## textVariants
- naming: `{size}{Weight}`
- sizes: xxxxl, xxxl, xxl, xl, l, m, s, xs (8)
- weights: Light(300), Normal(400), Medium(500), Semibold(600), Bold(700)
- each variant: `{ fontWeight, fontSize, lineHeight, color: EnumColors.text }`
- default variant: `defaults` = `sNormal` (400, 14px, 20 lh, color=text)

## consumption
- Restyle props: `<Box bg="primary.a" p="m" borderRadius="s">` (typed on theme keys)
- useTheme: `const theme = useTheme<TypeTheme>(); theme.colors["primary.a"]; theme.spacing.m`
- enums: `EnumColors.primary.a`, `EnumGap.m`, `EnumRadius.s`, `EnumIconSize.l` (prefer over string literals)

## invariants
- `as const satisfies TypeXxx` for every token map (literal inference preserved)
- spacings/radius/iconSize/textVariants IDENTICAL between light/dark — only colors swap
- `text` is a color KEY (semantic), not a fixed color: light=near-black, dark=white. Always `color="text"` not `"black"`/`"white"`
- `background` has NO shade — single value per mode
- shades a..k are intentional opacity steps; replacing `primary.f` (~50%) with `primary` is a bug

## pitfalls
- removing a token from lightTheme cascades via TypeTheme to all `<TypeTheme>` consumers (massive break)
- new family in palette.tsx → automatically flat-keyed in colorsLight/colorsDark via buildFlatPalette (no manual cascade)
- per-component sizes (button height, avatar width) live IN the component (`design/<x>/size/enumXxxSize.tsx`), NOT here
- no breakpoints (mobile only); adding web → introduce `breakpoints` in createTheme

## extending
| need | where |
|---|---|
| new brand color | palette.tsx (cascades automatic) |
| new spacing/radius/iconSize | corresponding `spacing/radius/iconSize/index.tsx` + Enum |
| new text variant | textVariant.tsx (provide ALL 5 weights for any new size to avoid silent default) |
| component-specific size | NOT here — in the component's `size/` folder |

## public api (refacto-stable)
- lightTheme, darkTheme
- EnumColors, EnumGap, EnumRadius, EnumIconSize
- TypeTheme, TypeColors, TypePalette
- palette, colorsLight, colorsDark
- buildFlatPalette

Renaming any of these breaks the whole app → IDE-wide rename refactor required.
