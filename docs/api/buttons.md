# Button & Interface Button

## `button`

Clickable button with text label.

```lua
ui:element({
    id = "action", type = "button",
    rect = { unit = "px", x = 10, y = 10, w = 120, h = 36 },
    props = { text = "ACTIVATE" },
    style = { bg = "#334155", text = "#FFFFFF", font_size = 14 },
    on_click = function(playerName)
        print("Clicked by " .. playerName)
    end
})
```

| Prop | Description |
|---|---|
| `text` | Button label |

| Style | Description |
|---|---|
| `bg` | Background color |
| `text` | Text color |
| `font_size` | Font size |
| `gradient` | Gradient (same format as panel) |
| `gradient_dir` | Gradient direction |

| Event | Callback Args |
|---|---|
| `on_click` | `(playerName)` |

## `interface_button`

Like `button`, but clicking it enters **Interface Mode** (keyboard capture). Useful for activating keyboard-driven UIs.

```lua
ui:element({
    id = "keyboard", type = "interface_button",
    rect = { unit = "px", x = 10, y = 10, w = 140, h = 30 },
    props = { text = "ENTER INTERFACE" },
    style = { bg = "#1E40AF", text = "#FFFFFF" },
    on_click = function(value, playerName)
        -- value = "1" when entering interface mode, "0" when leaving
        print(playerName .. " toggled interface: " .. value)
    end,
})
```

The `on_click` key is the same as a normal `button`, but the callback receives `(value, playerName)` - `value` is `"1"` when the player enters interface mode by clicking the button, and `"0"` when they exit. This fires on the **`interface_mode`** event bus rather than the plain `click` bus.

| Prop | Description |
|---|---|
| `text` | Button label (default "INTERFACE") |

| Style | Description |
|---|---|
| `bg` | Background color |
| `text` | Text color |
| `font_size` | Font size |

| Event | Callback Args | Notes |
| ----- | ------------- | ----- |
| `on_click` | `(value, playerName)` | `value = "1"` on enter, `"0"` on exit |

See **[Input & Events](/guide/input-events)** for full interface mode documentation including `poll_input`, `exit_interface_mode`, and `is_interface_mode`.
