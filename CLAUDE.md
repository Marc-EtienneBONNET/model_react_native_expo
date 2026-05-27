# model-react-native (root)

> ⚠ MAINTENANCE: any file changed in this repo (deps, providers, routes, pattern, env var, public API) → update this CLAUDE.md AND sub-folder CLAUDE.md if applicable, SAME SESSION.

## meta
- type: React Native + Expo template
- prefix_on_init: react_native_*
- github: Marc-EtienneBONNET/model_react_native_expo (perso, SSH alias github.com-perso)
- style_system: @shopify/restyle (NOT NativeWind/Tailwind — overrides global rule gluestack_v2.md)
- routing: @react-navigation/* v7 (NOT Expo Router)
- state: @reduxjs/toolkit + RTK Query
- realtime: socket.io-client v4
- i18n: maison via src/libs/i18n (i18next installé mais consommé qu'au niveau du `instance` exporté)
- applicable_global_rules: typescript.md, react.md (component=folder, 150 lines max, named exports)
- non_applicable_global_rules: gluestack_v2.md (no NativeWind here), react_native_expo.md (partially — folder layout match, but style system differs)

## stack
| domain | lib | version | notes |
|---|---|---|---|
| runtime | RN | 0.81.5 | |
| | Expo SDK | 54 | |
| | React | 19.1 | |
| nav | @react-navigation/native | v7 | + bottom-tabs + native-stack |
| style | @shopify/restyle | 2.4 | createBox/createText<TypeTheme> |
| icons | phosphor-react-native | 3.x | use `XxxIcon` exports (cf. rules/phosphor.md) |
| storage | @react-native-async-storage/async-storage | 2.2 | key: tokenConnection |
| state | @reduxjs/toolkit | 2.12 | + /query/react |
| ws | socket.io-client | 4.8 | |
| animations | react-native-reanimated | 4.x | + react-native-worklets (babel plugin) |
| insets | react-native-safe-area-context | 5.6 | useSafeAreaInsets(), no SafeAreaView |
| blur | expo-blur | 15 | used by Dialog |
| datepicker | react-native-modal-datetime-picker + @react-native-community/datetimepicker | — | InputDate/InputHeure |
| svg | react-native-svg | 15 | required by phosphor |
| lint | @biomejs/biome | 2.3 | NO eslint/prettier |
| ts | typescript | 5.9 | strict:true |

## structure (relevant)
```
index.ts                              # registerRootComponent(App)
src/
  app.tsx                             # provider tree + AppContent (bootstrap)
  env.ts                              # API_URL from EXPO_PUBLIC_API_URL
  routers/index.tsx                   # NavigationContainer + Bottom Tabs
  pages/{home,inputs,dialog,button,tag,loader,toast,accordeon,secrette}/
  libs/
    basics/                           # cf. src/libs/basics/CLAUDE.md
    design/                           # cf. src/libs/design/CLAUDE.md
    i18n/                             # custom translation system
  themes/                             # cf. src/themes/CLAUDE.md
  store/                              # cf. src/store/CLAUDE.md
  socket/                             # cf. src/socket/CLAUDE.md
  hooks/                              # global hooks
  locales/{fr,en}/{libs,pages}/*.json # i18n source
  utils/
assets/{icon.png,splash.png,android-*,favicon.png}
app.json, babel.config.js, biome.jsonc, tsconfig.json, package.json
.env                                  # EXPO_PUBLIC_API_URL
```

## bootstrap (src/app.tsx — strict order)
```
<Provider store={store}>                 # redux
  <SafeAreaProvider>                      # insets
    <ThemeProvider theme={light|dark}>    # @shopify/restyle (selected via useColorScheme())
      <ContextToastProvider>              # global toast singleton
        <StatusBar style="auto" />
        <AppContent />                    # internal: insets + router + KeyboardAccessory + socket lifecycle
```

## AppContent (internal to app.tsx)
- layout: `<VStack flex={1}>`
  1. `<Box h={insets.top} />` (manual SafeArea — pas de `<SafeAreaView>`)
  2. `<Router />` (NavigationContainer + Tabs)
  3. `<KeyboardAccessory />` (global, ONE mount, do not re-mount in pages)
- socket lifecycle: `useEffect` → `socket.connect()` + `socket.on("pong", …)` mount, cleanup `off`+`disconnect`
- toast: rendered inside ContextToastProvider (absolute, slide-in from right)

## routing
- file: src/routers/index.tsx
- initial: "Accordeon"
- nav theme derived from Restyle theme (no duplicated palette)
- tabs (9):

| route | page | icon (phosphor) | hidden |
|---|---|---|---|
| Home | pages/home/ | HouseIcon | no |
| Inputs | pages/inputs/ | TextboxIcon | no |
| Dialog | pages/dialog/ | ChatCircleDotsIcon | no |
| Button | pages/button/ | CursorClickIcon | no |
| Tag | pages/tag/ | TagIcon | no |
| Loader | pages/loader/ | SpinnerIcon | no |
| Toast | pages/toast/ | BellIcon | no |
| Accordeon | pages/accordeon/ | RowsIcon | no |
| Secrette | pages/secrette/ | — | yes (tabBarButton:null, display:none) |

- icon weight: regular if not focused, fill if focused
- no labels (icons only), tab bar transparent + light top border
- adding a route: create pages/<name>/index.tsx (named export), add `<Tab.Screen>` in routers/index.tsx, declare focused/regular phosphor icons

## env vars
| var | required | default | role |
|---|---|---|---|
| EXPO_PUBLIC_API_URL | no | http://localhost:3000 | base URL for RTK Query baseQuery + socket.io url |

- all public vars MUST be prefixed `EXPO_PUBLIC_` (Expo bundle exposure rule)
- centralized in src/env.ts (single typing point)

## conventions (local)
- TS strict; naming: TypeXxx / InterXxx / EnumXxx / ClassXxx; vars/fn camelCase
- 1 file = 1 element; components > 150 lines → split into folder (index.tsx + components/ + hooks/ + types/)
- named exports only (no `export default`)
- top-level functions = `function foo() {}`; arrow OK for callbacks/inline handlers
- preferred layouts: `<VStack>` / `<HStack>` (NOT `<View flexDirection=…>`)
- always use maison wrappers from src/libs/basics (`<Text>`, `<Icon>`, `<TouchableOpacity>`, `<Box>` etc.) instead of RN primitives, unless justified (absolute positioning, plain Pressable, etc.)

## i18n (system)
- instance: src/libs/i18n/instance.ts (i18next init: `{ resources: {fr:{},en:{}}, lng:"fr", fallbackLng:"fr", interpolation.escapeValue:false }`)
- PUBLIC HOOK: `useTranslation(namespace: TypeNamespace)` from src/libs/i18n (NOT from react-i18next directly — if you see `from "react-i18next"`, that's a bug)
- translations source: src/locales/{fr,en}/{libs,pages}/<namespace>.json
- TypeNamespace = literal union; new namespace → add to type AND import JSON
- interpolation: `t("msg", { n: 5 })` → `{n}` replaced by `String(5)`

## pitfalls
- pas de NativeWind/Tailwind ici (malgré rules globales): tout passe par Restyle
- pas de `<SafeAreaView>`: insets manuels via spacers — n'introduis pas `<SafeAreaView>` sans raison forte
- socket `autoConnect:false`: connect explicite dans app.tsx; ne pas remplacer par `autoConnect:true`
- theme suit `useColorScheme()` OS, pas de toggle utilisateur stocké — si ajout, persist via AsyncStorage + context
- `<Text>` wrapper mesure `onTextLayout` pour ellipsis auto: ne court-circuite pas avec `numberOfLines` brut
- inputs HORS `<Inputs.provider>` throw — voir libs/design
- `<KeyboardAccessory>` est global (app.tsx) — ne le re-monte pas en page
- Biome ignore `src/components/ui/**` (slot Gluestack future, absent actuellement)

## sub-claude pointers
- src/libs/basics/CLAUDE.md — primitives Restyle (Box, VStack, Text, Icon, Scrolls, …)
- src/libs/design/CLAUDE.md — composed components (Btn, Inputs, Dialog, Toast, Tag, Loader, Accordeons)
- src/themes/CLAUDE.md — tokens (palette, spacing, radius, iconSize, textVariants)
- src/store/CLAUDE.md — Redux + RTK Query, baseQuery (token + Accept-Language)
- src/socket/CLAUDE.md — socket.io singleton, auth callback, lifecycle
