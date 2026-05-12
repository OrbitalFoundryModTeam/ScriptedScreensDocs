# Surfaces & Views

A **surface** is a named UI view (like a page). You can maintain multiple surfaces and switch between them for multi-page UIs.

## Creating Surfaces

```lua
local main = ss.ui.surface("main")
local settings = ss.ui.surface("settings")
```

## Activating a Surface

Only the **active** surface is rendered on a given physical screen:

```lua
ss.ui.activate("main")
-- later...
ss.ui.activate("settings")
```

You can keep writing to inactive surfaces — they will display the latest state when activated.

## Programmable Visor HUDs

When the Lua chip sits in **Programmable Visor** glasses, use **`ss.hud`** instead of `ss.ui` for the same surface API:

```lua
local hud = ss.hud.surface("main")
ss.hud.activate("main")
```

`ss.hud` supports the same `surface:element`, `surface:layout`, canvas helpers, `surface:on_frame`, and `surface:commit` flow as normal ScriptedScreens surfaces, but it renders as a wearer-tied HUD overlay instead of a world-space console or tablet screen.

For the full visor-specific workflow - safe-area helpers, `ss.client_overlay()`, drag patterns, real `hud:size()`, and `on_frame` canvas notes - see **[Programmable Visor HUDs](/guide/visor-huds)**.

### `ss.client_overlay()`

**`ss.client_overlay()`** returns a table of **canvas-space rectangles** for each visible vanilla UI panel (hands strip, inventory windows, vitals, etc.), already in the same top-left/Y-down coordinate system your `hud:element` rects use - no screen-to-canvas scaling or Y-flip required.

Key fields: `ok`, `source` (`"local"` / `"remote_client"`), `panels` (array of `{ x, y, w, h, kind, title }`), `canvas_w`, `canvas_h`, `relay_age_s`, `relay_stale`, `version`.

Use the helpers on **`ss.hud`** to avoid doing placement math yourself. See **[Programmable Visor HUDs - Avoiding the vanilla HUD](/guide/visor-huds#avoiding-the-vanilla-hud)** for the full helper API and raw field reference.

### `hud:size()`

For visor scripts, **`hud:size()`** returns the wearer's actual visor canvas size, including non-16:9 layouts such as ultrawide or 16:10. Trust it directly rather than hardcoding `1920x1080`. On dedicated servers, the wearer client relays the real canvas size so server-side Lua lays out in the same coordinate space the wearer sees.

### Built-in port configuration

When the computer or console is showing the **mod-provided port wiring screen** (second physical screen: data disk inserted on computers, or screw on consoles), **`ss.ui.activate(...)` does nothing** for that motherboard. Scripts keep running, but they cannot switch surfaces until you leave config mode. This prevents periodic `activate` calls from covering the config UI.

## Screen Index

For multi-screen setups, provide a screen index:

```lua
local ui = ss.ui.surface("main", 1)  -- Second screen
```

## Querying Size

```lua
local size = ui:size()
if size then
    print("Screen: " .. size.w .. "x" .. size.h)
end
```

## Clearing a Surface

```lua
ui:clear()  -- Remove all elements from this surface
```

## Draw order on a surface

Elements on a surface are grouped by their **parent** in the UI tree (the surface root, a container panel, or scroll **content**). Among siblings, **[draw order is controlled by `z_index`](/guide/elements#draw-order)**. Use `z_index` or `zIndex` on `props` only. Switching surfaces with `ss.ui.activate` does not mix stacking between surfaces - each active view only shows its own surface hierarchy.

## Multi-Page UI Pattern

```lua
local pages = {}
pages.main = ss.ui.surface("main")
pages.settings = ss.ui.surface("settings")

-- Build each page
-- ... (create elements on each surface)

-- Navigation buttons
pages.main:element({
    id = "go_settings", type = "button",
    rect = { unit = "px", x = 10, y = 10, w = 100, h = 30 },
    props = { text = "Settings" },
    on_click = function() ss.ui.activate("settings") end
})

pages.settings:element({
    id = "go_back", type = "button",
    rect = { unit = "px", x = 10, y = 10, w = 100, h = 30 },
    props = { text = "Back" },
    on_click = function() ss.ui.activate("main") end
})

ss.ui.activate("main")
pages.main:commit()
pages.settings:commit()
```
