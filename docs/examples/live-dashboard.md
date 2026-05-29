# Live Dashboard Example

A real-time station monitoring dashboard that updates gauges, sparklines, and tables every tick.

The shipped **`LiveDashboard.lua`** builds the layout once, then streams chart data with **`handle:push()`** instead of maintaining manual history tables.

## Minimal Pattern (build once + push)

```lua
local ui = ss.ui.surface("main")
ss.ui.activate("main")

local tempSpark = ui:element({
    id = "temp_spark", type = "sparkline",
    rect = { unit = "px", x = 250, y = 30, w = 200, h = 70 },
    props = { capacity = 30, min = 15, max = 35 },
    style = { bg = "#111827", line_color = "#22C55E", fill_color = "#22C55E20" },
})

local powerChart = ui:element({
    id = "power", type = "linechart",
    rect = { unit = "px", x = 10, y = 110, w = 300, h = 80 },
    props = {
        capacity = 40,
        series_colors = { "#22C55E", "#EF4444" },
        series_labels = { "Generated", "Load" },
    },
    style = { bg = "#111827", show_grid = "true", show_legend = "true" },
})

ui:commit()

local accum = 0
local LT = ic.enums.LogicType

function tick(dt)
    accum = accum + dt
    if accum < 0.5 then return end
    accum = 0

    local temp = ic.read(0, LT.Temperature)
    if temp then temp = temp - 273.15 else temp = 22 + math.sin(os.clock()) * 3 end

    local generated = 800 + math.sin(os.clock() * 0.4) * 350
    local load = 550 + math.cos(os.clock() * 0.55) * 200

    tempSpark:push(temp)
    powerChart:push(generated, load)

    ui:commit()
end
```

## Key Patterns Demonstrated

- **Build-once layout** with element handles retained across ticks
- **Streaming sparkline / linechart** via `handle:push()` and the `capacity` prop (rolling window length)
- **Live gauge + table updates** via `handle:set_props()`
- **Categorical barchart** (fixed labels) still uses `set_props({ values = ... })` each tick
- **Throttled updates** at 2 Hz to avoid excessive commits

See **`Examples/LiveDashboard.lua`** for the full multi-panel dashboard (dual sparklines, multi-series linechart, zone table, atmospheric barchart).
