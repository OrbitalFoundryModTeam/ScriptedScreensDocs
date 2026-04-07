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

## Draw order (`z_index`) {#draw-order}

Within the **same parent** (surface root, scroll view content, or nested container), elements stack like layers. Set **`z_index`** (snake_case) or **`zIndex`** (camelCase) on **`props` only** — not on `style`, so there is only one place to look. **Larger values draw in front** of smaller ones; when two elements share the same value, order is stable by element `id`.

```lua
ui:element({ id = "bg", type = "panel", rect = { unit = "px", x = 0, y = 0, w = 480, h = 272 },
    props = { z_index = 0 }, style = { bg = "#0F172A" } })
ui:element({ id = "modal", type = "panel", rect = { unit = "px", x = 40, y = 40, w = 400, h = 192 },
    props = { z_index = 10 }, style = { bg = "#1E293BAA" } })
```

::: tip Updates and `tick`
Changing `z_index` in a later `ui:element` upsert or via **`set_props`** takes effect on the **next** batch the client applies. Animated stacking in a `tick` loop is fine — each `commit` re-sorts siblings under each parent.
:::

::: tip Labels vs panels
Put instructional text **above** overlapping panels in layout coordinates, or give the label a **higher** `z_index` than the panels behind it, so text is not covered.
:::

**Regression demo:** `Examples/ZIndexDemo.lua` (static stack, animated cycle, scrollview + `zIndex` on props).

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
