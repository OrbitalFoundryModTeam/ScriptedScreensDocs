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
| `thickness` | Border thickness in pixels (default **2**, same as Unity `Outline` distance) |

## `circle`

Filled **ellipse** (inscribed in `rect`) or elliptical **outline ring**. The renderer uses a mesh `Graphic`, not a square `Image`, so equal `w`/`h` gives a true circle. Fill vs stroke is controlled by **`props.filled`**, not by `thickness`.

```lua
-- Filled (default): use style.bg for the fill color (style.color is ignored)
ui:element({
    id = "led",
    type = "circle",
    rect = { unit = "px", x = 100, y = 100, w = 50, h = 50 },
    style = { bg = "#B36200" },
})

-- Outline only: set filled to false; use style.color and style.thickness
ui:element({
    id = "ring",
    type = "circle",
    rect = { unit = "px", x = 160, y = 100, w = 50, h = 50 },
    props = { filled = false },
    style = { color = "#B36200", thickness = 3 },
})
```

| Prop | Description |
|---|---|
| `filled` | Omit, empty, `true`, or `1` for **filled** disk (default). `false` or `0` for **outline** only. |

| Style | Mode | Description |
|---|---|---|
| `bg` | Filled | Fill tint (default white). |
| `color` | Outline | Stroke color when `filled` is false (default white). |
| `thickness` | Outline | Unity `Outline` distance in pixels (default **2**). |
