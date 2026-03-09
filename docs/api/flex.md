# Flex Layout

`ss.ui.flex(opts, children)` computes flexbox-style row/column rects. Children with a `flex` field grow proportionally; others use a fixed size.

```lua
for _, def in ipairs(ss.ui.flex({
    rect = { unit = "px", x = 10, y = 10, w = 460, h = 30 },
    direction = "row",
    gap = 6,
    padding = 4,
    align = "center",
    justify = "start",
}, {
    { id = "name", type = "label", flex = 2,
      props = { text = "SENSOR NETWORK" },
      style = { font_size = 14, color = "#22C55E" } },
    { id = "spacer", type = "panel", flex = 1,
      style = { bg = "#00000000" } },
    { id = "status", type = "label",
      rect = { w = 60 },  -- fixed 60px width
      props = { text = "LIVE" },
      style = { font_size = 11, color = "#EAB308", align = "right" } },
})) do
    ui:element(def)
end
```

| Option | Description |
|---|---|
| `rect` | Container rect |
| `direction` | `"row"` (default) or `"column"` |
| `gap` | Gap between items in pixels (default 4) |
| `padding` | Inset from container edges |
| `align` | Cross-axis: `"stretch"` (default), `"start"`, `"center"`, `"end"` |
| `justify` | Main-axis: `"start"` (default), `"center"`, `"end"`, `"between"`, `"evenly"` |

## Sizing Children

- `flex = N` — Grows proportionally within available space
- `rect = { w = N }` — Fixed width (in a row layout)
- `rect = { h = N }` — Fixed height (in a column layout)
- Neither — Defaults to 40px fixed

Returns the children array with computed rects applied.

## Padding

All layout helpers support a `padding` option:

```lua
-- Uniform
padding = 8

-- Per-side
padding = { top = 4, right = 8, bottom = 4, left = 8 }

-- Shorthand vertical/horizontal
padding = { vertical = 6, horizontal = 10 }
```
