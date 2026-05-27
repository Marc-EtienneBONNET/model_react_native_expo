# src/store/

> ⚠ MAINTENANCE: any new slice, endpoint, tag, baseQuery change, new prepareHeader, new middleware → update this CLAUDE.md SAME SESSION.

## meta
- role: global state via Redux Toolkit + RTK Query (single store, ALL remote API through `api`)
- entry: src/store/index.tsx
- depends: [@reduxjs/toolkit, @reduxjs/toolkit/query/react, @react-native-async-storage/async-storage, src/libs/i18n/instance, src/env]
- consumed_by: [src/app.tsx (Provider), src/pages/* (hooks)]
- decoupled_from: src/socket/* (and inverse) — bridge via dispatch in app.tsx if needed

## structure
```
store/
  index.tsx                      # configureStore + createApi (baseQuery + tagTypes + setupListeners)
  exemple/
    type.tsx                     # TypeExempleRequest, TypeExempleResponse
    exemple.tsx                  # api.injectEndpoints({...}) + re-export hooks
```

## store config (index.tsx)
```ts
const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (gdm) => gdm().concat(api.middleware),
});
setupListeners(store.dispatch);
```
- exports: `store`, `api`, `TypeRootState = ReturnType<typeof store.getState>`, `TypeAppDispatch = typeof store.dispatch`

## baseQuery
```ts
fetchBaseQuery({
  baseUrl: API_URL,                                    // src/env (= EXPO_PUBLIC_API_URL)
  prepareHeaders: async (headers) => {
    headers.set("Accept-Language", i18n.language || "fr");
    const token = await AsyncStorage.getItem("tokenConnection");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});
```
- `Accept-Language` from i18next instance
- `Authorization` from AsyncStorage key `"tokenConnection"` (raw string; header set ONLY if present — no empty Bearer)

## tagTypes
- current: `["Exemple"]`
- extend per feature

## feature pattern
```
store/<feature>/
  type.tsx                       # TypeXxxRequest, TypeXxxResponse
  <feature>.tsx                  # api.injectEndpoints({ endpoints: b => ({...}) }) + re-export hooks
```

```ts
const xxxApi = api.injectEndpoints({
  endpoints: (b) => ({
    getXxx: b.query<TypeXxxResponse, TypeXxxRequest>({
      query: () => "xxx/",
      providesTags: ["Xxx"],
    }),
    postXxx: b.mutation<TypeXxxResponse, TypeXxxRequest>({
      query: (body) => ({ url: "xxx/", method: "POST", body }),
      invalidatesTags: ["Xxx"],
    }),
  }),
});
export const { useGetXxxQuery, useLazyGetXxxQuery, usePostXxxMutation } = xxxApi;
```

## persistence
- NO redux-persist
- ONLY token persisted manually via AsyncStorage key `"tokenConnection"`
- if other slices need persist: add redux-persist with strict whitelist; NEVER persist RTK Query cache (uncontrolled size)

## conventions
- no createSlice yet — add `store/<feature>/<feature>Slice.tsx` + add to reducer if pure-client UI state needed
- no custom thunks — RTK Query covers async I/O; orchestrate hooks in a custom hook for sequential logic
- token key: ONLY `"tokenConnection"` in AsyncStorage; other keys = new doc here
- error shape from backend: `{ message, status }` → render via Toast (src/libs/design/toast)
- prefer `useLazyGetXxxQuery` for manual fetches (buttons, refresh); `useGetXxxQuery` for mount-fetch

## invariants
- ONE PrismaClient equivalent here: ONE `api` instance; never recreate
- `api.injectEndpoints` overrideExisting default false → double declaration = silent warning
- baseUrl has NO trailing `/` (queries provide trailing slash)
- prepareHeaders async OK — keep it cheap (AsyncStorage only, no network)

## pitfalls
- `i18n.language` read AT request time (not memoized) — language change mid-session affects subsequent requests
- token absent ≠ token empty: getItem returns null → Authorization header NOT set (intentional; do not change to ``Bearer ${token ?? ""}``)
- `useLazyXxxQuery` returns `[trigger, result]` — don't mix with `useXxxQuery`
- `pollingInterval` triggers re-render per tick — sparing use on mobile (battery)
- renaming `reducerPath` (`api`) breaks ALL RTK Query selectors — full IDE-wide refactor required

## public api (refacto-stable)
- `store`, `api`, `TypeRootState`, `TypeAppDispatch`
- per feature: `use<Feature>Query`, `useLazy<Feature>Query`, `use<Feature>Mutation`, …
