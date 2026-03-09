# Elements

An **element** is a UI widget identified by a unique `id`. Elements are created with `surface:element(def)` and updated via element handles.

## Creating Elements

```lua
local panel = ui:element({
    id = "panel",
    type = "panel",
    rect = { unit = "px", x = 10, y = 10, w = 200, h = 100 },
    style = { bg = "#1E293B" },
})
```

## Element Handles

`ui:element(def)` returns an **element handle** for easy updates:

```lua
panel:set_style({ bg = "#334155" })
panel:set_props({ text = "Updated" })
```

Fetch an existing element later:

```lua
local panel = ui:get("panel")
panel:set_style({ bg = "#0EA5E9" })
```

## Removing Elements

```lua
ui:remove("panel")  -- Also unregisters event handlers
```

## Nested / Relative Layout

Handles can create nested children with **relative layout** and **id prefixing**:

```lua
local header = ui:element({
    id = "header",
    type = "panel",
    rect = { unit = "px", x = 0, y = 0, w = 480, h = 60 },
    style = { bg = "#111827" }
})

header:element({
    id = "title",
    type = "label",
    rect = { unit = "px", x = 20, y = 10, w = 300, h = 40 },
    props = { text = "STATUS" },
    style = { color = "#FFFFFF", font_size = 20 }
})
-- Creates element with id "header/title"
```

::: tip Best Practice
Use `parent:element()` for any logical container with children (headers, panels, toolbars). This keeps related elements grouped and creates clean hierarchical IDs.
:::

## Dynamic Handler Registration

```lua
local btn = ui:get("btn")

btn:on("click", function(playerName)
    print("clicked", playerName)
end)

btn:off("click")  -- Unregister
```

## Measuring Text

Get accurate wrapped text heights for dynamic layout:

```lua
local size = ui:measure_text("Hello world", 200, 14, true)
print("text size", size.w, size.h)
```

Arguments: `text`, `maxWidth` (0 = no wrap), `fontSize` (default 16), `wrap` (default: maxWidth > 0)
