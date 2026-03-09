# Grid Layout

`ss.ui.grid(opts, children)` computes fixed-column grid cell rects for an array of child definitions.

```lua
for _, def in ipairs(ss.ui.grid({
    rect = { unit = "px", x = 10, y = 50, w = 460, h = 200 },
    cols = 3,
    gap = 4,
    padding = 8,
    row_height = 60,
}, {
    { id = "c1", type = "panel", style = { bg = "#1E293B" } },
    { id = "c2", type = "panel", style = { bg = "#334155" } },
    { id = "c3", type = "panel", style = { bg = "#1E293B" } },
    { id = "c4", type = "panel", style = { bg = "#334155" } },
    { id = "c5", type = "panel", style = { bg = "#1E293B" } },
    { id = "c6", type = "panel", style = { bg = "#334155" } },
})) do
    ui:element(def)
end
```

| Option | Description |
|---|---|
| `rect` | Container rect |
| `cols` | Number of columns (default 2) |
| `gap` | Gap between cells in pixels (default 4) |
| `padding` | Inset from container edges |
| `row_height` | Fixed row height (if omitted, cells are square) |

Returns the children array with computed rects applied.
