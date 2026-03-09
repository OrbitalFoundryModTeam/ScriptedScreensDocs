# Checkbox, Radio & Toggle

## `checkbox`

Checkbox with a label. Toggled via `on_click`.

```lua
ui:element({
    id = "opt1", type = "checkbox",
    rect = { unit = "px", x = 10, y = 40, w = 200, h = 24 },
    props = { text = "Enable logging", checked = "true" },
    style = { check_color = "#22C55E" },
    on_click = function(player)
        -- Toggle checked state in your script
    end,
})
```

| Prop | Description |
|---|---|
| `text` | Label text |
| `checked` | `"true"` / `"false"` |

| Style | Description |
|---|---|
| `bg` | Background color |
| `check_color` | Checkmark / box outline color |
| `text` | Label text color |
| `font_size` | Label font size |

## `radio`

Radio button with a label. Use a group of radios with shared `on_click` logic.

| Prop | Description |
|---|---|
| `text` | Label text |
| `selected` | `"true"` / `"false"` |

| Style | Description |
|---|---|
| `bg` | Background color |
| `radio_color` | Dot / circle outline color |
| `text` | Label text color |
| `font_size` | Label font size |

## `toggle`

On/off toggle switch with a sliding knob.

```lua
ui:element({
    id = "power", type = "toggle",
    rect = { unit = "px", x = 10, y = 40, w = 50, h = 24 },
    props = { value = "true" },
    style = { on_color = "#22C55E", off_color = "#334155", knob = "#FFFFFF" },
    on_click = function(player)
        -- Toggle value in your script
    end,
})
```

| Prop | Description |
|---|---|
| `value` | `"true"` / `"false"` |

| Style | Description |
|---|---|
| `on_color` | Background when on (default green) |
| `off_color` | Background when off (default dark) |
| `knob` | Knob color (default white) |
