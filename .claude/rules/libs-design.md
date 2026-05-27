# Libs / Design

> ⚠ MAINTENANCE: any new component, signature/variant change, internal refacto, removed export → update this CLAUDE.md SAME SESSION.

## meta
- role: composed business-ready components (above ../basics/)
- layer: middle — imports basics + themes + libs/i18n; NEVER imports pages, store, socket
- placement_rule: composed of multiple basics + variants + state/animation/context → here. Plain RN wrapper → ../basics/.

## inventory
| family | export | sub-components |
|---|---|---|
| Btn | `Btn = { basic: Button, menu: ButtonMenu }` | button/, buttonMenu/ |
| Inputs | `Inputs = { provider, text, textarea, number, code, date, heure, email, phone }` + keyboardAccessory | contextInput/, inputsText/, inputsTextarea/, inputsNumber/, inputsCode/, inputsDate/, inputsHeure/, inputsEmail/, inputsPhone/, keyboardAccessory/ |
| Dialog | Dialog | dialog/ (BlurView + animated slide-up modal) |
| Toast | Toast (rendered by ContextToastProvider) + useContextToast() | toast/, toast/contextToast/ |
| Tag | Tag | tag/ (variants + colorSchema + left/right/center icons) |
| Loader | `Loader = { Spinner, Skeleton }` | loader/spinner/, loader/skeleton/ |
| Accordeons | `Accordeons = { parent, child }`, EnumAccordeonVariant | accordeons/parent/, accordeons/child/ |

## pattern: colorSchema + deepReplaceString (variants chromatiques)
- variant files declare style templates with literal placeholder `"COLOR_SCHEMA_SELECTED"`
- at runtime, `utils/deepReplaceString` recursively replaces it with the `colorSchema` prop (e.g. EnumColors.primary)
- variant file: `variant/enum<Component>Variant.tsx`
- usage: `<Btn.basic buttonVariant="solid" colorSchema={EnumColors.primary} text="OK" />`
- ANY new component with color variants MUST use this pattern (no forks)

## pattern: context (Inputs, Accordeons, Toast)
| family | provider | hook | mount scope |
|---|---|---|---|
| Inputs | `<Inputs.provider initialValues={...}>` | useContextInputs() | per screen with form |
| Accordeons | `<Accordeons.parent variant={EnumAccordeonVariant.singleOpen|multiOpen}>` | internal (clones children with index) | per accordion group |
| Toast | `<ContextToastProvider>` | useContextToast() → `{ open, close }` | GLOBAL (app.tsx); ONE toast visible at a time, new replaces |

## variants per family
| family | variants enum | location |
|---|---|---|
| Button | solid, ghost, ghostSelected, outline, link | button/variant/enumButtonVariant.tsx |
| Toast | solid, ghost, outline | toast/variant/enumToastVariant.tsx |
| Tag | solid, ghost, outline | tag/variant/enumTagVariant.tsx |
| InputDate | dateOnly, dateEtHeure | inputsDate/variant/enumInputDateVariant.tsx |
| Accordeon | singleOpen, multiOpen | accordeons/parent/enum/enumAccordeonVariant.tsx |
| InputText | sizes xs/s/m/l/xl | inputsText/size/enumInputSize.tsx |

## inputs
- ALL inputs controlled by `<Inputs.provider>` external state
- `<Inputs.provider initialValues: Record<string, string|number|Date|TypeHeure>>`
- validation owned by each input (`<Inputs.email>` validates email format, …); error status via context
- `<KeyboardAccessory />` mounted ONCE in app.tsx; auto-attaches to focused field via context; NEVER re-mount in page
- `<Inputs.code>` auto-advance between n digits
- `<Inputs.heure>` value type: `TypeHeure = { hours: number; minutes: number }`

## i18n
- each family has namespace src/locales/{fr,en}/libs/<family>.json (e.g. `libs/button`, `libs/inputs`)
- internal use: `useTranslation("libs/<family>")` (custom hook from src/libs/i18n, NOT react-i18next)
- adding visible string: add key in fr + en JSON + update TypeNamespace

## invariants
- variant default specified (commonly used variant) — `xxxVariant?` prop optional
- variant addition → update demo page src/pages/<family>/ (project also = showcase)
- input rendered outside `<Inputs.provider>` → throw (intentional, fail-fast)

## pitfalls
- `deepReplaceString` recursive: nested objects fine, but functions/Maps/Sets break
- `colorSchema` accepts string ("primary") or EnumColors — prefer enum
- Toast single-slot: open during visible = replaces (NO queue); fork explicit if queue needed
- Accordeon singleOpen closes previous on new open; multiOpen allows multiple; no "all-closed-on-boot" alt (default all closed)
- Dialog `canClose:false` → tap on backdrop does not close (blocking confirmation; use sparingly)
- `useContextInputs()` outside provider throws — DO NOT catch
- Skeleton is a stub; extend without breaking public API
- import direction: design → basics+themes+i18n OK; design → pages/store/socket = archi bug

## public api (refacto-stable)
- named exports from each family `index.tsx` aggregated into `Btn`, `Inputs`, `Loader`, `Accordeons`
- renames break `pages/*` imports → IDE-wide rename refactor + sync CLAUDE.md

## pointers
- ../basics/CLAUDE.md (layer below)
- ../../themes/CLAUDE.md (tokens consumed)
