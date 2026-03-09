# Gauge

A 180° arc gauge with colored threshold zones and a needle. Perfect for pressure, temperature, or any value with normal/warning/danger ranges.

```lua
ui:element({
    id = "pressure_gauge", type = "gauge",
    rect = { unit = "px", x = 10, y = 50, w = 120, h = 80 },
    props = {
        value = 101.3,
        min = 0,
        max = 200,
        warn = 0.65,
        danger = 0.85,
        label = "PRESSURE",
        unit = " kPa",
    },
    style = {
        bg = "#111827",
        arc_thickness = 8,
        font_size = 12,
        value_color = "#E2E8F0",
        label_color = "#64748B",
    }
})
```

| Prop | Description |
|---|---|
| `value` | Current value |
| `min` | Minimum value |
| `max` | Maximum value |
| `warn` | Fraction (0..1) where warning zone starts (default 0.6) |
| `danger` | Fraction (0..1) where danger zone starts (default 0.85) |
| `invert` | If true, color bands are reversed (danger on left) |
| `label` | Optional label text below value |
| `unit` | Optional unit suffix appended to value display |

| Style | Description |
|---|---|
| `bg` | Background color |
| `arc_color` | Arc border color |
| `needle_color` | Needle color |
| `normal_color` | Normal zone color |
| `warn_color` | Warning zone color |
| `danger_color` | Danger zone color |
| `value_color` | Value text color |
| `label_color` | Label text color |
| `arc_thickness` | Arc ring thickness in pixels (default 10) |
| `font_size` | Value/label font size |
