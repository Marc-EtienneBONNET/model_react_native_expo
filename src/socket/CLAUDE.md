# src/socket/

> ⚠ MAINTENANCE: any URL/transport change, new listened/emitted event, auth callback change, refacto to hook → update this CLAUDE.md SAME SESSION.

## meta
- role: singleton socket.io-client (module-level, NOT a hook/provider)
- entry: src/socket/index.tsx
- exports: { socket: Socket }
- depends: [socket.io-client, @react-native-async-storage/async-storage, src/libs/i18n/instance, src/env]
- forbidden_imports: [src/store/*, src/pages/*]
- decoupled_from: src/store/* — bridge via dispatch in app.tsx listener if needed

## setup
```ts
export const socket: Socket = io(API_URL, {
  autoConnect: false,
  auth: async (cb) => {
    const token = await AsyncStorage.getItem("tokenConnection");
    cb({
      locale: i18n.language || "fr",
      token: token ?? undefined,
    });
  },
});
```
- url: API_URL from src/env (= EXPO_PUBLIC_API_URL, default `"http://localhost:3000"`)
- transport: socket.io default (WebSocket + HTTP polling fallback); path `/socket.io/`
- autoConnect: false (explicit connect in app.tsx — avoids cold-start race)
- auth: async cb, re-evaluated each handshake (initial + reconnect) → token+locale always fresh
- reconnection: socket.io default (enabled)

## lifecycle (src/app.tsx useEffect)
- mount: `socket.connect(); socket.on("pong", handler)`
- unmount: `socket.off("pong", handler); socket.disconnect()`

## events
| direction | events_now | typing |
|---|---|---|
| listened (server→client) | [pong] | untyped (DefaultEventsMap) |
| emitted (client→server) | [] | untyped |

To type: `io<ServerToClientEvents, ClientToServerEvents>(...)`. Define interfaces + pass generics.

## backend sync
- counterpart: model_node_express src/api/socket/index.ts
- adding event: declare on BOTH sides with same name + payload shape

## extending
| need | how |
|---|---|
| global listener | useEffect in app.tsx + cleanup `off` |
| page-scoped listener | useEffect in page + cleanup `off` |
| emit | `socket.emit(name, payload)` anywhere |
| check state | `socket.connected` (boolean), `socket.id` |
| reset (logout) | `socket.disconnect()` then `socket.connect()` |

## invariants
- singleton module-level: ONE socket for the whole app
- auth callback async OK, but MUST call `cb({...})` — omission = handshake hangs forever
- listeners ACCUMULATE on `socket.on(...)` — every on() MUST have matching off()
- listener removal needs SAME reference: `const fn = () => …; on("foo", fn); off("foo", fn)`
- `off("foo")` without ref removes ALL listeners of "foo" (cleanup-all use case only)
- locale change effective at NEXT reconnect, not current session — emit `localeChanged` explicit if needed

## pitfalls
- `autoConnect: false` is volontaire — replacing with `true` causes connect-before-providers race
- if a screen does `socket.on()` without cleanup and remounts 10×, you have 10 stale handlers firing
- anonymous handler `socket.on("foo", () => …)` cannot be selectively removed — keep refs
- proxy/CDN that strips WebSockets falls back to polling (slow); test infra path
- `socket.disconnect()` does NOT clear listeners — they fire again on next `connect()`

## public api (refacto-stable)
- `socket` (Socket instance) — rename breaks all imports
