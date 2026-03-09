# Bar Chart

Vertical bar chart with labeled bars, optional per-bar colors, and value labels.

```lua
ui:element({
    id = "atmos_bars", type = "barchart",
    rect = { unit = "px", x = 10, y = 50, w = 300, h = 100 },
    props = {
        labels = { "O2", "N2", "CO2", "H2O" },
        values = { 21.1, 78.1, 0.04, 1.2 },
        colors = { "#3B82F6", "#6366F1", "#EF4444", "#06B6D4" },
        max = 100,
    },
    style = {
        bg = "#111827",
        font_size = 9,
        gap = 4,
        show_values = "true",
    }
})
```

| Prop | Description |
|---|---|
| `labels` | Array of bar labels |
| `values` | Array of float values |
| `colors` | Array of hex colors per bar (cycles if fewer) |
| `min` | Minimum value (default 0) |
| `max` | Maximum value (auto-detected if omitted) |

| Style | Description |
|---|---|
| `bg` | Background color |
| `bar_color` | Default bar color (when `colors` not set) |
| `label_color` | Label text color |
| `value_color` | Value text color above bars |
| `font_size` | Label/value font size |
| `gap` | Gap between bars in pixels (default 4) |
| `show_values` | `"true"` to show value labels above bars |
