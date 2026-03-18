# Canvas Drawing

A **canvas** element gives you a pixel buffer for direct drawing — useful for graphs, games, or custom visualizations.

## Creating a Canvas

```lua
ui:element({
    id = "my_canvas", type = "canvas",
    rect = { unit = "px", x = 10, y = 10, w = 160, h = 120 }
})
```

## Drawing Functions

Colors can be **hex strings** (`"#RRGGBB"` / `"#RRGGBBAA"`), **CSS-style** (`"rgb(r,g,b)"` / `"rgba(r,g,b,a)"`), or **numeric** (`r, g, b [, a]`). Always call `canvas_apply` when done.

```lua
-- Basic drawing
ui:canvas_clear("my_canvas", "#000000")
ui:canvas_pixel("my_canvas", 10, 10, "#FF0000")
ui:canvas_hline("my_canvas", 50, 0, 159, "#333333")
ui:canvas_vline("my_canvas", 80, 0, 119, "#333333")
ui:canvas_line("my_canvas", 0, 0, 159, 119, "#FFFFFF", 2)

-- Shapes
ui:canvas_rect("my_canvas", 20, 20, 40, 30, "#00FF00")
ui:canvas_rect_outline("my_canvas", 20, 20, 40, 30, "#FFFF00")
ui:canvas_circle("my_canvas", 80, 60, 30, "#00AAFF")
ui:canvas_fill_circle("my_canvas", 80, 60, 15, "#0066CC")
ui:canvas_fill_triangle("my_canvas", 80, 10, 60, 50, 100, 50, "#FF6600")

-- Multi-point & arcs
ui:canvas_polyline("my_canvas", {10,10, 50,30, 90,10, 130,30}, "#FFFFFF")
ui:canvas_arc("my_canvas", 80, 60, 40, 0, 90, "#FF00FF")

ui:canvas_apply("my_canvas")  -- Commit to screen
```

## Function Reference

| Function               | Arguments                                                |
| ---------------------- | -------------------------------------------------------- |
| `canvas_clear`         | `(id, color)`                                            |
| `canvas_pixel`         | `(id, x, y, color)`                                      |
| `canvas_hline`         | `(id, y, x1, x2, color)`                                 |
| `canvas_vline`         | `(id, x, y1, y2, color)`                                 |
| `canvas_line`          | `(id, x0, y0, x1, y1, color [, thickness])`              |
| `canvas_rect`          | `(id, x, y, w, h, color)`                                |
| `canvas_rect_outline`  | `(id, x, y, w, h, color [, thickness])`                  |
| `canvas_circle`        | `(id, cx, cy, r, color [, thickness])`                   |
| `canvas_fill_circle`   | `(id, cx, cy, r, color)`                                 |
| `canvas_fill_triangle` | `(id, x0, y0, x1, y1, x2, y2, color)`                    |
| `canvas_polyline`      | `(id, {x,y,...}, color [, thickness])`                   |
| `canvas_arc`           | `(id, cx, cy, r, startDeg, endDeg, color [, thickness])` |
| `canvas_apply`         | `(id)`                                                   |

## Multiplayer Sync

Canvas output is synced to nearby multiplayer clients automatically after you call `canvas_apply(id)`.

Large updates are diffed and compressed internally, so you can keep using the normal canvas API without writing separate multiplayer sync code.

::: warning
Always call `canvas_apply(id)` after drawing. Drawing operations are buffered and only rendered when applied.
:::
