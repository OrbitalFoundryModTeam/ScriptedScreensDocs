# Slider, Select & TextInput

## `slider`

Horizontal slider with draggable handle.

```lua
ui:element({
    id = "vol", type = "slider",
    rect = { unit = "px", x = 10, y = 40, w = 200, h = 20 },
    props = { value = "0.5", min = "0", max = "1" },
    style = { bg = "#1E293B", fill = "#3B82F6", handle = "#FFFFFF" },
    on_change = function(value, player)
        print("New value:", value)
    end,
})
```

| Prop | Description |
|---|---|
| `value` | Current value |
| `min` | Minimum (default 0) |
| `max` | Maximum (default 100) |

| Style | Description |
|---|---|
| `bg` | Track background |
| `fill` | Filled portion color |
| `handle` | Handle color |

| Event | Callback Args |
|---|---|
| `on_change` | `(value, playerName)` |

## `select`

Dropdown select. Options are pipe-delimited.

```lua
ui:element({
    id = "mode", type = "select",
    rect = { unit = "px", x = 10, y = 40, w = 200, h = 28 },
    props = { options = "Auto|Manual|Off", selected = "0", open = "false" },
    style = { bg = "#1E293B", text = "#E2E8F0", font_size = 12 },
    on_toggle = function(player)
        -- Toggle props.open between "true"/"false"
    end,
    on_change = function(value, player)
        print("Selected index:", value)
    end,
})
```

| Prop | Description |
|---|---|
| `options` | Pipe-delimited option strings |
| `selected` | 0-based selected index |
| `open` | `"true"` / `"false"` — dropdown visibility |

| Event | Callback Args |
|---|---|
| `on_toggle` | `(playerName)` — dropdown opened/closed |
| `on_change` | `(optionIndex, playerName)` — option selected |

## `textinput`

Single-line text input. In interface mode: direct keyboard input. Outside: modal text dialog.

```lua
ui:element({
    id = "name_input", type = "textinput",
    rect = { unit = "px", x = 10, y = 40, w = 200, h = 28 },
    props = { value = "", placeholder = "Enter name...", title = "Name" },
    style = { bg = "#0F172A", text = "#E2E8F0", placeholder_color = "#475569", font_size = 12 },
    on_change = function(value, player)
        print("Input:", value)
    end,
})
```

| Prop | Description |
|---|---|
| `value` | Current text value |
| `placeholder` | Placeholder text when empty |
| `title` | Dialog title (non-interface mode) |

| Event | Callback Args |
|---|---|
| `on_change` | `(value, playerName)` — fired on end-edit |
