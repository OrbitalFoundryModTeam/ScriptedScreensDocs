# Colors & Gradients

## Color Formats

All color values throughout the UI system accept these formats:

| Format | Example | Description |
|---|---|---|
| Hex | `"#FF0000"` | RGB hex color |
| Hex + alpha | `"#FF000080"` | RGBA hex color (50% opacity) |
| `rgb()` | `"rgb(255, 0, 0)"` | CSS-style RGB (values 0–255) |
| `rgba()` | `"rgba(255, 0, 0, 0.5)"` | CSS-style RGBA (alpha 0.0–1.0) |

These work everywhere a color is expected: `bg`, `fill`, `color`, `gradient`, `color_stops`, canvas functions, etc.

## Gradients

Gradients are supported on `panel`, `button`, and `progress` elements.

### Two-Color Gradient

```lua
ui:element({
    id = "header", type = "panel",
    rect = { unit = "px", x = 0, y = 0, w = 480, h = 40 },
    style = { bg = "#1E3A5F", gradient = "#0F172A", gradient_dir = "horizontal" },
})
```

### Multi-Stop (Evenly Spaced)

```lua
style = {
    gradient = { "#EF4444", "#EAB308", "#22C55E", "#3B82F6" },
    gradient_dir = "horizontal",
}
```

### Multi-Stop (Explicit Positions)

```lua
style = {
    gradient = {
        { 0,   "#22C55E" },   -- green at 0%
        { 0.7, "#EAB308" },   -- yellow at 70%
        { 1,   "#EF4444" },   -- red at 100%
    },
    gradient_dir = "horizontal",
}
```

### Gradient Directions

| Value | Description |
|---|---|
| `"vertical"` | Top to bottom (default) |
| `"horizontal"` | Left to right |
| `"diagonal"` | Top-left to bottom-right |
| `"radial"` | Center outward |

## Color Interpolation Helper

`ss.ui.gradient(from, to, steps)` returns a 1-indexed array of interpolated hex colors:

```lua
local colors = ss.ui.gradient("#EF4444", "#22C55E", 5)
-- Returns 5 colors from red to green
```

Useful for generating color ramps for bar charts, sparklines, or any multi-color use case.
