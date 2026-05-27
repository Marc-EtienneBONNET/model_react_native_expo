# Libs / Basics

> ⚠ MAINTENANCE: any change here (new wrapper, signature/props change, refacto, public export removal) → update this CLAUDE.md SAME SESSION.

## meta
- role: Restyle primitives (thin RN wrappers exposing typed theme styles)
- layer: bottom — never imports from libs/design, pages, store, socket
- depends: [react-native, @shopify/restyle, react-native-reanimated (fades), phosphor-react-native, src/themes/*]
- placement_rule: wrapper of RN primitive (View/Text/Pressable/ScrollView/Image) exposing style system → here. Logic/variants → ../design/.

## inventory
| component | wraps | extras |
|---|---|---|
| Box | View | createBox<TypeTheme> + `border:"<w> <colorKey>"` + shadowTop/Bottom/Left/Right (via getShadow util) |
| VStack | Box | flexDirection:column, gap default EnumGap.s |
| HStack | Box | flexDirection:row, gap default EnumGap.s |
| Text | RestyleText | onTextLayout hook → auto numberOfLines for clean ellipsis; 50+ variants in props/variant/textVariant.tsx |
| Icon | phosphor-react-native | props: as: ComponentType<PhIconProps>, size?: EnumIconSize, color?: TypeBoxColorKey \| string |
| Img | Image (RN) | passthrough typed |
| TouchableOpacity | RN TouchableOpacity via Restyle | same border/shadow mechanics as Box |
| VScroll | ScrollView vertical via Restyle | + fade blocks top/bottom (gradients); useScrollFade hook |
| HScroll | ScrollView horizontal | + fade blocks left/right; useScrollFade hook |

## structure (per wrapper)
```
basics/<wrapper>/
  index.tsx                              # named export
  type/type<Wrapper>Props.tsx            # TypeXxxProps
  type/otherType<Wrapper>.tsx            # RestyleXxx factory (createBox/createText<TypeTheme>)
  utils/                                 # internal helpers (getBorder, getShadow, …)
  hooks/                                 # internal hooks (useScrollFade for VScroll/HScroll)
  components/                            # subparts (fadeBlockTop/Bottom/Left/Right)
```

## tokens (consumed)
- colors: EnumColors keys (e.g. "primary.a", "text", "background")
- spacing: EnumGap (null/xs/s/m/l/xl)
- radius: EnumRadius (xs/s/m/l/xl/full)
- iconSize: EnumIconSize (xxs/xs/s/m/l/xl/xxl)
- text variants: 50+ (xxxxl→xs × Light/Normal/Medium/Semibold/Bold); default = sNormal

## invariants
- Restyle factories typed on TypeTheme (= typeof lightTheme); see src/themes/CLAUDE.md
- never pass raw pixels (`p={16}` ❌, `p="m"` ✓)
- VStack/HStack default `gap: EnumGap.s` — to disable, use `gap="null"` (NOT undefined, which leaves default)
- `<Text>` always has variant; no variant = "defaults" (= sNormal)
- prefer EnumColors over string literals (autocomplete + refacto)

## pitfalls
- `border="2 primary"` strict format `<width> <colorKey>` — wrong format = silent no-op
- shadowTop/Bottom/Left/Right are gradient overlays (NOT real RN shadow which is single-direction)
- `<Text>` onTextLayout overrides manually-passed `numberOfLines`; to bypass, patch the wrapper
- VScroll/HScroll fades flicker if parent doesn't constrain size — almost always the bug source
- importing `TouchableOpacity` from "react-native" instead of here = losing Restyle props
- Img wraps RN Image (NOT expo-image); switching = keep public API stable

## public api (named exports — refacto-stable)
- Box, VStack, HStack, Text, Icon, Img, TouchableOpacity, VScroll, HScroll
- types: TypeBoxProps, TypeVStackProps, TypeHStackProps, TypeTextProps, TypeIconProps, TypeImgProps, TypeTouchableOpacityProps, TypeVScrollProps, TypeHScrollProps

## extending
- new RN primitive wrapper (e.g. Pressable) → here, follow structure pattern
- composed component (logic/variants) → ../design/
- new design token → src/themes/
- global hook → src/hooks/
