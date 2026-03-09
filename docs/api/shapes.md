# Spinner, Line & Shapes

## `spinner`

Rotating arc loading indicator.

```lua
ui:element({
    id = "loading", type = "spinner",
    rect = { unit = "px", x = 10, y = 10, w = 40, h = 40 },
    style = { color = "#38BDF8", thickness = 4 },
})
```

| Style | Description |
|---|---|
| `color` | Arc color (default accent blue) |
| `track_color` | Background track color |
| `thickness` | Arc thickness in pixels (default 4) |
| `arc_length` | Fraction of full circle (default 0.3) |
| `speed` | Rotations per second (default 2) |

## `line`

A line between two points. Element `rect` is ignored — positioning via props.

```lua
ui:element({
    id = "sep", type = "line",
    rect = { unit = "px", x = 0, y = 0, w = 0, h = 0 },
    props = { x1 = "10", y1 = "50", x2 = "200", y2 = "50" },
    style = { color = "#334155", thickness = "2" },
})
```

| Prop | Description |
|---|---|
| `x1`, `y1` | Start point |
| `x2`, `y2` | End point |

| Style | Description |
|---|---|
| `color` | Line color (default white) |
| `thickness` | Thickness in pixels (default 2) |

## `rect_outline` / `border`

Outline-only rectangle (no fill).

| Style | Description |
|---|---|
| `color` | Outline color |
| `thickness` | Border thickness (default 1) |

## `circle`

Filled or outline circle.

| Style | Description |
|---|---|
| `color` | Circle color |
| `thickness` | Outline thickness (0 = filled) |
