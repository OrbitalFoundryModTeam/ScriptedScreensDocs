# Line Chart

Multi-series line chart with axes, grid lines, and optional legend.

```lua
ui:element({
    id = "power_chart", type = "linechart",
    rect = { unit = "px", x = 10, y = 50, w = 300, h = 120 },
    props = {
        series = {
            { 800, 750, 900, 850, 920 },
            { 600, 580, 640, 700, 650 },
        },
        series_colors = { "#22C55E", "#EF4444" },
        series_labels = { "Generated", "Load" },
        x_labels = { "1h", "3h", "6h", "9h", "12h" },
    },
    style = {
        bg = "#111827",
        show_grid = "true",
        show_legend = "true",
        fill = "true",
        thickness = 2,
        font_size = 9,
    }
})
```

| Prop | Description |
|---|---|
| `series` | Array of float arrays (each is a series) |
| `series_colors` | Array of hex colors per series |
| `series_labels` | Array of legend labels per series |
| `x_labels` | Array of X-axis labels |
| `min` | Y-axis minimum (auto-detected if omitted) |
| `max` | Y-axis maximum (auto-detected if omitted) |

| Style | Description |
|---|---|
| `bg` | Background color |
| `grid_color` | Horizontal grid line color |
| `axis_color` | Axis line color |
| `label_color` | Axis/legend label color |
| `thickness` | Line thickness (default 2) |
| `font_size` | Label font size |
| `show_grid` | `"true"` to show grid lines with Y-axis labels |
| `show_legend` | `"true"` to show series legend at top |
| `fill` | `"true"` to fill area under each line |

## Streaming with `push`

For live charts, `handle:push(...)` appends one sample per series and keeps a rolling
window of the last `capacity` samples (default 64) - no manual `series` table juggling:

```lua
local chart = ui:element({
    id = "power_chart", type = "linechart",
    rect = { unit = "px", x = 10, y = 50, w = 300, h = 120 },
    props = {
        capacity = 60,                              -- window length
        series_labels = { "Generated", "Load" },
        series_colors = { "#22C55E", "#EF4444" },
    },
    style = { bg = "#111827", show_grid = "true", show_legend = "true" },
})

function tick(dt)
    chart:push(generated_w, load_w)   -- one value per series, in order
    ui:commit()
end
```

Series are created on first push and stay length-aligned. If you push fewer values than
there are series, the missing series carry their previous value forward. `push` only
updates the snapshot - call `ui:commit()` once after pushing.
