# Nested Layout

`surface:layout(def)` recursively processes a tree of nested layout containers and emits all leaf elements in a single call. This is the **recommended** way to build complex UIs — no manual pixel positioning needed.

Returns a **handles table** mapping each element `id` to its handle.

```lua
local h = ui:layout({
    layout = "flex",
    rect = { unit = "px", x = 0, y = 0, w = 480, h = 272 },
    direction = "column", gap = 0,
    children = {
        -- Title bar (fixed 24px height)
        { layout = "flex", rect = { h = 24 }, direction = "row", gap = 0,
          children = {
            { id = "hdr", type = "panel", flex = 1, style = { bg = "#1E293B" } },
            { id = "title", type = "label", flex = 1,
              props = { text = "MY APP" },
              style = { font_size = 13, color = "#22C55E" } },
        }},

        -- Content area: two columns
        { layout = "flex", flex = 1, direction = "row", gap = 8, padding = 6,
          children = {
            -- Left column
            { layout = "flex", flex = 1, direction = "column", gap = 4,
              children = {
                { id = "chart", type = "sparkline", flex = 1,
                  props = { data = "1|2|3|4|5" },
                  style = { bg = "#111827" } },
            }},
            -- Right column
            { layout = "flex", flex = 1, direction = "column", gap = 4,
              children = {
                { id = "info", type = "label", flex = 1,
                  props = { text = "Details here" },
                  style = { color = "#E2E8F0" } },
            }},
        }},
    }
})

-- Update elements later using handles
h.title:set_props({ text = "UPDATED TITLE" })
h.chart:set_props({ data = "5|4|3|2|1" })
ui:commit()
```

## Node Types

| Pattern | Behavior |
|---|---|
| Has `children` but no `id` | Pure layout container — computes rects, not rendered |
| Has `id` but no `children` | Leaf element — emitted as a UI element |
| Has both `id` and `children` | Emitted as UI element (defaults to `"panel"`), children laid out inside |

## Layout Options (Container Nodes)

| Field | Description |
|---|---|
| `layout` | `"flex"` (default) or `"grid"` |
| `direction` | `"row"` or `"column"` (flex only) |
| `gap` | Spacing between children (default 4) |
| `padding` | Inset from container edges |
| `align` | Cross-axis alignment (flex only) |
| `justify` | Main-axis distribution (flex only) |
| `cols` | Number of columns (grid only, default 2) |
| `row_height` | Row height (grid only) |

## Sizing Children

| Field | Behavior |
|---|---|
| `flex = N` | Grows proportionally |
| `rect = { w = N }` | Fixed width (row layout) |
| `rect = { h = N }` | Fixed height (column layout) |
| Neither | Defaults to 40px fixed |
