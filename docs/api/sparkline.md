# Sparkline

A lightweight chart that draws a polyline from data points. Useful for live sensor feeds and history graphs.

```lua
local history = { 21.0, 21.3, 22.1, 21.8, 23.0, 22.5, 21.9 }

ui:element({
    id = "temp_chart", type = "sparkline",
    rect = { unit = "px", x = 10, y = 50, w = 200, h = 60 },
    props = {
        data = history,
        min = 18,
        max = 28,
    },
    style = {
        bg = "#111827",
        line_color = "#22C55E",
        fill_color = "#22C55E20",  -- semi-transparent fill under line
        thickness = 2,
    }
})
```

| Prop | Description |
|---|---|
| `data` | Array of float values |
| `min` | Y-axis minimum (auto-detected if omitted) |
| `max` | Y-axis maximum (auto-detected if omitted) |

| Style | Description |
|---|---|
| `bg` | Background color |
| `line_color` | Polyline color (default green) |
| `fill_color` | Area fill under line (default transparent) |
| `thickness` | Line thickness in pixels (default 2) |

## Live Updating

```lua
local history = { 20, 20, 20, 20, 20 }
local spark = ui:element({ id = "chart", type = "sparkline", ... })

function tick(dt)
    table.remove(history, 1)
    history[#history + 1] = ic.read(0, ic.enums.LogicType.Temperature) or 20
    spark:set_props({ data = history })
    ui:commit()
end
```
