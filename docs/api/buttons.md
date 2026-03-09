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
})
```

| Prop | Description |
|---|---|
| `text` | Button label (default "INTERFACE") |

| Style | Description |
|---|---|
| `bg` | Background color |
| `text` | Text color |
| `font_size` | Font size |
