# Display Elements

## Draw order (`z_index`)

All element types can use **`z_index`** or **`zIndex`** on **`props` only** to control **stacking among siblings** (widgets that share the same parent in the UI tree: surface root, a nested container’s children, or scroll view **content**). Visual styling stays in `style`; draw order is always a prop so authors are not split between two tables.

| Rule | Detail |
|------|--------|
| Larger value | Drawn **in front** of smaller values |
| Key name | `z_index` or `zIndex` (either form on **`props`**) |
| Same `z_index` | Order follows **sibling index** after the batch (upsert / append order; pre–`z_index` behavior) |
| Scope | **Per parent only** — z on a child does not reorder against cousins under another parent |

Order is applied after each UI sync batch (e.g. after `ui:commit()` or tick-driven updates). Overlapping labels and panels both participate.

For a full explanation and nested examples, see [Elements — Draw order](/guide/elements#draw-order). Shipped regression demo: **`Examples/ZIndexDemo.lua`**.

## `label`

Text display. Supports TMP rich text tags (`<b>`, `<color>`, etc.).

```lua
ui:element({
    id = "title", type = "label",
    rect = { unit = "px", x = 20, y = 10, w = 200, h = 30 },
    props = { text = "Hello World" },
    style = { font_size = 18, color = "#FFFFFF", align = "left" }
})
```

| Prop | Description |
|---|---|
| `text` | Text content (supports TMP rich text) |

| Style | Description |
|---|---|
| `font_size` | Font size (default 16) |
| `color` | Text color |
| `align` | `"left"`, `"center"`, `"right"` |

## `panel`

Background rectangle. Non-interactive.

```lua
ui:element({
    id = "bg", type = "panel",
    rect = { unit = "px", x = 0, y = 0, w = 480, h = 272 },
    style = { bg = "#0F172A" }
})
```

| Style | Description |
|---|---|
| `bg` | Background color |
| `gradient` | End color for gradient (start = `bg`), array of colors, or array of `{position, color}` pairs |
| `gradient_dir` | `"horizontal"`, `"vertical"` (default), `"diagonal"`, `"radial"` |

## `progress`

Progress bar with filled portion. Supports color stops, indeterminate mode, and configurable fill direction (horizontal or vertical).

```lua
-- Basic progress bar
ui:element({
    id = "hp", type = "progress",
    rect = { unit = "px", x = 10, y = 10, w = 200, h = 20 },
    props = { value = 75, min = 0, max = 100 },
    style = { bg = "#1E293B", fill = "#22C55E" },
})

-- With color stops (fill changes color based on value)
ui:element({
    id = "temp", type = "progress",
    rect = { unit = "px", x = 10, y = 40, w = 200, h = 20 },
    props = { value = 0.7 },
    style = {
        bg = "#1E293B",
        fill = "#22C55E",
        color_stops = {
            { 0.5, "#EAB308" },    -- yellow from 50%
            { 0.8, "#EF4444" },    -- red from 80%
        },
    },
})

-- Indeterminate (animated sliding bar)
ui:element({
    id = "loading", type = "progress",
    rect = { unit = "px", x = 10, y = 70, w = 200, h = 8 },
    props = { indeterminate = true },
    style = { bg = "#1E293B", fill = "#38BDF8" },
})

-- Vertical progress bar (bottom to top)
ui:element({
    id = "fuel_level", type = "progress",
    rect = { unit = "px", x = 10, y = 100, w = 30, h = 120 },
    props = { value = 60, min = 0, max = 100, direction = ss.direction.BottomToTop },
    style = { bg = "#1E293B", fill = "#38BDF8" },
})

-- Right-to-left progress bar
ui:element({
    id = "rtl_bar", type = "progress",
    rect = { unit = "px", x = 50, y = 100, w = 200, h = 20 },
    props = { value = 0.4, direction = ss.direction.RightToLeft },
    style = { bg = "#1E293B", fill = "#EAB308" },
})
```

| Prop | Description |
|---|---|
| `value` | Current value (ignored in indeterminate mode) |
| `min` | Minimum value (default 0) |
| `max` | Maximum value (default 1) |
| `indeterminate` | If true, shows animated sliding fill |
| `direction` | Fill direction: `ss.direction.LeftToRight` (default), `ss.direction.RightToLeft`, `ss.direction.TopToBottom`, `ss.direction.BottomToTop`. Raw strings `"ltr"`, `"rtl"`, `"ttb"`, `"btt"` also accepted. Works with both determinate and indeterminate modes. |

| Style | Description |
|---|---|
| `bg` | Track background color |
| `fill` | Base fill color |
| `color_stops` | Array of `{ fraction, "#color" }` — fill color changes at thresholds |
| `speed` | Animation speed for indeterminate mode (default 1.2) |

## `divider`

Horizontal or vertical separator line.

```lua
ui:element({
    id = "sep", type = "divider",
    rect = { unit = "px", x = 10, y = 50, w = 460, h = 1 },
    style = { color = "#334155" }
})
```

| Style | Description |
|---|---|
| `color` | Divider color (default gray) |
