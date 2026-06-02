# Persistence (Save/Load)

## What's automatic (ScriptedScreens hosts)

On **motherboard consoles**, **circuit boards**, **tablet cartridges**, and the **programmable visor**, ScriptedScreens saves a **UI snapshot** with the world:

- Element definitions (type, rect, style, props)
- Canvas pixel buffers
- Scroll positions

That snapshot is restored when you load the save. Vanilla **IC circuit housings** do not run ScriptedScreens UI - only the four hosts above do.

## Script state: use `ic.persist`

Lua locals and globals are **not** saved by the game. For tabs, counters, drag offsets, game state, and anything your script owns, use StationeersLua **`ic.persist`** (string key/value store). It survives world save/load, housing power cycles, and chip pull/reinsert when the source code is unchanged.

```lua
local KEY = "ui_state"

local function load_state()
    if not ic.persist.has(KEY) then return nil end
    local raw = ic.persist.get(KEY)
    if type(raw) ~= "string" then return nil end
    local ok, t = pcall(util.json.decode, raw)
    return ok and t or nil
end

local function save_state(t)
    local ok, raw = pcall(util.json.encode, t)
    if ok and raw then ic.persist.set(KEY, raw) end
end

local currentTab = "main"
local saved = load_state()
if saved and saved.tab then currentTab = saved.tab end

function tick(dt)
    save_state({ tab = currentTab })
    ss.ui.activate(currentTab)
end
```

Read keys at **module level** after load - `ic.persist` is hydrated before your script's top-level code runs. See [StationeersLua persistence](https://orbitalfoundrymodteam.github.io/StationeersLuaDocs/guide/persistence) and [ic.persist API](https://orbitalfoundrymodteam.github.io/StationeersLuaDocs/api/persist).

## Editing chip source clears the host UI

When you change a chip's **source code** in the IC editor (or sync new code over the network), the **host's on-screen UI is cleared** before the new script compiles. The new script's `init()` / first draw builds a fresh layout. This avoids leftover buttons and labels from an old version of the script.

Same-source **power off/on** or **pull/reinsert** does **not** clear the UI snapshot - only an actual source change does.

## Legacy `serialize()` / `deserialize(blob)` - deprecated

> **Deprecated.** Both functions still work (stored inside `ic.persist` under the hood) but should not be used in new scripts. Use **`ic.persist`** directly - it is hydrated before your top-level code runs, so you can restore state at module level without waiting for a `deserialize()` callback.

Examples that have been migrated: `Examples/VisorHudPong.lua` (drag offsets), `Examples/SampleUI/RocketControlDemo.lua` (structured JSON state).
