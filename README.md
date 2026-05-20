# model-react-native

**Template de base** sur lequel toutes mes applications mobiles sont construites. C'est un projet React Native + Expo prêt à l'emploi qui contient une stack opinionée : design system maison (Shopify Restyle), navigation par onglets, gestion de formulaires, i18n custom, gestion de thème clair/sombre, variables d'environnement typées, et un ensemble complet de composants UI réutilisables.

Quand je démarre une nouvelle app mobile, je pars de ce repo, je renomme le projet, je vide les pages de démo et je commence à construire mes propres écrans en m'appuyant sur les composants déjà en place.

---

## Sommaire

1. [Stack technique](#stack-technique)
2. [Démarrage](#démarrage)
3. [Structure du projet](#structure-du-projet)
4. [Bootstrap de l'app](#bootstrap-de-lapp)
5. [Thèmes](#thèmes)
6. [Routing](#routing)
7. [Composants `libs/basics`](#composants-libsbasics)
8. [Composants `libs/design`](#composants-libsdesign)
9. [Contexts](#contexts)
10. [Hooks globaux](#hooks-globaux)
11. [Utils](#utils)
12. [Internationalisation (i18n)](#internationalisation-i18n)
13. [Variables d'environnement](#variables-denvironnement)
14. [Conventions de code](#conventions-de-code)
15. [Scripts npm](#scripts-npm)

---

## Stack technique

| Outil | Version | Rôle |
|---|---|---|
| Expo SDK | ~54.0.0 | Runtime / build |
| React | 19.1.0 | — |
| React Native | 0.81.5 | — |
| Shopify Restyle | ^2.4.5 | Thème + styling typé |
| React Navigation | ^7.x | Routing (bottom tabs + native stack) |
| Phosphor React Native | ^3.0.6 | Icônes |
| React Native Reanimated | ~4.1.1 | Animations |
| react-native-modal-datetime-picker | ^18.0.0 | Picker date/heure |
| react-native-svg | 15.12.1 | Fade scroll, gradients |
| Biome | ^2.3.7 | Lint + format (pas d'ESLint/Prettier) |
| TypeScript | ~5.9.2 | Strict mode |

L'i18n est **fait main** (pas i18next, malgré la dépendance présente — héritage à nettoyer).

---

## Démarrage

```bash
npm install
cp .env.example .env       # puis remplir les valeurs
npm run dev                # expo start
```

Scripts disponibles : `npm run dev`, `npm run ios`, `npm run android`, `npm run web`, `npm run lint`.

---

## Structure du projet

```
model-react-native/
├── index.ts                          # Entry point Expo
├── App.tsx ou src/app.tsx            # Composant racine + providers
├── app.json                          # Config Expo
├── env.d.ts                          # Typage de process.env
├── .env / .env.example               # Variables d'env
├── babel.config.js
├── biome.jsonc
└── src/
    ├── env.ts                        # Wrapper typé des variables .env
    ├── pages/                        # Écrans (un dossier par écran)
    ├── routers/                      # Navigation
    ├── themes/                       # Couleurs, spacing, radius, thèmes light/dark
    ├── hooks/                        # Hooks globaux (useObserved*, useToast)
    ├── utils/                        # Utilitaires (getRandomColor)
    ├── locales/fr/                   # Fichiers de traduction (par namespace)
    │   ├── libs/                     # Trad des composants de la lib
    │   └── pages/                    # Trad des écrans
    └── libs/
        ├── basics/                   # Primitives (Box, Text, VStack, etc.)
        ├── design/                   # Composants design (Button, Input, Toast, etc.)
        └── i18n/                     # Hook de traduction custom
```

Chaque composant complexe suit le pattern :
```
<composant>/
├── index.tsx
├── components/   # sous-composants éventuels
├── hooks/        # hooks dédiés
├── type/         # types/interfaces propres
├── enum/         # enums propres
├── variant/      # variantes (ex. styles solid/outline/ghost)
└── utils/        # utilitaires
```

---

## Bootstrap de l'app

`index.ts` se contente d'enregistrer le composant racine via Expo.

Le composant racine (`App.tsx`) empile les providers dans cet ordre :

1. **`SafeAreaProvider`** — fournit les insets (status bar, home indicator).
2. **`ThemeProvider`** (Shopify Restyle) — choisit `darkTheme` ou `lightTheme` via `useColorScheme()`.
3. **`ContextToastProvider`** — state global du toast.
4. **`AppContent`** — layout `flex: 1`, edge-to-edge :
   - Bandeau du haut à la hauteur de `insets.top`.
   - `Router` au milieu (flex: 1).
   - `Toast` en overlay (positionné en haut à droite).
   - `KeyboardAccessory` (iOS uniquement) — barre OK au-dessus du clavier.

---

## Thèmes

Tout passe par **Shopify Restyle**. Le thème centralise les couleurs, le spacing, les radii et les variantes de texte ; il est consommé par tous les composants `basics` et `design`.

### Couleurs (`src/themes/colors/`)

- **`palette.tsx`** — palette de base : `primary`, `secondary`, `destructive`, `success`, `slate`, `gray`, `red`, `orange`, `amber`, `yellow`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`, `white`, `black`, `zinc`.
- Chaque couleur a **11 teintes** indexées `a` → `k`, avec une opacité décroissante (1.0, 0.9, 0.8 … 0.05).
- **`colorLight.tsx` / `colorsDark.tsx`** — étendent la palette en ajoutant les sémantiques de l'app : `background`, `text`, `link`.
- **`EnumColors`** (`colors/enum/enumColors.tsx`) — enum typé pour accéder aux couleurs : `EnumColors.primary.a`, `EnumColors.gray.f`, `EnumColors.text`, etc.
- **`buildFlatPalette`** (`themes/utils/`) — aplatit la palette imbriquée en `{ "primary.a": "...", "primary.b": "..." }` pour Restyle.

### Spacing (`src/themes/spacing/`)

Enum `EnumGap` : `null` (0), `xs` (4), `s` (8), `m` (16), `l` (24), `xl` (32).

### Radius (`src/themes/radius/`)

Enum `EnumRadius` : `xs` (4), `s` (8), `m` (16), `l` (24), `xl` (32), `full` (9999).

### Tailles d'icônes (`src/themes/iconSize/`)

Enum : `xxs` (4), `xs` (8), `s` (12), `m` (16), `l` (20), `xl` (28), `xxl` (36).

### Thèmes assemblés

- **`lightTheme.tsx`** et **`darkTheme.tsx`** — créés via `createTheme()` de Restyle, regroupent palette aplatie + spacing + borderRadii + textVariants.
- **`TypeTheme`** (`themes/enum/typeTheme.tsx`) — type inféré du `lightTheme`, à utiliser avec `useTheme<TypeTheme>()`.

---

## Routing

`src/routers/index.tsx` — **bottom tabs** via `@react-navigation/bottom-tabs`. Le `NavigationContainer` reçoit un thème Navigation construit à partir du thème Restyle courant (mapping `primary`, `background`, `card`, `text`, `border`, `notification`).

Écrans visibles : `Home`, `Inputs`, `Dialog`, `Button`, `Tag`, `Loader`, `Toast`, `Accordeon`. Un écran caché (`Secrette`) est déclaré mais sa tab est masquée via `tabBarButton: () => null` — pratique pour les routes accessibles uniquement par navigation programmatique.

Les icônes d'onglet sont Phosphor, avec `weight="fill"` quand l'onglet est focus, `"regular"` sinon.

---

## Composants `libs/basics`

Primitives bas-niveau qui encapsulent les composants natifs de React Native et exposent une API typée alignée sur le thème (via Restyle).

### `Box`
Wrapper de `View` via Restyle. Expose toutes les props Restyle (flex, colors, spacing, borders) **plus** :
- **Shadows directionnelles** : `shadowTop`, `shadowBottom`, `shadowLeft`, `shadowRight` (booléens) — l'opacité s'adapte au mode (0.7 dark / 0.1 light).
- **Borders typées** : prop `border` au format `"3 primary"` ou simplement `"primary"` (largeur par défaut 3).

C'est la brique sur laquelle tous les autres `basics` reposent.

### `HStack` / `VStack`
Sucre syntaxique pour `Box` avec `flexDirection="row"` (HStack) ou `"column"` (VStack), et **`gap={EnumGap.s}` par défaut**. Tout est overridable au call-site.

### `Text`
Wrapper du `Text` natif via Restyle. Définit des variantes typographiques (`xsNormal`, `mSemibold`, `xlBold`, etc.) accessibles via la prop `variant`. Couleurs résolues depuis `EnumColors`. Gère l'ellipsis automatiquement.

### `Icon`
Pose une icône **Phosphor** via la prop `as`. Taille résolvable via `iconSize` (enum) ou `width`/`height` directs. Couleur par défaut = `EnumColors.text`. Convention : importer chaque icône avec le suffixe `Icon` (`HouseIcon`, `UserIcon`) pour éviter les collisions de noms.

### `Img`
Wrapper transparent de `Image` natif. Existe pour cohérence d'import et faciliter une éventuelle évolution future (lazy loading, placeholder).

### `TouchableOpacity`
Miroir de `Box` mais basé sur le `TouchableOpacity` natif. Mêmes props Restyle, shadows directionnelles et borders typées que Box. C'est la zone tactile par défaut pour boutons, cards cliquables, etc.

### `HScroll` / `VScroll`
ScrollViews horizontaux / verticaux avec **fade SVG aux extrémités** quand le contenu déborde.

- Hook interne **`useScrollFade`** : tracke offset/taille du contenu vs taille du container et expose `showStart` / `showEnd` (avec un threshold 2px pour éviter le clignotement).
- Composants `FadeBlockLeft/Right` (HScroll) et `FadeBlockTop/Bottom` (VScroll) — gradients SVG (`react-native-svg`), zéro JS animé.
- **`useContentContainerStyle`** : sépare les props de spacing (padding, gap) en deux paquets — celles à appliquer au `contentContainerStyle` du ScrollView et celles à appliquer au wrapper extérieur, pour éviter les conflits visuels.

---

## Composants `libs/design`

Composants applicatifs construits par-dessus les `basics`. Tous suivent le pattern : index principal, types dans `type/`, variantes dans `variant/`, hooks/context dans `hooks/` ou `contextXxx/`.

### Accordeons (`Accordeons.parent`, `Accordeons.child`)

Système parent/enfant piloté par un context.

- **`AccordeonParent`** — container, accepte uniquement des `AccordeonChild` comme enfants (throw sinon, message traduit). Props : `indexOpen?: number[]` (lignes ouvertes au mount), `variant?: EnumAccordeonVariant` (`singleOpen` ou `multiOpen`).
- **`AccordeonChild`** — ligne dépliable. Header cliquable (texte + icône optionnelle + chevron animé), contenu masqué qui s'anime avec `FadeIn`/`FadeOut` + `LinearTransition` (Reanimated).
- L'état ouvert/fermé de chaque ligne est géré par **`ContextAccordeonParent`**.

### Buttons (`Btn.basic`, `Btn.menu`)

- **`Btn.basic`** (`Button`) — bouton standard. Variantes via `buttonVariant` : `solid`, `outline`, `ghost`, `ghostSelected` (toggle ghost↔solid selon `isActive`), `link`. Couleur via `colorSchema` (n'importe quelle valeur `EnumColors`). Icônes positionnelles : `iconLeft`, `iconRight`, `iconCenter` (mutuellement exclusif avec `text`).
- **`Btn.menu`** (`ButtonMenu`) — bouton qui ouvre un panneau d'autres `Btn.basic` au tap. Mesure l'espace disponible : s'ouvre vers le bas par défaut, vers le haut si moins de 200px en dessous ; même logique gauche/droite pour l'alignement horizontal. Panel scrollable au-delà de 200px. Chevron animé. Tous les boutons enfants reçoivent automatiquement `buttonVariant="ghost"` et `numberOfLines={1}` ; chaque clic ferme le menu.

### Dialog

Modal coulissante depuis le bas avec backdrop **BlurView**. Hauteur 70% de l'écran, animation `translateY` 250ms. Props : `isOpen`, `onClose`, `canClose` (désactive la fermeture par tap backdrop).

### Inputs (`Inputs.provider`, `Inputs.text`, `.textarea`, `.number`, `.email`, `.code`, `.date`, `.heure`, `.phone`)

Système de formulaire **avec context partagé** (`ContextInputs`).

- **`Inputs.provider`** — wrappe le formulaire, déclare la shape des champs (`values`, `errors` indexés par `label`).
- Chaque input reçoit un `label: string` qui sert de clé dans le context.
- Validation : prop optionnelle `setError?: (value) => string | undefined`. L'erreur n'apparaît qu'**après que l'utilisateur a touché le champ** (UX : pas d'erreur au mount).
- Tailles via `EnumInputSize` : `xs`, `s`, `m`, `l`, `xl` — chaque taille définit fontSize, padding et variantes de texte (titre/helper).

Détail des inputs :

| Input | Particularité |
|---|---|
| `text` | Base, support `leftComponent` / `rightComponent`, `formatValue` (affichage) / `parseValue` (stockage), `isSecret` pour masquer. |
| `textarea` | `multiline`, hauteur min basée sur prop `rows` (défaut 4). |
| `number` | Sanitization stricte. Props `decimal` (accepte `.`) et `allowNegative`. Stocke un `number` ou `undefined`. |
| `email` | Wrapper de `text` + validation `@` + `.`, icône `AtIcon`, `keyboardType="email-address"`, placeholder traduit. |
| `code` | OTP/PIN : N cellules d'1 chiffre. Auto-focus sur la suivante en saisie, backspace recule. Prop `nbCaractere`. |
| `date` | Modal date picker (`react-native-modal-datetime-picker`). Variante `date` ou `dateEtHeure` (`EnumInputDateVariant`). Bornes `minimumDate` / `maximumDate`. |
| `heure` | Picker time spinner 24h, locale `fr-FR`. Stocke un objet `TypeHeure = { hours, minutes }`. |
| `phone` | Détection pays automatique (France, Belgique, Suisse, Espagne, UK, USA/Canada, Allemagne). Menu déroulant à gauche pour changer. Formate par groupes selon le pays. Validation = nombre exact de chiffres pour le préfixe sélectionné. |

**`KeyboardAccessory`** (`inputs/keyboardAccessory/`) — barre grise iOS au-dessus du clavier avec bouton « OK » qui dismiss. Tous les inputs partagent le même `nativeID` (`KEYBOARD_ACCESSORY_ID`). Posé une seule fois au niveau racine de l'app.

### Loader (`Loader.Spinner`, `Loader.Skeleton`)

- **`Spinner`** — icône Phosphor `CircleNotchIcon` qui tourne (360° / 1s). Taille auto selon le conteneur. Si `text` fourni, le présente à côté ou en dessous selon l'espace. BlurView en fond.
- **`Skeleton`** — rectangle pulsant (opacité 0.3 ↔ 0.8). Placeholder de chargement standard.

Les deux sont contrôlés par `isActive` (retournent `null` si `false`).

### Tag

Badge compact. Variantes `solid`, `outline`, `ghost` via `tagVariant`. Couleur via `colorSchema`. Icônes `leftIcon` / `rightIcon` / `centerIcon` (le dernier exclusif avec `text`). Texte clampé à 1 ligne.

### Toast

Notification temporaire qui glisse depuis la droite (translateX, 250ms). Position fixe en haut-droite, maxWidth 70%. **Auto-dismiss** après `duration` ms (défaut 3000). Title + subtitle optionnel. Variantes `solid` / `outline` / `ghost`. Couleur via `colorSchema`. Border-left de 4px coloré.

Piloté par **`ContextToast`** : on appelle `newToast({ title, subtitle, ... })` depuis n'importe où dans l'app.

---

## Contexts

Trois contexts maison structurent l'état partagé. Tous exposent un hook `useContextXxx()` qui throw si appelé hors du provider (message d'erreur traduit).

### `ContextInputs` (`libs/design/inputs/contextInput/`)
État partagé des formulaires : `values`, `errors`, `setValues[label]`, `setErrors[label]`. Le provider accepte une fonction enfant en renderProp pour accéder aux valeurs compilées (`<Inputs.provider>{ctx => …}</Inputs.provider>`). Supporte `string`, `number`, `Date`, `TypeHeure`.

### `ContextToast` (`libs/design/toast/contextToast/`)
Stocke le toast courant (`TypePropsToast | undefined`) et expose `newToast()`. La logique d'auto-dismiss est dans le composant `Toast` lui-même, posé une seule fois au niveau de `AppContent`.

### `ContextAccordeonParent` (`libs/design/accordeons/parent/contextAccordeonParent/`)
État ouvert/fermé de chaque ligne d'un accordéon. La variante `singleOpen` ferme les autres lignes à chaque ouverture ; `multiOpen` les laisse coexister.

---

## Hooks globaux

`src/hooks/`

### `useObservedHeight` / `useObservedWidth`
Observent la taille d'une ref (`onLayout`) et exposent `{ ref, height/width, breakpoint }`. Le breakpoint est une lettre `a` → `z` mappée à des paliers de pixels (`EnumBreakpointHeight` / `EnumBreakpointWidth`). Utile pour des layouts qui doivent réagir à la taille d'un container (pas à celle de l'écran).

### `useToast`
Helper minimal au-dessus de `useContextToast` : prend `{ propsToast, isOpen }`. Si `isOpen` → push le toast ; sinon → clear.

---

## Utils

`src/utils/getRandomColor.tsx` — pioche une couleur au hasard dans `EnumColors`. Modes :
- `default` (par défaut) — une teinte par couleur (la clé `default`).
- `all` — toutes les teintes (`a` → `k`) confondues.

Utilisé surtout pour les démos et la variété visuelle.

---

## Internationalisation (i18n)

**Système custom** (pas i18next), pensé pour l'usage simple : pas de chargement asynchrone, tout est bundlé au build, une seule locale (`fr`) pour l'instant.

### Architecture

`src/libs/i18n/`
- **`translations.ts`** — importe tous les JSON et les expose dans un objet `translations = { fr: { "libs/<x>": …, "pages/<x>": … } }`. Le **namespace** est la clé : un segment `libs/` ou `pages/` + un nom de composant ou de page.
- **`useTranslation(namespace)`** (`hooks/useTranslation.tsx`) — retourne une fonction `t(key, params?)`. Le namespace est passé à l'appel du hook ; la clé peut être imbriquée avec des points (ex. `"email.placeholder"`). Interpolation via `{paramName}` (simple accolades, **pas** `{{double}}`).

### Fichiers de traduction

`src/locales/fr/`
- `libs/` — un fichier par composant de la lib : `accordeons.json`, `button.json`, `buttonMenu.json`, `inputs.json`, `tag.json`, `toast.json`.
- `pages/` — un fichier par écran : `home.json`, `accordeon.json`, `button.json`, `dialog.json`, `inputs.json`, `loader.json`, `secrette.json`, `tag.json`, `toast.json`.

Toutes les clés sont en **camelCase**, toutes les valeurs en **français** — y compris les messages d'erreur (`throw new Error(t("…"))`).

### Usage

```tsx
import { useTranslation } from "@/src/libs/i18n";

function MonComposant() {
  const t = useTranslation("libs/button");
  return <Text>{t("errorIconCenterWithText")}</Text>;
}

// avec interpolation :
const t = useTranslation("libs/inputs");
t("phone.errorDigitsRequired", { digits: 9, prefix: "+33" });
// → "9 chiffres requis après +33"
```

### Ajouter une traduction

1. Créer ou éditer le fichier `src/locales/fr/<libs|pages>/<nom>.json`.
2. Importer le JSON dans `src/libs/i18n/translations.ts`.
3. L'enregistrer dans `translations.fr` sous la clé `"<libs|pages>/<nom>"`.
4. Utiliser : `const t = useTranslation("<libs|pages>/<nom>"); t("maCle")`.

---

## Variables d'environnement

Pattern **natif Expo SDK 49+** : préfixe `EXPO_PUBLIC_*` → exposé à `process.env` au build. Aucune dépendance externe.

### Fichiers

- **`.env`** — valeurs locales (ignoré par git).
- **`.env.example`** — template committé.
- **`env.d.ts`** — typage de `process.env` pour l'autocomplete.
- **`src/env.ts`** — wrapper qui **valide la présence** des vars au démarrage (throw si manquante) et expose un objet `env` typé.

### Usage

```ts
import { env } from "@/src/env";
fetch(`${env.apiUrl}/users`);
```

### Ajouter une variable

1. Ajouter la ligne dans `.env` et `.env.example` : `EXPO_PUBLIC_MA_VAR=...`.
2. Ajouter le champ dans `env.d.ts` (`ProcessEnv`).
3. Exposer dans `src/env.ts` : `maVar: required("EXPO_PUBLIC_MA_VAR")`.

**Important** : redémarrer `expo start` après chaque modif du `.env` (les valeurs sont bundlées).

---

## Conventions de code

Détaillées dans `~/.claude/rules/` (TypeScript, React, Gluestack v2, Phosphor, etc.). Résumé :

- **TypeScript strict**. Pas d'`any`.
- **Fichiers en camelCase** (première lettre minuscule).
- **Un fichier = un seul export principal** (fonction, composant, type, enum).
- **150 lignes max par fichier** — au-delà, découper en dossier (`index.tsx` + `components/` + `hooks/`).
- **Named exports** (pas de `export default`).
- **Variables / fonctions** : `camelCase`.
- **Types** : `PascalCase` préfixé `Type` (ex. `TypeButtonProps`).
- **Interfaces** : `PascalCase` préfixé `Inter`.
- **Enums** : `PascalCase` préfixé `Enum`. Toujours préférer un enum à une union de strings.
- **Fonctions nommées** (`function foo() {}`) en top-level, arrow function uniquement en callback/JSX inline.
- **VStack / HStack en priorité** sur Box/View pour les layouts.
- **Icônes Phosphor** importées avec suffixe `Icon` (`HouseIcon`, `UserIcon`).
- **className en backticks** (jamais en double-quotes) — convention Gluestack/NativeWind, n'est pas en vigueur ici (RN pur + Restyle), conservé pour cohérence multi-projets.

Lint/format : **Biome** (`npm run lint` = `biome check --write`). Tab pour l'indentation, ligne 80 max.

---

## Scripts npm

| Script | Action |
|---|---|
| `npm run dev` | `expo start` |
| `npm run ios` | `expo run:ios` |
| `npm run android` | `expo run:android` |
| `npm run web` | `expo start --web` |
| `npm run lint` | `biome check --write` (autofix) |
| `npm run lint:fix` | `biome format --write` |
| `npm run lint:check` | `biome check --write` |

---

## Historique des décisions structurantes

- **React Navigation** plutôt qu'**Expo Router** : table de routage explicite, plus simple à raisonner depuis le web.
- **Shopify Restyle** plutôt que Tailwind/NativeWind/Gluestack : typage strict du thème, pas de runtime de classes à parser, props directement typées au niveau du composant.
- **i18n maison** plutôt qu'i18next : pas besoin de détection de langue, pas de chargement async, juste un dictionnaire + une fonction d'interpolation. Réduit la surface d'API.
- **Pattern context pour les formulaires** (`ContextInputs`) : permet d'avoir des setters par-champ stables, sans re-render global du formulaire à chaque frappe.
- **`EXPO_PUBLIC_*` natif** plutôt que `react-native-dotenv` ou `react-native-config` : zéro dépendance, supporté nativement depuis Expo SDK 49.
