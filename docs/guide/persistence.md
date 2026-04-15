# Persistence (Save/Load)

## What's Automatic

ScriptedScreens persists a **UI snapshot** across game saves:

- UI element definitions (type/rect/style/props)
- Canvas pixel buffers
- Scroll positions

## Script State

Your Lua script may re-run from the top after load. If your UI is driven by script variables (current tab, selected item, etc.), implement `serialize()` / `deserialize(blob)`:

```lua
local currentTab = "main"

function serialize()
    return currentTab
end

function deserialize(blob)
    if type(blob) == "string" then
        currentTab = blob
        ss.ui.activate(currentTab)
    end
end
```

For structured state, use **`util.json.encode` / `util.json.decode`** (see **`Examples/SampleUI/RocketControlDemo.lua`**). **`Examples/VisorHudPong.lua`** saves **`lay_dx` / `lay_dy`** (dragged HUD offset) the same way.

See the [StationeersLua persistence docs](https://orbitalfoundrymodteam.github.io/StationeersLuaDocs/guide/persistence) for full details.
