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

Elements on a surface are grouped by their **parent** in the UI tree (the surface root, a container panel, or scroll **content**). Among siblings, **[draw order is controlled by `z_index`](/guide/elements#draw-order)** (`z_index` / `zIndex` on **`props` only`). Switching surfaces with `ss.ui.activate` does not mix stacking between surfaces — each active view only shows its own surface’s hierarchy.

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
